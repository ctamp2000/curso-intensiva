import React, { useState, useEffect, useRef, useCallback } from "react";

const mockProducts = [
  "Projeto Amazônia",
  "Projeto Cerrado",
  "Projeto Costeiro",
  "Projeto Urbano",
  "Projeto Clima",
];

const mockTypes = [
  "Artigo",
  "Livro",
  "Capítulo de Livro",
  "Relatório Técnico",
  "Nota Técnica",
  "Audiovisual",
];

const mockPrograms = [
  "Programa CCST",
  "Programa Biodiversidade",
  "Programa Clima",
  "Programa Água",
];

// Generate mock data
const generateMockData = () => {
  return Array.from({ length: 24 }).map((_, i) => ({
    year: 2026 - Math.floor(i / 4),
    title: `TÍTULO DO PRODUTO ${i + 1} - ${mockTypes[i % mockTypes.length]}`,
    type: mockTypes[i % mockTypes.length],
    project: mockProducts[i % mockProducts.length],
    publishedAt:
      i % 3 === 0
        ? "Revista Brasileira"
        : i % 3 === 1
          ? "Editora Nacional"
          : "Portal Científico",
    program: mockPrograms[i % mockPrograms.length],
  }));
};

// Normalize text for accent-insensitive search
const normalizeSearch = (value) => {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
};

// Build highlight indices
const buildHighlightParts = (text, query) => {
  const normalizedText = [];
  const indexMap = [];

  for (let i = 0; i < text.length; i += 1) {
    const normalizedChar = normalizeSearch(text[i]);
    if (!normalizedChar) continue;
    for (let j = 0; j < normalizedChar.length; j += 1) {
      normalizedText.push(normalizedChar[j]);
      indexMap.push(i);
    }
  }

  const normalizedString = normalizedText.join("");
  const ranges = [];
  let startIndex = 0;

  while (true) {
    const matchIndex = normalizedString.indexOf(query, startIndex);
    if (matchIndex === -1) break;

    const start = indexMap[matchIndex];
    const end = indexMap[matchIndex + query.length - 1] + 1;
    ranges.push([start, end]);
    startIndex = matchIndex + query.length;
  }

  return ranges;
};

// Render project text with highlights
const renderProjectText = (project, query) => {
  if (!query) return project;

  const ranges = buildHighlightParts(project, normalizeSearch(query));
  if (ranges.length === 0) return project;

  const parts = [];
  let lastIndex = 0;
  ranges.forEach(([start, end]) => {
    if (start > lastIndex) parts.push(project.slice(lastIndex, start));
    parts.push(
      <mark
        key={`${start}-${end}`}
        className="bg-yellow-200/70 text-brand-text rounded px-0.5"
      >
        {project.slice(start, end)}
      </mark>,
    );
    lastIndex = end;
  });
  if (lastIndex < project.length) parts.push(project.slice(lastIndex));

  return parts;
};

