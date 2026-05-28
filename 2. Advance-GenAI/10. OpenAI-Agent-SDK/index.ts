import { OpenAI } from 'openai';
import { Agent, OpenAIChatCompletionsModel, run, setTracingDisabled, tool } from '@openai/agents';
import { z } from 'zod';
import axios from 'axios';

// Disable tracing to remove the terminal warnings
setTracingDisabled(true);

// 1. Initialize OpenAI client to point to your local Ollama instance
const ollamaClient = new OpenAI({
    baseURL: 'http://localhost:11434/v1/',
    apiKey: 'ollama', // Required by the SDK but ignored by Ollama
    dangerouslyAllowBrowser: true
});

// 2. Configure the model wrapper with the custom client
const ollamaModel = new OpenAIChatCompletionsModel(
    ollamaClient, // 1st: The OpenAI client instance
    'llama3.2:latest'    // 2nd: The model name string
);

const getWeatherInfoByCity = tool({
    name: 'getWeatherInfoByCity',
    description: 'Get weather information by city',
    parameters: z.object({
        city: z.string().describe('City name')
    }),
    execute: async ({ city }) => {
        console.log(`Getting weather for ${city}...`);
        try {
            const url = `https://wttr.in/${encodeURIComponent(city.toLowerCase())}?format=3`;
            const response = await axios.get(url, {
                headers: {
                    Accept: 'text/plain'
                }
            });
            console.log("Weather response received:", response.data.trim());
            return response.data.trim();
        } catch (error) {
            console.error("Error fetching weather:", error);
            return `Failed to retrieve weather for ${city}.`;
        }
    }
})

// 3. Define a simple agent that can answer questions
const All_Rounder_Agent = new Agent({
    model: ollamaModel,
    name: 'All-Rounder',
    instructions: 'You are a very powerful agent, use function calling when required and you give response in very accurate and text format.',
    tools: [getWeatherInfoByCity]
});

// 4. Create a main async function to run the agent
async function main(query = 'Hi, How are you?') {
    console.log('Starting agent...');

    try {
        // Run the agent with a user message
        const result = await run(All_Rounder_Agent, query, { maxTurns: 10 });

        // Log the final response
        console.log('Agent Response:', result.finalOutput);

    } catch (error) {
        console.error('Error running agent:', error);
    }
}

// Run the main function
main(`What's the current weather in Varansi? I need to decide what to wear.`);
