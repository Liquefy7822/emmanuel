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
    description: "A tool to help players draft their team in Mobile Legends, side project",
    url: "https://mobile-legends-drafting.percyjackson.workers.dev/",
  },
  {
    title: "Motivational-Os",
    year: 2025,
    description: "Keeps track of days before O-lvls and helps you stay motivated",
    url: "https://motivational-olvl.percyjackson.workers.dev/",
  },
  {
    title: "Data viewer",
    year: 2025,
    description: "A tool to view data from a temperature and light sensor",
    url: "https://sit-sst-st.netlify.app/",
  },
  {
    title: "Investigation of the microclimate of various locations within a school",
    year: 2025,
    description: "Research done by me and 2 other people on Microclimates with the use of Microcontrollers.",
    url: "https://docs.google.com/document/d/e/2PACX-1vRRfZl9K7pVCKTUbmwZoKOzb8mTXKUChUCIboiVIZFSu8LLETlcKyvgoTEP4Elq-0yO8AmSwy3tq5fq/pub",
  },
];
