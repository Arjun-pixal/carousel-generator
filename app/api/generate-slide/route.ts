import { NextRequest, NextResponse } from 'next/server';

// ✅ Use Gemini 1.5 Flash (a fast and cost-effective model, great for free tier)
const GEMINI_API_KEY = "AIzaSyDnKOqY7NGBIh2tz3apK30p2bVd7MLh03c";
const GEMINI_MODEL = "gemini-2.5-flash";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body || typeof body.prompt !== 'string') {
      return NextResponse.json({ error: 'Missing or invalid prompt' }, { status: 400 });
    }

    const systemPrompt = `You are an expert content editor. Given a paragraph, split it into three parts: a concise heading (max 10 words), a subheading (max 20 words), and the remaining content. Return ONLY a valid JSON object with keys: heading, subheading, content. Do not include any explanations, markdown, or code block. Example: {"heading": "...", "subheading": "...", "content": "..."}`;
    const userPrompt = body.prompt;

    const geminiPayload = {
      contents: [{ parts: [{ text: `${systemPrompt}\n\n${userPrompt}` }] }],
      // ✅ Add safety settings to prevent the API from blocking common requests
      safetySettings: [
        { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
        { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
        { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
        { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
      ],
      generationConfig: {
        // ✅ Ensure the output is JSON
        responseMimeType: "application/json",
      },
    };

    const geminiRes = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(geminiPayload),
    });

    if (!geminiRes.ok) {
      const error = await geminiRes.text();
      console.error("Gemini API error:", error);
      return NextResponse.json({ error: 'Gemini API error', details: error }, { status: 500 });
    }

    const data = await geminiRes.json();
    
    if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
      console.error("Unexpected Gemini response structure", data);
      return NextResponse.json({ error: 'Unexpected Gemini response structure', raw: data }, { status: 500 });
    }

    // Since we requested JSON, the response is a string that needs to be parsed
    const result = JSON.parse(data.candidates[0].content.parts[0].text);

    return NextResponse.json(result);
  } catch (err) {
    console.error("Server error:", err);
    const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
    return NextResponse.json({ error: 'Server error', details: errorMessage }, { status: 500 });
  }
}
