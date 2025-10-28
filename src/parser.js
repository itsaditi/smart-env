import fs from 'fs';
import path from 'path';
import { NOENVFILE } from './constants.js';
import { info, error } from './logger.js';

export async function parse(filePath) {
    const dataObj =  await parseFromMultipleFiles(filePath);
    info(`Found ${Object.keys(dataObj).length} keys`);
    return dataObj;
}

function parseFromMultipleFiles(filePath) {
    let dataObj = {};
    return new Promise((resolve, reject) => {
        fs.readdir(filePath, async (err, files) => {
            if (err) {
                if (err.message.includes(NOENVFILE)) {
                    info('No .env file found. Ending operation.');
                } else {
                    console.error('Error reading file:', err);
                }
                return;
            }
    
            const matchedFiles = files.filter(file => file.startsWith('.env'));
            info(`MatchedFiles - ${files}`);
            info(`FilePath - ${filePath}`)
            for (const file of matchedFiles) {
                const obj = await readFile(filePath + '/' + file);
                dataObj = {
                    ...dataObj,
                    ...convertStringToKeyValue(obj)
                }
            }
            resolve(dataObj);
        });
        
    })
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
                return;
            }
            resolve(data.split('\n'));
        });
    });
}

function convertStringToKeyValue(inputArray) {
    const obj = {};
    
    for (const element of inputArray) {
        if (isComment(element)) {
            continue;
        }

        const splitKeyValue = element.split("=");
        const key = new String(splitKeyValue[0]).trim();
        const value = new String(splitKeyValue[1]).trim();
        obj[key] = sanitizeValue(value);
    }
    return obj;
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
    const sanitizedString = new String(value).replaceAll('"', '');
    return sanitizedString;
}

export { readFile, convertStringToKeyValue };

export default parse;