export default function CommunityAccess() {
  const linkGrupo =
    "https://chat.whatsapp.com/H8V7a8V8MYOJjVtFW0IkiT?s=cl&p=a&mlu=4&ilr=4";

  return (
    <div className="min-h-screen bg-brand-bg text-white flex items-center justify-center px-4">
      <div className="w-full max-w-xl text-center bg-brand-bar border border-gray-700 rounded-2xl p-8">
        <p className="text-sm tracking-[0.25em] uppercase text-blue-400 mb-4">
          Comunidade UTI na Real
        </p>

        <h1 className="text-3xl sm:text-4xl font-bold">
          Seu acesso está pronto
        </h1>

        <p className="mt-4 text-gray-200 text-lg leading-relaxed">
          Clique no botão abaixo para acessar o grupo da Comunidade UTI na Real
          no WhatsApp.
        </p>

        <a
          href={linkGrupo}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500"
        >
          Entrar no grupo do WhatsApp
        </a>
      </div>
    </div>
  );
}
