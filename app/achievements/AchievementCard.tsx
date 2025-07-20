"use client";

import Image from "next/image";
import { useState } from "react";

interface AchievementCardProps {
  title: string;
  description: string;
  date: string;
  image?: string;
}

const AchievementCard = ({ title, description, date, image }: AchievementCardProps) => {
  const [imgSrc, setImgSrc] = useState(image);
  const [hasError, setHasError] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="mb-4">
        {imgSrc && (
          <div className="relative w-full h-48 md:h-56 lg:h-64 mb-4">
            {!hasError ? (
              <Image
                src={imgSrc}
                alt={`${title} certificate`}
                fill
                className="object-cover rounded-lg"
                onError={() => {
                  setHasError(true);
                  setImgSrc('/placeholder-certificate.png');
                }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg">
                <span className="text-gray-500 dark:text-gray-400">Certificate not available</span>
              </div>
            )}
          </div>
        )}
      </div>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-2">{description}</p>
      <p className="text-gray-500 dark:text-gray-400">{date}</p>
    </div>
  );
};

export default AchievementCard;
