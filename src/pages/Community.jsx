import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Community() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    whatsapp: "",
    profissao: "",
    consentimento: false,
  });
  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [conteudoDestaque, setConteudoDestaque] = useState(null);
  useEffect(() => {
    fetch("/api/conteudo")
      .then((resposta) => resposta.json())
      .then((dados) => {
        if (dados.sucesso) {
          setConteudoDestaque(dados.conteudo);
        }
      })
      .catch((erro) => {
        console.error("Erro ao buscar conteúdo de destaque:", erro);
      });
  }, []);

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

  async function handleSubmit(event) {
    event.preventDefault();
    setEnviando(true);

    const nome = formData.nome.trim();
    const email = formData.email.trim();
    const profissao = formData.profissao.trim();

    // Letras, acentos, espaços, hífen e apóstrofo
    const regexNome = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]{2,}$/;

    // Texto profissional: letras, acentos, espaços, hífen, barra, ponto e parênteses
    const regexTexto = /^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s.'’()/-]{2,}$/;

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regexNome.test(nome)) {
      setTipoMensagem("erro");
      setMensagem(
        "Informe um nome completo válido. Use apenas letras, espaços, hífen ou apóstrofo.",
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

    const profissoesValidas = [
      "Médico generalista",
      "Médico especialista",
      "Médico residente",
      "Estudante de medicina",
      "Fisioterapeuta",
      "Psicólogo",
      "Enfermeiro",
      "Outros",
    ];

    if (!profissoesValidas.includes(profissao)) {
      setTipoMensagem("erro");
      setEnviando(false);
      setMensagem("Selecione uma profissão.");
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
    const dadosCadastro = {
      nome: formData.nome.trim(),
      email: formData.email.trim(),
      whatsapp: whatsappNormalizado,
      profissao: formData.profissao.trim(),
      consentimento: formData.consentimento,
    };

    try {
      const resposta = await fetch("/api/cadastro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dadosCadastro),
      });

      const resultado = await resposta.json();

      if (!resposta.ok || !resultado.sucesso) {
        throw new Error(
          resultado.erro || "Não foi possível enviar o cadastro.",
        );
      }

      setFormData((prev) => ({
        ...prev,
        ...dadosCadastro,
      }));

      console.log("Resposta da API:", resultado);

      if (window.fbq) {
        window.fbq("track", "Lead");
      }

      navigate("/obrigado");
    } catch (erro) {
      console.error("Erro ao enviar cadastro:", erro);

      setTipoMensagem("erro");
      setMensagem(
        erro.message || "Não foi possível enviar o cadastro. Tente novamente.",
      );
    } finally {
      setEnviando(false);
    }
  }
  return (
    <div className="min-h-screen bg-brand-bg text-white">
      <main id="main-content" className="px-4 sm:px-6 md:px-8 py-6 md:py-7">
        <section className="w-full max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            {/* LADO ESQUERDO — apresentação da comunidade */}
            <div className="text-center lg:text-left">
              <p className="text-sm tracking-[0.25em] uppercase text-[#C8A24F] mb-4">
                {" "}
                Comunidade UTI na Real
              </p>

              <h1 className="font-display text-[1.75rem] sm:text-4xl md:text-[2.7rem] font-bold leading-tight">
                O plantão de UTI não precisa ser um campo de batalha solitário.
              </h1>

              <p className="mt-5 text-base sm:text-lg text-gray-200 leading-relaxed">
                Uma comunidade para estudantes e profissionais de saúde que
                querem entender melhor a terapia intensiva, discutir situações
                reais de plantão e organizar o raciocínio com mais segurança.
              </p>

              <div className="mt-6">
                <a
                  href="#cadastro"
                  className="inline-block rounded-lg bg-[#C8A24F] px-7 py-3 font-semibold text-black transition hover:bg-[#D6B45F]"
                >
                  Quero fazer parte da comunidade
                </a>
              </div>
            </div>

            {/* LADO DIREITO — assunto recente da comunidade */}
            <div className="bg-[#111111] border border-[#C8A24F]/40 rounded-2xl p-6 sm:p-7">
              {" "}
              <p className="text-xs tracking-[0.22em] uppercase text-[#C8A24F] mb-3">
                {" "}
                O que está rolando na comunidade
              </p>
              <div className="flex justify-between items-center gap-4 mb-2">
                <p className="text-sm text-gray-400 mb-2">
                  {conteudoDestaque?.categoria || "Em discussão na comunidade"}
                  {conteudoDestaque?.data && <> — {conteudoDestaque.data}</>}
                </p>
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-white leading-snug">
                {conteudoDestaque?.titulo ||
                  "Choque: como diferenciar séptico de hipovolêmico à beira do leito, sem decoreba."}
              </h2>
              <p className="mt-4 text-gray-300 leading-relaxed">
                {conteudoDestaque?.resumo ||
                  "Discussões práticas, dúvidas e raciocínio aplicado ao plantão."}
              </p>
            </div>
          </div>

          {/* O QUE VOCÊ ENCONTRA NA COMUNIDADE */}
          <section className="mt-14 border-t border-[#C8A24F]/30 pt-10">
            {" "}
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-8">
              O que você encontra na comunidade
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#C8A24F] text-[#C8A24F] font-semibold">
                  {" "}
                  1
                </span>
                <div>
                  <h3 className="font-semibold text-white">
                    Conteúdos curtos toda semana
                  </h3>
                  <p className="mt-1 text-gray-300">
                    Explicações diretas ao ponto, pensadas para quem tem pouco
                    tempo.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#C8A24F] text-[#C8A24F] font-semibold">
                  {" "}
                  2
                </span>
                <div>
                  <h3 className="font-semibold text-white">
                    Suas dúvidas respondidas
                  </h3>
                  <p className="mt-1 text-gray-300">
                    Pergunte sem medo e receba respostas em linguagem acessível.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#C8A24F] text-[#C8A24F] font-semibold">
                  {" "}
                  3
                </span>
                <div>
                  <h3 className="font-semibold text-white">
                    Casos reais comentados
                  </h3>
                  <p className="mt-1 text-gray-300">
                    Situações do plantão discutidas passo a passo, com
                    raciocínio em voz alta.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#C8A24F] text-[#C8A24F] font-semibold">
                  {" "}
                  4
                </span>
                <div>
                  <h3 className="font-semibold text-white">
                    Materiais de apoio
                  </h3>
                  <p className="mt-1 text-gray-300">
                    Resumos e checklists práticos para consultar na hora que
                    importa.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#C8A24F] text-[#C8A24F] font-semibold">
                  {" "}
                  5
                </span>
                <div>
                  <h3 className="font-semibold text-white">
                    Uma rede de colegas
                  </h3>
                  <p className="mt-1 text-gray-300">
                    Pessoas que vivem os mesmos desafios e caminham na mesma
                    direção.
                  </p>
                </div>
              </div>
            </div>
          </section>
          <div className="mt-10 text-center">
            <a
              href="#cadastro"
              className="inline-flex items-center justify-center rounded-xl bg-[#C8A24F] px-6 py-3 font-semibold text-black hover:bg-[#D6B45F] transition"
            >
              Quero fazer parte da comunidade
            </a>
          </div>
          {/* PARA QUEM É */}
          <section className="mt-14 border-t border-[#C8A24F]/30 pt-10">
            {" "}
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-8">
              Para quem é
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* 01 */}
              <div className="bg-[#111111] border border-[#C8A24F]/40 rounded-2xl p-6">
                {" "}
                <span className="text-[#C8A24F] font-semibold">01</span>{" "}
                <h3 className="mt-4 text-lg font-semibold text-white">
                  Estudantes de saúde
                </h3>
                <p className="mt-2 text-gray-300 leading-relaxed">
                  Medicina, enfermagem, fisioterapia, farmácia e equipe
                  multidisciplinar querendo entender UTI antes do primeiro
                  plantão.
                </p>
              </div>

              {/* 02 */}
              <div className="bg-[#111111] border border-[#C8A24F]/40 rounded-2xl p-6">
                {" "}
                <span className="text-[#C8A24F] font-semibold">02</span>{" "}
                <h3 className="mt-4 text-lg font-semibold text-white">
                  Residentes e recém-formados
                </h3>
                <p className="mt-2 text-gray-300 leading-relaxed">
                  Quem está começando e precisa de um segundo olhar confiável
                  para as dúvidas do dia.
                </p>
              </div>

              {/* 03 */}
              <div className="bg-[#111111] border border-[#C8A24F]/40 rounded-2xl p-6">
                {" "}
                <span className="text-[#C8A24F] font-semibold">03</span>{" "}
                <h3 className="mt-4 text-lg font-semibold text-white">
                  Quem já atua em UTI
                </h3>
                <p className="mt-2 text-gray-300 leading-relaxed">
                  Profissionais que querem revisar condutas e trocar
                  experiências com colegas.
                </p>
              </div>

              {/* 04 */}
              <div className="bg-[#111111] border border-[#C8A24F]/40 rounded-2xl p-6">
                {" "}
                <span className="text-[#C8A24F] font-semibold">04</span>{" "}
                <h3 className="mt-4 text-lg font-semibold text-white">
                  Quem se sente sozinho no plantão
                </h3>
                <p className="mt-2 text-gray-300 leading-relaxed">
                  Se a UTI ainda parece um território hostil, este é um espaço
                  para caminhar acompanhado.
                </p>
              </div>
            </div>
          </section>
          <div className="mt-10 text-center">
            <a
              href="#cadastro"
              className="inline-flex items-center justify-center rounded-xl bg-[#C8A24F] px-6 py-3 font-semibold text-black hover:bg-[#D6B45F] transition"
            >
              Quero fazer parte da comunidade
            </a>
          </div>
          {/* QUEM CONDUZ A COMUNIDADE */}
          <section className="mt-14 border-t border-[#C8A24F]/30 pt-10">
            {" "}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
              {/* Espaço reservado para a foto */}
              <div className="md:col-span-2">
                <img
                  src="/bruno-badaro.jpeg"
                  alt="Dr. Bruno Badaró"
                  className="w-full h-80 sm:h-96 md:h-[420px] rounded-2xl object-cover object-top border border-gray-600"
                />
              </div>

              {/* Apresentação */}
              <div className="md:col-span-3">
                <p className="text-sm tracking-[0.22em] uppercase text-[#C8A24F] mb-3">
                  {" "}
                  Quem conduz a comunidade
                </p>

                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  Dr. Bruno Badaró
                </h2>
                <p className="mt-2 text-sm sm:text-base text-[#C8A24F] font-medium">
                  {" "}
                  CRM-BA 21652 · RQE 16154
                </p>

                <p className="mt-5 text-gray-300 text-base sm:text-lg leading-relaxed">
                  Sou intensivista formado pela UFBA em Janeiro de 2010 e,
                  durante todo esse tempo, adquiri experiências como
                  plantonista, diarista e coordenador de UTI. Nesse tempo, vi
                  médicos brilhantes travarem no plantão. Não por falta de
                  conteúdo, mas por falta de um sistema para organizar o
                  raciocínio sob pressão.
                </p>

                <p className="mt-4 text-gray-300 text-base sm:text-lg leading-relaxed">
                  Criei o UTI na Real para traduzir a terapia intensiva em
                  método prático. O roteiro que uso na beira do leito, pronto
                  para o seu próximo plantão.
                </p>
              </div>
            </div>
          </section>

          {/* COMO FUNCIONA */}
          <section className="mt-14 border-t border-[#C8A24F]/30 pt-10">
            {" "}
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-8">
              Como funciona
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* 1 */}
              <div className="bg-[#111111] border border-[#C8A24F]/40 rounded-2xl p-6">
                <span className="text-[#C8A24F] text-2xl font-semibold">1</span>

                <h3 className="mt-4 text-lg font-semibold text-white">
                  Cadastre-se aqui
                </h3>

                <p className="mt-2 text-gray-300 leading-relaxed">
                  Leva menos de um minuto e é totalmente gratuito.
                </p>
              </div>

              {/* 2 */}
              <div className="bg-[#111111] border border-[#C8A24F]/40 rounded-2xl p-6">
                <span className="text-[#C8A24F] text-2xl font-semibold">2</span>

                <h3 className="mt-4 text-lg font-semibold text-white">
                  Receba o convite
                </h3>

                <p className="mt-2 text-gray-300 leading-relaxed">
                  O link do grupo chega no seu WhatsApp.
                </p>
              </div>

              {/* 3 */}
              <div className="bg-[#111111] border border-[#C8A24F]/40 rounded-2xl p-6">
                <span className="text-[#C8A24F] text-2xl font-semibold">3</span>

                <h3 className="mt-4 text-lg font-semibold text-white">
                  Participe no seu ritmo
                </h3>

                <p className="mt-2 text-gray-300 leading-relaxed">
                  Leia, pergunte e aprenda sem pressão.
                </p>
              </div>
            </div>
          </section>

          <div className="mt-14 border-t border-[#C8A24F]/30 pt-10 text-center">
            {" "}
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
              Entre na comunidade
            </h2>
            <p className="mt-3 text-base sm:text-lg text-gray-300">
              Preencha seus dados e receba o convite no seu WhatsApp.
            </p>
          </div>

          <form
            id="cadastro"
            onSubmit={handleSubmit}
            className="mt-6 max-w-4xl mx-auto bg-[#111111] border border-[#C8A24F]/40 rounded-2xl p-5 sm:p-6"
          >
            {" "}
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
              <div className="md:col-span-3">
                <label
                  htmlFor="nome"
                  className="block text-sm font-medium text-gray-200 mb-2"
                >
                  Nome completo
                </label>

                <input
                  id="nome"
                  name="nome"
                  type="text"
                  placeholder="Digite seu nome completo"
                  value={formData.nome}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-brand-bg border border-gray-600 px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#C8A24F]"
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
                  className="w-full rounded-lg bg-brand-bg border border-gray-600 px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#C8A24F]"
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
                  className="w-full rounded-lg bg-brand-bg border border-gray-600 px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#C8A24F]"
                />
              </div>

              <div className="md:col-span-3">
                <label
                  htmlFor="profissao"
                  className="block text-sm font-medium text-gray-200 mb-2"
                >
                  Profissão
                </label>

                <select
                  id="profissao"
                  name="profissao"
                  value={formData.profissao}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-brand-bg border border-gray-600 px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-[#C8A24F]"
                >
                  <option value="">Selecione sua profissão</option>
                  <option value="Médico generalista">Médico generalista</option>
                  <option value="Médico especialista">
                    Médico especialista
                  </option>
                  <option value="Médico residente">Médico residente</option>
                  <option value="Estudante de medicina">
                    Estudante de medicina
                  </option>
                  <option value="Fisioterapeuta">Fisioterapeuta</option>
                  <option value="Psicólogo">Psicólogo</option>
                  <option value="Enfermeiro">Enfermeiro</option>
                  <option value="Outros">Outros</option>
                </select>
              </div>
            </div>
            <label className="mt-4 flex items-start gap-3 text-sm text-gray-300 leading-relaxed cursor-pointer">
              <input
                id="consentimento"
                name="consentimento"
                type="checkbox"
                className="mt-1 h-4 w-4 shrink-0 accent-[#C8A24F]"
                checked={formData.consentimento}
                onChange={handleChange}
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
                className="mt-2 mx-auto block rounded-lg bg-[#C8A24F] px-6 py-2.5 font-semibold text-black transition hover:bg-[#D6B45F] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {enviando ? "Enviando..." : "Enviar cadastro"}
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
        {/* PERGUNTAS FREQUENTES */}
        <section className="mt-14 max-w-6xl mx-auto border-t border-[#C8A24F]/30 pt-10">
          {" "}
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-8">
            Perguntas frequentes
          </h2>
          <div className="space-y-4">
            <details className="group bg-[#111111] border border-[#C8A24F]/50 rounded-2xl">
              <summary className="flex cursor-pointer list-none items-center justify-between p-6 font-semibold text-white">
                A comunidade é mesmo gratuita?
                <span className="text-[#C8A24F] text-2xl transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>

              <p className="px-6 pb-6 text-gray-300 leading-relaxed">
                Sim. A participação na comunidade UTI na Real é gratuita.
              </p>
            </details>

            <details className="group bg-[#111111] border border-[#C8A24F]/50 rounded-2xl">
              <summary className="flex cursor-pointer list-none items-center justify-between p-6 font-semibold text-white">
                Preciso já trabalhar em UTI?
                <span className="text-[#C8A24F] text-2xl transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>

              <p className="px-6 pb-6 text-gray-300 leading-relaxed">
                Não. A comunidade também é voltada para estudantes, residentes,
                recém-formados e profissionais que querem entender melhor a
                terapia intensiva.
              </p>
            </details>

            <details className="group bg-[#111111] border border-[#C8A24F]/50 rounded-2xl">
              <summary className="flex cursor-pointer list-none items-center justify-between p-6 font-semibold text-white">
                Vou receber muitas mensagens ou spam?
                <span className="text-[#C8A24F] text-2xl transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>

              <p className="px-6 pb-6 text-gray-300 leading-relaxed">
                Não. A proposta é manter comunicações relacionadas à comunidade,
                sem envio de spam.
              </p>
            </details>

            <details className="group bg-[#111111] border border-[#C8A24F]/50 rounded-2xl">
              <summary className="flex cursor-pointer list-none items-center justify-between p-6 font-semibold text-white">
                Como recebo o convite?
                <span className="text-[#C8A24F] text-2xl transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>

              <p className="px-6 pb-6 text-gray-300 leading-relaxed">
                Depois de preencher o cadastro, o link de acesso à comunidade é
                enviado para o WhatsApp informado.
              </p>
            </details>
          </div>
        </section>
        {/* CHAMADA FINAL */}
        <section className="mt-14 border-t border-[#C8A24F]/40 pt-12 pb-10 text-center">
          <p className="text-sm tracking-[0.22em] uppercase text-[#C8A24F] mb-4">
            {" "}
            UTI na Real
          </p>

          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white max-w-3xl mx-auto leading-tight">
            Sua jornada na UTI começa com uma conversa.
          </h2>

          <p className="mt-4 text-gray-300 text-base sm:text-lg">
            Entre para a comunidade e participe no seu ritmo.
          </p>

          <div className="mt-7">
            <a
              href="#cadastro"
              className="inline-block rounded-lg bg-[#C8A24F] px-7 py-3 font-semibold text-black transition hover:bg-[#D6B45F]"
            >
              Quero fazer parte da comunidade
            </a>
          </div>
        </section>
        {/* REDES SOCIAIS */}
        <footer className="border-t border-[#C8A24F]/30 py-8 text-center">
          <p className="text-sm tracking-[0.22em] uppercase text-[#C8A24F] mb-4">
            Acompanhe o UTI na Real
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <a
              href="https://www.instagram.com/utinareal/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram do UTI na Real"
              className="flex items-center gap-2 text-gray-300 transition hover:text-[#C8A24F]"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle
                  cx="17.5"
                  cy="6.5"
                  r="1"
                  fill="currentColor"
                  stroke="none"
                />
              </svg>
              Instagram
            </a>

            <a
              href="https://www.youtube.com/@utinareal"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube do UTI na Real"
              className="flex items-center gap-2 text-gray-300 transition hover:text-[#C8A24F]"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <rect x="3" y="5" width="18" height="14" rx="4" />
                <path d="M10 9l5 3-5 3z" fill="currentColor" stroke="none" />
              </svg>
              YouTube
            </a>

            <a
              href="https://www.tiktok.com/@utinareal"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok do UTI na Real"
              className="flex items-center gap-2 text-gray-300 transition hover:text-[#C8A24F]"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M14 4v10.5a4.5 4.5 0 1 1-4-4.47" />
                <path d="M14 4c.7 2.2 2.2 3.7 4.5 4" />
              </svg>
              TikTok
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}
