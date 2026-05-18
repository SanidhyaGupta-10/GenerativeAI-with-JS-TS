# AI Chat PDF - Server (Backend)

The backend of the **AI Chat PDF** application is a high-performance RESTful API built with Bun and Express. It powers the core Retrieval-Augmented Generation (RAG) pipeline, background PDF processing, and user synchronization.

## 🚀 Tech Stack

- **Runtime**: [Bun](https://bun.sh/) - Fast all-in-one JavaScript runtime.
- **Framework**: [Express](https://expressjs.com/) - Minimalist web framework.
- **ORM**: [Prisma](https://www.prisma.io/) - Next-generation Node.js and TypeScript ORM.
- **Database**: PostgreSQL (hosted on [Neon](https://neon.tech/)).
- **Vector Database**: [Qdrant](https://qdrant.tech/) - Highly performant vector search engine (run via Docker).
- **Queue System**: [BullMQ](https://docs.bullmq.io/) & [Redis](https://redis.io/) - For asynchronous background PDF processing.
- **AI / LLM**: [LangChain](https://js.langchain.com/) + [Groq](https://groq.com/) (Llama 3 70B) + Ollama (Embeddings).
- **Authentication**: [@clerk/express](https://clerk.com/docs/references/express/overview).

---

## 🏗️ Architecture & RAG Pipeline

The backend implements an advanced Retrieval-Augmented Generation (RAG) pipeline:
1. **Upload**: Users upload a PDF via the `/api/pdf/upload` endpoint.
2. **Queueing**: The file is saved locally to the `uploads/` directory, and a job is dispatched to BullMQ.
3. **Background Processing (Worker)**:
   - A dedicated background worker picks up the job.
   - The PDF is parsed and split into overlapping chunks (using LangChain's `RecursiveCharacterTextSplitter`).
   - Text chunks are passed through an embedding model (e.g., via Ollama/Groq) to generate dense vector representations.
   - The embeddings are ingested into a **Qdrant** vector database collection.
4. **Chat**: When a user asks a question, the `/api/chats/chat-with-pdf` endpoint queries Qdrant for the most relevant document chunks. Those chunks are injected as context into the prompt sent to the LLM (Groq Llama 3) to generate an accurate, grounded answer.

---

## 🛣️ API Endpoints

### User Service (`/api/user`)
- **`POST /create-user`**
  - **Middleware**: `clerkMiddleware`, `authMiddleware`
  - **Description**: Synchronizes the authenticated Clerk user with the local PostgreSQL database. Creates a new user record or updates an existing one (Upsert).

### PDF Upload Service (`/api/pdf`)
- **`POST /upload`**
  - **Middleware**: `upload.single("pdfFile")` (Multer)
  - **Description**: Receives a PDF file upload, saves it to disk (`/uploads`), and queues a `PDF_PROCESSING` job to BullMQ for asynchronous embedding extraction.

### Chat Service (`/api/chats`)
- **`POST /chat-with-pdf`**
  - **Middleware**: `authMiddleware`
  - **Body**: `{ "query": "Your question here" }`
  - **Description**: Performs a semantic search in Qdrant based on the user's query, retrieves top context chunks, and uses Groq's LLM to generate a conversational response.

---

## 🗄️ Database Schema (Prisma)

The structured PostgreSQL database consists of three primary models:

```prisma
model User {
  id        String   @id           // Clerk userId
  email     String   @unique
  name      String?
  imageUrl  String?
  createdAt DateTime @default(now())
  chats     Chat[]
}

model Chat {
  id        String    @id @default(uuid())
  name      String?
  userId    String
  user      User      @relation(fields: [userId], references: [id])
  messages  Message[]
}

model Message {
  id        String   @id @default(uuid())
  chatId    String
  chat      Chat     @relation(fields: [chatId], references: [id])
  content   String?  // The actual text content
  createdAt DateTime @default(now())
}
```

---

## 🛠️ Installation & Setup

### Prerequisites
- [Bun](https://bun.sh/)
- [Docker](https://www.docker.com/) (Required for running Redis and Qdrant)
- A [Groq](https://groq.com/) API Key for LLM access
- A [Clerk](https://clerk.com/) Secret Key for auth validation
- A PostgreSQL connection string (e.g., from Neon)

### 1. Start Infrastructure (Docker)
You must have Redis and Qdrant running locally for the queue and vector store.
```bash
# Start Redis
docker run -d --name redis-stack -p 6379:6379 redis/redis-stack:latest

# Start Qdrant
docker run -d -p 6333:6333 -p 6334:6334 qdrant/qdrant
```

### 2. Clone & Install
```bash
cd server
bun install
```

### 3. Environment Variables
Create a `.env` file in the `server` root directory:
```env
# Database
DATABASE_URL=postgresql://user:password@host/dbname

# Clerk Authentication
CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# AI Models
GROQ_API_KEY=gsk_...

# Frontend Connection
FRONTEND_URL=http://localhost:3000
```

### 4. Database Setup
Push the schema to your Neon Postgres database and generate the Prisma Client:
```bash
bun run db:push
bun run db:generate
```

### 5. Run the Application
You need to run **two** separate processes for the backend to function fully:

**Process 1: The API Server**
```bash
bun run dev
```

**Process 2: The Background Worker (BullMQ PDF Processor)**
```bash
bun run dev:worker
```

## 📜 Available Scripts

- `bun run dev`: Starts the main API server with hot-reloading.
- `bun run dev:worker`: Starts the BullMQ background worker to process PDF queues.
- `bun run db:generate`: Generates the Prisma Client based on `schema.prisma`.
- `bun run db:push`: Pushes schema changes directly to the connected database.
