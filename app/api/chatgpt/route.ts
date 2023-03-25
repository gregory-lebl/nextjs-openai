import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";
import { NextResponse } from "next/server";
dotenv.config();

export async function POST(request: Request, response: Response) {
	const { prompt } = await request.json();

	if (!prompt) {
		return NextResponse.json({ status: 400, message: "Prompt manquant." });
	}

	const openAiEndpoint = "https://api.openai.com/v1/chat/completions";
	const openAiKey = process.env.OPENAI_API_KEY;
	const requestBody = {
		model: "gpt-3.5-turbo",
		messages: [{ role: "user", content: prompt }],
		temperature: 0.7,
	};
	const fetchResponse = await fetch(openAiEndpoint, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${openAiKey}`,
		},
		body: JSON.stringify(requestBody),
	});
	if (!fetchResponse.ok) {
		return NextResponse.json({
			status: 500,
			message: "Erreur lors de la récupération de l'info sur Openai",
		});
	}
	const responseBody = await fetchResponse.json();
	const responseFromOpenAi = responseBody.choices[0].message.content;
	return NextResponse.json({ status: 200, message: responseFromOpenAi });
}
