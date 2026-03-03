import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const getAIResponse = async (messages) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash"
    });

    // 🔥 Controlled Memory (last 10 messages only)
    const limitedMessages = messages.slice(-10);

    // Convert DB messages to Gemini format
    const formattedMessages = limitedMessages.map((msg) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }]
    }));

    const result = await model.generateContent({
      contents: formattedMessages
    });

    const text = result.response.text();

    console.log("Gemini response:", text);

    return text;

  } catch (err) {
    console.error("Gemini Error:", err);
    return null;
  }
};

export default getAIResponse;