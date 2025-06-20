import React from "react";
import type { Metadata } from "next";
import { ImageGrid } from "app/components/image-grid";

export const metadata: Metadata = {
  title: "Photos",
  description: "My Photos",
};
export default function Photos() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-medium tracking-tight">Photos</h1>
      <ImageGrid
        columns={3}
        images={[
          {
            src: "/photos/photo1.jpg",
            alt: "With my class",
            href: "https://drive.google.com/uc?export=view&id=1uqo3OIhmOSwAzWuQC7X13fGx4YmQYFh2",
          },
          {
            src: "/photos/photo2.jpg",
            alt: "Pitching our solution at SIT",
            href: "https://drive.google.com/uc?export=view&id=13qM8A_BpM2Ov9f_dU6vsaHy4aEQka_ba",
          },
          {
            src: "/photos/photo3.jpg",
            alt: "Ranking top 10 in my first frisbee tournament",
            href: "https://drive.google.com/drive-viewer/AKGpihZ_7YbzSG-flvR4fp9QszHW-krRK_iGx-o4CiGMtj7qQ_wXjWJirXl520VtulLIk_zCA6r9nWVYFWVzxtbQTXUmrOkN2vhLMXs=s1600-rw-v1"
          },
          {
            src: "/photos/photo4.jpg",
            alt: "At the Launch of SG SMART Nation 2.0",
            href: "https://drive.google.com/drive-viewer/AKGpihbRUjbs1qtie1lcQYB1qvpcp-3fG9gnN01GbIGUHrRbBczhFpotjq4zvo-wSmPLVCQGQGVj2lkqOmEi5HF0JgnrAAuju5Is3NQ=s1600-rw-v1"
          },
          {
            src: "/photos/photo5.jpg",
            alt: "Taj Mahal",
            href: "https://unsplash.com/photos/taj-mahal-india-IPlPkWPJ2fo",
          },
          {
            src: "/photos/photo6.jpg",
            alt: "Colosseum",
            href: "https://unsplash.com/photos/brown-concrete-building-under-blue-sky-during-daytime-3cyBR1rIJmA?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash",
          },
        ]}
      />

      <ImageGrid
        columns={2}
        images={[
          { src: "/photos/photo1.jpg", alt: "Roman columns" },
          { src: "/photos/photo2.jpg", alt: "Big Ben" },
          { src: "/photos/photo3.jpg", alt: "Sacré-Cœur Basilica" },
          { src: "/photos/photo4.jpg", alt: "Eiffel Tower" },
        ]}
      />

      <ImageGrid
        columns={4}
        images={[
          { src: "/photos/photo1.jpg", alt: "Roman columns" },
          { src: "/photos/photo2.jpg", alt: "Big Ben" },
          { src: "/photos/photo3.jpg", alt: "Sacré-Cœur Basilica" },
          { src: "/photos/photo4.jpg", alt: "Eiffel Tower" },
          { src: "/photos/photo5.jpg", alt: "Taj Mahal" },
          { src: "/photos/photo6.jpg", alt: "Colosseum" },
        ]}
      />
    </section>
  );
}
