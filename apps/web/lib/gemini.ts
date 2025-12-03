import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    console.warn('GEMINI_API_KEY is not defined in the environment variables.');
}

const genAI = new GoogleGenerativeAI(apiKey || '');

export async function getTagsFromGemini(content: string): Promise<string[]> {
    if (!apiKey) {
        console.error('GEMINI_API_KEY is missing');
        return [];
    }

    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const prompt = `You are a helpful assistant that generates relevant tags for the given content. Return only a comma-separated list of tags, without any numbering or extra text.
        
        Generate 5 relevant tags for the following content:
        
        ${content}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        const tags = text
            .split(',')
            .map((tag) => tag.trim())
            .filter((tag) => tag.length > 0);

        return tags;
    } catch (error) {
        console.error('Error generating tags with Gemini:', error);
        return [];
    }
}