export default function Products() {
  const [products] = useState(generateMockData());
  const [page, setPage] = useState(1);
  const [filterType, setFilterType] = useState("all");
  const [filterProject, setFilterProject] = useState("");
  const [filterYear, setFilterYear] = useState("all");
  const [projectInput, setProjectInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const projectDebounceRef = useRef(null);
  const tipoRef = useRef(null);
  const pageSize = 6;

  // Focus on Tipo on mount
  useEffect(() => {
    if (tipoRef.current) {
      tipoRef.current.focus();
    }
  }, []);

  // Handle project input with debounce
  const handleProjectInput = useCallback((value) => {
    setProjectInput(value);

    if (projectDebounceRef.current) {
      clearTimeout(projectDebounceRef.current);
    }

    const trimmed = value.trim();
    if (!trimmed) {
      setFilterProject("");
      setPage(1);
      return;
    }

    projectDebounceRef.current = setTimeout(() => {
      setFilterProject(value);
      setPage(1);
    }, 300);
  }, []);

  // Get filtered products
  const getFilteredProducts = useCallback(() => {
    const projectQuery = normalizeSearch(filterProject.trim());
    return products.filter((product) => {
      const matchesType = filterType === "all" || product.type === filterType;
      const matchesYear =
        filterYear === "all" || product.year.toString() === filterYear;
      const matchesProject =
        !projectQuery ||
        normalizeSearch(product.project).includes(projectQuery);
      return matchesType && matchesYear && matchesProject;
    });
  }, [products, filterType, filterProject, filterYear]);

  // Clear filters
  const handleClearFilters = () => {
    setFilterType("all");
    setFilterYear("all");
    setFilterProject("");
    setProjectInput("");
    setPage(1);
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { id, value } = e.target;
    if (id === "tipo") {
      setFilterType(value);
    } else if (id === "ano") {
      setFilterYear(value);
    }
    setPage(1);
  };

  // Pagination
  const filtered = getFilteredProducts();
  const totalPages = Math.ceil(filtered.length / pageSize);
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const pageItems = filtered.slice(start, end);

  const hasActiveFilters =
    filterType !== "all" ||
    filterYear !== "all" ||
    filterProject.trim().length > 0;
  const hasNext = page < totalPages;

  // Year select options
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let y = currentYear; y >= 2000; y--) years.push(y);

  const typeOptions = [
    "Artigo",
    "Livro",
    "Capítulo de Livro",
    "Relatório Técnico",
    "Sumário Executivo",
    "Nota Técnica",
    "Audiovisual",
    "Base de Dados",
    "Site/Plataforma",
  ];

  return (
    <section
      className="bg-brand-bg-alt py-8 sm:py-12 md:py-14"
      role="region"
      aria-label="Produtos"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-brand-text">
        {/* Filters */}
        <div
          id="produtos-filters"
          className="bg-white border border-brand-border rounded p-4 sm:p-5 mb-6 space-y-3 sm:space-y-0"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
            <div className="text-sm text-brand-text">
              {hasActiveFilters ? (
                <span className="inline-flex items-center gap-2">
                  Filtros ativos
                  <span className="w-2 h-2 bg-brand-primary rounded-full"></span>
                </span>
              ) : (
                <span>Nenhum filtro ativo</span>
              )}
            </div>
            <button
              type="button"
              onClick={handleClearFilters}
              disabled={!hasActiveFilters}
              className="text-sm font-semibold text-brand-primary hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded"
              aria-label="Limpar filtros"
            >
              Limpar filtros
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-2 items-end">
            {/* Tipo */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="tipo"
                className="text-sm font-semibold text-brand-text"
              >
                Tipo
              </label>
              <select
                ref={tipoRef}
                id="tipo"
                className="bg-gray-100 border border-brand-border rounded-full px-3 py-2 text-sm w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
                value={filterType}
                onChange={handleFilterChange}
              >
                <option value="all">Todos</option>
                {typeOptions.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Projeto */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="projeto"
                className="text-sm font-semibold text-brand-text"
              >
                Projeto
              </label>
              <input
                id="projeto"
                className="bg-gray-100 border border-brand-border rounded-full px-3 py-2 text-sm w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
                placeholder="Digite o projeto"
                value={projectInput}
                onChange={(e) => handleProjectInput(e.target.value)}
              />
            </div>

            {/* Ano */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="ano"
                className="text-sm font-semibold text-brand-text"
              >
                Ano
              </label>
              <select
                id="ano"
                className="bg-gray-100 border border-brand-border rounded-full px-3 py-2 text-sm w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
                value={filterYear}
                onChange={handleFilterChange}
              >
                <option value="all">Todos</option>
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Products list */}
        <div className="mt-6 bg-white border border-brand-border rounded p-3 sm:p-4 pt-6 border-t-4 border-t-brand-primary">
          {error ? (
            <div className="text-center py-8" role="alert">
              <p className="text-red-600 mb-4">❌ {error}</p>
              <button
                type="button"
                onClick={() => setError(null)}
                className="bg-brand-primary hover:opacity-90 text-white px-4 py-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
              >
                Tentar novamente
              </button>
            </div>
          ) : loading ? (
            <div className="space-y-4 animate-pulse" role="status">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="flex flex-col sm:flex-row items-start gap-3 sm:gap-6 py-4 sm:py-6 border-b border-brand-border"
                >
                  <div className="w-14 sm:w-20 h-12 bg-brand-bg rounded"></div>
                  <div className="flex-1 space-y-3">
                    <div className="h-4 bg-brand-bg rounded w-3/4"></div>
                    <div className="h-3 bg-brand-bg rounded w-1/2"></div>
                    <div className="h-3 bg-brand-bg rounded w-2/3"></div>
                  </div>
                  <div className="w-10 h-10 bg-brand-bg rounded-full"></div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <p className="text-center py-8 text-brand-text" role="status">
              Nenhum produto encontrado com os filtros selecionados.
            </p>
          ) : (
            <>
              <div
                className="mb-4 text-sm text-brand-text"
                role="status"
                aria-live="polite"
              >
                Mostrando {start + 1}-{Math.min(end, filtered.length)} de{" "}
                {filtered.length} produtos
              </div>

              <ul className="space-y-4" role="list">
                {pageItems.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex flex-col sm:flex-row items-start gap-3 sm:gap-6 py-4 sm:py-6 border-b border-brand-border last:border-b-0"
                    role="article"
                  >
                    <div
                      className="w-14 sm:w-20 text-right shrink-0"
                      aria-label="Ano de publicação"
                    >
                      <div className="text-lg sm:text-2xl font-bold">
                        {item.year}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-xs sm:text-base text-brand-text line-clamp-2">
                        {item.title}
                      </h3>

                      <dl className="mt-3 space-y-2 pt-3 border-t border-brand-border">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                          <div className="flex gap-2">
                            <dt className="text-sm font-semibold text-brand-text whitespace-nowrap">
                              Tipo:
                            </dt>
                            <dd className="text-sm text-brand-text">
                              {item.type}
                            </dd>
                          </div>
                          <div className="flex gap-2">
                            <dt className="text-sm font-semibold text-brand-text whitespace-nowrap">
                              Projeto:
                            </dt>
                            <dd className="text-sm text-brand-text">
                              {renderProjectText(item.project, filterProject)}
                            </dd>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                          <div className="flex gap-2">
                            <dt className="text-sm font-semibold text-brand-text whitespace-nowrap">
                              Onde foi publicado:
                            </dt>
                            <dd className="text-sm text-brand-text">
                              {item.publishedAt}
                            </dd>
                          </div>
                          <div className="flex gap-2">
                            <dt className="text-sm font-semibold text-brand-text whitespace-nowrap">
                              Programa:
                            </dt>
                            <dd className="text-sm text-brand-text">
                              {item.program}
                            </dd>
                          </div>
                        </div>
                      </dl>
                    </div>

                    <div className="shrink-0 flex items-center">
                      <button
                        type="button"
                        aria-label={`Ver detalhes de ${item.title}`}
                        className="bg-brand-primary text-white rounded-full w-10 h-10 flex items-center justify-center text-base hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
                      >
                        ›
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              {totalPages > 1 && (
                <div className="mt-6 flex items-center justify-between border-t border-brand-border pt-4">
                  <button
                    type="button"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="text-brand-text hover:text-brand-primary text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded"
                    aria-label="Página anterior"
                  >
                    ‹ Anterior
                  </button>
                  <span className="text-sm text-brand-text" role="status">
                    Página {page} de {totalPages}
                  </span>
                  <button
                    type="button"
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={!hasNext}
                    className="text-brand-text hover:text-brand-primary text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded"
                    aria-label="Próxima página"
                  >
                    Próxima página ›
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
