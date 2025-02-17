#!/usr/bin/env node

import { readFile, writeFile } from 'fs/promises';
import base58 from 'bs58';
import { Command } from 'commander';

// Validate Solana keypair format
const validateKeypairFormat = (keypairData) => {
    if (!Array.isArray(keypairData)) {
        throw new Error('Invalid keypair format: Data must be an array');
    }

    if (keypairData.length !== 64) {
        throw new Error('Invalid keypair format: Array must contain exactly 64 numbers');
    }

    const validNumbers = keypairData.every(num =>
        typeof num === 'number' &&
        Number.isInteger(num) &&
        num >= 0 &&
        num <= 255
    );

    if (!validNumbers) {
        throw new Error('Invalid keypair format: Array must contain integers between 0 and 255');
    }
};

// Convert keypair to Base58
const keypairToBase58 = (keypairData) => {
    try {
        validateKeypairFormat(keypairData);
        const buffer = Buffer.from(keypairData);
        return base58.encode(buffer);
    } catch (error) {
        throw new Error(`Error converting to Base58: ${error.message}`);
    }
};

// Read and parse JSON keypair file
const readKeypairFile = async (filePath) => {
    try {
        const fileContent = await readFile(filePath, 'utf8');
        return JSON.parse(fileContent);
    } catch (error) {
        throw new Error(`Error reading keypair file: ${error.message}`);
    }
};

// Write Base58 to output file
const writeBase58ToFile = async (outputPath, base58String) => {
    try {
        await writeFile(outputPath, base58String);
    } catch (error) {
        throw new Error(`Error writing output file: ${error.message}`);
    }
};

// Extract public key from keypair
const getPublicKey = (keypairData) => {
    validateKeypairFormat(keypairData);
    // In Solana keypairs, the last 32 bytes represent the public key
    const publicKeyBytes = keypairData.slice(32);
    return base58.encode(Buffer.from(publicKeyBytes));
};

// Main function
const main = async () => {
    const program = new Command();

    program
        .version('1.0.0')
        .description('Convert Solana keypair JSON file to Base58 format')
        .requiredOption('-i, --input <path>', 'Input keypair JSON file path')
        .option('-o, --output <path>', 'Output file path (optional)')
        .option('-p, --public-key', 'Display public key only')
        .parse(process.argv);

    const options = program.opts();

    try {
        const keypairData = await readKeypairFile(options.input);

        if (options.publicKey) {
            const publicKey = getPublicKey(keypairData);
            console.log('Public Key (Base58):');
            console.log(publicKey);
            return;
        }

        const base58String = keypairToBase58(keypairData);

        if (options.output) {
            await writeBase58ToFile(options.output, base58String);
            console.log(`Successfully converted keypair to Base58 and saved to ${options.output}`);
        } else {
            console.log('Keypair Base58:');
            console.log(base58String);
        }
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

// Run the program
main();

function base58ToJson(base58String) {
    try {
        // Decode base58 string to buffer
        const buffer = base58.decode(base58String);

        // Convert buffer to string and parse as JSON
        const jsonString = buffer.toString('utf-8');
        return JSON.parse(jsonString);
    } catch (error) {
        throw new Error('Invalid base58 string or JSON format');
    }
}

// Example usage
module.exports = {
    // ... existing exports ...
    base58ToJson
};
