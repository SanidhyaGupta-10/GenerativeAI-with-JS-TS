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
    path: 'http://localhost:8000'
});

client.heartbeat();

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
    const { 
        pageHead, pageBody, internalLinks, externalLinks 
    } = await scrapeWebPage(url);

    const headEmbedding = await generateVectorEmbedding({text: pageHead!});

    const chunks = chunkText(pageBody!);
    const bodyEmbedding = await Promise.all(
        chunks.map((chunk) => generateVectorEmbedding({text: chunk}))
    );

    console.log(headEmbedding);
    console.log(bodyEmbedding);
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
