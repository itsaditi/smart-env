import fs from 'fs';
import path from 'path';

// Read file
export function readFile(filePath) {

    const absolutePath = path.resolve(filePath);

    fs.readFile(absolutePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }
        console.log('File content:', data);
    })
}
