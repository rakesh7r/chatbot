import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

export async function GET() {
  const body = Request;
  return Response.json({ message: 'Hello, world!' });
}

async function send_message(message: string) {
  const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
  const model = genAi.getGenerativeModel({
    model: 'gemini-2.0-flash-lite-preview-02-05',
    generationConfig: {
      temperature: 1,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 8192,
      responseMimeType: 'application/json',
    },
    systemInstruction: `
    You're a helpful assistant designed to provide clear, structured responses.
    - Format your responses in valid JSON.
    - If applicable, use markdown formatting inside JSON (e.g., for descriptions).
    - Be concise but detailed when necessary.

    {
      "status": "string (success, error, info)",
      "prompt": "string (original prompt)",
      "message": "string (detailed description of the response)",
      "data": {
        "items" : [
          {
            "name": "string (name of the item)",
            "description": "string (description of the item)"
          }
        ]
        "suggestions": ["string (suggested actions or next steps)"
        "citations": "string array (optional, for providing sources or references)"
        ]
      }
    }

    use markdown formatting inside JSON (e.g., for description and response).
    for example:
    for headings: # heading 1, ## heading 2, ### heading 3
    for bold: **bold text**
    for italic: *italic text*
    for lists: - list item
    for links: [link text](https://www.example.com)
    for code: \`code\`
    for code block: \`\`\`code block\`\`\`
    for quotes: > quoted text

    All responses must strictly adhere to this structure. Only return JSON—no extra text or explanations.
  `,
  });
  const chat = model.startChat({});
  try {
    const { response } = await chat.sendMessage(message);
    return response.text();
  } catch (error) {
    return error;
  }
}

export async function POST(req: Request) {
  const { prompt } = await req.json();
  return send_message(prompt)
    .then((response: any) => JSON.parse(response))
    .then((response) => {
      return NextResponse.json(response, { status: 200 });
    })
    .catch((error) => {
      return NextResponse.json(error, { status: 500 });
    });
}
