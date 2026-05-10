# 🤖 LLM Fundamentals: A Complete Guide to Modern AI Systems

> **A Comprehensive Guide to Large Language Models, Prompt Engineering, RAG, and Structured Outputs.**
> Production Ready Patterns • Practical Examples

---

## 📑 Contents
1. [Tokens — The Building Blocks](#1-tokens--the-building-blocks)
2. [Temperature — Controlling Creativity](#2-temperature--controlling-creativity)
3. [Hallucination — The Accuracy Challenge](#3-hallucination--the-accuracy-challenge)
4. [Context Window — Memory Capacity](#4-context-window--memory-capacity)
5. [Prompt Design — The CO-STAR Framework](#5-prompt-design--the-co-star-framework)
6. [Few-Shot Learning — Examples as Instructions](#6-few-shot-learning--examples-as-instructions)
7. [Formatting & Instructions](#7-formatting--instructions)
8. [JSON Outputs — Programmable Data](#8-json-outputs--programmable-data)
9. [Zod Validation — Type-Safe Schemas](#9-zod-validation--type-safe-schemas)
10. [Validation & Retry Strategies](#10-validation--retry-strategies)
11. [Embeddings — Semantic Representations](#11-embeddings--semantic-representations)
12. [Vector Databases — Specialized Storage](#12-vector-databases--specialized-storage)
13. [RAG Architecture — Retrieval-Augmented Generation](#13-rag-architecture--retrieval-augmented-generation)
14. [Search Strategies & Optimization](#14-search-strategies--optimization)

---

## 1. Tokens — The Building Blocks
Tokens are the fundamental units of text processing in Large Language Models. They are not exactly words but rather chunks of text that models use as their basic input and output units. Understanding tokens is critical because **pricing, rate limits, and context windows all depend on token counts**.

A useful rule of thumb: **one token is roughly ¾ of an English word**. This means 100 tokens translate to about 75 words.

### 📊 Key Metrics
| Metric | Value |
| :--- | :--- |
| **1 Token** | ≈ ¾ word |
| **100 Tokens** | ≈ 75 words |
| **GPT-4 Turbo** | 128K context |
| **Claude 3** | 200K context |

```python
# Tokenization example with tiktoken (OpenAI)
import tiktoken

enc = tiktoken.get_encoding("cl100k_base")
tokens = enc.encode("Hello, world!")
print(tokens)  # [9906, 11, 1917, 0]
print(len(tokens))  # 4 tokens
```

> [!TIP]
> **Best Practice:** Always reserve 10-20% of your context window for the model's response. Use token counting libraries like `tiktoken` or `transformers` before sending requests.

---

## 2. Temperature — Controlling Creativity
Temperature controls the randomness of model outputs. It scales the logits before softmax, reshaping the probability distribution.

| Temperature | Behavior | Best For |
| :--- | :--- | :--- |
| **0.0 – 0.3** | Deterministic, focused | Code, extraction, factual QA |
| **0.4 – 0.7** | Balanced | Conversation, writing, summaries |
| **0.8 – 1.2** | Creative, surprising | Storytelling, brainstorming, poetry |

> [!NOTE]
> **Top P (Nucleus Sampling):** Selects from the top cumulative probability threshold (e.g., 0.9). Often used with temperature for better control.

---

## 3. Hallucination — The Accuracy Challenge
Hallucination occurs when LLMs generate plausible but incorrect information. Even GPT-4 can hallucinate ~15-20% of the time on complex queries.

### ⚠️ Mitigation Strategies
*   **RAG:** Ground responses in retrieved documents.
*   **Lower Temperature:** Reduce randomness for factual tasks.
*   **System Prompts:** "If uncertain, say 'I don't know'."
*   **Chain of Thought:** Force step-by-step reasoning.
*   **Output Validation:** Use secondary models or rule-based checks.

---

## 4. Context Window — Memory Capacity
The model's "working memory".

| Model | Context Window | ≈ Pages |
| :--- | :--- | :--- |
| GPT-3.5 Turbo | 16K tokens | ~24 pages |
| GPT-4 Turbo | 128K tokens | ~192 pages |
| Claude 3 Opus | 200K tokens | ~300 pages |
| Gemini 1.5 Pro | 1M tokens | ~1,500 pages |

---

## 5. Prompt Design — The CO-STAR Framework
A structured approach to prompt engineering:

*   **C (Context):** Background details.
*   **O (Objective):** Clear goal.
*   **S (Style):** Tone and format.
*   **T (Tone):** Attitude/Voice.
*   **A (Audience):** Target reader.
*   **R (Response):** Output structure.

```markdown
<system>You are a technical documentation writer.</system>
<task>Explain RAG to beginners.</task>
<constraints>- Use analogies - Under 100 words</constraints>
<format>Markdown bullet points.</format>
```

---

## 6. Few-Shot Learning — Examples as Instructions
Providing examples (shots) improves accuracy by **20-40%**.

*   **Zero-shot:** No examples.
*   **Few-shot:** 2-10 examples (optimal).

```text
Input: "I love this!" → Positive
Input: "This is terrible." → Negative
Input: "It's okay." → Neutral
Input: "Terrible quality." → Negative
```

---

## 7. Formatting & Instructions
Use **XML tags** (`<instruction>`, `<context>`) or **delimiters** (` ``` `, `---`) for structure.

> [!NOTE]
> **Chain of Thought (CoT):** "Think step-by-step." This improves reasoning accuracy by 30-50%.

---

## 8. JSON Outputs — Programmable Data
Methods for structure:
1.  **OpenAI Function Calling:** Native support.
2.  **JSON Mode:** `response_format: { "type": "json_object" }`.
3.  **Prompt Engineering:** Explicit schema in prompt.

---

## 9. Zod Validation — Type-Safe Schemas
Zod ensures LLM outputs match your TypeScript types.

```typescript
import { z } from 'zod';

const UserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  role: z.enum(['admin', 'user'])
});

const result = UserSchema.safeParse(llmOutput);
```

---

## 10. Validation & Retry Strategies
*   **Schema Validation:** Types/Structure.
*   **Safety Validation:** Filtering harm.
*   **Smart Retry:** Include validation errors in the next prompt for self-correction.

---

## 11. Embeddings — Semantic Representations
Numerical vectors representing meaning.

| Metric | Value |
| :--- | :--- |
| **Dimensions** | 384 - 3072 |
| **Similarity** | Cosine Similarity |
| **Highly Similar** | > 0.8 |

---

## 12. Vector Databases — Specialized Storage
Optimized for semantic search at scale.

*   **Pinecone:** Managed, high performance.
*   **Chroma:** Lightweight, local prototyping.
*   **pgvector:** PostgreSQL extension.
*   **Algorithms:** HNSW (fastest), IVF (efficient).

---

## 13. RAG Architecture — Retrieval-Augmented Generation
1.  **Indexing:** Chunk → Embed → Store.
2.  **Retrieval:** Query → Semantic Search → Context.
3.  **Generation:** Context + Prompt → LLM → Grounded Answer.

---

## 14. Search Strategies & Optimization
*   **Hybrid Search:** Semantic + Keyword (BM25).
*   **Chunking:** 512 tokens with 10-20% overlap.
*   **Reranking:** Cross-encoders to refine results.
*   **HyDE:** Hypothetical Document Embeddings.

---

## 📈 Success Metrics to Track
*   **Precision@k / Recall@k**
*   **Hallucination Rate**
*   **Retrieval Relevance (>85%)**

---
*Stay tuned to learn Generative AI!*