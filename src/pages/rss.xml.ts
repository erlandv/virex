import rss from '@astrojs/rss';
import { getCollection, type CollectionEntry } from 'astro:content';
import { siteConfig } from '@/config';

type BlogPost = CollectionEntry<'blog'>;

export async function GET() {
  // Return empty feed if blog feature is disabled
  if (!siteConfig.features.blog) {
    return new Response('<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"></rss>', {
      headers: { 'Content-Type': 'application/xml' },
    });
  }

  const blogPosts = await getCollection('blog', ({ data }: BlogPost) => !data.draft);

  // Sort posts by date (newest first)
  const sortedPosts = blogPosts.sort(
    (a: BlogPost, b: BlogPost) => b.data.publishedDate.valueOf() - a.data.publishedDate.valueOf()
  );

  return rss({
    title: `${siteConfig.name} Blog`,
    description: siteConfig.description,
    site: siteConfig.url,
    items: sortedPosts.map((post: BlogPost) => ({
      title: post.data.title,
      pubDate: post.data.publishedDate,
      description: post.data.description,
      author: post.data.author,
      link: `/blog/${post.id}/`,
    })),
    customData: `<language>en-us</language>`,
  });
}
