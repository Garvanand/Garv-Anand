import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { articles } = await req.json();

    if (!articles || articles.length === 0) {
      return NextResponse.json({
        briefing: "Welcome to the Signal Broadcast. No fresh intel to report today.",
        signals: [],
        topics: []
      });
    }

    const promptPayload = articles.map((a: any) => ({
      title: a.title,
      link: a.link,
      snippet: a.snippet
    }));

    const systemPrompt = "You are the AI News Anchor for 'Intel Dispatch'. You are reporting on the engineering research and projects of GARV ANAND. Your tone is technically dense, high-urgency, and intellectually elite—think high-stakes engineering intelligence. NEVER use generic praise. Refer to the author only as 'Garv Anand' or 'The Lead Engineer'.";
    
    const userPrompt = `Articles by Garv Anand: ${JSON.stringify(promptPayload)}.
Generate:
1. 'Daily Briefing': 3 sharp sentences on how Garv Anand is pushing the AI frontier. Start with 'Breaking from the AI beat...'
2. For each article: a 'Signal Sentence'—what does this mean for the future of the stack? (technical, not fluffy).
3. 'Topic Radar': 3-4 short, punchy technical labels.
Respond ONLY in JSON: { "briefing": "string", "signals": [{"url": "string", "signal": "string"}], "topics": ["string"] }`;

    const groqKey = process.env.GROQCLOUD_KEY;
    if (!groqKey) {
      throw new Error("GROQCLOUD_KEY is missing");
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
          { role: "user", content: userPrompt }
        ],
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;
    
    let parsed;
    try {
      parsed = JSON.parse(content);
    } catch(e) {
      parsed = {
        briefing: "Breaking from the AI beat... Signal Broadcast is currently experiencing localized interference. We will be back with deeper analysis shortly.",
        signals: [],
        topics: []
      };
    }

    return NextResponse.json(parsed);
  } catch (error) {
    console.error('Anchor API Error:', error);
    return NextResponse.json({
      briefing: "Breaking from the AI beat... Signal Broadcast is currently experiencing localized interference. We will be back with deeper analysis shortly.",
      signals: [],
      topics: []
    });
  }
}
