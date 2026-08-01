import { NextResponse } from "next/server";
import { auth } from "@/auth";
import type { ApiResponse } from "@/types/post";

const errorResponse = (message: string, status: number) => {
  return NextResponse.json({ success: false, error: message }, { status });
};

const GEMINI_MODEL = "gemini-flash-latest";

type GeneratedDraft = { title: string; content: string; tags: string[] };

export async function POST(request: Request): Promise<NextResponse<ApiResponse<GeneratedDraft>>> {
  const session = await auth();
  if (!session?.user) return errorResponse("Unauthorized", 401);

  if (!process.env.GEMINI_API_KEY) {
    return errorResponse("GEMINI_API_KEY is not configured", 500);
  }

  try {
    const { topic } = await request.json();
    if (!topic || typeof topic !== "string" || !topic.trim()) {
      return errorResponse("Topic is required", 400);
    }

    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `Write a blog post about: ${topic.trim()}` }] }],
          generationConfig: {
            responseMimeType: "application/json",
            responseSchema: {
              type: "object",
              properties: {
                title: { type: "string" },
                content: {
                  type: "string",
                  description: "The full blog post body, formatted in Markdown.",
                },
                tags: {
                  type: "array",
                  items: { type: "string" },
                  description: "Up to 5 relevant lowercase tags.",
                },
              },
              required: ["title", "content", "tags"],
            },
          },
        }),
      }
    );

    const geminiData = await geminiResponse.json();
    if (!geminiResponse.ok) {
      return errorResponse(geminiData.error?.message || "Failed to generate post", geminiResponse.status);
    }

    const text = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) return errorResponse("Failed to generate post", 500);

    const draft: GeneratedDraft = JSON.parse(text);
    // Gemini's forced-JSON output occasionally double-escapes backslashes in
    // long content fields, leaving literal "\n" instead of a real newline —
    // normalize so Markdown rendering sees actual line breaks.
    draft.content = draft.content.replace(/\\n/g, "\n");

    return NextResponse.json({ success: true, data: draft });
  } catch (error) {
    console.error("Generate post error:", error);
    return errorResponse("Failed to generate post", 500);
  }
}
