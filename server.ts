import express from "express";
import cors from "cors";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3015;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "../dist")));

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";

async function callGemini(prompt: string): Promise<string> {
  if (!GEMINI_API_KEY) {
    return "API key de Gemini no configurada.";
  }

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    }
  );

  const data = await res.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sin respuesta de Gemini.";
}

app.post("/api/search", async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) {
      res.status(400).json({ error: "query required" });
      return;
    }

    const prompt = `Eres un analista OSINT especializado en corrupción en España. 
Investiga y responde sobre: "${query}".

Responde con un JSON válido con esta estructura:
{
  "query": "${query}",
  "timestamp": "${new Date().toISOString()}",
  "summary": "Resumen detallado de la investigación...",
  "integrityScore": 75,
  "detectedActors": ["actor1", "actor2"],
  "detectedParties": ["PP", "PSOE"],
  "keyTopics": ["tema1", "tema2"],
  "sources": [{"title": "Fuente 1", "uri": "url"}]
}

Solo devuelve el JSON, sin texto adicional.`;

    const text = await callGemini(prompt);

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      res.json(parsed);
    } else {
      res.json({
        query,
        timestamp: new Date().toISOString(),
        summary: text,
        integrityScore: 50,
        detectedActors: [],
        detectedParties: [],
        keyTopics: [],
        sources: []
      });
    }
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

app.post("/api/case-update", async (req, res) => {
  try {
    const { caseId, caseName } = req.body;
    if (!caseId || !caseName) {
      res.status(400).json({ error: "caseId and caseName required" });
      return;
    }

    const prompt = `Eres un analista OSINT. Busca información reciente sobre el caso "${caseName}" (ID: ${caseId}) en España.

Responde con un JSON válido:
{
  "caseId": "${caseId}",
  "caseName": "${caseName}",
  "timestamp": "${new Date().toISOString()}",
  "analysis": "Análisis de la situación actual del caso...",
  "sources": [{"title": "Fuente", "uri": "url"}]
}

Solo devuelve el JSON.`;

    const text = await callGemini(prompt);

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      res.json(JSON.parse(jsonMatch[0]));
    } else {
      res.json({
        caseId,
        caseName,
        timestamp: new Date().toISOString(),
        analysis: text,
        sources: []
      });
    }
  } catch (err) {
    console.error("Case update error:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`Corrupción España server running on port ${PORT}`);
});
