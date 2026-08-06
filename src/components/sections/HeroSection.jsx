import React from "react";

export default function HeroSection() {
  return (
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
            médicos e profissionais que desejam aprofundar seus conhecimentos em
            medicina intensiva.
          </p>
        </div>
      </div>
    </section>
  );
}
