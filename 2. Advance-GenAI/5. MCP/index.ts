import { McpServer, StdioServerTransport } from '@modelcontextprotocol/server';
import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';

const server = new McpServer({
    name: "Weather MCP Server",
    description: "Weather Data Fetcher MCP server",
    version: "1.0.0",
});

// Helper to bridge Zod schemas to MCP's expected StandardSchemaWithJSON format
const withJsonSchema = <T extends z.ZodTypeAny>(schema: T) => {
    return {
        ...schema,
        "~standard": {
            ...schema["~standard"],
            jsonSchema: zodToJsonSchema(schema),
        },
    } as any;
};

async function getWeatherByCityName(city: string) {
    if (city.toLowerCase() === 'varanasi' || city.toLowerCase() === 'varansi') {
        return { temp: '30°C', forecast: 'sunny' }
    }
    if (city.toLowerCase() == 'mumbai') {
        return { temp: '26C', forecast: 'rainy' }
    }
    if (city.toLowerCase() == 'banglore') {
        return { temp: '24C', forecast: 'cloudy' }
    }
    if (city.toLowerCase() == 'delhi') {
        return { temp: '26C', forecast: 'rainy' }
    }
};

server.registerTool(
    'getWeatherByCityName',
    {
        description: 'Get the current weather for a city',
        inputSchema: withJsonSchema(z.object({
            city: z.string(),
        })),
    },
    async ({ city }: { city: string }) => {
        return {
            content: [{
                type: "text" as const,
                text: JSON.stringify(await getWeatherByCityName(city))
            }]
        }
    }
);

async function init(){
    try {
        const transport = new StdioServerTransport();
        await server.connect(transport);
        console.error("Weather MCP Server started successfully");
    } catch (error) {
        console.error("Failed to start Weather MCP Server:", error);
        process.exit(1);
    }
};

await init();