import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINIA_API_KEY!;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 500,
    responseMimeType: "text/plain",
};

export async function POST(req: Request) {
    try {
        const { prompt } = await req.json();
        if (!prompt) {
            return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
        }

        // const result = await model.generateContent(prompt);

        // const chatSession = model.startChat({
        //     generationConfig,
        //     history: [],
        // });

        const result = await model.generateContent(
            `Generate a React component based on this description:\n${prompt}`
        );

        const generatedCode = result.response.text();

        return NextResponse.json({ snippet: generatedCode });
    } catch (error) {
        console.error("Error generating template:", error);
        return NextResponse.json({ error: "Failed to generate template" }, { status: 500 });
    }
}
