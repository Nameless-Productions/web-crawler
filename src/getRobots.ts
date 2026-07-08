import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const robotsParser = require('robots-parser');

export async function getRobots(baseURL: string) {
    const robotsURL = String(new URL("/robots.txt", baseURL));
    const res = await fetch(robotsURL);
    const bodyText = res.ok ? await res.text() : "";

    const robots = robotsParser(robotsURL, bodyText);
    return robots;
}