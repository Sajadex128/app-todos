import { useEffect, useRef, useState } from "react";
import Photo from "../ui/Photo";

/**
 * ScrollVideo — the workshop film scrubbed by the visitor's scroll.
 *
 * The section is 300vh tall with a 100vh stage pinned (sticky) inside it, so
 * the page holds the film for two extra screens of scrolling. Progress across
 * that pinned stretch maps straight onto the film's timeline: the scroll
 * position is the playhead. The film never autoplays, never loops, never plays
 * sound — it only moves when the page does.
 *
 * Seeking is the expensive part of scrub-video, and this film is encoded as a
 * single GOP (one keyframe at the start), so every jump backwards makes the
 * decoder decode from that keyframe again. The loop therefore:
 * - seeks to the newest position only, never to intermediate ones nobody sees,
 * - keeps at most one seek in flight and waits for it (`seeked`) before pacing
 *   the next, so a seek is never restarted mid-decode,
 * - ignores sub-frame differences (SEEK_MIN_STEP) and rate-limits itself
 *   (SEEK_MIN_GAP), so a wheel gesture cannot thrash the decoder,
 * - runs no animation frame at all while the film is at rest.
 *
 * The film carries nothing a screen reader needs, so the band is hidden from
 * assistive tech. `prefers-reduced-motion` and a failed load each fall back to
 * a single still instead of a scrubbing timeline.
 */

const SRC = "/media/workshop-scroll.mp4";

/** Still shown if the film cannot be loaded (workbench with hand tools). */
const FALLBACK_PHOTO = 5095285;

const SEEK_MIN_STEP = 0.01; // seconds — below this a seek is not worth starting
const SEEK_MIN_GAP = 40; // ms between seeks — a gesture must not thrash the decoder

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

export default function ScrollVideo() {
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const videoRef = useRef(null);
  const [status, setStatus] = useState("loading"); // loading | ready | failed

  const failed = status === "failed";
  const still = failed || reducedMotion;
  const scrubbing = status === "ready" && !reducedMotion;

  useEffect(() => {
    if (!scrubbing) return undefined;

    const section = sectionRef.current;
    const stage = stageRef.current;
    const video = videoRef.current;
    if (!section || !stage || !video) return undefined;

    let frame = 0; // pending animation frame
    let targetTime = 0; // seconds the scroll position asks for
    let requested = 0; // seconds of the last seek we started
    let lastSeek = 0;

    /** Film time for the current scroll position: 0 at the pin, end when it ends. */
    const readTarget = () => {
      const duration = video.duration;
      // The pinned travel is exactly what is left over: section minus stage.
      const travel = section.offsetHeight - stage.offsetHeight;
      if (!Number.isFinite(duration) || duration <= 0 || travel <= 0) return 0;
      const progress = -section.getBoundingClientRect().top / travel;
      const clamped = progress < 0 ? 0 : progress > 1 ? 1 : progress;
      // Stay just short of the very end: a seek onto the end can stall.
      return Math.min(clamped * duration, Math.max(duration - 0.05, 0));
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
      targetTime = readTarget();
      // While a seek is running, `seeked` picks the newest position up again.
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
    };
  }, [scrubbing]);

  // 300vh = the 100vh stage plus two extra screens of pinned scrolling.
  const heightClass = still ? "h-screen" : "h-[300vh]";

  return (
    <div
      ref={sectionRef}
      aria-hidden="true"
      className={`relative bg-walnut ${heightClass}`}
    >
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
            className="absolute inset-0 h-full w-full object-cover object-center"
            onLoadedMetadata={() => setStatus("ready")}
            onError={() => setStatus("failed")}
          />
        )}
      </div>
    </div>
  );
}
