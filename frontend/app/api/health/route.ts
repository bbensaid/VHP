// app/api/health/route.ts
// Proxies the Python backend /health endpoint so the browser can check it
// without CORS issues. Returns { ok: boolean, indexReady: boolean }.

const PYTHON_BACKEND = process.env.PYTHON_BACKEND_URL || "http://localhost:8000";

export async function GET() {
  try {
    const res = await fetch(`${PYTHON_BACKEND}/health`, {
      next: { revalidate: 0 }, // always fresh
    });
    if (!res.ok) {
      return Response.json({ ok: false, indexReady: false }, { status: 200 });
    }
    const data = await res.json();
    return Response.json({ ok: true, indexReady: data.index_ready ?? false });
  } catch {
    return Response.json({ ok: false, indexReady: false }, { status: 200 });
  }
}
