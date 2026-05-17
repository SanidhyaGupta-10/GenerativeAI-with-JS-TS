import { OllamaEmbeddings } from "@langchain/ollama";

// 1. Initialize Ollama LLM and Embeddings
// Use 'http://ollama:11434' if running inside another Docker container

export const embeddings = new OllamaEmbeddings({
    model: "nomic-embed-text",
    baseUrl: "http://localhost:11434",
});

