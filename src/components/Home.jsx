import React, { useRef } from "react";

const projects = [
  {
    id: 1,
    title: "VC ou FR: o que mexer primeiro no ventilador?",
    videoId: "oP-Sr2ukP-Q", // só o ID do vídeo
    videoUrl: "https://www.youtube.com/watch?v=oP-Sr2ukP-Q", // link normal para abrir em nova aba  },
  },
  {
    id: 2,
    title: "Como interpretar QUALQUER gasometria em 5 passos (na prática).",
    videoId: "FlDJuIyEnis", // só o ID do vídeo
    videoUrl: "https://www.youtube.com/watch?v=FlDJuIyEnis", // link normal para abrir em nova aba  },
  },
  {
    id: 3,
    title: "Comunicação não é dom, é técnica. E isso muda tudo na UTI.",
    videoId: "-PYn-4_2egw", // só o ID do vídeo
    videoUrl: "https://www.youtube.com/watch?v=-PYn-4_2egw", // link normal para abrir em nova aba  },
  },
  {
    id: 4,
    title: "Choque na Real. Garanto que nunca mais vai esquecer os conceitos.",
    videoId: "vWe8Zw9cVdk", // só o ID do vídeo
    videoUrl: "https://www.youtube.com/watch?v=vWe8Zw9cVdk", // link normal para abrir em nova aba  },
  },
  {
    id: 5,
    title: "FE do ECO é suficiente? FEG vs PC: O que realmente importa.",
    videoId: "HuMMpXaIAng", // só o ID do vídeo
    videoUrl: "https://www.youtube.com/shorts/HuMMpXaIAng", // link normal para abrir em nova aba  },
  },
  {
    id: 6,
    title: "O perigo da PVC. Por que ela pode afogar seu paciente?",
    videoId: "yd5BRm3nsiM", // só o ID do vídeo
    videoUrl: "https://www.youtube.com/shorts/yd5BRm3nsiM", // link normal para abrir em nova aba  },
  },
  {
    id: 7,
    title: "Choque. O paradoxo da PAM normal.",
    videoId: "SutPSOUFNJs", // só o ID do vídeo
    videoUrl: "https://www.youtube.com/shorts/SutPSOUFNJs", // link normal para abrir em nova aba  },
  },
  {
    id: 8,
    title: "Por que sua UTI precisa de silêncio?",
    videoId: "BCK6vVlJdK8", // só o ID do vídeo
    videoUrl: "https://www.youtube.com/shorts/BCK6vVlJdK8", // link normal para abrir em nova aba  },
  },
];

export default function Home({ onNavigate }) {
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
            pelo Dr.Bruno Badaró especialista em medicina intensiva.
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
                <a
                  key={project.id}
                  href={project.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand-bg w-40 sm:w-56 md:w-64 shrink-0 p-3 sm:p-4 border border-brand-border hover:shadow-lg transition"
                >
                  <div className="bg-brand-bg-alt h-24 sm:h-32 md:h-40 overflow-hidden">
                    <img
                      src={`https://img.youtube.com/vi/${project.videoId}/hqdefault.jpg`}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-semibold text-sm mb-2 mt-2">
                    {project.title}
                  </h3>
                </a>
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
