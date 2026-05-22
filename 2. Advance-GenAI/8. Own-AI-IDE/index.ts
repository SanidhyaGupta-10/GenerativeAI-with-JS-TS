import OpenAI from 'openai';
import fs from 'fs/promises';

const client = new OpenAI({
    baseURL: "http://localhost:11434/v1",
    apiKey: "ollama",
});

// TOOL TYPES
type CreateFileInput = {
    path: string;
    content: string;
};

async function createFolder(folderName: string) {
    await fs.mkdir(folderName, { recursive: true });

    return `Folder created: ${folderName}`;
}

async function createFile(input: CreateFileInput) {
    await fs.writeFile(input.path, input.content);

    return `File created: ${input.path}`;
}

const tools = {
    createFile,
    createFolder,
};

const SYSTEM_PROMPT = `
You are a coding agent.

Available tools:
- createFolder
- createFile

Rules:
- Always respond ONLY in JSON
- Never use markdown
- Create folder first before files

Think format:
{
  "step": "think",
  "content": "thinking"
}

Action format:
{
  "step": "action",
  "tool": "toolName",
  "input": {}
}

Output format:
{
  "step": "output",
  "content": "done"
}
`;

const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
    {
        role: "system",
        content: SYSTEM_PROMPT,
    },
];

async function runAgent() {
    console.log(`Agent Started...`)
    messages.push({
        role: "user",
        content: "Create a simple todo app using HTML CSS and JS",
    });

    while (true) {
        const response = await client.chat.completions.create({
            model: "qwen2.5-coder:1.5b",
            messages,
        });

        console.log('-----------------------------------------------');

        const raw = response.choices?.[0]?.message.content || "";

        console.log("\nRAW RESPONSE:\n");
        console.log(raw);

        // Extract the first JSON object from the response (model may add extra prose)
        const match = raw.match(/\{[\s\S]*\}/);
        if (!match) {
            console.warn("⚠️  No JSON found in response, skipping...");
            console.warn("Raw:", raw);
            continue;
        }

        let parsed: any;
        try {
            parsed = JSON.parse(match[0]);
        } catch (e) {
            console.warn("⚠️  Failed to parse JSON, skipping...");
            console.warn("Attempted:", match[0]);
            continue;
        }

        messages.push({
            role: "assistant",
            content: match[0],
        });

        // THINK
        if (parsed.step === "think") {
            console.log("🧠", parsed.content);
            continue;
        }

        // ACTION
        if (parsed.step === "action") {
            console.log("🛠️ Tool:", parsed.tool);

            let result: string | undefined;

            if (parsed.tool === "createFile") {
                result = await createFile(parsed.input);
            } else if (parsed.tool === "createFolder") {
                result = await createFolder(parsed.input);
            } else {
                console.warn("⚠️  Unknown tool:", parsed.tool);
            }

            if (result) {
                console.log(result);
                messages.push({
                    role: "user",
                    content: JSON.stringify({
                        step: "observe",
                        content: result,
                    }),
                });
            }

            continue;
        }

        // FINAL OUTPUT
        if (parsed.step === "output") {
            console.log("✅", parsed.content);
            break;
        }
    }
}

runAgent();