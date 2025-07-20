"use client";

import Image from "next/image";
import { Metadata } from "next";
import { useState } from "react";

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

// Fallback component for when image fails to load
const ImageWithFallback = ({ src, alt, className }: { src: string; alt: string; className?: string }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative ${className}`}>
      {!hasError ? (
        <Image
          src={imgSrc}
          alt={alt}
          fill
          className="object-cover rounded-lg"
          onError={() => {
            setHasError(true);
            setImgSrc('/placeholder-certificate.png'); // You should add a placeholder image
          }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg">
          <span className="text-gray-500 dark:text-gray-400">Certificate not available</span>
        </div>
      )}
    </div>
  );
};

export default function Achievements() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Achievements</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {achievements.map((achievement, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="mb-4">
              {achievement.image && (
                <div className="relative w-full h-48 md:h-56 lg:h-64 mb-4">
                  <ImageWithFallback 
                    src={achievement.image} 
                    alt={`${achievement.title} certificate`}
                    className="rounded-lg"
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
