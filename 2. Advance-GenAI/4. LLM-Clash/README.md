<div align="center">

# ⚔️ LLM CLASH ⚔️

![Banner](assets/banner.png)

<p align="center">
  <img src="https://img.shields.io/badge/Bun-000000?style=flat-square&logo=bun&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Groq-F3D122?style=flat-square&logo=groq&logoColor=black" />
</p>

**High-speed LLM debate orchestration via Groq & Bun.**

---

[Features](#-features) • [Deployment](#-deployment) • [Architecture](#-architecture) • [Configuration](#-configuration)

</div>

---

## 📖 Introduction

**LLM Clash** pits two specialized AI agents against each other in a real-time, multi-turn debate. Engineered for extreme low latency, it showcases the power of the **Groq LPU Inference Engine** combined with the efficiency of the **Bun** runtime.

### 🎭 Agent Personas

| Role | Model | Personality | Approach |
| :--- | :--- | :--- | :--- |
| **Agent A** 🔴 | `Llama-3.3-70b` | **The Aggressor** | Assertive, high-pressure, logical dominance. |
| **Agent B** 🔵 | `GPT-OSS-20b` | **The Logician** | Calm, composed, analytical de-escalation. |

---

## 🚀 Deployment

### 1. Installation
```bash
bun install
```

### 2. Configuration
```bash
# Windows
$env:GROQ_API_KEY="your_api_key"

# Unix
export GROQ_API_KEY="your_api_key"
```

### 3. Execution
```bash
bun run index.ts
```

---

## 🛠️ Architecture

```mermaid
graph LR
    Start([Start]) --> A[Agent A Turn]
    A --> B[Agent B Turn]
    B --> C{Max Turns?}
    C -- No --> A
    C -- Yes --> End([End])
    
    style Start fill:#000,stroke:#fff,color:#fff
    style End fill:#000,stroke:#fff,color:#fff
    style A fill:#ff4d4d,stroke:#000,color:#fff
    style B fill:#4da6ff,stroke:#000,color:#fff
```

---

## 📦 Tech Stack

- **Runtime Engine** 🏃 `Bun`
- **Primary Language** 📘 `TypeScript`
- **Inference Engine** 🧠 `Groq SDK`
- **Models** 🤖 `Llama 3.3` & `GPT-OSS`

---

## ✨ Key Features

- 🏎️ **Instant Response**: Real-time streaming from Groq.
- 🛡️ **Type-Safe**: Developed entirely in TypeScript.
- 🎭 **Context-Aware**: Full conversation history management.
- 🔌 **Extensible**: Support for DeepSeek and more providers.

---

<div align="center">

### 🤝 Community
[Contribute](#-contributing) • [License](LICENSE)

**Developed with precision by Sanidhya Gupta**

</div>
