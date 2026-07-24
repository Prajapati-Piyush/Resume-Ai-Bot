import 'dotenv/config'
import { GoogleGenAI } from "@google/genai";
import { z } from "zod";

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

const interViewSchema = z.object({
  title: z
    .string()
    .describe(
      "The job title being applied for, extracted from the job description, e.g. 'Senior Frontend Engineer'",
    ),
  matchScore: z
    .number()
    .describe(
      "A score between 0 and 100 indicating how well the candidate matches the job describe",
    ),
  technicalQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe("Technical question can be ask in the interview"),
        intention: z
          .string()
          .describe(
            "The Intention of the interviewer behind asking this question",
          ),
        answer: z
          .string()
          .describe(
            "How to answer this question, what points to cover, waht approach to take, what to avoid",
          ),
      }),
    )
    .describe(
      "List of technical questions that can be asked in the interview",
    ),
  behavioralQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe("Behavioral question can be ask in the interview"),
        intention: z
          .string()
          .describe(
            "The Intention of the interviewer behind asking this question",
          ),
        answer: z
          .string()
          .describe(
            "How to answer this question, what points to cover, waht approach to take, what to avoid",
          ),
      }),
    )
    .describe(
      "List of behavioral questions that can be asked in the interview",
    ),
  skillGaps: z
    .array(
      z.object({
        skill: z.string().describe("Skill that the candidate is lacking"),
        severity: z
          .enum(["low", "medium", "high"])
          .describe(
            "Severity of the skill gap, i.e. how critical it is for the job role",
          ),
      }),
    )
    .describe(
      "List of skill gaps in the candidate's profile along with their severity",
    ),
  preparationPlan: z
    .array(
      z.object({
        day: z
          .number()
          .describe(
            "The day number in the preparation plan, starting from 1",
          ),
        focus: z
          .string()
          .describe(
            "The main focus of the day in the preparation plan, e.g. a specific topic or skill to work on",
          ),
        tasks: z
          .array(z.string())
          .describe(
            "List of tasks to be completed on that day in the preparation plan",
          ),
      }),
    )
    .describe(
      "A day-wise preparation plan for the candidate to improve their skills and prepare for the interview",
    ),
});



/**
 * Gemini's `responseSchema` accepts an OpenAPI-3 subset, not full JSON Schema:
 * `$schema`, `additionalProperties` and `$ref`/`definitions` are rejected or
 * ignored. Strip them from zod's output before sending.
 */
function toGeminiSchema(node) {
  if (Array.isArray(node)) return node.map(toGeminiSchema);
  if (!node || typeof node !== "object") return node;

  const out = {};
  for (const [key, value] of Object.entries(node)) {
    if (key === "$schema" || key === "additionalProperties") continue;
    out[key] = toGeminiSchema(value);
  }
  return out;
}

// Built once at module load — the schema never changes between requests.
// NOTE: uses zod v4's native converter. `zod-to-json-schema@3` silently emits an
// empty schema for v4 schemas, which made Gemini ignore the shape entirely.
const RESPONSE_SCHEMA = toGeminiSchema(z.toJSONSchema(interViewSchema));

// Gemini returns these when it is overloaded or rate limited rather than because
// the request is wrong — worth retrying. Anything else is a real failure.
const RETRYABLE_STATUSES = new Set([429, 500, 502, 503, 504]);

const MAX_ATTEMPTS = 3;
const BASE_DELAY_MS = 1500;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Error thrown out of this service. `status` lets the controller map upstream
 * conditions onto a sensible HTTP response instead of a blanket 500.
 */
export class AiServiceError extends Error {
  constructor(message, { status = 502, retryable = false, cause } = {}) {
    super(message);
    this.name = "AiServiceError";
    this.status = status;
    this.retryable = retryable;
    this.cause = cause;
  }
}

async function callGemini(prompt) {
  let lastError;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      return await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: RESPONSE_SCHEMA,
        },
      });
    } catch (error) {
      lastError = error;

      const status = error?.status ?? error?.response?.status;
      const isRetryable = RETRYABLE_STATUSES.has(status);

      if (!isRetryable || attempt === MAX_ATTEMPTS) break;

      // exponential backoff with jitter so concurrent users don't retry in lockstep
      const delay = BASE_DELAY_MS * 2 ** (attempt - 1) + Math.floor(Math.random() * 400);
      console.warn(
        `Gemini returned ${status} (attempt ${attempt}/${MAX_ATTEMPTS}) — retrying in ${delay}ms`,
      );
      await sleep(delay);
    }
  }

  const status = lastError?.status ?? lastError?.response?.status;

  if (RETRYABLE_STATUSES.has(status)) {
    throw new AiServiceError(
      "The AI service is temporarily overloaded. Please try again in a moment.",
      { status: 503, retryable: true, cause: lastError },
    );
  }

  if (status === 401 || status === 403) {
    throw new AiServiceError("The AI service rejected our credentials.", {
      status: 502,
      cause: lastError,
    });
  }

  throw new AiServiceError("The AI service could not generate a report.", {
    status: 502,
    cause: lastError,
  });
}

export default async function generateInterviewReport({
  resume,
  selfDescription,
  jobDescription,
}) {
  try {

    const prompt = `Genearate an interview report based on the following data:
    Resume: ${resume}
    Self describe: ${selfDescription ?? "Not provided"}
    Job describe: ${jobDescription}`;

    const response = await callGemini(prompt);

    if (!response?.text) {
      throw new AiServiceError("The AI service returned an empty response.", {
        status: 502,
      });
    }

    // Validate against the same zod schema so a drifting model fails loudly here
    // rather than as an opaque mongoose validation error further downstream.
    let parsed;
    try {
      parsed = interViewSchema.safeParse(JSON.parse(response.text));
    } catch (error) {
      throw new AiServiceError("The AI service returned invalid JSON.", {
        status: 502,
        cause: error,
      });
    }

    if (!parsed.success) {
      console.error("AI response did not match the expected schema:", parsed.error.issues);
      throw new AiServiceError("The AI returned a malformed interview report.", {
        status: 502,
      });
    }

    return parsed.data;
  } catch (error) {
    console.error("Error generating interview report:", error.message);
    throw error;
  }
}
