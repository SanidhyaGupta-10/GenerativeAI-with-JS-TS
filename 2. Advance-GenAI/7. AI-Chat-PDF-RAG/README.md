# AI Chat PDF RAG

A powerful full-stack application that allows users to upload PDF documents and have interactive conversations with them using AI. This project utilizes Retrieval-Augmented Generation (RAG) to provide context-aware answers based on the uploaded documents.

## 🚀 Overview

This repository is divided into two main parts:
- **Client**: A modern Next.js frontend with a premium UI/UX.
- **Server**: A robust Express backend powered by Bun, Prisma, and PostgreSQL.

## 🛠️ Tech Stack

### Frontend (Client)
- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with a focus on Glassmorphism and modern aesthetics.
- **Authentication**: [Clerk](https://clerk.com/) for seamless user management.
- **Icons**: [Lucide React](https://lucide.dev/)
- **HTTP Client**: [Axios](https://axios-http.com/)

### Backend (Server)
- **Runtime**: [Bun](https://bun.sh/)
- **Framework**: [Express](https://expressjs.com/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Database**: PostgreSQL (Neon)
- **Authentication**: Clerk Express Middleware
- **File Handling**: [Multer](https://github.com/expressjs/multer) for PDF uploads.

## 📂 Project Structure

```text
.
├── client/          # Next.js frontend
└── server/          # Express backend
```

## 🏗️ Architecture

The application follows a standard client-server architecture:
1. **User Authentication**: Handled by Clerk on the frontend.
2. **User Synchronization**: When a user signs up/logs in, the client triggers a sync request to the server to store/update user data in the PostgreSQL database.
3. **PDF Upload**: Users upload PDFs via the frontend. The file is sent to the server, processed, and stored (local storage currently).
4. **Chat Interface**: An interactive chat interface allows users to ask questions about the uploaded PDF.

## 🚦 Getting Started

### Prerequisites
- [Bun](https://bun.sh/) installed.
- A PostgreSQL database (e.g., [Neon](https://neon.tech/)).
- A [Clerk](https://clerk.com/) account and project.

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Setup the Server:
   ```bash
   cd server
   bun install
   # Create a .env file and add your DATABASE_URL and Clerk keys
   npx prisma generate
   bun run dev
   ```

3. Setup the Client:
   ```bash
   cd client
   bun install
   # Create a .env file and add your Next.js Clerk keys
   bun run dev
   ```

## 📜 Documentation

For more detailed information, check the individual READMEs:
- [Client Documentation](./client/README.md)
- [Server Documentation](./server/README.md)
