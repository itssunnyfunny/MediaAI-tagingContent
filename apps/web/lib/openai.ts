import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function getTagsFromLLM(content: string): Promise<string[]> {
    try {
        const completion = await openai.chat.completions.create({
            messages: [
                {
                    role: 'system',
                    content:
                        'You are a helpful assistant that generates relevant tags for the given content. Return only a comma-separated list of tags, without any numbering or extra text.',
                },
                {
                    role: 'user',
                    content: `Generate 5 relevant tags for the following content:\n\n${content}`,
                },
            ],
            model: 'gpt-4o',
        });

        const tagsString = completion.choices[0]?.message?.content || '';
        const tags = tagsString
            .split(',')
            .map((tag) => tag.trim())
            .filter((tag) => tag.length > 0);

        return tags;
    } catch (error) {
        console.error('Error generating tags:', error);
        return [];
    }
}
