import "dotenv/config"; // loads .env file into process.env
import OpenAI from "openai"; // openai SDK — works with Groq too
import fs from "fs/promises"; // async file system (mkdir, writeFile)
import * as readline from "readline"; // reads input from terminal

// point the OpenAI SDK at Groq's server instead of OpenAI
const client = new OpenAI({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_API_KEY,
});

// tells the AI exactly what format to return — forces pure JSON output
const SYSTEM_PROMPT = `
You are an elite AI coding agent.

Your task is to generate COMPLETE small projects.

STRICT RULES:
- Output ONLY valid JSON
- No markdown
- No explanations
- No backticks
- No comments outside JSON
- Never omit code
- Always include FULL file contents
- Generate clean production-style code
- Ensure all files work together correctly

PROJECT RULES:
- Create modern UI
- Use responsive design
- Use semantic HTML
- Use clean Tailwind CSS
- Use vanilla JavaScript unless another framework is requested
- Ensure JavaScript works correctly
- Use proper file linking

REQUIRED JSON FORMAT:
{
  "folder": "project-name",
  "files": [
    {
      "path": "index.html",
      "content": "full file content"
    }
  ]
}

IMPORTANT:
- "folder" must contain the project folder name
- Every file must have path and content
- content must be COMPLETE code — no placeholders
`;

// wraps readline in a Promise so we can use await on terminal input
function readLine(prompt: string): Promise<string> {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

// sends the prompt to AI, parses the JSON, and writes files to disk
async function generateProject(userPrompt: string): Promise<void> {
  console.log("\n🤖 Thinking...\n");

  const response = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile", // 70B follows JSON rules much better than 8B
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: userPrompt },
    ],
    response_format: { type: "json_object" }, // forces the model to return valid JSON
  });

  const raw = response.choices[0]?.message.content || "";

  // remove markdown fences in case the model adds them anyway
  let cleaned = raw.replace(/```json/gi, "").replace(/```/g, "").trim();

  // if response doesn't start with {, try to extract the JSON block from it
  if (!cleaned.startsWith("{")) {
    const match = cleaned.match(/\{[\s\S]*\}/);
    if (match) {
      cleaned = match[0];
    } else {
      throw new Error("No valid JSON in response:\n" + raw);
    }
  }

  const parsed = JSON.parse(cleaned); // { folder: "...", files: [{path, content}] }

  // create the project folder (recursive:true = no error if already exists)
  await fs.mkdir(parsed.folder, { recursive: true });

  // write each file — use for...of NOT forEach (forEach breaks with await)
  for (const file of parsed.files) {
    const fullPath = `${parsed.folder}/${file.path}`;
    await fs.writeFile(fullPath, file.content, "utf-8");
    console.log("✅ Created:", fullPath);
  }

  console.log(`\n🎉 Done! Project saved in "${parsed.folder}"\n`);
}

async function main(): Promise<void> {
  console.log('🤖 Own AI IDE — type your idea or "exit" to quit\n');

  // keep asking for prompts until user types "exit"
  while (true) {
    const input = await readLine("What do you want to build? > ");

    if (input.toLowerCase() === "exit") {
      console.log("👋 Bye!");
      break; // stop the loop
    }

    if (!input) {
      console.log("⚠️  Please type something.\n");
      continue; // skip to next iteration
    }

    try {
      await generateProject(input);
    } catch (err) {
      // catch errors so the loop keeps running instead of crashing
      console.error("❌ Error:", (err as Error).message, "\n");
    }
  }
}

main();