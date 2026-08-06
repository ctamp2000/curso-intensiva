import React, { useRef } from "react";
import ProjectCard from "../ui/ProjectCard";
import projects from "../../data/projects";
export default function FeaturedProjects() {
  const carouselRef = useRef(null);

  const scroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 300;
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };
  return (
    <section className="page-section">
      <div className="page-container">
        {/* Título */}
        <div className="flex items-center gap-6 mb-8">
          <div className="flex-1 border-t border-brand-border opacity-40"></div>
          <h2 className="section-title whitespace-nowrap">
            Projetos em destaque
          </h2>
          <div className="flex-1 border-t border-brand-border opacity-40"></div>
        </div>

        {/* Carousel */}
        <div className="relative flex items-center w-full overflow-hidden">
          {/* Left arrow */}
          <button
            onClick={() => scroll("left")}
            className="carousel-button"
            aria-label="Projetos anteriores"
          >
            ‹
          </button>

          {/* Cards container */}
          <div
            ref={carouselRef}
            className="flex gap-3 sm:gap-4 md:gap-6 mx-auto overflow-x-auto flex-1 pb-2 scroll-smooth"
          >
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {/* Right arrow */}
          <button
            onClick={() => scroll("right")}
            className="carousel-button"
            aria-label="Próximos projetos"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
