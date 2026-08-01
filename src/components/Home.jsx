import React, { useRef } from "react";

const projects = [
  {
    id: 1,
    title:
      "Intubou. E agora? Parâmetros iniciais da VM e ajustes pós gasometria.",
    videoDate: "30/07/2026",
    videoId: "JnSmbBf-eiY", // só o ID do vídeo
    videoUrl: "https://www.youtube.com/watch?v=JnSmbBf-eiY", // link normal para abrir em nova aba  },
  },
  {
    id: 2,
    title: "VC ou FR: o que mexer primeiro no ventilador?",
    videoDate: "26/07/2026",
    videoId: "oP-Sr2ukP-Q", // só o ID do vídeo
    videoUrl: "https://www.youtube.com/watch?v=oP-Sr2ukP-Q", // link normal para abrir em nova aba  },
  },
  {
    id: 3,
    title: "Como interpretar QUALQUER gasometria em 5 passos (na prática).",
    videoDate: "24/07/2026",
    videoId: "FlDJuIyEnis", // só o ID do vídeo
    videoUrl: "https://www.youtube.com/watch?v=FlDJuIyEnis", // link normal para abrir em nova aba  },
  },
  {
    id: 4,
    title: "Comunicação não é dom, é técnica. E isso muda tudo na UTI.",
    videoDate: "18/07/2026",
    videoId: "-PYn-4_2egw", // só o ID do vídeo
    videoUrl: "https://www.youtube.com/watch?v=-PYn-4_2egw", // link normal para abrir em nova aba  },
  },
  {
    id: 5,
    title: "FE do ECO é suficiente? FEG vs PC: O que realmente importa.",
    videoDate: "02/07/2026",
    videoId: "HuMMpXaIAng", // só o ID do vídeo
    videoUrl: "https://www.youtube.com/shorts/HuMMpXaIAng", // link normal para abrir em nova aba  },
  },
  {
    id: 6,
    title: "O perigo da PVC. Por que ela pode afogar seu paciente?",
    videoDate: "19/06/2026",
    videoId: "yd5BRm3nsiM", // só o ID do vídeo
    videoUrl: "https://www.youtube.com/shorts/yd5BRm3nsiM", // link normal para abrir em nova aba  },
  },
  {
    id: 7,
    title: "Choque. O paradoxo da PAM normal.",
    videoDate: "15/06/2026",
    videoId: "SutPSOUFNJs", // só o ID do vídeo
    videoUrl: "https://www.youtube.com/shorts/SutPSOUFNJs", // link normal para abrir em nova aba  },
  },
  {
    id: 8,
    title: "Por que sua UTI precisa de silêncio?",
    videoDate: "15/06/2026",
    videoId: "BCK6vVlJdK8", // só o ID do vídeo
    videoUrl: "https://www.youtube.com/shorts/BCK6vVlJdK8", // link normal para abrir em nova aba  },
  },
  {
    id: 9,
    title: "Choque na Real. Garanto que nunca mais vai esquecer os conceitos.",
    videoDate: "14/06/2026",
    videoId: "vWe8Zw9cVdk", // só o ID do vídeo
    videoUrl: "https://www.youtube.com/watch?v=vWe8Zw9cVdk", // link normal para abrir em nova aba  },
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
      {/* CAMADA 2 - Apresentação - Hero */}
      <section className="hero-section bg-brand-bg-alt">
        <div className="page-container">
          <div className="max-w-3xl mx-auto text-center text-brand-text space-y-4">
            <p className="hero-label mb-3">MEDICINA INTENSIVA NA PRÁTICA</p>

            <h1 className="hero-title">
              Aprenda a tomar decisões
              <br />
              mais seguras na UTI
            </h1>

            <p className="body-text max-w-2xl mx-auto mt-6">
              Conteúdos práticos, casos clínicos e materiais exclusivos para
              médicos e profissionais que desejam aprofundar seus conhecimentos
              em medicina intensiva.
            </p>
          </div>
        </div>
      </section>

      {/* CAMADA 4 - Projetos em destaque */}
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
                <a
                  key={project.id}
                  href={project.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="content-card w-40 sm:w-56 md:w-64 shrink-0 p-3 sm:p-4"
                >
                  <div className="bg-brand-bg-alt h-24 sm:h-32 md:h-40 overflow-hidden rounded-lg">
                    <img
                      src={`https://img.youtube.com/vi/${project.videoId}/hqdefault.jpg`}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105 "
                    />
                  </div>
                  <h3 className="card-title mt-3">{project.title}</h3>
                  <p className="meta-text mt-3">{project.videoDate}</p>{" "}
                </a>
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

      {/* CAMADA 5 - Footer */}
      <footer className="bg-brand-bg-alt py-6 sm:py-8 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center text-sm text-brand-text">
          © 2026 Curso Intensiva - Todos os direitos reservados
        </div>
      </footer>
    </>
  );
}
