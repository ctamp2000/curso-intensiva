import React, { useState } from "react";

export default function Header({ onNavigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState(false);

  const handlePlaceholderClick = (e) => {
    e.preventDefault();
  };

  const handleNavClick = (page) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    setMobileSubmenuOpen(false);
  };

  const submenuItems = [
    "Aula 1",
    "Aula 2",
    "Aula 3",
    "Aula 4",
    "Aula 5",
    "Aula 6",
  ];
  return (
    <header className="w-full" role="banner">
      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="skip-link sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-brand-primary focus:text-white focus:px-4 focus:py-2 focus:rounded"
      >
        Pular para o conteúdo principal
      </a>

      {/* Top banner */}
      <div className="bg-brand-primary px-4 sm:px-6 md:px-8 py-4 flex items-center justify-between">
        {/* Esquerda: LinkedIn */}
        <nav className="flex flex-col">
          <a
            href="https://www.instagram.com/utinareal"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-200 hover:text-blue-400"
          >
            UTInaReal no Instagram
          </a>
          <a
            href="https://www.instagram.com/bruno_badaro"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-200 hover:text-blue-400"
          >
            Bruno Badaró no Instagram
          </a>
        </nav>

        {/* Centro: título e subtítulo */}
        <div className="flex flex-col items-center text-center grow">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white">
            Plataforma UTInaReal
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-white italic">
            Aulas focadas na especialização dos atendimentos em UTI
          </p>
        </div>

        {/* Direita: botão */}
        <button
          type="button"
          className="bg-brand-button px-4 sm:px-6 py-2 rounded-lg text-sm sm:text-base md:text-lg font-semibold text-brand-text whitespace-nowrap hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-primary transition-opacity"
        >
          Acessar
        </button>
      </div>

      {/* Navigation bar */}
      <nav
        className="bg-brand-bar text-brand-text"
        role="navigation"
        aria-label="Navegação principal"
      >
        <div className="px-4 sm:px-6 md:px-8 py-2 flex items-center justify-between">
          {/* Hamburger button (mobile only) */}
          <button
            type="button"
            className="lg:hidden flex flex-col gap-1 bg-brand-text p-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bar"
            aria-label="Menu de navegação"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="w-5 h-0.5 bg-brand-bar block"></span>
            <span className="w-5 h-0.5 bg-brand-bar block"></span>
            <span className="w-5 h-0.5 bg-brand-bar block"></span>
          </button>

          {/* Desktop menu */}
          <ul className="hidden lg:flex text-xs sm:text-sm space-x-2 sm:space-x-4 whitespace-nowrap">
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("home");
                }}
                className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded px-1"
              >
                Home
              </a>
            </li>
            <li>|</li>
            <li className="relative group">
              <button
                type="button"
                aria-haspopup="true"
                className="hover:underline flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded px-1"
              >
                Curso Inicial
                <span className="text-xs">▼</span>
              </button>
              {/* Desktop submenu */}
              <ul className="hidden group-hover:flex group-focus-within:flex absolute left-0 top-full mt-0 bg-white border border-brand-border rounded shadow-lg flex-col w-max z-50">
                {submenuItems.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      onClick={handlePlaceholderClick}
                      className="block px-4 py-2 hover:bg-brand-bg-alt focus-visible:outline-none focus-visible:bg-brand-bg-alt"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
            <li>|</li>
            <li>
              <a
                href="#"
                onClick={handlePlaceholderClick}
                className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded px-1"
              >
                Transdisciplinaridade
              </a>
            </li>
            <li>|</li>
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("collaborators");
                }}
                className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded px-1"
              >
                Colaboradores
              </a>
            </li>
            <li>|</li>
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("products");
                }}
                className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded px-1"
              >
                Produtos
              </a>
            </li>
            <li>|</li>
            <li>
              <a
                href="#"
                onClick={handlePlaceholderClick}
                className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded px-1"
              >
                Notícias
              </a>
            </li>
          </ul>
        </div>

        {/* Mobile menu (expandable) */}
        <div
          id="mobile-menu"
          className={`lg:hidden bg-brand-bar border-t border-brand-border overflow-hidden transition-all duration-300 ${
            mobileMenuOpen ? "max-h-96" : "max-h-0"
          }`}
        >
          <ul className="text-xs sm:text-sm text-brand-text px-4 py-4 space-y-3">
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("home");
                }}
                className="hover:underline block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded px-1"
              >
                Home
              </a>
            </li>
            <li>
              <button
                type="button"
                aria-expanded={mobileSubmenuOpen}
                aria-controls="mobile-submenu"
                onClick={() => setMobileSubmenuOpen(!mobileSubmenuOpen)}
                className="hover:underline text-left flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded px-1"
              >
                Curso Inicial
                <span
                  className="text-xs transition-transform"
                  style={{
                    transform: mobileSubmenuOpen
                      ? "rotate(180deg)"
                      : "rotate(0deg)",
                  }}
                >
                  ▼
                </span>
              </button>
              {/* Mobile submenu */}
              {mobileSubmenuOpen && (
                <ul
                  id="mobile-submenu"
                  className="ml-4 mt-2 space-y-2 border-l-2 border-brand-text pl-3"
                >
                  {submenuItems.map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        onClick={handlePlaceholderClick}
                        className="hover:underline block text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded px-1"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            <li>
              <a
                href="#"
                onClick={handlePlaceholderClick}
                className="hover:underline block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded px-1"
              >
                Transdisciplinaridade
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("collaborators");
                }}
                className="hover:underline block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded px-1"
              >
                Colaboradores
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("products");
                }}
                className="hover:underline block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded px-1"
              >
                Produtos
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={handlePlaceholderClick}
                className="hover:underline block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded px-1"
              >
                Notícias
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
