import { createRequire } from 'module';
import { usrAgent } from './index.js';
const require = createRequire(import.meta.url);
const robotsParser = require('robots-parser');

export async function getRobots(baseURL: string) {
    const robotsURL = String(new URL("/robots.txt", baseURL));
    const res = await fetch(robotsURL, {
        headers: {
            "User-Agent": usrAgent
        }
    });
    const bodyText = res.ok ? await res.text() : "";

    const robots = robotsParser(robotsURL, bodyText);
    return robots;
}