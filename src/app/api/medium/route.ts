import { NextResponse } from 'next/server';
import Parser from 'rss-parser';

const parser = new Parser({
  customFields: {
    item: ['content:encoded'],
  },
});

interface CacheEntry {
  timestamp: number;
  data: any;
}

const cache = new Map<string, CacheEntry>();
const CACHE_TTL = 30 * 60 * 1000; // 30 minutes
const MEDIUM_USERNAME = 'garvanand03';

function extractThumbnail(contentEncoded: string | undefined): string {
  if (!contentEncoded) return '';
  const match = contentEncoded.match(/<img[^>]+src="([^">]+)"/);
  return match ? match[1] : '';
}

function extractSnippet(contentEncoded: string | undefined): string {
  if (!contentEncoded) return '';
  const stripped = contentEncoded.replace(/<[^>]+>/g, '').trim();
  return stripped.substring(0, 300) + (stripped.length > 300 ? '...' : '');
}

export async function GET() {
  const cacheKey = `medium-${MEDIUM_USERNAME}`;
  const now = Date.now();

  const cached = cache.get(cacheKey);
  if (cached && now - cached.timestamp < CACHE_TTL) {
    return NextResponse.json(cached.data);
  }

  try {
    const feed = await parser.parseURL(`https://medium.com/feed/@${MEDIUM_USERNAME}`);
    
    const articles = feed.items.map(item => {
      const contentEncoded = item['content:encoded'] as string | undefined;
      const snippet = extractSnippet(contentEncoded);
      const fullWordCount = contentEncoded ? contentEncoded.replace(/<[^>]+>/g, '').split(/\s+/).length : snippet.split(/\s+/).length;
      const readingTime = Math.max(1, Math.ceil(fullWordCount / 200));

      return {
        title: item.title || '',
        link: item.link || '',
        pubDate: item.pubDate || '',
        thumbnail: extractThumbnail(contentEncoded),
        snippet,
        categories: item.categories || [],
        readingTime,
      };
    });

    cache.set(cacheKey, { timestamp: now, data: articles });

    return NextResponse.json(articles);
  } catch (error) {
    console.error('Error fetching Medium RSS:', error);
    return NextResponse.json({ error: 'Failed to fetch RSS feed' }, { status: 500 });
  }
}
