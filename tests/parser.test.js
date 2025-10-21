import parse from '../src/parser.js';
import fs from 'fs';
import path from 'path';

jest.mock('fs');

// Mock data for .env file
const mockEnvData = `# This is a comment
KEY1=value1
KEY2="value2"
`;

describe('parser.js', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should load environment variables from .env file', async () => {
        fs.readFile.mockImplementation((filePath, encoding, callback) => {
            callback(null, mockEnvData);
        });

        const result = await readFile(path.resolve('.env'));
        expect(result.get('KEY1')).toBe('value1');
        expect(result.get('KEY2')).toBe('value2');
    });

    test('should support comments and quoted values', () => {
        const inputArray = mockEnvData.split('\n');
        const result = convertStringToKeyValue(inputArray);

        expect(result.has('# This is a comment')).toBe(false); // Comments should be ignored
        expect(result.get('KEY1')).toBe('value1');
        expect(result.get('KEY2')).toBe('value2');
    });

    test('should parse basic key=value pairs safely', () => {
        const inputArray = ['KEY=value', 'KEY2="quoted value"'];
        const result = convertStringToKeyValue(inputArray);

        expect(result.get('KEY')).toBe('value');
        expect(result.get('KEY2')).toBe('quoted value');
    });

    test('should parse .env file and return a Map of keys and values', async () => {
        fs.readFile.mockImplementation((filePath, encoding, callback) => {
            callback(null, mockEnvData);
        });

        const result = await parse(path.resolve('.env'));
        expect(result.get('KEY1')).toBe('value1');
        expect(result.get('KEY2')).toBe('value2');
    });
});