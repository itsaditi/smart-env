// import statements for ESM
import * as parser from './parser.js';
import path from 'path';
import { info, success, error } from './logger.js';
import { env, exit } from 'process';

export async function init(input = {}) {
    info("Initiating ...");
    const envPath = input.path || path.resolve(process.cwd());
    
    info(`Path: ${envPath}`);

    const envFilePath = path.join(envPath); // Ensure the path points to a file

    console.log(path.resolve(envFilePath));

    const dataObj = await parser.parse(envFilePath);

    // Merge with Node's Process
    mergeWithGlobalEnv(dataObj);


    success(`Successfully added ${Object.keys(dataObj).length} to process`);

    // Find .env file
    return;
}

export function getEnv(key) {
    if (process.env[key] === undefined) {
        const  message = `Environment Variable ${key} was not loaded`;
        error(message);
        throw new Error(message);
    }
    const envKey = process.env[key];

    const boolString = ['true', 'false'];

    if (boolString.includes(envKey)) {
        return JSON.parse(envKey);
    } else if (isNumber(envKey)) {
        return Number(envKey);
    }

    return envKey;
}

function mergeWithGlobalEnv(obj) {
    for (const key of Object.keys(obj)) {
        process.env[key] = obj[key];
    }
}

function isNumber(str) {
    if (typeof str !== "string") return false; // only accept strings
    return str.trim() !== "" && !isNaN(str) && isFinite(Number(str));
}
