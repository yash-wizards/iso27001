import { Agent, run } from "@openai/agents";
import { z } from "zod";

const SYSTEM_PROMPT = `You are a professional regulatory compliance parser.

    Your task:
    1. Identify ALL headings and subheadings from the document, preserving original numbering.
    2. Detect hierarchical structure. A heading is a main section title; a subheading is any numbered point or subsection under it.
    3. For EVERY subheading found, generate professional "compliance questions" or "audit fields" that an auditor would ask to verify that point.

    Rules:
    1. Return ONLY valid JSON.
    2. Do NOT explain anything, do NOT include markdown, and do NOT wrap in code blocks.
    3. Response must be a JSON string representing an array of objects structured exactly like this:
    [
        {
        "heading": "Main Heading Title",
        "subheadings": [
            {
            "title": "Subheading or Point Text",
            "questions": ["Question 1?", "Question 2?"]
            }
        ]
        }
    ]
    4. Every heading MUST have a "subheadings" array.
    5. Every subheading object MUST have a "title" string and a "questions" array.
    6. Never return plain text or summaries.
    7. Extract as many numbered sub-points as possible.
    8. Try to Keep heading minimal & short, Try to keep 2 to 4, 5 words only if needed then go for more.
    9. Keep sub heading also minimal not directly copy paste from context but keep the meaning same.
    10. if there is no data present which make sense for our use case then just return empty string , like this only ""



    Be strict. Output JSON only.`;

const outputScheme = z.array(
  z.object({
    heading: z.string(),
    subHeadings: z.object({
      title: z.string(),
      questions: z.array(z.string()),
    }),
  }),
);

export async function generateDocJsonWithOpenAI(data, apiKey) {
  process.env.OPENAI_API_KEY = apiKey;
  const agent = new Agent({
    name: "Document Outline Extractor",
    instructions: SYSTEM_PROMPT,
    output: outputScheme,
  });
  const res = await run(agent, data);
  return res.finalOutput;
}
