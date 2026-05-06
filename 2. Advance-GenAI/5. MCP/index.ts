import { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import { z } from 'zod'

const server = new McpServer({
    name: "Weather MCP Server",
    description: "Weather Data Fetcher MCP server",
    version: "1.0.0",
});

async function getWeatherByCityName(city: string) {
    if (city.toLowerCase() == 'varansi') {
        return { temp: '30C', forecast: 'sunny' }
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
}

server.tool(
    'getWeatherByCityName',
    {
        city: z.string(),
    },
    async ({ city }) => {
        return {
            content: [{
                type: "text",
                text: JSON.stringify(getWeatherByCityName(city))
            }]
        }
    }
)