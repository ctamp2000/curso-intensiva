export default function Obrigado() {
  return (
    <main className="min-h-screen bg-brand-bg text-brand-text flex items-center justify-center px-5">
      <section className="w-full max-w-3xl text-center">
        <p className="text-sm tracking-[0.22em] uppercase text-blue-400 mb-4">
          UTI na Real
        </p>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
          Cadastro realizado com sucesso!
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-gray-300 leading-relaxed">
          Obrigado por fazer parte da Comunidade UTI na Real.
        </p>

        <div className="mt-10 bg-brand-bar border border-gray-600 rounded-2xl p-7 sm:p-9">
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Agora, confira seu WhatsApp
          </h2>

          <p className="mt-4 text-gray-300 text-base sm:text-lg leading-relaxed">
            Enviamos para o WhatsApp informado no cadastro o link para entrar na
            Comunidade UTI na Real.
          </p>
        </div>
      </section>
    </main>
  );
}
