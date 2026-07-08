import fs from "fs/promises";
import path from "path";

export async function readWebsites() {
    const websitesPath = path.join(process.cwd(), "websites.txt");

    try{
        const websites = await fs.readFile(websitesPath, "utf-8");
        const websitesArr = websites.split("\n");
        console.log("Read ", websitesArr.length, " websites in websites.txt")
        return websitesArr;
    }
    catch (err) {
        throw new Error(`Error while reading file: ${err}`)
    }
}