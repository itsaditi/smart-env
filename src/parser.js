import fs from 'fs';
import path from 'path';
import { NOENVFILE } from './constants.js';
import { info } from './logger.js';

export async function parse(filePath) {
    const dataArray = await readFile(filePath);

    const dataMap = convertStringToKeyValue(dataArray);
    info(`Found ${dataMap.size} keys`);

    return dataMap;
}

// Read file
function readFile(filePath) {
    const absolutePath = path.resolve(filePath);
    return new Promise((resolve, reject) => {
        fs.readFile(absolutePath, 'utf8', (err, data) => {
            if (err) {
                if (err.message.includes(NOENVFILE)) {
                    info('No .env file found. Ending operation.');
                } else {
                    console.error('Error reading file:', err);
                }
                reject(err);
                return;
            }
            resolve(data.split('\n'));
        });
    });
}

function convertStringToKeyValue(inputArray) {
    const map = new Map();
    
    for (const element of inputArray) {
        if (isComment(element)) {
            continue;
        }

        const splitKeyValue = element.split("=");
        const key = splitKeyValue[0];
        const value = splitKeyValue[1];
        map.set(key, sanitizeValue(value));
    }
    return map;
}

/**
 * Verifies if input string is a comment starting with #
 * @param {str} input string 
 * @returns true if comment, else false
 */
function isComment(str) {
    return new String(str).startsWith("#");
}

/**
 * To convert key value like `KEY="VALUE"` to `VALUE`
 * This function will get rid of quotations in value field.
 * @param {value} Input value  
 */
function sanitizeValue(value) {
    return new String(value).replaceAll('"', '');
}

export { readFile, convertStringToKeyValue };

export default parse;