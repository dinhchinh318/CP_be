import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const askAI = async (req, res) => {
  try {
    const userMessage = req.body.message?.trim();
    if (!userMessage) {
      return res.status(400).json({ error: "Message is required." });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: userMessage }] }],
      generationConfig: {
        temperature: 0.8,
        maxOutputTokens: 500,
      },
    });

    const text = result.response.text();

    const formattedText = text
      .replace(/\*\*/g, "**")
      .replace(/\*/g, "*")
      .replace(/\n{2,}/g, "\n\n")
      .trim();

    res.json({ reply: formattedText });
  } catch (error) {
    console.error("Gemini error:", error);
    res.status(500).json({
      error: "AI service error. Please try again later.",
      detail: error.message,
    });
  }
};
