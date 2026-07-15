import React from "react";

const CollaboratorItem = () => (
  <div className="flex items-start gap-4 sm:gap-5 py-5 sm:py-6 border-b border-brand-border">
    {/* Avatar */}
    <div className="w-20 h-20 flex-shrink-0 rounded-full bg-brand-bg flex items-center justify-center">
      <svg
        className="w-10 h-10 text-brand-text"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
      </svg>
    </div>

    {/* Info */}
    <div className="flex-1">
      <h3 className="font-bold text-base sm:text-lg text-brand-text">
        Nome do Colaborador
      </h3>
      <div className="text-sm text-brand-text mt-1 space-y-0.5">
        <p>Vínculo</p>
        <p>Lattes</p>
        <p>ORCID</p>
      </div>
      <p className="text-sm text-brand-text mt-2 leading-relaxed">
        Temas de atuação/pesquisa: Tema 1; Tema 2; Tema 3; Tema 4; Tema 5; Tema
        6
      </p>
    </div>

    {/* Button */}
    <div className="flex-shrink-0">
      <button className="bg-brand-primary hover:opacity-90 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2">
        ℹ
      </button>
    </div>
  </div>
);

export default function Collaborators() {
  const collaborators = Array.from({ length: 10 });

  return (
    <section className="bg-brand-bg-alt py-8 sm:py-12 md:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-brand-text">
        {/* Colaboradores list */}
        <div className="bg-white border border-brand-border rounded p-5 sm:p-6">
          <div className="space-y-2">
            {collaborators.map((_, idx) => (
              <CollaboratorItem key={idx} />
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-6 text-right">
            <button className="text-brand-text hover:text-brand-primary text-sm font-semibold flex items-center justify-end gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded px-1">
              Próxima página
              <span>›</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
