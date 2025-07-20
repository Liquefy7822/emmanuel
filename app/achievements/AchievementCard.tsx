"use client";

import Image from "next/image";
import { useState } from "react";

interface AchievementCardProps {
  title: string;
  description: string;
  date: string;
  image?: string;
  slug?: string;
}

const AchievementCard = ({ title, description, date, image, slug }: AchievementCardProps) => {
  const [imgSrc, setImgSrc] = useState(image);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative w-full aspect-[4/3] bg-gray-100 dark:bg-gray-700">
        {imgSrc && !hasError ? (
          <>
            <Image
              src={imgSrc}
              alt={`${title} certificate`}
              fill
              className={`object-contain transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
              onLoad={() => setIsLoading(false)}
              onError={() => {
                setHasError(true);
                setImgSrc('/placeholder-certificate.png');
              }}
              sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 30vw"
              priority
            />
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-pulse flex space-x-4">
                  <div className="h-8 w-8 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
            <div className="w-16 h-16 mb-4 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
            <p className="text-gray-500 dark:text-gray-400">Certificate not available</p>
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h2>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            {date}
          </span>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
        <div className="flex justify-end">
          <a 
            href={`/achievements/${slug || '#'}`}
            className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            aria-label={`View details about ${title}`}
          >
            View Details →
          </a>
        </div>
      </div>
    </div>
  );
};

export default AchievementCard;
