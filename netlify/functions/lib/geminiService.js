import { GoogleGenAI } from "@google/genai";
import { GEMINI_SUMMARY_PROMPT } from "./geminiPrompt.js";

export async function generateGeminiSummary(prompt) {
try{
  const ai = new GoogleGenAI({});
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      { role: "model", parts: [{ text: GEMINI_SUMMARY_PROMPT}] },
      { role: "user", parts: [{ text: prompt }] }
    ],
    config: { thinkingConfig: { thinkingBudget: 0 } }
  });
  return String(response.text).trim();
}
catch(err){
    throw new Error("Gemini service failed: " + err.message);
}
}