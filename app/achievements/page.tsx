import { Metadata } from "next";
import AchievementCard from "./AchievementCard";
import { getAllAchievements, type AchievementPost } from "app/lib/achievements";

export const metadata: Metadata = {
  title: "Achievements | Emmanuel",
  description: "My professional achievements and certifications",
};

// This function tells Next.js at build time what pages to generate
export async function generateStaticParams() {
  const achievements = getAllAchievements();
  return achievements.map((achievement) => ({
    slug: achievement.slug,
  }));
}

export default function Achievements() {
  const achievements = getAllAchievements();
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
            <span className="block">My Achievements</span>
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300 sm:mt-4">
            A collection of my professional milestones and certifications
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievements.map((achievement: AchievementPost) => (
            <AchievementCard
              key={achievement.slug}
              title={achievement.metadata.title}
              description={achievement.metadata.description}
              date={achievement.metadata.date}
              image={achievement.metadata.image}
              slug={achievement.slug}
            />
          ))}
        </div>

        {/* Empty state for when there are no achievements */}
        {achievements.length === 0 && (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No achievements yet</h3>
            <p className="mt-1 text-gray-500 dark:text-gray-400">Check back later for updates.</p>
          </div>
        )}
      </div>
    </div>
  );
}
