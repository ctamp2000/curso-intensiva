export default function Obrigado() {
  return (
    <main className="min-h-screen bg-brand-bg text-brand-text px-5 py-16">
      <section className="w-full max-w-4xl mx-auto text-center">
        <p className="text-sm tracking-[0.22em] uppercase text-[#C8A24F] mb-4">
          UTI na Real
        </p>

        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
          Cadastro realizado com sucesso!
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-gray-300 leading-relaxed">
          Obrigado por fazer parte da Comunidade UTI na Real.
        </p>

        <div className="mt-10 bg-[#121212] border border-[#C8A24F]/40 rounded-2xl p-7 sm:p-9">
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Agora, confira seu WhatsApp
          </h2>

          <p className="mt-4 text-gray-300 text-base sm:text-lg leading-relaxed">
            Enviamos para o WhatsApp informado no cadastro o link para entrar na
            Comunidade UTI na Real.
          </p>
        </div>

        <div className="mt-16 border-t border-[#C8A24F]/30 pt-12">
          <p className="text-sm tracking-[0.22em] uppercase text-[#C8A24F] mb-4">
            Próximo passo natural
          </p>

          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
            Quando você quiser ir mais fundo
          </h2>

          <p className="mt-4 max-w-2xl mx-auto text-gray-300 text-base sm:text-lg leading-relaxed">
            Para quem decide estruturar o aprendizado de forma completa, existe
            uma formação aprofundada em UTI. Sem pressa: fique na comunidade
            gratuita e, se fizer sentido para o seu momento, você fica sabendo
            por lá.
          </p>
        </div>
      </section>
    </main>
  );
}
