# Weather MCP Server 🌦️

[![Specification](https://img.shields.io/badge/Protocol-Anthropic-blue)](https://mcp.io)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Runtime: Bun](https://img.shields.io/badge/Runtime-Bun-black)](https://bun.sh)

A lightweight Model Context Protocol (MCP) server that provides real-time (mocked) weather data for major Indian cities. This server demonstrates how to bridge the gap between LLMs and external APIs (or datasets) using the MCP standard.

---

## 🛠️ How It Works

This project implements a **Weather MCP Server** that communicates with an MCP Host (like Claude Desktop or Cursor) via **Standard Input/Output (STDIO)**.

### 1. Technology Stack
- **Runtime:** [Bun](https://bun.sh) (for fast execution and built-in TS support).
- **Protocol:** [@modelcontextprotocol/server](https://www.npmjs.com/package/@modelcontextprotocol/server).
- **Validation:** [Zod](https://zod.dev) for type-safe input schemas.
- **Conversion:** `zod-to-json-schema` to satisfy the MCP specification.

### 2. Implementation Logic (`index.ts`)
The server defines a core tool called `getWeatherByCityName`. Here's the breakdown of the code:

#### **A. Zod Schema Bridge**
MCP expects schemas in a specific JSON format. We use a helper function `withJsonSchema` to automatically convert Zod objects into the expected `StandardSchemaWithJSON` format:
```typescript
const withJsonSchema = <T extends z.ZodTypeAny>(schema: T) => {
    return {
        ...schema,
        "~standard": {
            ...schema["~standard"],
            jsonSchema: zodToJsonSchema(schema),
        },
    } as any;
};
```

#### **B. Data Handling**
The `getWeatherByCityName` function simulates an API call. It currently provides data for:
- **Varanasi:** 30°C, Sunny
- **Mumbai:** 26°C, Rainy
- **Bangalore:** 24°C, Cloudy
- **Delhi:** 26°C, Rainy

#### **C. Tool Registration**
The tool is registered with a description and input schema, allowing the LLM to understand *when* and *how* to call it.
```typescript
server.registerTool(
    'getWeatherByCityName',
    {
        description: 'Get the current weather for a city',
        inputSchema: withJsonSchema(z.object({
            city: z.string(),
        })),
    },
    async ({ city }) => { ... }
);
```

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have [Bun](https://bun.sh) installed on your machine.

### 2. Installation
```bash
bun install
```

### 3. Local Development
You can run the server directly to verify it starts without errors:
```bash
bun index.ts
```
*Note: Since it uses STDIO, you won't see much output unless there's an error. It expects to communicate with an MCP client.*

### 4. Integration with Claude Desktop
To use this server in Claude Desktop, add it to your configuration file:

**Windows:** `%APPDATA%\Claude\claude_desktop_config.json`  
**macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "weather-mcp": {
      "command": "bun",
      "args": ["run", "D:/4. GenAI/2. Advance-GenAI/5. MCP/index.ts"]
    }
  }
}
```
*(Update the path to match your local repository location)*

---

## 🏗️ MCP Architecture Overview

The Model Context Protocol (MCP) is an open standard that standardizes how applications provide context to LLMs. Think of it as the **"USB-C port for AI applications"**.

*   **MCP Host:** The user-facing application (e.g., Claude Desktop, Cursor IDE).
-   **MCP Client:** The internal layer within the host that manages the connection.
-   **MCP Server:** Lightweight programs (like this one) that expose specific capabilities.

---

## 🤝 Contributing & Community

*   [Official MCP Documentation](https://modelcontextprotocol.io)
*   [MCP SDK on GitHub](https://github.com/modelcontextprotocol)

---
*Created as part of the Advance GenAI Learning Path.*