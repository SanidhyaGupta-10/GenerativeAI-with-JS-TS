import axios from "axios";
import * as cheerio from "cheerio";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { ChromaClient } from "chromadb";

dotenv.config();

const genAI = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY!
});

const client = new ChromaClient({
    port: 8000
});

const WEB_COLLECTION = "WEB_SCRAPED_DATA";

async function scrapeWebPage(url: string){
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    
    const pageHead = $("head").html();
    const pageBody = $("body").html();

    const internalLinks: string[] = [];
    const externalLinks: string[] = [];

    $('a').each((_, element) => {
        const link = $(element).attr('href')
        if(link?.startsWith('/')){
            internalLinks.push(link)
        }else{
            externalLinks.push(link!)
        }
    });

    return { pageHead, pageBody, internalLinks, externalLinks };
};

async function generateVectorEmbedding(
    { text } : {text: string}
){
    if (!text || text.trim().length === 0) {
        throw new Error("Cannot generate embedding for empty text");
    }

    const embedding = await genAI.models.embedContent({
        model: "gemini-embedding-001",
        contents: [text],
    });

    return embedding.embeddings?.[0]?.values ?? [];
};

async function ingest(url: string){
    const collection = await client.getOrCreateCollection({
        name: WEB_COLLECTION,
    });

    const {
        pageHead, pageBody
    } = await scrapeWebPage(url);

    if (!pageHead || pageHead.trim().length === 0) {
        console.warn("Warning: No head content found for", url);
        return;
    }

    if (!pageBody || pageBody.trim().length === 0) {
        console.warn("Warning: No body content found for", url);
        return;
    }

    const headEmbedding = await generateVectorEmbedding({text: pageHead});
    await collection.add({
        embeddings: [headEmbedding],
        metadatas: [{ type: "head", url }],
        documents: [pageHead],
        ids: [`head-${Date.now()}`]
    });

    const chunks = chunkText(pageBody);
    const validChunks = chunks.filter(chunk => chunk.trim().length > 0);

    if (validChunks.length === 0) {
        console.warn("Warning: No valid text chunks to embed");
        return;
    }

    const bodyEmbeddings = await Promise.all(
        validChunks.map((chunk) => generateVectorEmbedding({text: chunk}))
    );

    for (let i = 0; i < bodyEmbeddings.length; i++) {
        await collection.add({
            embeddings: [bodyEmbeddings[i]],
            metadatas: [{ type: "body", chunkIndex: i.toString(), url }],
            documents: [validChunks[i]],
            ids: [`body-${Date.now()}-${i}`]
        });
    }

    console.log("Head embedding inserted.");
    console.log(`Successfully inserted ${bodyEmbeddings.length} body chunk embeddings.`);
};

function chunkText(text: string, size: number = 1000){
    const paragraphs = text.split('\n\n');
    const chunks: string[] = [];
    let currentChunk = "";

    for(const paragraph of paragraphs){
        if(currentChunk.length + paragraph.length <= size){
            currentChunk += paragraph + "\n\n";
        }else{
            chunks.push(currentChunk);
            currentChunk = paragraph + "\n\n";
        }
    }

    if(currentChunk.length > 0){
        chunks.push(currentChunk);
    }

    return chunks;
}

ingest("https://zest-delta.vercel.app");
