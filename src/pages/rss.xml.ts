import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { siteConfig } from '@/config';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  // Return empty feed if blog feature is disabled
  if (!siteConfig.features.blog) {
    return new Response('<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"></rss>', {
      headers: { 'Content-Type': 'application/xml' },
    });
  }

  const blogPosts = await getCollection('blog', ({ data }) => !data.draft);
  
  // Sort posts by date (newest first)
  const sortedPosts = blogPosts.sort(
    (a, b) => b.data.publishedDate.valueOf() - a.data.publishedDate.valueOf()
  );

  return rss({
    title: `${siteConfig.name} Blog`,
    description: siteConfig.description,
    site: context.site ?? siteConfig.url,
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.publishedDate,
      description: post.data.description,
      author: post.data.author,
      link: `/blog/${post.slug}/`,
    })),
    customData: `<language>en-us</language>`,
  });
}
