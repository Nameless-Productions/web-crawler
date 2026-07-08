import { getRobots } from "./getRobots.js";
import { readWebsites } from "./readWebsites.js";

const usrAgent = "webCrawler/1.0";

(async () => {
    const websites = await readWebsites();

    websites.forEach(async (website) => {
        console.log("Crawling: ", website);

        const robots = await getRobots(website);
        
        if(robots.isAllowed(website, usrAgent)) {
            // crawl website
        } else {
            console.log("Not allowed to craw ", website)
        }
    })
})()