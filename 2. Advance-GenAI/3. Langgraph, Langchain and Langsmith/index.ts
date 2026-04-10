import { tool } from '@langchain/core/tools';
import { z } from 'zod';

const multiply  = tool(async ({ a, b }: { a: number, b: number }) => {
    return a*b;
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

