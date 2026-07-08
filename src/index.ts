import { getRobots } from "./getRobots.js";
import { readWebsites } from "./readWebsites.js";
import * as cheerio from "cheerio"

export const usrAgent = "webCrawler/1.0";

(async () => {
    const websites = await readWebsites();

    websites.forEach(async (website) => {
        console.log("Crawling: ", website);

        const robots = await getRobots(website);
        
        if(robots.isAllowed(website, usrAgent)) {
            const websiteHtml = await fetch(website, {
                headers: {
                    "User-Agent": usrAgent
                }
            });
            const html = websiteHtml.ok ? await websiteHtml.text() : "";

            const $ = cheerio.load(html);
            $("script, style, noscript").remove()
            const htmlText = $("body").text().trim()
            console.log("Succesfuly crawled ", website)
        } else {
            console.log("Not allowed to craw ", website)
        }
    })
})()