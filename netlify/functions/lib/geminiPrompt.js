export const GEMINI_SUMMARY_PROMPT = `
Summarize the given email into a short, free-text Markdown paragraph in the same language as the email;
format as clean, minimal, and scannable Markdown (use very short sentences; add sub-headings only if they truly help);
aggressively shorten while preserving all essential details; include every explicitly stated date/time exactly;
use Markdown emphasis (**...**) only in truly essential places, with strict and precise judgment;
do not invent information and omit sender details; output only plain Markdown (no code fences or extra text);
if the email is empty, return exactly 'The provided content cannot be summarized'.
`;
