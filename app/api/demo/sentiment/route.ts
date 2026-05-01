import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    if (!text) {
      return new NextResponse('Missing text', { status: 400 });
    }

    const groqKey = process.env.GROQCLOUD_KEY;
    if (!groqKey) {
      return new NextResponse('Missing API key', { status: 500 });
    }

    const start = Date.now();

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${groqKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-120b",
        messages: [
          { 
            role: "system", 
            content: "Classify the sentiment of this text as POSITIVE, NEGATIVE, or NEUTRAL. Provide a confidence score between 0.0 and 1.0, and a brief reasoning (1 sentence). Return ONLY raw JSON in this exact format, with no markdown wrapping: {\"sentiment\": \"POSITIVE\", \"confidence\": 0.95, \"reasoning\": \"...\"}" 
          },
          { role: "user", content: text }
        ],
        temperature: 0.1,
      })
    });

    if (!response.ok) {
      console.error("Groq API Error:", await response.text());
      return new NextResponse('Error generating response', { status: 500 });
    }

    const data = await response.json();
    const latencyMs = Date.now() - start;
    
    let result;
    try {
      const content = data.choices[0].message.content.trim();
      // Sometimes models wrap in ```json ... ```
      const cleanContent = content.replace(/^```json/i, '').replace(/```$/, '').trim();
      result = JSON.parse(cleanContent);
    } catch (e) {
      console.error("Failed to parse JSON response:", data.choices[0].message.content);
      return new NextResponse('Failed to parse model response', { status: 500 });
    }

    return NextResponse.json({ ...result, latencyMs });

  } catch (error) {
    console.error('Sentiment API Error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
