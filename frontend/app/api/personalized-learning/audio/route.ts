// app/api/personalized-learning/audio/route.ts
//
// Thin proxy to the Python AI Brain for text-to-speech synthesis.
// Returns raw MP3 audio bytes from OpenAI TTS via the Python backend.
// Forwards the user's auth token for subscriber gating.

const PYTHON_BACKEND = process.env.PYTHON_BACKEND_URL || "http://localhost:8000";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const authHeader = req.headers.get("Authorization") || "Bearer dev";

  try {
    const upstream = await fetch(
      `${PYTHON_BACKEND}/api/personalized-learning/tts`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
        },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(30_000),
      }
    );

    if (!upstream.ok) {
      const detail = await upstream.text();
      console.error("TTS backend error:", upstream.status, detail);
      return Response.json({ error: "TTS generation failed" }, { status: upstream.status });
    }

    const audioBuffer = await upstream.arrayBuffer();
    return new Response(audioBuffer, {
      headers: { "Content-Type": "audio/mpeg" },
    });
  } catch (error) {
    console.error("TTS proxy error:", error);
    return Response.json(
      { error: "Cannot reach the AI backend. Ensure it is running on port 8000." },
      { status: 503 }
    );
  }
}
