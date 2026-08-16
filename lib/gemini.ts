// lib/gemini.ts — Gemini model configuration with automatic fallback

import { GoogleGenAI } from "@google/genai";

export const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

// ─── Fallback model chain ─────────────────────────────────────────────────────
// If the primary model is overloaded (429/503), we try the next one in the list.

export const GEMINI_MODELS = [
  "gemini-3.5-flash",
  "gemini-3.6-flash",
  "gemini-3.7-flash",
] as const;

export type GeminiModel = (typeof GEMINI_MODELS)[number];

// ─── Retry-with-fallback helper ───────────────────────────────────────────────
// Tries each model in order. If a model fails with 429 (rate limit) or 503
// (overloaded), it moves to the next model. Other errors are thrown immediately.

function isOverloadedError(err: unknown): boolean {
  if (!(err instanceof Error)) return false;
  const msg = err.message?.toLowerCase() ?? "";
  const status = (err as any).status as number | undefined;
  const code = (err as any).code as number | undefined;
  const httpCode = status ?? code ?? 0;

  return (
    httpCode === 429 ||
    httpCode === 503 ||
    msg.includes("overloaded") ||
    msg.includes("resource exhausted") ||
    msg.includes("rate limit") ||
    msg.includes("too many requests") ||
    msg.includes("503") ||
    msg.includes("429") ||
    msg.includes("capacity")
  );
}

interface GenerateStreamOptions {
  contents: any;
  config: Record<string, unknown>;
  onModelSwitch?: (fromModel: string, toModel: string, reason: string) => void;
}

export async function generateWithFallback({
  contents,
  config,
  onModelSwitch,
}: GenerateStreamOptions) {
  let lastError: unknown;

  for (let i = 0; i < GEMINI_MODELS.length; i++) {
    const model = GEMINI_MODELS[i];
    try {
      const stream = await ai.models.generateContentStream({
        model,
        contents,
        config,
      });
      return { stream, model };
    } catch (err) {
      lastError = err;
      const errMsg = err instanceof Error ? err.message : String(err);

      if (isOverloadedError(err) && i < GEMINI_MODELS.length - 1) {
        const nextModel = GEMINI_MODELS[i + 1];
        console.warn(
          `[gemini] ${model} overloaded (${errMsg}), switching to ${nextModel}`
        );
        onModelSwitch?.(model, nextModel, errMsg);
        continue; // try next model
      }

      // Not an overload error, or we've exhausted all models — throw
      throw err;
    }
  }

  // Should never reach here, but just in case
  throw lastError;
}
