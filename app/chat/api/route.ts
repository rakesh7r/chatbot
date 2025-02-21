import { NextApiRequest, NextApiResponse } from 'next';
import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const body = Request;
  return Response.json({ message: 'Hello, world!' });
}

async function send_message(message: string) {
  const genAi = new GoogleGenerativeAI(
    'AIzaSyD6F5M1SaZfss0Xe2CcDs3F27ihJiGY5M4',
  );
  const model = genAi.getGenerativeModel({
    model: 'gemini-2.0-flash-lite-preview-02-05',
    generationConfig: {
      temperature: 1,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 8192,
      responseMimeType: 'application/json',
    },
    systemInstruction:
      "You're a helpful assistant, and you're here to help me with my tasks.provide a detailed response to the following prompt.",
  });
  const chat = model.startChat({});
  try {
    const { response } = await chat.sendMessage(message);
    return response;
  } catch (error) {
    return error;
  }
}

export async function POST(req: Request) {
  const { prompt } = await req.json();
  return send_message(prompt)
    .then((response) => {
      return NextResponse.json(response, { status: 200 });
    })
    .catch((error) => {
      return NextResponse.json(error, { status: 500 });
    });
}
