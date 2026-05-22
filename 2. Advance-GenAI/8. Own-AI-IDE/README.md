# 🤖 Own AI IDE

> An AI-powered code generation agent that takes a plain English prompt and **automatically scaffolds a complete working project** — creating every folder and file on disk using a Large Language Model.

---

## ✨ Features

- 🧠 Powered by **Llama 3.3 70B** via Groq (fast, free tier available)
- 📁 Auto-creates the **project folder** and **all files** on disk
- 🔒 Enforces **JSON-only output** using `response_format: json_object`
- 🛡️ Robust JSON extraction fallback in case of model quirks
- ⚡ Runs with **Bun** — no heavyweight Node.js setup needed
- 🎨 Generated apps use **Tailwind CSS + vanilla JS** by default

---

## 🛠️ Tech Stack

| Tool | Purpose |
|------|---------|
| [Bun](https://bun.sh) | Runtime & package manager |
| [TypeScript](https://www.typescriptlang.org) | Language |
| [Groq API](https://console.groq.com) | Ultra-fast LLM inference |
| [Llama 3.3 70B](https://groq.com) | Model for code generation |
| [`openai`](https://www.npmjs.com/package/openai) SDK | Groq-compatible OpenAI client |
| [`dotenv`](https://www.npmjs.com/package/dotenv) | Environment variable loading |

---

## 📁 Project Structure

```
own-ai-ide/
├── index.ts            ← Main agent entry point
├── .env                ← API keys (never commit this)
├── .gitignore
├── package.json
├── tsconfig.json
├── bun.lock
└── <generated-app>/    ← Output folder created by the agent
    ├── index.html
    ├── script.js
    └── styles.css
```

---

## ⚙️ Setup

### Prerequisites

- [Bun](https://bun.sh) installed (`npm install -g bun` or see bun.sh)
- A free [Groq API key](https://console.groq.com)

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd own-ai-ide
bun install
```

### 2. Configure Environment

Create a `.env` file in the project root:

```env
GROQ_API_KEY=your_groq_api_key_here
```

> Get a free key at [console.groq.com](https://console.groq.com) — no credit card required.

---

## ▶️ Usage

### Step 1 — Set your prompt

Edit `index.ts` around line 71 and change the user message:

```ts
content: "Create a Weather App using HTML, Tailwind CSS and JavaScript",
```

You can ask for anything:

```ts
content: "Create a calculator app using HTML, CSS and JavaScript"
content: "Create a Pomodoro timer with a dark theme"
content: "Create a markdown note-taking app"
```

### Step 2 — Run the agent

```bash
bun index.ts
```

### Step 3 — Open your app

The generated project folder will appear in the same directory. Open `index.html` in your browser.

---

## 📤 Example Output

```
Agent is starting ...

RAW:
{
  "folder": "weather-app",
  "files": [
    { "path": "index.html", "content": "<!DOCTYPE html>..." },
    { "path": "script.js",  "content": "const API_KEY = ..." },
    { "path": "styles.css", "content": ".weather-icon { ... }" }
  ]
}

Agent started making files and folders
Created: weather-app/index.html
Created: weather-app/script.js
Created: weather-app/styles.css

✅ Project created!
```

---

## 🔧 How It Works

```
You type a prompt
       │
       ▼
  SYSTEM_PROMPT (elite AI coding agent instructions)
  + Your user message
       │
       ▼
  Groq API  ──►  llama-3.3-70b-versatile
  response_format: { type: "json_object" }   ← forces 100% valid JSON
       │
       ▼
  JSON response:
  {
    "folder": "project-name",
    "files": [
      { "path": "index.html", "content": "..." },
      { "path": "script.js",  "content": "..." }
    ]
  }
       │
       ▼
  fs.mkdir(folder)
  fs.writeFile(path, content) × N
       │
       ▼
  ✅ Full project written to disk
```

---

## 📋 System Prompt

The agent uses a carefully crafted system prompt (`SYSTEM_PROMPT` in `index.ts`) that instructs the LLM to:

- Return **only** valid JSON — no markdown, no backticks, no explanations
- Generate **complete** file contents — no placeholders, no `// ...` shortcuts
- Build **modern, responsive UIs** using Tailwind CSS and semantic HTML
- Make sure **all files link together** correctly (HTML → JS → CSS)

```
You are an elite AI coding agent.
Your task is to generate COMPLETE small projects.

STRICT RULES:
- Output ONLY valid JSON
- No markdown, No backticks, No comments outside JSON
- Always include FULL file contents
- Generate clean production-style code
...
```

---

## 🐛 Troubleshooting

| Error | Cause | Fix |
|-------|-------|-----|
| `SyntaxError: JSON Parse error` | Model returned markdown instead of JSON | Already fixed — `response_format: json_object` + robust fallback extraction |
| `GROQ_API_KEY is undefined` | Missing or invalid `.env` file | Create `.env` with `GROQ_API_KEY=your_key` |
| `Cannot find module 'openai'` | Dependencies not installed | Run `bun install` |
| Generated files are empty or incomplete | Smaller model cut off output | Stick with `llama-3.3-70b-versatile` — don't downgrade to 8B |
| `ENOENT: no such file` on writeFile | LLM returned a `path` with a subfolder that doesn't exist | Add `fs.mkdir(dirname(fullPath), { recursive: true })` before writeFile |

---

## 🔄 Customization

### Change the model

In `index.ts`, update:

```ts
model: "llama-3.3-70b-versatile",  // fast + smart
// model: "mixtral-8x7b-32768",    // alternative
// model: "gemma2-9b-it",          // lighter option
```

### Change what gets generated

Edit the user message in `index.ts`:

```ts
content: "Create a [your idea] using HTML, Tailwind CSS and JavaScript",
```

### Use a different LLM provider

The agent uses the OpenAI SDK with Groq's base URL. To switch providers, just change `baseURL` and `apiKey`:

```ts
// OpenAI
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Groq (default)
const client = new OpenAI({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_API_KEY,
});

// Ollama (local)
const client = new OpenAI({
  baseURL: "http://localhost:11434/v1",
  apiKey: "ollama",
});
```

---

## 🗺️ Roadmap

- [ ] Accept prompt as a CLI argument (`bun index.ts "Create a chat app"`)
- [ ] Support multi-turn conversation (refine generated code interactively)
- [ ] Auto-open the generated `index.html` in the browser after creation
- [ ] Add a `--dry-run` flag to preview files without writing
- [ ] Support React / Vue / Svelte project scaffolding
- [ ] Add a simple web UI frontend

---

## 📜 License

MIT — free to use, modify, and distribute.

---

## 🙌 Acknowledgements

- [Groq](https://groq.com) for blazing-fast LLM inference
- [Meta](https://ai.meta.com) for the Llama 3 model family
- [Bun](https://bun.sh) for making TypeScript tooling fast and simple
