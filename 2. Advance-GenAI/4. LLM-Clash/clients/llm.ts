// Clients
import OpenAI from 'openai'
import Groq from "groq-sdk";

import type { ChatCompletionMessageParam } from 'openai/resources/chat/completions.mjs'

const GroqChatClient = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

function createGroqChatClient(systemPrompt: string) {
    console.log('GroqChatClient initialized');
    const messages: ChatCompletionMessageParam[] = [{
        role: 'system',
        content: systemPrompt
    }];

    return async function (message: string, model: string = 'qwen/qwen3-32b') {
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
            messages.push({
                role: 'assistant',
                content: assistantMessage.content
            });
        }
        return assistantMessage?.content || '';
    }


};

function createGroqChatClient2(systemPrompt: string) {
    const GroqChatClient = new Groq({
        apiKey: process.env.GROQ_API_KEY
    });
    console.log('GroqChatClient2 initialized');
    const messages: ChatCompletionMessageParam[] = [{
        role: 'system',
        content: systemPrompt
    }];

    return async function (message: string, model: string = 'openai/gpt-oss-20b') {
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

export {
    createGroqChatClient,
    createGroqChatClient2
}

/*
function createDeepSeekClient(systemPrompt: string) {
    const deepSeekChatClient = new OpenAI({
        baseURL: 'https://api.deepseek.com/v1',
        apiKey: process.env.DEEPSEEK_API_KEY
    });

    console.log('DeepSeekChatClient initialized');

    const messages: ChatCompletionMessageParam[] = [{
        role: 'system',
        content: systemPrompt
    }];

    return async function (message: string, model: string = 'deepseek-chat') {
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
*/