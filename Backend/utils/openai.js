import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const getOpenAIAPIResponse = async (message) => {
  try {
    // 🔥 Use EXACT model name (without "models/")
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash"
    });

    const result = await model.generateContent(message);
    const text = result.response.text();

    console.log("Gemini response:", text);

    return text;

  } catch (err) {
    console.error("Gemini Error:", err);
    return null;
  }
};

export default getOpenAIAPIResponse;