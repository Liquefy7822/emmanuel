import { Metadata } from "next";
import AchievementCard from "./AchievementCard";

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
  {
    title: "SYSF 2023",
    description: "Got Distinction at the SYSF 2023",
    date: "2023",
    image: "/achievements/certificates/portfolio1.png",
  },
];



export default function Achievements() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Achievements</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {achievements.map((achievement, index) => (
          <AchievementCard
            key={index}
            title={achievement.title}
            description={achievement.description}
            date={achievement.date}
            image={achievement.image}
          />
        ))}
      </div>
    </div>
  );
}
