import express from 'express';
import {
    clerkMiddleware
} from '@clerk/express';
import userRouter from './services/user/user.routes';

const app = express();
app.use(clerkMiddleware());

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to AI Chat PDF RAG'
    })
});

app.use('/user', userRouter)

export default app;