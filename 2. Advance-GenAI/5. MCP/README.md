# Model Context Protocol (MCP)

[![Specification](https://img.shields.io/badge/Protocol-Anthropic-blue)](https://mcp.io)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

The Model Context Protocol (MCP) is an open standard introduced by Anthropic that standardizes how applications provide context to Large Language Models (LLMs). Think of MCP as the **"USB-C port for AI applications"**—providing a universal connector between AI models and diverse data sources or tools.

## 🚀 The Problem MCP Solves

LLMs face two major hurdles in real-world production:
1.  **Stale Knowledge:** LLMs are frozen in time based on their training data. They lack access to real-time information or private datasets.
2.  **Context Efficiency:** Manually stuffing massive amounts of data into a prompt is expensive (token costs) and often hits context window limits.

**The Solution:** MCP allows LLMs to intelligently request and fetch only the specific, structured context they need, exactly when they need it.

---

## 🏗️ Core Architecture

The MCP ecosystem is built on a three-tier architecture:

*   **MCP Host:** The user-facing application (e.g., Claude Desktop, Cursor IDE).
*   **MCP Client:** The internal layer within the host that manages the connection to servers.
*   **MCP Server:** Lightweight programs that expose specific capabilities (API pings, database queries, file reading) through the standardized protocol.

---

## 🛠️ Key Capabilities

An MCP server provides three primary methods to inject context:

| Feature | Description | Example |
| :--- | :--- | :--- |
| **Tools** | Executable functions the LLM can call to perform actions or fetch data. | Fetching current weather for a specific city. |
| **Prompts** | Reusable templates and workflows that help users structure requests. | A pre-defined template for code reviews. |
| **Resources** | Direct exposure to raw data sources. | Reading database records or a local `.txt` file. |

---

## 📡 Transport Mechanisms

MCP supports two communication methods to bridge the host and the server:

### 1. STDIO (Standard Input/Output)
*   **How it works:** Communication happens locally via terminal streams (`stdin`/`stdout`).
*   **Use Case:** Ideal for local integrations and personal productivity tools.
*   **Requirement:** The server code must be installed and running on the user's local machine.

### 2. SSE (Server-Sent Events)
*   **How it works:** Communication via HTTP POST requests and streaming.
*   **Use Case:** Remote hosting on the cloud or custom domains.
*   **Requirement:** Users connect via a URL; no local source code execution is required.

---

## 💻 Building an MCP Server

Developers can build servers using TypeScript, Python, or Java. The standard workflow includes:

1.  **Setup:** Install the official SDK:
    ```bash
    npm install @modelcontextprotocol/sdk
    ```
2.  **Define Tools:** Use validation libraries like `Zod` to define parameters.
    ```typescript
    // Example: Defining a weather tool
    {
      name: "get_weather",
      parameters: z.object({ city: z.string() })
    }
    ```
3.  **Implement Logic:** Write the function that performs the task.
4.  **Configure Transport:** Connect to `StdioServerTransport` or SSE.
5.  **Registration:** Register the server in your host settings (e.g., `claude_desktop_config.json`).

---

## 🔮 The Future of MCP

The goal is universal interoperability. Major platforms like **GitHub, Slack, Discord, and Google** are expected to host official MCP servers. This will create a plug-and-play ecosystem where users can instantly grant their preferred AI agent access to their professional and personal data silos through a single, unified protocol.

---

## 🤝 Contributing & Community

*   [Check the official Documentation](https://modelcontextprotocol.io)
*   [Explore the SDK on GitHub](https://github.com/modelcontextprotocol)

---
*Note: This README is based on the Model Context Protocol introduced by Anthropic.*