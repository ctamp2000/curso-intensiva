import React, { useRef } from "react";

const projects = [
  {
    id: 1,
    title: "Card Projeto A",
    description: "Texto descritivo do projeto em destaque.",
    image: "src/assets/cards/projetoA.jpg",
  },
  {
    id: 2,
    title: "Card Projeto B",
    description: "Texto descritivo do projeto em destaque.",
    image: "src/assets/cards/projetoB.png",
  },
  {
    id: 3,
    title: "Card Projeto C",
    description: "Texto descritivo do projeto em destaque.",
    image: "src/assets/cards/projetoC.png",
  },
  {
    id: 4,
    title: "Card Projeto D",
    description: "Texto descritivo do projeto em destaque.",
    image: "src/assets/cards/projetoD.png",
  },
];

export default function Home({ onNavigate }) {
  const carouselRef = useRef(null);

  const scroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 300;
      if (direction === "left") {
        carouselRef.current.scrollBy({
          left: -scrollAmount,
          behavior: "smooth",
        });
      } else {
        carouselRef.current.scrollBy({
          left: scrollAmount,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <>
      {/* CAMADA 2 - Apresentação */}
      <section className="bg-brand-bg-alt py-8 sm:py-12 md:py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center text-brand-text space-y-4">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">
            Bem-vindo ao seu portal de aprendizado!
          </h2>
          <p className="text-sm md:text-base leading-relaxed">
            A Plataforma UTInaReal tem como objetivo blá blá blá....Aqui você
            terá acesso às aulas, materiais e conteúdos exclusivos preparados
            pelo Dr. especialista em medicina intensiva.
          </p>
        </div>
      </section>

      {/* CAMADA 4 - Projetos em destaque */}
      <section className="bg-white py-8 sm:py-10 md:py-12 w-full">
        <div className="w-full px-4 sm:px-6">
          {/* Título */}
          <h2 className="text-center text-lg sm:text-xl md:text-2xl font-semibold text-brand-text mb-6 sm:mb-8">
            Projetos em destaque
          </h2>

          {/* Carousel */}
          <div className="relative flex items-center w-full overflow-hidden">
            {/* Left arrow */}
            <button
              onClick={() => scroll("left")}
              className="flex items-center justify-center shrink-0 w-12 sm:w-16 md:w-24 h-12 sm:h-16 md:h-24 text-brand-primary text-4xl sm:text-6xl md:text-9xl hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded transition"
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
                <div
                  key={project.id}
                  className="bg-brand-bg w-40 sm:w-56 md:w-64 shrink-0 p-3 sm:p-4 border border-brand-border"
                >
                  <div className="bg-brand-bg-alt h-24 sm:h-32 md:h-40 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-semibold text-sm mb-2 mt-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-brand-text line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Right arrow */}
            <button
              onClick={() => scroll("right")}
              className="flex items-center justify-center shrink-0 w-12 sm:w-16 md:w-24 h-12 sm:h-16 md:h-24 text-brand-primary text-4xl sm:text-6xl md:text-9xl hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded transition"
              aria-label="Próximos projetos"
            >
              ›
            </button>
          </div>
        </div>
      </section>

      {/* CAMADA 5 - Footer */}
      <footer className="bg-brand-bg-alt py-6 sm:py-8 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center text-sm text-brand-text">
          © 2026 Curso Intensiva - Todos os direitos reservados
        </div>
      </footer>
    </>
  );
}
