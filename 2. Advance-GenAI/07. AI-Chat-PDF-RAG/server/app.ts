// Packages
import express from 'express';
import multer from 'multer';
import cors from 'cors';
import { clerkMiddleware } from '@clerk/express';

// Routes
import userRouter from './services/user/user.routes';
import pdfRouter from './services/pdf_upload/pdf.upload.routes';
import chatRouter from './services/chat/chat.routes';

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));

// Clerk Middleware
app.use(clerkMiddleware());

// Static Files
app.use('/uploads', express.static('uploads'));

// Routes
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to AI Chat PDF RAG'
    })
});

/*
 * API Routes
 */
app.use('/api/user', userRouter)
app.use('/api/pdf', pdfRouter)
app.use('/api/chats', chatRouter)

/*
 * Error Handling Middleware
 */
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: err.message, code: err.code });
    }
    if (err) {
        return res.status(500).json({ error: err.message || "Internal server error" });
    }
    next();
});

export default app;