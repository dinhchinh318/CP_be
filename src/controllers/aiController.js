// import { GoogleGenerativeAI } from "@google/generative-ai";
// import dotenv from "dotenv";
// dotenv.config();

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// export const askAI = async (req, res) => {
//   try {
//     const userMessage = req.body.message;
//     if (!userMessage) {
//       return res.status(400).json({ error: "Message is required." });
//     }

//     const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

//     const result = await model.generateContent(userMessage);

//     const text = result.response.text();
//     res.json({ reply: text });
//   } catch (error) {
//     console.error(" Gemini error:", error);
//     res.status(500).json({ error: error.message });
//   }
// };
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
        temperature: 0.8, // tăng sáng tạo nhẹ
        maxOutputTokens: 500, // tránh trả lời quá dài
      },
    });

    const text = result.response.text();

    // Làm sạch & định dạng markdown rõ ràng hơn
    const formattedText = text
      .replace(/\*\*/g, "**") // giữ lại markdown bold
      .replace(/\*/g, "*") // giữ lại italic
      .replace(/\n{2,}/g, "\n\n") // đảm bảo xuống dòng rõ ràng
      .trim();

    res.json({ reply: formattedText });
  } catch (error) {
    console.error("❌ Gemini error:", error);
    res.status(500).json({
      error: "AI service error. Please try again later.",
      detail: error.message,
    });
  }
};
