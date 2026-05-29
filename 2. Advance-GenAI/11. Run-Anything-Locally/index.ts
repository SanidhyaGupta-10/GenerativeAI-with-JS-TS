import { OpenAI } from 'openai';

const client = new OpenAI({
    apiKey: "ollama",
    baseURL: "http://localhost:12434/engines/v1"
});

async function run(query: string) {
    console.log(query)
    const response = await client.chat.completions.create({
        model: "aistaging/gemma3:270M-UD-Q4_K_XL",
        messages: [
            { role: "user", content: query }
        ]
    });
    console.log(response.choices?.[0]?.message.content);
}
run("In which languages Rust written")