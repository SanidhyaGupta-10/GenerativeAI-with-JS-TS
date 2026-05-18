# AI Chat PDF - Client (Frontend)

The frontend of the **AI Chat PDF** application is a high-performance, aesthetically pleasing Next.js application designed to provide a seamless user experience for interacting with and querying PDF documents.

## ✨ Key Features

- **Premium UI/UX**: Built with a "glassmorphism" aesthetic, featuring smooth transitions, vibrant gradients, custom scrollbars, and modern typography.
- **Secure Authentication**: Fully integrated with **Clerk** for robust, secure, and customizable user sign-up and sign-in flows.
- **Interactive PDF Upload**: Simple drag-and-drop or click-to-upload interface for submitting PDF documents to the server.
- **AI Chat Interface**: Real-time conversational interface to query your documents, displaying both user prompts and AI responses with "Thinking" states.
- **Responsive Design**: Fully responsive layout that ensures an optimal viewing and interacting experience across desktop, tablet, and mobile devices.

## 🚀 Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Authentication**: [Clerk NextJS SDK](https://clerk.com/docs/references/nextjs/overview)
- **Icons**: [Lucide React](https://lucide.dev/)
- **HTTP Client**: [Axios](https://axios-http.com/)

---

## 📂 Folder Structure

```text
client/
├── app/               # Next.js App Router (pages, layouts, globals.css)
├── components/        # Reusable React UI components (Chat, Hero, FileUpload)
├── hooks/             # Custom React hooks containing business logic
├── lib/               # Utility functions and library configurations (Axios)
└── public/            # Static assets
```

## 🧩 Component Architecture

The application is structured into modular components for high maintainability:

- **`Hero.tsx`**: The main layout container for the home page, orchestrating the file upload and chat interfaces.
- **`FileUpload.tsx`**: A dedicated component for selecting and uploading PDF files to the backend, complete with loading states and UI feedback.
- **`Chat.tsx`**: The main conversational interface. It renders message history, handles user input, and manages automatic scrolling as new messages arrive.

## 🔄 Data Flow & Hooks

The client completely separates UI components from business logic using custom hooks:

### Custom Hooks
- **`useChat`**: Manages the core state for the AI conversation (`messages`, `input`, `isLoading`). It exposes a `sendMessage` function that pushes user input to the `/api/chats/chat-with-pdf` endpoint and processes the AI response.
- **`useFileUpload`**: Exposes the `uploadPDF` function, which securely attaches the user's Clerk Bearer token and sends `multipart/form-data` to the `/api/pdf/upload` endpoint.
- **`useUserSync`**: An effect hook that fires exactly once per authenticated session. It retrieves the Clerk session token and hits the `/api/user/create-user` endpoint to ensure the user exists in the local PostgreSQL database.

---

## 🛠️ Installation & Setup

### Prerequisites
- [Bun](https://bun.sh/) (or Node.js/npm)
- A [Clerk](https://clerk.com/) account for authentication keys.

### 1. Clone & Install
```bash
cd client
bun install
```

### 2. Environment Variables
Create a `.env` or `.env.local` file in the `client` root directory:
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 3. Run Development Server
```bash
bun run dev
```
Navigate to `http://localhost:3000` to view the application.

## 📜 Available Scripts

- `bun run dev`: Starts the Next.js development server with hot-module replacement.
- `bun run build`: Creates an optimized production build of the application.
- `bun run start`: Starts the application in production mode.
- `bun run lint`: Runs ESLint to check for code quality and errors.
