// import statements for ESM
import * as parser from './parser.js';
import path from 'path';
import { info } from './logger.js';

export async function init(input = {}) {
    info("Initiating ...");
    const envPath = input.path || path.resolve(process.cwd());
    
    info(`Path: ${envPath}`);

    const envFilePath = path.join(envPath, '.env'); // Ensure the path points to a file
    const dataMap = await parser.parse(envFilePath);
    console.log('DataMap - ', dataMap);

    // Find .env file
    return;
}

