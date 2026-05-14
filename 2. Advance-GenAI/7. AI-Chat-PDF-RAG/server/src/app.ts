import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to AI Chat PDF RAG'   
    })
});

export default app;