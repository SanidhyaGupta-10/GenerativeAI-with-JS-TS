import axios from "axios";
import * as cheerio from "cheerio";

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
}

scrapeWebPage("https://zest-delta.vercel.app").then((data) => {
    console.log(data)
})