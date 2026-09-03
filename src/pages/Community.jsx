import { useState } from "react";
export default function Community() {
  const [formData, setFormData] = useState({
    nome: "",
    sobrenome: "",
    email: "",
    whatsapp: "",
    profissao: "",
    especialidade: "",
    consentimento: false,
  });
  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState("");
  const [enviando, setEnviando] = useState(false);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    let novoValor = type === "checkbox" ? checked : value;

    if (name === "whatsapp") {
      novoValor = value.replace(/[^0-9()\-\s]/g, "");
    }
    setFormData((prev) => ({
      ...prev,
      [name]: novoValor,
    }));

    setMensagem("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    setEnviando(true);

    const nome = formData.nome.trim();
    const email = formData.email.trim();
    const profissao = formData.profissao.trim();
    const especialidade = formData.especialidade.trim();

    // Letras, acentos, espaços, hífen e apóstrofo
    const regexNome = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]{2,}$/;

    // Texto profissional: letras, acentos, espaços, hífen, barra, ponto e parênteses
    const regexTexto = /^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s.'’()/-]{2,}$/;

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regexNome.test(nome)) {
      setTipoMensagem("erro");
      setMensagem(
        "Informe um nome válido. Use apenas letras, espaços, hífen ou apóstrofo.",
      );
      setEnviando(false);
      return;
    }

    if (!regexNome.test(formData.sobrenome.trim())) {
      setTipoMensagem("erro");
      setMensagem(
        "Informe um sobrenome válido. Use apenas letras, espaços, hífen ou apóstrofo.",
      );
      setEnviando(false);
      return;
    }

    if (!regexEmail.test(email)) {
      setTipoMensagem("erro");
      setMensagem("Informe um endereço de e-mail válido.");
      setEnviando(false);
      return;
    }

    let whatsapp = formData.whatsapp.replace(/\D/g, "");

    // Remove zero inicial antes do DDD, se existir
    if (whatsapp.startsWith("0")) {
      whatsapp = whatsapp.substring(1);
    }

    // Remove código do país, se a pessoa já tiver digitado 55
    if (whatsapp.startsWith("55") && whatsapp.length === 13) {
      whatsapp = whatsapp.substring(2);
    }

    // Valida DDD + celular com 9 dígitos
    const regexWhatsApp = /^[1-9]{2}9[0-9]{8}$/;

    if (!regexWhatsApp.test(whatsapp)) {
      setTipoMensagem("erro");
      setMensagem("Informe um WhatsApp válido com DDD. Ex.: (71) 98828-7829.");
      setEnviando(false);
      return;
    }

    const whatsappNormalizado = `55${whatsapp}`;
    if (!regexTexto.test(profissao) || !/[A-Za-zÀ-ÖØ-öø-ÿ]/.test(profissao)) {
      setTipoMensagem("erro");
      setEnviando(false);
      setMensagem("Informe uma profissão válida.");
      return;
    }

    if (
      especialidade &&
      (!regexTexto.test(especialidade) ||
        !/[A-Za-zÀ-ÖØ-öø-ÿ]/.test(especialidade))
    ) {
      setTipoMensagem("erro");
      setEnviando(false);
      setMensagem("Informe uma especialidade válida.");
      return;
    }

    if (!formData.consentimento) {
      setTipoMensagem("erro");
      setEnviando(false);
      setMensagem(
        "É necessário autorizar o contato pelo WhatsApp para continuar.",
      );
      return;
    }
    setFormData((prev) => ({
      ...prev,
      whatsapp: whatsappNormalizado,
    }));
    setTipoMensagem("sucesso");
    setMensagem("Cadastro validado com sucesso.");
    setEnviando(false);

    console.log("Dados do formulário:", {
      ...formData,
      nome,
      email,
      whatsapp: whatsappNormalizado,
      profissao,
      especialidade,
    });
  }
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

          <form
            onSubmit={handleSubmit}
            className="mt-6 max-w-4xl mx-auto bg-brand-bar border border-gray-700 rounded-2xl p-5 sm:p-6"
          >
            {" "}
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
              <div className="md:col-span-3">
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
                  value={formData.nome}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-brand-bg border border-gray-600 px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="md:col-span-3">
                <label
                  htmlFor="sobrenome"
                  className="block text-sm font-medium text-gray-200 mb-2"
                >
                  Sobrenome
                </label>

                <input
                  id="sobrenome"
                  name="sobrenome"
                  type="text"
                  placeholder="Digite seu sobrenome"
                  value={formData.sobrenome}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-brand-bg border border-gray-600 px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="md:col-span-3">
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
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg bg-brand-bg border border-gray-600 px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="md:col-span-3">
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
                  value={formData.whatsapp}
                  onChange={handleChange}
                  required
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
                  value={formData.profissao}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg bg-brand-bg border border-gray-600 px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="md:col-span-3">
                <label
                  htmlFor="especialidade"
                  className="block text-sm font-medium text-gray-200 mb-2"
                >
                  Especialidade
                </label>
                <input
                  id="especialidade"
                  name="especialidade"
                  type="text"
                  placeholder="Ex.: Medicina Intensiva"
                  value={formData.especialidade}
                  onChange={handleChange}
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
                checked={formData.consentimento}
                onChange={handleChange}
                required
              />
              <span>
                Concordo em receber pelo WhatsApp o link de acesso à Comunidade
                UTI na Real e comunicações relacionadas à comunidade.
              </span>
            </label>
            <div className="mt-4 flex justify-center">
              <button
                type="submit"
                disabled={enviando}
                className="mt-2 mx-auto block rounded-lg bg-blue-600 px-6 py-2.5 font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {enviando ? "Enviando..." : "Quero entrar na comunidade"}
              </button>
            </div>{" "}
            {mensagem && (
              <div
                role="alert"
                className={`mt-4 rounded-lg px-4 py-3 text-sm text-center border ${
                  tipoMensagem === "sucesso"
                    ? "border-green-400 bg-green-950/40 text-green-200"
                    : "border-red-400 bg-red-950/40 text-red-200"
                }`}
              >
                {mensagem}
              </div>
            )}{" "}
          </form>

          <p className="mt-4 text-xs sm:text-sm text-gray-400 text-center">
            Comunidade gratuita. Sem spam. Seus dados não são compartilhados.
          </p>
        </section>
      </main>
    </div>
  );
}
