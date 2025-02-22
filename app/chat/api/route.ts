import { ChatType, ResponseSchema } from '@/store/useChatStore';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

export async function GET() {
  return Response.json({ message: 'Chatbot app!' });
}

type HistoryItem = {
  role: string;
  parts: [{ text: string }];
};

async function send_message(message: string, history: HistoryItem[]) {
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

    suggestions are prompt suggestions for the user based on the previous chats.
    return only best 3 suggestions and citations if any.
    All responses must strictly adhere to this structure. Only return JSON—no extra text or explanations.
  `,
  });

  const chat = model.startChat({
    history,
  });
  try {
    const { response } = await chat.sendMessage(message);
    return response.text();
  } catch (error) {
    return error;
  }
}

function parseHistory(history: ChatType[]): HistoryItem[] {
  return history.reduce((acc: HistoryItem[], curr) => {
    if (curr.prompt) {
      acc.push({ role: 'user', parts: [{ text: curr.prompt }] });
      if (curr.response) {
        acc.push({ role: 'model', parts: [{ text: curr.response.message }] });
      }
    }
    return acc;
  }, []);
}

export async function POST(req: Request) {
  const { prompt, history } = await req.json();
  const parsedHistory = parseHistory(history);
  return send_message(prompt, parsedHistory)
    .then(
      (response: unknown): ResponseSchema =>
        response
          ? JSON.parse(response?.toString())
          : {
              status: 'error',
              prompt,
              message: 'No response from the model',
              data: {
                items: [],
                suggestions: [],
                citations: [],
              },
            },
    )
    .then((response) => {
      return NextResponse.json(response, { status: 200 });
    })
    .catch((error) => {
      return NextResponse.json(error, { status: 500 });
    });
}
