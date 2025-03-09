export interface Project {
  title: string;
  year: number;
  description: string;
  url: string;
}

export const projects: Project[] = [
  {
    title: "Mobile Legends Drafting Helper",
    year: 2025,
    description: "A tool to help players draft their team in Mobile Legends, because I love MLBB",
    url: "https://mobile-legends-drafting.percyjackson.workers.dev/",
  },
  {
    title: "Motivational-Os",
    year: 2025,
    description: "Keeps track of days before O-lvls and helps you stay motivated",
    url: "https://motivational-olvl.percyjackson.workers.dev/",
  },
];
