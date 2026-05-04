// Clients
import OpenAI from 'openai'
import Groq from "groq-sdk";

import type { ChatCompletionMessageParam } from 'openai/resources/chat/completions.mjs'

function createGroqChatClient(systemPrompt: string) {
    const GroqChatClient = new Groq({
        apiKey: process.env.GROQ_API_KEY
    });

    const messages: ChatCompletionMessageParam[] = [{
        role: 'system',
        content: systemPrompt
    }];

    return async function (message: string, model: string = 'groq-reasoner') {
        // messages.push({
        //     role: 'user',
        //     content: message
        // });
        const response = await GroqChatClient.chat.completions.create({
            model,
            messages: [{ role: 'user', content: message }]
        })
        const assistantMessage = response.choices[0]?.message;
        if (assistantMessage) {
            messages.push({ role: 'assistant', content: assistantMessage.content });
        }
        return assistantMessage?.content || '';
    }


};

function createDeepSeekClient(systemPrompt: string) {
    const deepSeekChatClient = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
    });

    const messages: ChatCompletionMessageParam[] = [{
        role: 'system',
        content: systemPrompt
    }];

    return async function (message: string, model: string = 'deepseek-reasoner') {
        messages.push({
            role: 'user',
            content: message
        });

        const response = await deepSeekChatClient.chat.completions.create({
            model,
            messages
        })

        const assistantMessage = response.choices[0]?.message;
        if (assistantMessage) {
            messages.push({ role: 'assistant', content: assistantMessage.content });
        }
        return assistantMessage?.content || '';
    }
}


