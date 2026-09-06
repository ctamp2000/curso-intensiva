export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      erro: "Método não permitido.",
    });
  }

  const {
    nome,
    sobrenome,
    email,
    whatsapp,
    profissao,
    especialidade,
    consentimento,
  } = req.body || {};

  if (!process.env.MANYCHAT_API_KEY) {
    return res.status(500).json({
      erro: "Configuração da API do Manychat não encontrada.",
    });
  }

  if (
    !nome ||
    !sobrenome ||
    !email ||
    !whatsapp ||
    !profissao ||
    !consentimento
  ) {
    return res.status(400).json({
      erro: "Dados obrigatórios não informados.",
    });
  }

  let whatsappNumeros = whatsapp.replace(/\D/g, "");

  // Remove zero antes do DDD
  if (whatsappNumeros.startsWith("0")) {
    whatsappNumeros = whatsappNumeros.substring(1);
  }

  // Remove o 55 se já tiver vindo do formulário
  if (whatsappNumeros.startsWith("55") && whatsappNumeros.length === 13) {
    whatsappNumeros = whatsappNumeros.substring(2);
  }

  const phoneManychat = `+55${whatsappNumeros}`;

  try {
    const respostaManychat = await fetch(
      "https://api.manychat.com/fb/subscriber/createSubscriber",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.MANYCHAT_API_KEY}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          first_name: nome,
          last_name: sobrenome,
          whatsapp_phone: phoneManychat,
          has_opt_in_sms: false,
          has_opt_in_email: false,
          consent_phrase:
            "Concordo em receber pelo WhatsApp o link de acesso à Comunidade UTI na Real e comunicações relacionadas à comunidade.",
        }),
      },
    );

    const resultadoManychat = await respostaManychat.json();
    console.log(
      "Resposta createSubscriber:",
      JSON.stringify(resultadoManychat, null, 2),
    );

    if (!respostaManychat.ok) {
      console.error(
        "Erro Manychat:",
        JSON.stringify(resultadoManychat, null, 2),
      );
      return res.status(502).json({
        erro: "Não foi possível criar o contato no Manychat.",
        detalhe: resultadoManychat,
      });
    }

    const subscriberId = resultadoManychat.data.id;

    const respostaTag = await fetch(
      "https://api.manychat.com/fb/subscriber/addTagByName",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.MANYCHAT_API_KEY}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          subscriber_id: subscriberId,
          tag_name: "Comunidade",
        }),
      },
    );

    const resultadoTag = await respostaTag.json();

    if (!respostaTag.ok) {
      console.error(
        "Erro ao aplicar tag no Manychat:",
        JSON.stringify(resultadoTag, null, 2),
      );

      return res.status(502).json({
        erro: "Contato criado, mas não foi possível aplicar a tag Comunidade.",
        detalhe: resultadoTag,
      });
    }

    return res.status(200).json({
      sucesso: true,
      contatoManychat: resultadoManychat,
      dadosRecebidos: {
        nome,
        sobrenome,
        email,
        whatsapp,
        profissao,
        especialidade,
        consentimento,
      },
    });
  } catch (erro) {
    console.error("Erro ao acessar Manychat:", erro);

    return res.status(500).json({
      erro: "Erro interno ao processar o cadastro.",
    });
  }
}
