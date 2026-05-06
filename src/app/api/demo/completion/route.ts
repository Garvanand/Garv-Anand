import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { systemPrompt, prompt, temperature } = await req.json();

    if (!prompt) {
      return new NextResponse('Missing prompt', { status: 400 });
    }

    const groqKey = process.env.GROQCLOUD_KEY;
    if (!groqKey) {
      return new NextResponse('Missing API key', { status: 500 });
    }

    const messages = [];
    if (systemPrompt) messages.push({ role: 'system', content: systemPrompt });
    messages.push({ role: 'user', content: prompt });

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${groqKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-120b",
        messages,
        temperature: temperature ?? 0.7,
        stream: true
      })
    });

    if (!response.ok) {
      console.error("Groq API Error:", await response.text());
      return new NextResponse('Error generating response', { status: 500 });
    }

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
            
            const lines = chunkStr.split('\n');
            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const dataStr = line.slice(6);
                if (dataStr === '[DONE]') continue;

                try {
                  const data = JSON.parse(dataStr);
                  const content = data.choices[0]?.delta?.content || '';
                  if (content) {
                    controller.enqueue(encoder.encode(content));
                  }
                } catch (e) {
                  // ignore partial chunk parsing errors
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
    console.error('Completion API Error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
