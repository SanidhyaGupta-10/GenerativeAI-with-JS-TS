# AI Chat PDF - Client

The frontend of the AI Chat PDF application is a high-performance, aesthetically pleasing Next.js application designed to provide a seamless user experience for interacting with PDF documents.

## ✨ Features

- **Premium UI/UX**: Built with a "glassmorphism" aesthetic, featuring smooth transitions, gradients, and modern typography.
- **Secure Authentication**: Integrated with Clerk for robust user sign-up and sign-in.
- **Interactive PDF Upload**: Simple drag-and-drop or click-to-upload interface for PDF documents.
- **AI Chat Interface**: Real-time chat interface to query your documents.
- **Responsive Design**: Fully responsive layout that works across desktop, tablet, and mobile.

## 🚀 Technologies

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Authentication**: [Clerk NextJS SDK](https://clerk.com/docs/references/nextjs/overview)
- **Icons**: [Lucide React](https://lucide.dev/)
- **HTTP Client**: [Axios](https://axios-http.com/)

## 📂 Component Architecture

The application is structured into modular components for maintainability:

- **Navbar**: Handles navigation and displays user authentication status using Clerk's `UserButton`.
- **Hero**: The landing page section that introduces the application.
- **FileUpload**: A dedicated component for selecting and uploading PDF files to the backend.
- **Chat**: The main interface for interacting with the AI, displaying messages and processing user input.

## 🔄 Data Flow & Hooks

The client uses custom hooks and a centralized Axios instance to communicate with the server:

### Custom Hooks
- **`useFileUpload`**: Manages the logic for sending PDF files to the `/api/pdf/upload` endpoint, including authentication token attachment.
- **Authentication Flow**: Uses Clerk's `useAuth` and `useUser` to manage session state and trigger user synchronization with the backend.

### API Integration
- **`lib/axios.ts`**: A pre-configured Axios instance with the base URL of the backend server.
- **Routes Hit**:
    - `POST /api/user/create-user`: Hit after successful login to ensure the user exists in the database.
    - `POST /api/pdf/upload`: Hit when a user selects a file in the `FileUpload` component.

## 🛠️ Development

### Scripts
- `bun run dev`: Starts the Next.js development server.
- `bun run build`: Creates an optimized production build.
- `bun run start`: Starts the production server.

### Environment Variables
Ensure you have a `.env` file with:
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
CLERK_SECRET_KEY=...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```
