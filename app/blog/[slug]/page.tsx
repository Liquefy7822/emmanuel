import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CustomMDX } from "app/components/mdx";
import { formatDate, getBlogPosts, type BlogPost, type Metadata as PostMetadata } from "app/lib/posts";
import { metaData } from "app/config";

interface BlogPostProps {
  params: {
    slug: string;
  };
}

// Helper function to safely get post data
function getPost(slug: string): BlogPost | null {
  try {
    const post = getBlogPosts().find((p) => p.slug === slug);
    if (!post) return null;

    // Ensure required fields have default values
    const metadata: PostMetadata = {
      title: post.metadata.title || 'Untitled Post',
      publishedAt: post.metadata.publishedAt || new Date().toISOString(),
      summary: post.metadata.summary || '',
      tags: post.metadata.tags || '',
      ...post.metadata, // Spread any additional metadata
    };

    return {
      ...post,
      metadata,
      content: post.content || '',
    };
  } catch (error) {
    console.error(`Error getting post ${slug}:`, error);
    return null;
  }
}

export async function generateStaticParams() {
  try {
    const posts = getBlogPosts();
    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error('Error generating static params for blog posts:', error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = params;
  const post = getPost(slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;
  let ogImage = image
    ? image
    : `${metaData.baseUrl}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${metaData.baseUrl}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Blog({ params }: BlogPostProps) {
  const { slug } = params;
  const post = getPost(slug);

  if (!post) {
    notFound();
  }

  // Safely generate JSON-LD data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.metadata.title || 'Untitled Post',
    datePublished: post.metadata.publishedAt || new Date().toISOString(),
    dateModified: post.metadata.updatedAt || post.metadata.publishedAt || new Date().toISOString(),
    description: post.metadata.summary || '',
    image: post.metadata.image
      ? `${metaData.baseUrl}${post.metadata.image.startsWith('/') ? '' : '/'}${post.metadata.image}`
      : `${metaData.baseUrl}/og?title=${encodeURIComponent(post.metadata.title || 'Blog Post')}`,
    url: `${metaData.baseUrl}/blog/${post.slug}`,
    author: {
      "@type": "Person",
      name: metaData.name || 'Author',
    },
  };

  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <h1 className="title mb-3 font-medium text-2xl tracking-tight">
        {post.metadata.title || 'Untitled Post'}
      </h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-medium">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {formatDate(post.metadata.publishedAt || new Date().toISOString())}
        </p>
      </div>
      <article className="prose prose-quoteless prose-neutral dark:prose-invert">
        <CustomMDX source={post.content} />
      </article>
    </section>
  );
}
