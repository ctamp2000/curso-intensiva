import { google } from "googleapis";

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  },
  scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
});
export default async function handler(req, res) {
  try {
    const sheets = google.sheets({
      version: "v4",
      auth,
    });

    const resposta = await sheets.spreadsheets.values.get({
      spreadsheetId: "13pGtZ_fYawg1olLQoGH6zT0BstCvzProuKWGOL4pyno",
      range: "DestaqueSite!A2:D2",
    });

    const [categoria, titulo, resumo, data] = resposta.data.values[0];

    res.status(200).json({
      sucesso: true,
      conteudo: {
        categoria,
        titulo,
        resumo,
        data,
      },
    });
  } catch (erro) {
    console.error("Erro ao buscar conteúdo:", erro);

    res.status(500).json({
      sucesso: false,
      erro: "Não foi possível buscar o conteúdo.",
    });
  }
}
