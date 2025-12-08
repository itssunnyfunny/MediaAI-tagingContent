import { NextResponse } from 'next/server';
import { getTagsFromGemini } from '../../../lib/gemini';


export async function POST(req: Request) {
    try {
        const { content, contentItemId, userId } = await req.json();

        if (!content) {
            return NextResponse.json(
                { error: 'Content is required' },
                { status: 400 }
            );
        }

        const tags = await getTagsFromGemini(content);

        // Save tags to database if contentItemId is provided
        if (contentItemId) {
            try {
                const { prisma } = await import('@repo/db');
                await prisma.tagHistory.create({
                    data: {
                        contentItemId,
                        tags,
                        appliedBy: userId || 'system',
                    },
                });
            } catch (dbError) {
                console.error('Failed to save tags to database:', dbError);
                // Continue execution, don't fail the request if saving fails
            }
        }

        return NextResponse.json({ tags });
    } catch (error) {
        console.error('Error in tag generation route:', error);
        return NextResponse.json(
            { error: 'Failed to generate tags', details: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        );
    }
}
