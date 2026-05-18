import { QdrantVectorStore } from "@langchain/qdrant";
import { embeddings, llm } from '../../db/ollama';
import type { Request, Response } from "express";

async function chat(req: Request, res: Response) {
    try {
        /**
         * 1. Fetch Query
         * 2. than vector search
         * 3. than create response from context
         * 4. than return response
         */
        const query = (req.body.query as string) || "What to learn in DSA";

        /**
         * Setup vector store
         */
        const vectorStore = await QdrantVectorStore.fromExistingCollection(
            embeddings,
            {
                url: "http://localhost:6333",
                collectionName: `pdf_chat_v1`,
            }
        );

        /**
         * Setup retriever
         */
        const retriever = vectorStore.asRetriever(
            {
                k: 2
            }
        );

        const result = await retriever.invoke(query);

        /**
         * Create response from context
         */
        const response = await llm.invoke([
            { role: "system", content: `You are a helpful assistant. Use the context to answer the question.` },
            { role: "user", content: `${query} . Context: ${JSON.stringify(result)}` }
        ]);
        res.json({ 
            message: "Success", 
            data: response 
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error });
    }

}

export { chat };