import { NextResponse } from 'next/server';
import { getTagsFromLLM } from '../../../lib/openai';

export async function POST(req: Request) {
    try {
        const { content } = await req.json();

        if (!content) {
            return NextResponse.json(
                { error: 'Content is required' },
                { status: 400 }
            );
        }

        const tags = await getTagsFromLLM(content);

        return NextResponse.json({ tags });
    } catch (error) {
        console.error('Error in tag generation route:', error);
        return NextResponse.json(
            { error: 'Failed to generate tags' },
            { status: 500 }
        );
    }
}
