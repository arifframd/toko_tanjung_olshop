import { NextRequest } from "next/server";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { Message, streamText } from "ai";
import { intialMessages } from "@/lib/data";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

// buat id untuk setiap pesan
const generateMessageId = (message: Message) => {
  return `${message.role}-${Date.now()}`;
};

const buildGoogleGenAIPromt = (messages: Message[]): Message[] => [
  {
    id: generateMessageId(intialMessages),
    role: "user",
    content: intialMessages.content,
  },
  ...messages.map((message) => ({
    id: generateMessageId(message),
    role: message.role,
    content: message.content,
  })),
];

export const POST = async (req: NextRequest) => {
  const { messages } = await req.json();

  const stream = await streamText({
    model: google("gemini-2.0-flash"),
    messages: buildGoogleGenAIPromt(messages),
    temperature: 0.7,
  });
  return stream.toDataStreamResponse(); // Mengembalikan stream sebagai response
};
