 import { generateGeminiSummary } from "./lib/geminiService.js";

export const handler = async (event, context) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json"
  };

  // CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, headers, body: JSON.stringify({ error: "Method Not Allowed. Use POST." }) };
    }

    const body = event.body ? JSON.parse(event.body) : {};
    const { prompt } = body || {};
    if (!prompt || typeof prompt !== "string") {
      return { statusCode: 400, headers, body: JSON.stringify({ error: "Missing 'prompt' (string) in request body." }) };
    }

    const output = await generateGeminiSummary(prompt);
    return {statusCode: 200, headers, body: JSON.stringify({ output: String(output).trim() }) };
  } catch (err) {
    return {statusCode: 500, headers, body: JSON.stringify({ error: "Failed to generate content with LLM:", err }) };
  }
};
