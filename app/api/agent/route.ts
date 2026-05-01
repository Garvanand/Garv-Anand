import { NextResponse } from 'next/server';

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limitWindow = 60 * 1000; // 1 minute

  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + limitWindow });
    return true;
  }

  const record = rateLimitMap.get(ip)!;
  if (now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + limitWindow });
    return true;
  }

  if (record.count >= 10) {
    return false;
  }

  record.count += 1;
  return true;
}

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    
    if (!checkRateLimit(ip)) {
      return new NextResponse('Rate limit exceeded. Try again in a minute.', { status: 429 });
    }

    const { command } = await req.json();

    if (!command) {
      return new NextResponse('Missing command', { status: 400 });
    }

    const systemPrompt = `You are the AI terminal agent for Garv Anand, an AI/ML engineer.
Keep your responses very concise, professional, and entirely focused on his work.
Projects: ElderAI (Voice-first AI), Parkinson's Detection (93% acc), VITAL-AI.
Experience: GenAI Intern at ROVA (YOLOv8 PDF processing, RAG).
Format your response using Markdown. Use code blocks for emphasis where suitable.`;

    const groqKey = process.env.GROQCLOUD_KEY;
    if (!groqKey) {
      return new NextResponse('Missing API key', { status: 500 });
    }

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${groqKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-120b",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: command }
        ],
        temperature: 0.7,
        stream: true
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Groq API Error:", errorText);
      return new NextResponse('Error generating response', { status: 500 });
    }

    // Create a ReadableStream to stream the chunks back to the client
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    const stream = new ReadableStream({
      async start(controller) {
        if (!response.body) {
          controller.close();
          return;
        }

        const reader = response.body.getReader();

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunkStr = decoder.decode(value, { stream: true });
            
            // The OpenAI stream format gives data: {...}\n\n
            const lines = chunkStr.split('\n');
            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const dataStr = line.slice(6);
                if (dataStr === '[DONE]') {
                  // End of stream
                  continue;
                }

                try {
                  const data = JSON.parse(dataStr);
                  const content = data.choices[0]?.delta?.content || '';
                  if (content) {
                    controller.enqueue(encoder.encode(content));
                  }
                } catch (e) {
                  // ignore parse errors for partial chunks
                }
              }
            }
          }
        } finally {
          reader.releaseLock();
          controller.close();
        }
      }
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-transform',
        'Connection': 'keep-alive',
      },
    });

  } catch (error) {
    console.error('Terminal API Error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
