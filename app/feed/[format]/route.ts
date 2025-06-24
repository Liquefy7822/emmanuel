import { Feed } from "feed";
import { getBlogPosts, type BlogPost } from "app/lib/posts";
import { metaData } from "app/config";
import { NextResponse } from "next/server";

// Helper function to safely parse dates
const safeDate = (dateString?: string): Date => {
  if (!dateString) return new Date();
  try {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? new Date() : date;
  } catch {
    return new Date();
  }
};

export async function generateStaticParams() {
  return [
    { format: "rss.xml" },
    { format: "atom.xml" },
    { format: "feed.json" },
  ];
}

export async function GET(
  _: Request,
  { params }: { params: Promise<{ format: string }> }
) {
  const { format } = await params;
  const validFormats = ["rss.xml", "atom.xml", "feed.json"];

  if (!validFormats.includes(format)) {
    return NextResponse.json(
      { error: "Unsupported feed format" },
      { status: 404 }
    );
  }

  const BaseUrl = metaData.baseUrl.endsWith("/")
    ? metaData.baseUrl
    : `${metaData.baseUrl}/`;

  const feed = new Feed({
    title: metaData.title,
    description: metaData.description,
    id: BaseUrl,
    link: BaseUrl,
    copyright: `All rights reserved ${new Date().getFullYear()}, ${
      metaData.title
    }`,
    generator: "Feed for Node.js",
    feedLinks: {
      json: `${BaseUrl}feed.json`,
      atom: `${BaseUrl}atom.xml`,
      rss: `${BaseUrl}rss.xml`,
    },
  });

  const allPosts = await getBlogPosts();

  // Process each post with error handling
  allPosts.forEach((post: BlogPost) => {
    try {
      // Skip posts without required fields
      if (!post.slug || !post.metadata || !post.metadata.title) {
        console.warn(`Skipping post with missing required fields: ${post.slug || 'unknown'}`);
        return;
      }

      const postUrl = `${BaseUrl}blog/${post.slug}`;
      
      // Safely parse tags
      const categories = typeof post.metadata.tags === 'string' 
        ? post.metadata.tags.split(",").map(tag => tag.trim()).filter(Boolean)
        : [];

      // Safely parse the date
      let postDate: Date;
      try {
        postDate = new Date(post.metadata.publishedAt || new Date().toISOString());
        if (isNaN(postDate.getTime())) {
          postDate = new Date();
        }
      } catch (e) {
        postDate = new Date();
      }

      // Add item to feed
      feed.addItem({
        title: post.metadata.title,
        id: postUrl,
        link: postUrl,
        description: post.metadata.summary || '',
        date: postDate,
        ...(categories.length > 0 && {
          category: categories.map(tag => ({
            name: tag,
            term: tag,
          })),
        }),
      });
    } catch (error) {
      console.error(`Error adding post to feed: ${post.slug || 'unknown'}`, error);
    }
  });

  const responseMap: Record<string, { content: string; contentType: string }> =
    {
      "rss.xml": { content: feed.rss2(), contentType: "application/xml" },
      "atom.xml": { content: feed.atom1(), contentType: "application/xml" },
      "feed.json": { content: feed.json1(), contentType: "application/json" },
    };

  const response = responseMap[format];

  return new NextResponse(response.content, {
    headers: {
      "Content-Type": response.contentType,
    },
  });
}
