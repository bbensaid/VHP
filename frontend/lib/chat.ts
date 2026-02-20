export interface ChatRequestOptions {
  message: string;
  temperature: number;
  systemPrompt: string;
  signal?: AbortSignal;
  onConnect?: () => void;
  onUpdate: (fullText: string) => void;
}

export async function streamChatResponse({
  message,
  temperature,
  systemPrompt,
  signal,
  onConnect,
  onUpdate,
}: ChatRequestOptions): Promise<void> {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, temperature, systemPrompt }),
    signal,
  });

  if (!res.ok || !res.body) {
    throw new Error(res.statusText || "Failed to fetch response");
  }

  // Connection established successfully
  if (onConnect) onConnect();

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let aiText = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const text = decoder.decode(value, { stream: true });
    aiText += text;
    onUpdate(aiText);
  }
}