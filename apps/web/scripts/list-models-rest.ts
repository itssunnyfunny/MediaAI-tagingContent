import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    console.error('GEMINI_API_KEY is not defined in the environment variables.');
    process.exit(1);
}

async function listModels() {
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.error(`Error fetching models: ${response.status} ${response.statusText}`);
            const text = await response.text();
            console.error('Response body:', text);
            return;
        }

        const data = await response.json();
        console.log('Available models:');
        if (data.models) {
            data.models.forEach((model: any) => {
                console.log(`- ${model.name} (${model.supportedGenerationMethods.join(', ')})`);
            });
        } else {
            console.log('No models found in response.');
            console.log(JSON.stringify(data, null, 2));
        }
    } catch (error) {
        console.error('Network error:', error);
    }
}

listModels();
