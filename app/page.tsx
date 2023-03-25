"use client";
import { useState } from "react";
import ChatGPTResponse from "./components/ChatGPTReponse";

export default function Home() {
	const [openAiResponse, setopenAiResponse] = useState<null | string>(null);

	const handleFormSubmit = async (e: any) => {
		e.preventDefault();

		const btnSubmit = e.target.querySelector("button");
		btnSubmit.disabled = true;

		const formData = new FormData(e.target);
		const prompt = formData.get("prompt");

		if (prompt) {
			const fetchResponse = await fetch("/api/chatgpt", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify({ prompt: prompt }),
			});

			const response = await fetchResponse.json();

			if (response.status === 200) {
				setopenAiResponse(response.message);
				btnSubmit.disabled = false;
			}
		}
	};

	return (
		<main className="text-gray-600 body-font relative">
			<div className="container px-5 py-24 mx-auto">
				<div className="lg:w-1/2 md:w-2/3 mx-auto">
					<form onSubmit={handleFormSubmit}>
						<div className="flex flex-wrap -m-2">
							<div className="p-2 w-1/2"></div>
							<div className="p-2 w-1/2"></div>
							<div className="p-2 w-full">
								<div className="relative">
									<label className="leading-7 text-sm text-gray-600">
										Prompt for chatGPT
									</label>
									<input
										id="message"
										type="text"
										name="prompt"
										className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
									></input>
								</div>
							</div>
							<div className="p-2 w-full">
								<button
									type="submit"
									className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded"
								>
									Generate
								</button>
							</div>
							<div className="p-2 w-full">
								<ChatGPTResponse response={openAiResponse} />
							</div>
						</div>
					</form>
				</div>
			</div>
		</main>
	);
}
