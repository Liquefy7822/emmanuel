import { notFound } from "next/navigation";
import { CustomMDX } from "app/components/mdx";
import { formatDate } from "app/lib/posts";
import { getAchievementBySlug, getAchievementSlugs } from "app/lib/achievements";
import Image from "next/image";

export async function generateStaticParams() {
  const slugs = getAchievementSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export default function AchievementPage({ params }: { params: { slug: string } }) {
  const achievement = getAchievementBySlug(params.slug);

  if (!achievement) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <article className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          {/* Header with Image */}
          {achievement.metadata.image && (
            <div className="relative w-full h-64 md:h-96">
              <Image
                src={achievement.metadata.image}
                alt={achievement.metadata.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                priority
              />
            </div>
          )}

          <div className="p-6 md:p-8">
            {/* Title and Metadata */}
            <header className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {achievement.metadata.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <time dateTime={achievement.metadata.date}>
                  {formatDate(achievement.metadata.date, true)}
                </time>
                
                {achievement.metadata.tags && achievement.metadata.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {achievement.metadata.tags.map((tag) => (
                      <span 
                        key={tag} 
                        className="px-2 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </header>

            {/* Achievement Content */}
            <div className="prose dark:prose-invert max-w-none">
              <CustomMDX source={achievement.content} />
            </div>

            {/* Back to Achievements Link */}
            <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700">
              <a
                href="/achievements"
                className="inline-flex items-center text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
              >
                ← Back to Achievements
              </a>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
