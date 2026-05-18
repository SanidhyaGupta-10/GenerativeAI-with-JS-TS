import { QdrantVectorStore } from "@langchain/qdrant";
import { embeddings } from '../../db/ollama';
import type { Request, Response } from "express";

async function chat(req: Request, res: Response) {
    try {
        const query = (req.body.query as string) || "What to learn in DSA";
        const vectorStore = await QdrantVectorStore.fromExistingCollection(
            embeddings,
            {
                url: "http://localhost:6333",
                collectionName: `pdf_chat_v1`,
            }
        );
        const retriever = vectorStore.asRetriever(
            {   
                k: 5
            }
        );
        const docs = await retriever.invoke(query);
        console.log(docs);
        res.json({ message: "Success", data: docs });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }

}

export { chat };