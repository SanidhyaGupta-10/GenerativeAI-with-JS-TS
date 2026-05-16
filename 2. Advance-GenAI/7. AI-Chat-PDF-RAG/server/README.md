# AI Chat PDF - Server

The backend of the AI Chat PDF application is built with Bun and Express, providing a robust API for user synchronization, document management, and AI interaction.

## 🚀 Technologies

- **Runtime**: [Bun](https://bun.sh/) - Fast all-in-one JavaScript runtime.
- **Framework**: [Express](https://expressjs.com/) - Minimalist web framework for Node.js/Bun.
- **ORM**: [Prisma](https://www.prisma.io/) - Next-generation Node.js and TypeScript ORM.
- **Database**: PostgreSQL (hosted on [Neon](https://neon.tech/)).
- **Authentication**: [@clerk/express](https://clerk.com/docs/references/express/overview) for securing routes.
- **File Uploads**: [Multer](https://github.com/expressjs/multer) for handling multipart/form-data.

## 🛣️ API Routes

The server exposes the following endpoints:

### User Routes (`/api/user`)
- `POST /create-user`: Synchronizes the authenticated Clerk user with the local PostgreSQL database.
  - **Middleware**: `attachUser` (custom) + `clerkMiddleware`.
  - **Functionality**: Checks if the user exists in the DB; if not, it creates a new record.

### PDF Routes (`/api/pdf`)
- `POST /upload`: Handles PDF file uploads.
  - **Middleware**: `upload.single("pdfFile")` (Multer).
  - **Functionality**: Saves the uploaded PDF to the `uploads/` directory and returns the file path.

## 🏗️ Database Schema (Prisma)

The database consists of three primary models:

1. **User**: Stores information synced from Clerk (`id`, `email`, `name`, `imageUrl`).
2. **Chat**: Represents a conversation session linked to a specific user and document.
3. **Message**: Individual messages within a chat, storing content and timestamps.

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
  id        String    @id
  name      String?
  userId    String
  user      User      @relation(fields: [userId], references: [id])
  messages  Message[]
}

model Message {
  id        String   @id
  chatId    String
  chat      Chat     @relation(fields: [chatId], references: [id])
  content   String?  // Content of the message
  createdAt DateTime @default(now())
}
```

## 🔐 Middleware

- **clerkMiddleware**: Validates the Clerk session token.
- **attachUser**: A custom middleware that extracts user information from the Clerk session and attaches it to the request object for easy access in controllers.
- **file.middleware**: Configures Multer for secure and organized file storage.

## 🛠️ Development

### Scripts
- `bun run dev`: Starts the server with hot-reload using Bun.
- `bun run db:generate`: Generates the Prisma client.

### Environment Variables
Ensure you have a `.env` file with:
```env
DATABASE_URL=postgresql://...
CLERK_PUBLISHABLE_KEY=...
CLERK_SECRET_KEY=...
FRONTEND_URL=http://localhost:3000
```
