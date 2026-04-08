import axios from "axios";
import * as cheerio from "cheerio";
import OpenAI from "openai";
import dotenv from "dotenv";
import { ChromaClient } from "chromadb";

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!
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
    const embedding = openai.embeddings.create({
        model: "text-embedding-3-small",
        input: text,
        encoding_format: "float"
    });

    return (await embedding).data[0]?.embedding!;
};

async function ingest(url: string){
    const collection = await client.getOrCreateCollection({
        name: WEB_COLLECTION,
    });

    const {
        pageHead, pageBody
    } = await scrapeWebPage(url);

    const headEmbedding = await generateVectorEmbedding({text: pageHead!});
    await collection.add({
        embeddings: [headEmbedding],
        metadatas: [{ type: "head", url }],
        documents: [pageHead!],
        ids: [`head-${Date.now()}`]
    });

    const chunks = chunkText(pageBody!);
    const bodyEmbeddings = await Promise.all(
        chunks.map((chunk) => generateVectorEmbedding({text: chunk}))
    );

    for (let i = 0; i < bodyEmbeddings.length; i++) {
        await collection.add({
            embeddings: [bodyEmbeddings[i]],
            metadatas: [{ type: "body", chunkIndex: i.toString(), url }],
            documents: [chunks[i]],
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
