import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Achievements | Emmanuel",
  description: "My professional achievements and certifications",
};

interface Achievement {
  title: string;
  description: string;
  date: string;
  image?: string;
}

const achievements: Achievement[] = [
  // Example achievement - you can add more
  {
    title: "Example Achievement",
    description: "Description of your achievement",
    date: "2025",
    image: "/achievements/certificates/example-cert.png", // Add your certificate images to the achievements/certificates folder
  },
];

export default function Achievements() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Achievements</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {achievements.map((achievement, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="mb-4">
              {achievement.image && (
                <div className="aspect-w-4 aspect-h-3 mb-4">
                  <Image
                    src={achievement.image}
                    alt={`${achievement.title} certificate`}
                    className="rounded-lg"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              )}
            </div>
            <h2 className="text-xl font-semibold mb-2">{achievement.title}</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-2">{achievement.description}</p>
            <p className="text-gray-500 dark:text-gray-400">{achievement.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
