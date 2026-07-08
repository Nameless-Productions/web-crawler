import { addToResult } from "./addToResult.js";
import { getRobots } from "./getRobots.js";
import { readWebsites } from "./readWebsites.js";
import * as cheerio from "cheerio"

export const usrAgent = "webCrawler/1.0";

(async () => {
    const websites = await readWebsites();

    for (const website of websites) {
        console.log("Crawling: ", website);

        let robots: any;
        try {
            robots = await getRobots(website);
        } catch {
            console.log("Failed to fetch: ", website)
            continue;
        }
        
        if(robots.isAllowed(website, usrAgent)) {
            try {
                const websiteHtml = await fetch(website, {
                    headers: {
                        "User-Agent": usrAgent
                    }
                });
                const html = websiteHtml.ok ? await websiteHtml.text() : "";

                const $ = cheerio.load(html);
                $("script, style, noscript").remove()
                const htmlText = $("body").text().trim()
                await addToResult({url: website, content: htmlText.replaceAll("\n", " ")})
                console.log("Succesfuly crawled ", website)
            } catch {
                console.log("Failed to fetch: ", website)
                continue;
            }
        } else {
            console.log("Not allowed to craw ", website)
        }
    }
})()