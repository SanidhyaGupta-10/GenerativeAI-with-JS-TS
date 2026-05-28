<div align="center">
  <img src="https://img.shields.io/badge/AI-Chat_PDF-4A90E2?style=for-the-badge&logo=openai&logoColor=white" alt="AI Chat PDF" />
  <h1>🤖 AI Chat PDF RAG</h1>
  <p><em>Chat with your PDFs using cutting-edge RAG (Retrieval-Augmented Generation) technology!</em></p>
  
  [![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
  [![Bun](https://img.shields.io/badge/Bun-Runtime-black?style=flat-square&logo=bun)](https://bun.sh/)
  [![Prisma](https://img.shields.io/badge/Prisma-ORM-1B222D?style=flat-square&logo=prisma)](https://prisma.io/)
  [![Qdrant](https://img.shields.io/badge/Qdrant-Vector_DB-EF4444?style=flat-square)](https://qdrant.tech/)
  [![LangChain](https://img.shields.io/badge/LangChain-AI-121212?style=flat-square)](https://langchain.com/)
</div>

<br />

Welcome to **AI Chat PDF RAG**, a powerful full-stack application that allows users to upload PDF documents and have intelligent, context-aware conversations with them. This project uses the latest in AI and RAG to understand your documents and give accurate answers!

---

## ✨ Features
- **Upload PDFs**: Fast and secure document upload and processing.
- **AI Chat Interface**: A beautiful glassmorphism-inspired chat UI.
- **RAG Architecture**: Highly accurate responses retrieved directly from your document context.
- **Modern Auth**: Seamless user authentication with Clerk.
- **Fast Execution**: Backend and frontend powered by Bun 🥟.

---

## 🛠️ Tech Stack

### 🖥️ Frontend (Client)
- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS (Glassmorphism design)
- **Auth**: Clerk
- **Icons**: Lucide React

### ⚙️ Backend (Server)
- **Runtime**: Bun
- **Framework**: Express
- **Database**: PostgreSQL (via Neon) + Prisma ORM
- **Vector DB**: Qdrant (via Docker)
- **AI/LLM**: LangChain + Groq / Ollama
- **Queue/Worker**: BullMQ & Redis (for PDF parsing & embedding)

---

## 🐳 Environment Setup Guides

### 1. Installing Docker (Required for Qdrant/Redis)
Docker is used to spin up our Vector Database (Qdrant) and Redis quickly.
- **Windows / Mac**: Download and install [Docker Desktop](https://www.docker.com/products/docker-desktop/).
- **Linux**: Follow the official guide to install [Docker Engine](https://docs.docker.com/engine/install/).

### 2. Installing Ollama (Optional - Local AI)
Ollama allows you to run open-source models (like Llama 3) entirely locally!
> ⚠️ **Warning**: Running LLMs locally requires significant RAM (8GB+ free RAM recommended).
- Download from [Ollama's Official Website](https://ollama.com/).
- Once installed, pull a model:
  ```bash
  ollama pull llama3
  ollama pull nomic-embed-text # For embeddings
  ```

### 3. The "No-Ollama" Route (Recommended for Low RAM) 🧠
If your PC is low on RAM, **skip Ollama entirely!** We have configured the project to support cloud-based providers via LangChain.
- **Groq API**: Offers blazing-fast LLaMA 3 inference for free. Get an API key from [GroqCloud](https://console.groq.com/).
- **OpenAI API**: Alternatively, use your OpenAI API key for GPT-3.5/4.
- Just add these keys to your `.env` (see below) and the backend will seamlessly use the cloud LLM instead!

---

## 🔑 Environment Variables

You need to create `.env` files in both the `client` and `server` folders.

### `server/.env`
```env
# Database (PostgreSQL)
DATABASE_URL="postgresql://user:pass@host/dbname?sslmode=verify-full"

# Server Ports
PORT=5000
FRONTEND_URL=http://localhost:3000

# Clerk Authentication (Get these from your Clerk dashboard)
CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# AI Provider (Add this if NOT using Ollama)
GROQ_API_KEY=gsk_...
```

### `client/.env`
```env
# Clerk Keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# API URL
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

## 🚀 Setup, Pull, Run, and Enjoy!

Follow these simple steps to get your project running.

### Step 1: Pull Docker Images (Vector DB & Redis)
Open your terminal and run Qdrant and Redis using Docker:
```bash
# Run Qdrant (Vector Database)
docker run -d -p 6333:6333 -p 6334:6334 -v qdrant_storage:/qdrant/storage qdrant/qdrant

# Run Redis (For BullMQ background workers)
docker run -d -p 6379:6379 redis
```

### Step 2: Setup the Server
Open a new terminal window:
```bash
cd server

# Install dependencies
bun install

# Sync database schema (Prisma)
bunx prisma db push
bunx prisma generate

# Run the backend and worker
bun run dev
bun run dev:worker
```

### Step 3: Setup the Client
Open another terminal window:
```bash
cd client

# Install dependencies
bun install

# Run the frontend
bun run dev
```

### 🎉 Step 4: Enjoy!
Open your browser and navigate to:
👉 **[http://localhost:3000](http://localhost:3000)**

Upload a PDF, watch it process, and start asking questions! 🎈

---

## 📂 Project Structure

```text
.
├── client/          # Next.js frontend (UI, Hooks, Components)
└── server/          # Express backend (LangChain, Qdrant, Prisma, Routes)
```

## 📜 Documentation

For more detailed information, check the individual READMEs:
- [Client Documentation](./client/README.md)
- [Server Documentation](./server/README.md)
