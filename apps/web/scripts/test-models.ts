import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    console.error('GEMINI_API_KEY is not defined in the environment variables.');
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

async function listModels() {
    try {
        // Note: The SDK might not expose listModels directly on the main instance in all versions,
        // but let's try to access the model manager if available or use a known model to test.
        // Actually, for the JS SDK, we might need to rely on documentation or try 'gemini-pro'.
        // Let's try to just run a generation with 'gemini-pro' as a fallback test.

        console.log('Testing gemini-pro...');
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
        const result = await model.generateContent('Hello');
        const response = await result.response;
        console.log('gemini-pro works:', response.text());

        console.log('Testing gemini-1.5-flash...');
        const modelFlash = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const resultFlash = await modelFlash.generateContent('Hello');
        const responseFlash = await resultFlash.response;
        console.log('gemini-1.5-flash works:', responseFlash.text());

    } catch (error) {
        console.error('Error:', error);
    }
}

listModels();
