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
  'qwen2.5-coder:1.5b'    // 2nd: The model name string
);

const getWeatherInfoByCity = tool({
  name: 'getWeatherInfoByCity',
  description: 'Get weather information by city',
  parameters: z.object({
    city: z.string().describe('City name')
  }),
  execute: async ({ city }) => {
    console.log(`Getting weather for ${city}...`);
    const url = `https://wttr.in/${city.toLowerCase}?format=%C+%t`;
    const response = await axios.get(url, { responseType: 'text' });
    console.log("Type of data: ", typeof response.data);
    return `Weather in ${city} is ${response.data.weather[0].description} with a temperature of ${response.data.main.temp} °C.`;
  }
})

// 3. Define a simple agent that can answer questions
const All_Rounder_Agent = new Agent({
  model: ollamaModel,
  name: 'All-Rounder',
  instructions: 'You are a powerfull agent that can do coding, web_search, talking, text_generation, also answer mathematical questions and hepls user in their query',
  tools: [getWeatherInfoByCity]
});

// 4. Create a main async function to run the agent
async function main(query = 'Hi, How are you?') {
  console.log('Starting agent...');

  try {
    // Run the agent with a user message
    const result = await run(All_Rounder_Agent, query);

    // Log the final response
    console.log('Agent Response:', result.finalOutput);

  } catch (error) {
    console.error('Error running agent:', error);
  }
}

// Run the main function
main(`What's the current weather in Varansi? I need to decide what to wear.`);
