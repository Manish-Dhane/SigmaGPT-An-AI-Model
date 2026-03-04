import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const getAIResponse = async (messages) => {
  try {

    const model = genAI.getGenerativeModel({
      model: "gemini-flash-lite-latest"
    });

    // Controlled memory (last 10 messages)
    const history = messages.slice(-10).map((msg) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }]
    }));

    const chat = model.startChat({
      history: history.slice(0, -1) // history without latest prompt
    });

    const lastMessage = history[history.length - 1].parts[0].text;

    const result = await chat.sendMessage(lastMessage);

    const response = result.response.text();

    console.log("Gemini response:", response);

    return response;

  } catch (err) {
    console.error("Gemini Error:", err);
    return null;
  }
};

export default getAIResponse;


// import "dotenv/config";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// const getAIResponse = async (messages) => {
//   try {
//     const model = genAI.getGenerativeModel({
//       model: "gemini-2.5-flash"
//     });

//     // 🔥 Controlled Memory (last 10 messages only)
//     const limitedMessages = messages.slice(-10);

//     // Convert DB messages to Gemini format
//     const formattedMessages = limitedMessages.map((msg) => ({
//       role: msg.role === "assistant" ? "model" : "user",
//       parts: [{ text: msg.content }]
//     }));

//     const result = await model.generateContent({
//       contents: formattedMessages
//     });

//     const text = result.response.text();

//     console.log("Gemini response:", text);

//     return text;

//   } catch (err) {
//     console.error("Gemini Error:", err);
//     return null;
//   }
// };

// export default getAIResponse;