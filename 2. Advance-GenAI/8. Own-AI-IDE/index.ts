import "dotenv/config";
import OpenAI from "openai";
import fs from "fs/promises";

const client = new OpenAI({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_API_KEY,
});

async function main() {
    console.log('Agent is starting ... ')
  const response = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile",

    messages: [
      {
        role: "system",
        content: `
Return ONLY valid JSON.

Format:
{
  "folder": "",
  "files": [
    {
      "path": "",
      "content": ""
    }
  ]
}
`,
      },

      {
        role: "user",
        content:
          "Create a Weather APP using HTML, TAILWIND CSS, Javascript make it JS",
      },
    ],
    response_format: { type: "json_object" },
  });

  const raw =
    response.choices[0]?.message.content || "";

  console.log("\nRAW:\n", raw);

  // Strip markdown fences if model adds them despite json_object mode
  let cleaned = raw
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  // Fallback: extract first JSON object found in the string
  if (!cleaned.startsWith("{")) {
    const match = cleaned.match(/\{[\s\S]*\}/);
    if (match) {
      cleaned = match[0];
    } else {
      throw new Error("No valid JSON found in model response.\n\nRAW response:\n" + raw);
    }
  }

  const parsed = JSON.parse(cleaned);

  console.log('Agent started making files and folders');
  // create folder
  await fs.mkdir(parsed.folder, {
    recursive: true,
  });

  // create files
  for (const file of parsed.files) {
    const fullPath = `${parsed.folder}/${file.path}`;

    await fs.writeFile(fullPath, file.content);

    console.log("Created:", fullPath);
  }

  console.log("\n✅ Project created!");
}

main();