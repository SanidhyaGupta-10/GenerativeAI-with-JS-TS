// Clients
import OpenAI from 'openai'
import Groq from "groq-sdk";

import type { ChatCompletionMessageParam } from 'openai/resources/chat/completions.mjs'

function createGroqChatClient() {
    const GroqChatClient = new Groq({
        apiKey: process.env.GROQ_API_KEY
    });
};

function createDeepSeekClient() {
    const deepSeekChatClient = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
    });
    
    const messages: ChatCompletionMessageParam[] = [];

    return function(message:string, model:string = 'deepseek-reasoner') {
        const result = deepSeekChatClient.chat.completions.create({
            model,
            messages: [...messages, { role: 'user', content: message }]
        })
    }
}


