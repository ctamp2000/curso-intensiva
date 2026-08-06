import React from "react";
import HeroSection from "./sections/HeroSection";
import FeaturedProjects from "./sections/FeaturedProjects";
import Footer from "./layout/Footer";

export default function Home() {
  return (
    <>
      /* CAMADA 2 - Apresentação - Hero */
      <HeroSection />
      /* CAMADA 4 - Projetos em destaque */
      <FeaturedProjects />
      /* CAMADA 5 - Footer */
      <Footer />
    </>
  );
}
