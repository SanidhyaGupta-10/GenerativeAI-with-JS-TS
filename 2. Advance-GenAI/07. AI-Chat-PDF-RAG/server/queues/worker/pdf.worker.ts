import { Worker } from 'bullmq';
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { CharacterTextSplitter } from "@langchain/textsplitters";

import { QdrantVectorStore } from "@langchain/qdrant";
import { embeddings } from '../../db/ollama';

const connection = {
    host: "localhost",
    port: 6379,
};

const worker = new Worker('PDF-PROCESSING', async (job) => {
    // job.data is already parsed as an object if you passed an object to queue.add
    // const data = JSON.parse(job.data);
    // console.log(`Job: ${data}`);
    
    const data = job.data;
    console.log(`Job: ${JSON.stringify(data)}`);

    /* 
        Path: data.path
        read the pdf from path
        Split the pdf into chunks
        Generate embeddings for each chunk
        Store the embeddings in Qdrant with the pdf id and 
    */

    // Load the pdf
    const loader = new PDFLoader(data.path);
    const docs = await loader.load();

    console.log(`Loaded ${docs.length} pages`);
    
    const textSplitter = new CharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200,
    });
    const chunks = await textSplitter.splitDocuments(docs);
    console.log(`Generated ${chunks.length} chunks`);

    // 4. Store in Qdrant
     const vectorStore = await QdrantVectorStore.fromDocuments(
        chunks,
        embeddings, 
        {
            url: "http://localhost:6333",
            collectionName: `pdf_chat_v1`,
        }
    );
    console.log(`Vector Store created and ${chunks.length} documents added`);
}, { 
    concurrency: 5, 
    connection,
    // removeOnComplete: { count: 100 },
    // removeOnFail: { count: 1000 }
});

worker.on('completed', (job) => {
    console.log(`Job ${job.id} has completed!`);
});

worker.on('failed', (job, err) => {
    console.error(`Job ${job?.id} has failed with error: ${err.message}`);
});

console.log("PDF Worker is running and waiting for jobs...");
