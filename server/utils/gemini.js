// utils/gemini.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const sendFileToGeminiAndGetSummaries = async ({ fileType, fileUrl, text }) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // 🧠 Build prompt dynamically
    let prompt = `
You are an AI medical assistant. Analyze the provided medical report and return a structured JSON with:
{
  "englishSummary": "<short summary in simple English, 2–4 sentences>",
  "urduSummary": "<Roman Urdu summary in 2–4 lines>",
  "doctorQuestions": ["Question 1", "Question 2", "Question 3"]
}
`;

    if (fileType === "pdf") {
      prompt += `
Here is the extracted text from the report:
"""
${text || "No extractable text found."}
"""
`;
    } else if (fileType === "image") {
      prompt += `
This report is provided as an image. The image URL is:
${fileUrl}

Use any visible content or text from the image to summarize it.
`;
    }

    prompt += `
Return only valid JSON. Do not include markdown or extra text.
`;

    // Generate response
    const result = await model.generateContent(prompt);
    const rawText = result.response.text();

    // --- Clean & Parse the Response ---
    let cleanedText = rawText
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    const jsonMatch = cleanedText.match(/\{[\s\S]*\}/);
    if (jsonMatch) cleanedText = jsonMatch[0];

    let parsed;
    try {
      parsed = JSON.parse(cleanedText);
    } catch (err) {
      console.error("❌ Failed to parse JSON. Raw Gemini response:", cleanedText);
      parsed = {
        englishSummary: "Could not parse Gemini output properly.",
        urduSummary: "",
        doctorQuestions: [],
      };
    }

    return {
      englishSummary: parsed.englishSummary || "",
      urduSummary: parsed.urduSummary || "",
      doctorQuestions: parsed.doctorQuestions || [],
    };
  } catch (error) {
    console.error("Gemini API error:", error);
    return {
      englishSummary: "AI summarization failed. Please try again later.",
      urduSummary: "",
      doctorQuestions: [],
    };
  }
};
