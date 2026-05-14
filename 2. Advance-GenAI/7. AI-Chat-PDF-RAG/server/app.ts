import express from 'express';
import {
    clerkMiddleware
} from '@clerk/express';
import userRouter from './services/user/user.routes';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));
app.use(clerkMiddleware());

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to AI Chat PDF RAG'
    })
});

app.use('/api/user', userRouter)

export default app;