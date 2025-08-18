import dotenv from "dotenv";
import OpenAI from "openai";
dotenv.config();

// Groq client (OpenAI-compatible)
const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1", // 👈 point to Groq, not OpenAI
});

// Reusable function
const getOpenAIApiResponse = async (message) => {
    try {
        const response = await client.chat.completions.create({
            model: "llama3-70b-8192", // choose your model
            messages: [{ role: "user", content: message }],
        });

        // Extract the assistant's reply
        console.log(response.choices[0].message.content);
        return response.choices[0].message.content;
    } catch (err) {
        console.error("Finity Call Error:", err);
        // console.error("Groq API error:", err);
        throw new Error(err.message);
    }
}



export default getOpenAIApiResponse;