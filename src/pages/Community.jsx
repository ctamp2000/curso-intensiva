export default function Community() {
  return (
    <div className="min-h-screen bg-brand-bg text-white">
      <main id="main-content" className="px-4 sm:px-6 md:px-8 py-6 md:py-7">
        <section className="w-full max-w-5xl mx-auto">
          <div className="text-center">
            <p className="text-sm tracking-[0.25em] uppercase text-blue-400 mb-4">
              Comunidade UTI na Real
            </p>

            <h1 className="text-3xl sm:text-4xl md:text-[2.5rem] font-bold leading-tight max-w-5xl mx-auto">
              Entre para a comunidade de médicos que assumem o plantão crítico
              com postura de especialista
            </h1>

            <p className="mt-4 text-base sm:text-lg text-gray-200 max-w-3xl mx-auto">
              Discussões reais de plantão, organização do raciocínio sob pressão
              e o método UTI na Real — sem julgamento, sem enrolação.
            </p>
          </div>

          <div className="mt-5 max-w-3xl mx-auto text-center">
            <p className="text-sm tracking-[0.2em] uppercase text-blue-400 mb-2">
              Ao entrar
            </p>

            <p className="text-base sm:text-lg text-gray-100 leading-relaxed">
              Você passa a fazer parte de um grupo de profissionais que
              discutem, na real, o que ninguém ensina na formação: como
              organizar o raciocínio quando tudo acontece ao mesmo tempo.
            </p>
          </div>

          <form className="mt-6 max-w-4xl mx-auto bg-brand-bar border border-gray-700 rounded-2xl p-5 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
              <div className="md:col-span-2">
                <label
                  htmlFor="nome"
                  className="block text-sm font-medium text-gray-200 mb-2"
                >
                  Nome
                </label>
                <input
                  id="nome"
                  name="nome"
                  type="text"
                  placeholder="Digite seu nome"
                  className="w-full rounded-lg bg-brand-bg border border-gray-600 px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="md:col-span-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-200 mb-2"
                >
                  E-mail
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Digite seu e-mail"
                  className="w-full rounded-lg bg-brand-bg border border-gray-600 px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="md:col-span-2">
                <label
                  htmlFor="whatsapp"
                  className="block text-sm font-medium text-gray-200 mb-2"
                >
                  WhatsApp
                </label>
                <input
                  id="whatsapp"
                  name="whatsapp"
                  type="tel"
                  placeholder="Ex.: (71) 99999-9999"
                  className="w-full rounded-lg bg-brand-bg border border-gray-600 px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="md:col-span-3">
                <label
                  htmlFor="profissao"
                  className="block text-sm font-medium text-gray-200 mb-2"
                >
                  Profissão
                </label>
                <input
                  id="profissao"
                  name="profissao"
                  type="text"
                  placeholder="Ex.: Médico"
                  className="w-full rounded-lg bg-brand-bg border border-gray-600 px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="md:col-span-3">
                <label
                  htmlFor="especialidade"
                  className="block text-sm font-medium text-gray-200 mb-2"
                >
                  Especialidade{" "}
                  <span className="text-gray-400 font-normal">(opcional)</span>
                </label>
                <input
                  id="especialidade"
                  name="especialidade"
                  type="text"
                  placeholder="Ex.: Medicina Intensiva"
                  className="w-full rounded-lg bg-brand-bg border border-gray-600 px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>
            <label className="mt-4 flex items-start gap-3 text-sm text-gray-300 leading-relaxed cursor-pointer">
              <input
                id="consentimento"
                name="consentimento"
                type="checkbox"
                className="mt-1 h-4 w-4 shrink-0"
              />
              <span>
                Concordo em receber pelo WhatsApp o link de acesso à Comunidade
                UTI na Real e comunicações relacionadas à comunidade.
              </span>
            </label>
            <div className="mt-4 flex justify-center">
              <button
                type="button"
                className="bg-brand-primary text-white font-semibold py-2.5 px-10 rounded-xl hover:opacity-90 transition"
              >
                Quero entrar na comunidade
              </button>
            </div>{" "}
          </form>

          <p className="mt-4 text-xs sm:text-sm text-gray-400 text-center">
            Comunidade gratuita. Sem spam. Seus dados não são compartilhados.
          </p>
        </section>
      </main>
    </div>
  );
}
