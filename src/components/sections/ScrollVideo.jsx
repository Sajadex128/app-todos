import { useEffect, useRef, useState } from "react";
import Photo from "../ui/Photo";

/**
 * ScrollVideo — the workshop film as a scroll-scrubbed backdrop.
 *
 * Renders a 300vh band holding a 100vh stage pinned (sticky) inside it, with
 * the film covering that stage. Progress across the pinned stretch maps
 * straight onto the film's timeline: the scroll position is the playhead. The
 * film never autoplays, never loops and never plays sound — it only moves when
 * the page does.
 *
 * Whatever is passed as `children` sits on top of the film and dissolves once
 * the film has started to travel (FADE_START → FADE_END), which is what clears
 * the opening headline out of the frame; scrolling back up brings it back.
 *
 * Seeking is the expensive part of scrub-video, and this film is encoded as a
 * single GOP (one keyframe at the start), so every jump backwards makes the
 * decoder decode from that keyframe again. The loop therefore:
 * - seeks to the newest position only, never to intermediate ones nobody sees,
 * - keeps at most one seek in flight and waits for it (`seeked`) before pacing
 *   the next, so a seek is never restarted mid-decode,
 * - ignores sub-frame differences (SEEK_MIN_STEP) and issues at most one seek
 *   per frame (SEEK_MIN_GAP), so it tracks the page closely without thrashing
 *   the decoder,
 * - runs no animation frame at all while the film is at rest.
 *
 * `prefers-reduced-motion` and a failed load each fall back to a still frame
 * and a normal-height band, with the overlay left fully visible.
 */

const SRC = "/media/workshop-scroll.mp4";

/** Still shown if the film cannot be loaded (workbench with hand tools). */
const FALLBACK_PHOTO = 5095285;

/*
 * The film opens on a fade from black: measured, the first ~1.4 s are a solid
 * black rectangle and the picture only settles from about 1.5 s on. Mapping
 * the scroll from 0 would therefore open the site on an empty hero, so the
 * scrub starts at the first frame that actually carries the picture and still
 * runs through to the film's final frame.
 */
const FILM_START = 1.5; // seconds

const SEEK_MIN_STEP = 0.01; // seconds — below this a seek is not worth starting
/*
 * At most one seek per frame. A measured ordinary scroll step costs the
 * decoder ~20 ms with this film, so letting the playhead move every frame
 * keeps it as close to the page as the film itself allows; the
 * one-seek-in-flight rule in the loop is what protects the decoder during a
 * fast flick.
 */
const SEEK_MIN_GAP = 16; // ms between seeks

/* The overlay holds while the film starts to travel, then dissolves. */
const FADE_START = 0.05;
const FADE_END = 0.2;

/** Tracks the visitor's reduced-motion preference, including later changes. */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return undefined;
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = (event) => setReduced(event.matches);
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  return reduced;
}

export default function ScrollVideo({ children }) {
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const overlayRef = useRef(null);
  const videoRef = useRef(null);
  const [status, setStatus] = useState("loading"); // loading | ready | failed

  const failed = status === "failed";
  const still = failed || reducedMotion;
  const scrubbing = status === "ready" && !reducedMotion;

  useEffect(() => {
    if (!scrubbing) return undefined;

    const section = sectionRef.current;
    const stage = stageRef.current;
    const overlay = overlayRef.current;
    const video = videoRef.current;
    if (!section || !stage || !overlay || !video) return undefined;

    let frame = 0; // pending animation frame
    let targetTime = 0; // seconds the scroll position asks for
    let requested = 0; // seconds of the last seek we started
    let lastSeek = 0;
    let lastOpacity = 1;

    /** 0 when the stage pins, 1 once the whole section has scrolled past. */
    const readProgress = () => {
      // The pinned travel is exactly what is left over: section minus stage.
      const travel = section.offsetHeight - stage.offsetHeight;
      if (travel <= 0) return 0;
      const progress = -section.getBoundingClientRect().top / travel;
      return progress < 0 ? 0 : progress > 1 ? 1 : progress;
    };

    /** Dissolves the overlay as the film travels in; reversed on the way up. */
    const applyFade = (progress) => {
      const span = FADE_END - FADE_START;
      const travelled = span > 0 ? (progress - FADE_START) / span : 1;
      const eased =
        travelled <= 0
          ? 0
          : travelled >= 1
            ? 1
            : travelled * travelled * (3 - 2 * travelled);
      const opacity = 1 - eased;
      if (opacity === lastOpacity) return;
      if (opacity !== 0 && Math.abs(opacity - lastOpacity) < 0.01) return;
      lastOpacity = opacity;
      overlay.style.opacity = String(opacity);
      // Dissolved for good: invisible copy must not hold focus or clicks.
      overlay.style.visibility = opacity === 0 ? "hidden" : "";
    };

    function draw() {
      frame = 0;
      // Wait for the first frame, and for any seek already running to land.
      if (video.readyState < 2 || video.seeking) return;

      const now = performance.now();
      if (
        now - lastSeek >= SEEK_MIN_GAP &&
        Math.abs(targetTime - requested) >= SEEK_MIN_STEP
      ) {
        requested = targetTime;
        video.currentTime = targetTime;
        lastSeek = now;
      }
    }

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(draw);
    };

    const onScroll = () => {
      const progress = readProgress();
      const duration = video.duration;
      if (Number.isFinite(duration) && duration > 0) {
        // Stay just short of the very end: a seek onto the end can stall.
        const end = Math.max(duration - 0.05, 0);
        const start = Math.min(FILM_START, end);
        targetTime = start + progress * (end - start);
      } else {
        targetTime = 0;
      }
      // The overlay keeps up with the scroll even while a seek is in flight.
      applyFade(progress);
      if (!video.seeking) schedule();
    };

    onScroll(); // covers a restored scroll position and late layout shifts
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    video.addEventListener("seeked", schedule);
    // Wake the loop if it ran before the film had a decoded frame.
    video.addEventListener("loadeddata", onScroll);
    video.addEventListener("canplay", onScroll);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      video.removeEventListener("seeked", schedule);
      video.removeEventListener("loadeddata", onScroll);
      video.removeEventListener("canplay", onScroll);
      // Leaving the overlay dissolved would hide the copy it wraps.
      overlay.style.opacity = "";
      overlay.style.visibility = "";
    };
  }, [scrubbing]);

  // 300vh = the 100vh stage plus two extra screens of pinned scrolling.
  const heightClass = still ? "h-screen" : "h-[300vh]";

  return (
    <div ref={sectionRef} className={`relative bg-walnut ${heightClass}`}>
      <div
        ref={stageRef}
        className="sticky top-0 h-screen overflow-hidden bg-walnut"
      >
        {failed ? (
          <Photo
            id={FALLBACK_PHOTO}
            alt=""
            width={1800}
            sizes="100vw"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        ) : (
          <video
            ref={videoRef}
            src={SRC}
            preload="auto"
            muted
            playsInline
            disablePictureInPicture
            tabIndex={-1}
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover object-center"
            onLoadedMetadata={() => setStatus("ready")}
            onError={() => setStatus("failed")}
          />
        )}

        <div
          ref={overlayRef}
          className="absolute inset-0 will-change-[opacity]"
        >
          {children}
        </div>
      </div>
    </div>
  );
}
