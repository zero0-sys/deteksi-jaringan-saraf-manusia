// File: netlify/functions/tanyaGroq.js

export const handler = async (event, context) => {
  // Hanya izinkan method POST dari frontend
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    // Mengambil pesan yang dikirim dari frontend
    const body = JSON.parse(event.body);
    const pesanUser = body.prompt;

    // Memanggil API Key yang ada di Environment Variables Netlify
    const apiKey = process.env.GROQ_API_KEY; 
    
    if (!apiKey) {
      return { 
        statusCode: 500, 
        body: JSON.stringify({ error: "API Key GROQ_API_KEY tidak ditemukan di backend Netlify." }) 
      };
    }

    // Model yang request
    const model = "llama-3.3-70b-versatile"; 
    const url = `https://api.groq.com/openai/v1/chat/completions`;

    const promptText = `Analisis teks keluh kesah berikut.
Tentukan tingkat kekacauan pikiran (0-100).
Buat 15 pesan log sistem (kode error jika kacau, atau kode success jika bahagia) dalam bahasa Indonesia yang SANGAT SPESIFIK dengan isi teks pengguna. 
Gunakan format log terminal (misal: "ERR_FINANCE: Saldo tidak mencukupi untuk harapan" atau "SYS_LOVE: Koneksi hati terjalin kuat").

Selain itu, buatkan 'analysisText' (teks paragraf) berdasarkan aturan berikut:
JIKA tingkat kekacauan > 50: Berikan saran pengobatan, sebuah quotes penyemangat, dan saran tegas untuk pergi ke psikolog atau bercerita ke teman kepercayaan/orang tua.
JIKA tingkat kekacauan <= 50: Berikan hadiah berupa ramalan masa depan yang positif, apa yang harus dia lakukan ke depannya, dan petunjuk arah kehidupan sesuai dengan cerita yang dia bagikan.

Output HARUS BERBENTUK JSON dengan struktur berikut dan HANYA JSON SAJA (tanpa tag markdown tambahan):
{
  "chaosLevel": (number),
  "systemMessages": ["string", "string"],
  "analysisText": "string"
}

Teks: "${pesanUser}"`;

    // Nembak ke API Groq
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: model,
        messages: [
          { role: "system", content: "You are a helpful assistant that only outputs valid JSON." },
          { role: "user", content: promptText }
        ],
        response_format: { type: "json_object" }
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      return { 
        statusCode: response.status, 
        body: JSON.stringify({ error: data.error?.message || "Error dari server Groq" }) 
      };
    }

    // Mengambil output tipe JSON yang di-generate oleh Groq
    const jsonString = data.choices[0].message.content;
    const parsedData = JSON.parse(jsonString);

    // Mengembalikan hasil jawaban Groq berbentuk JSON ke frontend
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsedData)
    };

  } catch (error) {
    console.error("Function error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "FATAL: Gagal memproses fungsi backend API." })
    };
  }
};
