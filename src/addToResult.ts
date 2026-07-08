import fs from "fs/promises"
import path from "path";
import { json } from "stream/consumers";

interface resultWebsite {
    url: string,
    content: string
}

export async function addToResult(crawled: resultWebsite) {
    const resultPath = path.join(process.cwd(), "result.json");

    let resultContent: resultWebsite[] = [];

    try {
        const file = await fs.readFile(resultPath, "utf-8");

        resultContent = JSON.parse(file);
        resultContent.push(crawled)
    } catch {
        resultContent.push(crawled);
    }

    await fs.writeFile(resultPath, JSON.stringify(resultContent));
}