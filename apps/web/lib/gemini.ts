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
    console.log('GEMINI_API_KEY is present, starting generation...');

    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-001' });

        const prompt = `You are a helpful assistant that generates relevant tags for the given content. 
        Return a JSON array of 5 strings representing the tags. 
        Example response: ["tag1", "tag2", "tag3", "tag4", "tag5"]
        
        Generate 5 relevant tags for the following content:
        
        ${content}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        console.log('Gemini raw response:', text);

        // Clean up the text to ensure it's valid JSON
        const jsonString = text.replace(/```json/g, '').replace(/```/g, '').trim();

        try {
            const tags = JSON.parse(jsonString);
            if (Array.isArray(tags)) {
                return tags.map(tag => String(tag).trim()).filter(tag => tag.length > 0);
            } else {
                console.error('Gemini response is not an array:', tags);
                return [];
            }
        } catch (parseError) {
            console.error('Failed to parse Gemini response as JSON:', parseError);
            // Fallback to simple split if JSON parsing fails, though less reliable with the new prompt
            return text.split(',').map(t => t.trim()).filter(t => t.length > 0);
        }

    } catch (error) {
        console.error('Error generating tags with Gemini:', error);
        return [];
    }
}
