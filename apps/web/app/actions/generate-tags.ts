'use server';

import { getTagsFromLLM } from '../../lib/openai';

export async function generateTags(content: string): Promise<string[]> {
    if (!content) {
        return [];
    }

    return await getTagsFromLLM(content);
}
