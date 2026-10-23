import { useEffect, useMemo, useState } from "react";
import { projectFilters, projects } from "../../data/projects";
import { faNumber } from "../../utils/format";
import Button from "../ui/Button";
import Icon from "../ui/Icon";
import Modal from "../ui/Modal";
import Photo from "../ui/Photo";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";

/** Larger view of one project, with arrow-key navigation between projects. */
function ProjectLightbox({ project, onClose, onStep, position }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight") onStep(-1);
      if (event.key === "ArrowLeft") onStep(1);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onStep]);

  return (
    <Modal
      open
      onClose={onClose}
      labelledBy="project-lightbox-title"
      panelClassName="max-w-3xl"
    >
      <div className="card overflow-hidden">
        <div className="relative">
          <Photo
            id={project.image.id}
            alt={project.image.alt}
            width={1400}
            sizes="(min-width: 768px) 720px, 100vw"
            className="aspect-[4/3] w-full object-cover"
          />
          <Button
            variant="dark"
            size="sm"
            onClick={onClose}
            aria-label="بستن جزئیات پروژه"
            className="absolute end-3 top-3 border-cream/30 bg-walnut/85"
            data-autofocus
          >
            <Icon name="close" size={18} />
          </Button>
        </div>

        <div className="p-5 sm:p-7">
          <p className="eyebrow">{project.categoryLabel}</p>
          <h3
            id="project-lightbox-title"
            className="mt-2 font-serif text-2xl"
          >
            {project.title}
          </h3>
          <p className="mt-3 text-[0.95rem]">{project.description}</p>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onStep(-1)}
                aria-label="پروژه‌ی قبلی"
              >
                <Icon name="arrow-right" size={16} />
                قبلی
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onStep(1)}
                aria-label="پروژه‌ی بعدی"
              >
                بعدی
                <Icon name="arrow-right" size={16} className="rotate-180" />
              </Button>
            </div>
            <p className="text-xs text-muted">
              پروژه {faNumber(position.current)} از {faNumber(position.total)} ·
              نمونه
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [openProjectId, setOpenProjectId] = useState(null);

  const visibleProjects = useMemo(
    () =>
      activeFilter === "all"
        ? projects
        : projects.filter((project) => project.category === activeFilter),
    [activeFilter],
  );

  const openIndex = visibleProjects.findIndex(
    (project) => project.id === openProjectId,
  );
  const openProject = openIndex >= 0 ? visibleProjects[openIndex] : null;

  const stepProject = (direction) => {
    if (visibleProjects.length === 0) return;
    const nextIndex =
      (openIndex + direction + visibleProjects.length) %
      visibleProjects.length;
    setOpenProjectId(visibleProjects[nextIndex].id);
  };

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="bg-cardbg py-20 lg:py-28"
    >
      <div className="wrap">
        <SectionHeading
          id="projects-heading"
          eyebrow="نمونه‌کارها"
          title="پروژه‌های منتخب"
          intro="نگاهی نزدیک‌تر به جزئیات، متریال و مهارتی که پشت کارهای ماست."
        />

        <div
          className="mt-8 flex flex-wrap gap-2.5"
          role="group"
          aria-label="فیلتر پروژه‌ها بر اساس دسته‌بندی"
        >
          {projectFilters.map((filter) => {
            const isActive = activeFilter === filter.id;
            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => {
                  setActiveFilter(filter.id);
                  setOpenProjectId(null);
                }}
                aria-pressed={isActive}
                className={`rounded-full border px-4 py-2 text-[0.85rem] font-semibold transition-colors duration-200 ${
                  isActive
                    ? "border-transparent bg-espresso text-cream"
                    : "border-line bg-cardbg text-muted hover:border-terracotta hover:text-burnt"
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        <p className="sr-only" role="status" aria-live="polite">
          {faNumber(visibleProjects.length)} پروژه نمایش داده شد.
        </p>

        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visibleProjects.map((project, index) => (
            <Reveal
              as="li"
              key={project.id}
              delay={index * 60}
              className="h-full"
            >
              <button
                type="button"
                onClick={() => setOpenProjectId(project.id)}
                className="card group block h-full w-full overflow-hidden text-start transition-shadow duration-300 hover:shadow-lift"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-line">
                  <Photo
                    id={project.image.id}
                    alt={project.image.alt}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                  />
                  <span className="absolute inset-0 bg-walnut/0 transition-colors duration-300 group-hover:bg-walnut/25" />
                  <span className="absolute bottom-3 end-3 grid h-9 w-9 place-items-center rounded-full bg-cream/90 text-ink opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                    <Icon name="arrow-right" size={16} className="icon-flip" />
                  </span>
                </div>
                <span className="block p-5">
                  <span className="eyebrow text-[0.72rem]">
                    {project.categoryLabel}
                  </span>
                  <span className="mt-1.5 block font-serif text-[1.15rem] text-ink">
                    {project.title}
                  </span>
                  <span className="mt-1.5 block text-[0.88rem] text-muted">
                    مشاهده‌ی جزئیات پروژه
                  </span>
                </span>
              </button>
            </Reveal>
          ))}
        </ul>

        <p className="mt-8 text-sm text-muted">
          پروژه‌های نمایش‌داده‌شده نمونه هستند و برای نشان دادن چیدمان گالری
          آمده‌اند. پیش از انتشار، آن‌ها را با کارهای واقعی جایگزین کنید.
        </p>
      </div>

      {openProject ? (
        <ProjectLightbox
          project={openProject}
          onClose={() => setOpenProjectId(null)}
          onStep={stepProject}
          position={{
            current: openIndex + 1,
            total: visibleProjects.length,
          }}
        />
      ) : null}
    </section>
  );
}
