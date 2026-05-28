import { tool } from '@langchain/core/tools';
import { z } from 'zod';
import { ChatGroq } from "@langchain/groq";
import { MessagesAnnotation, StateGraph } from '@langchain/langgraph';
import { AIMessage } from '@langchain/core/messages';
import type { ToolMessage, ToolCall } from '@langchain/core/messages';
import dotenv from "dotenv";
dotenv.config();


const apiKey = process.env.GROQ_API_KEY;

const llm = new ChatGroq({
  apiKey: apiKey,
  model: "llama-3.3-70b-versatile",
});


const multiply  = tool(async ({ a, b }: { a: number, b: number }) => {
    return a * b;
}, {
    name: 'multiply',
    description: 'Multiplies two numbers',
    schema: z.object({
        a: z.number(),
        b: z.number()
    })
});

const add = tool(async ({ a, b }: { a: number, b: number }) => {
    return a+b;
}, {
    name: 'add',
    description: 'Adds two numbers',
    schema: z.object({
        a: z.number(),
        b: z.number()
    })
});

const divide = tool(async ({ a, b }: { a: number, b: number }) => {
    if (b === 0) {
        throw new Error('Cannot divide by zero');
    }
    return a/b;
}, {
    name: 'divide',
    description: 'Divides two numbers',
    schema: z.object({
        a: z.number(),
        b: z.number()
    })
});

const tools = [multiply, add, divide];
const toolByName = Object.fromEntries(tools.map((tool) => [tool.name, tool]));
const llmWithTools = llm.bindTools(tools);


async function llmCall(state: typeof MessagesAnnotation.State) {
    const response = await llmWithTools.invoke([
        {
            role: 'system',
            content: 'You are a helpful assistant.'
        },
        ...state.messages
    ]);
    return { 
        messages: [response] 
    };
};

async function toolNode(state: typeof MessagesAnnotation.State) {
    const lastMessage = state.messages.at(-1);

    if (
        !lastMessage || 
        !(lastMessage instanceof AIMessage) || 
        !lastMessage.tool_calls?.length
    ) {
        return { messages: [] };
    }

    const toolMessages = await Promise.all(
        (lastMessage.tool_calls as ToolCall[]).map(async (toolCall: ToolCall) => {
            const tool = toolByName[toolCall.name];
            if (!tool) {
                return {
                    role: "tool",
                    content: `Error: Tool ${toolCall.name} not found.`,
                    tool_call_id: toolCall.id!,
                };
            }

            const result = await tool.invoke(toolCall);
            return {
                role: "tool",
                content: typeof result === "string" ? result : JSON.stringify(result),
                tool_call_id: toolCall.id!,
            };
        })
    );

    return { messages: toolMessages };
};

function shouldContinue(state: typeof MessagesAnnotation.State) {
    const lastMessage = state.messages.at(-1);
    if (
        lastMessage &&
        lastMessage instanceof AIMessage &&
        lastMessage.tool_calls?.length
    ) {
        return "tools";
    }
    return "end";
};

const workflow = new StateGraph(MessagesAnnotation)
    .addNode("llmCall", llmCall)
    .addNode("tools", toolNode)
    .addEdge("__start__", "llmCall")
    .addConditionalEdges(
        "llmCall",
        shouldContinue,
        {
            tools: "tools",
            end: "__end__"
        }
    )
    .addEdge("tools", "llmCall");

const app = workflow.compile();

const messages = [{
    role: "user",
    content: "Add 12 + 18, then divide it from 5, and then multiply it by 6"
}];

const result = await app.invoke({ messages });
console.log(result.messages);