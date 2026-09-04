export default function handler(req, res) {
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

  return res.status(200).json({
    sucesso: true,
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
}
