// import statements for ESM
import * as parser from './parser.js';
import path from 'path';
import { info, success } from './logger.js';

export async function init(input = {}) {
    info("Initiating ...");
    const envPath = input.path || path.resolve(process.cwd());
    
    info(`Path: ${envPath}`);

    const envFilePath = path.join(envPath); // Ensure the path points to a file

    console.log(path.resolve(envFilePath));

    const dataObj = await parser.parse(envFilePath);

    // Merge with Node's Process
    process = {
        ...process,
        ...dataObj,
    }

    success(`Successfully added ${Object.keys(dataObj).length} to process`);

    // Find .env file
    return;
}

