import React from "react";
import type { Metadata } from "next";
import Image from "next/image";

type Photo = {
  src: string;
  alt: string;
  description?: string;
};

const photos: Photo[] = [
  {
    src: "/photos/photo1.jpg",
    alt: "With my class",
    description: "A memorable moment with my classmates"
  },
  {
    src: "/photos/photo2.jpg",
    alt: "Pitching our solution at SIT",
    description: "Presenting our innovative solution at the competition"
  },
  {
    src: "/photos/photo3.jpg",
    alt: "Frisbee tournament",
    description: "Ranking top 10 in my first frisbee tournament"
  },
  {
    src: "/photos/photo4.jpg",
    alt: "Smart Nation 2.0 Launch",
    description: "At the Launch of SG SMART Nation 2.0"
  },
  {
    src: "/photos/photo5.jpg",
    alt: "Awards at SYSF 2023",
    description: "Getting distinction at a national science competition"
  },
  {
    src: "/photos/photo6.jpg",
    alt: "My booth at the SYSF 2023",
    description: "Showcasing our project at the SYSF 2023"
  }
];

export const metadata: Metadata = {
  title: "Photos",
  description: "A collection of my favorite moments and memories",
};

export default function Photos() {
  return (
    <section className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold tracking-tight text-center">Photo Gallery</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((photo, index) => (
          <div key={index} className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="aspect-square relative overflow-hidden">
              <Image
                src={photo.src}
                alt={photo.alt}
                width={800}
                height={800}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                priority={index < 3} // Only preload first 3 images
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-end p-4">
                <div className="text-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  <h3 className="font-semibold">{photo.alt}</h3>
                  {photo.description && (
                    <p className="text-sm opacity-90">{photo.description}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
