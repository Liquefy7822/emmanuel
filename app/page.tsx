import Image from "next/image";
import { socialLinks } from "./config";

export default function Page() {
  return (
    <section>
  {/* Profile Image linking to your social (e.g., Twitter) */}
  <a href={socialLinks.instagram} target="_blank">
    <Image
      src="/profile.png"
      alt="Profile photo"
      className="rounded-full bg-gray-100 block lg:mt-5 mt-0 lg:mb-5 mb-10 mx-auto sm:float-right sm:ml-5 sm:mb-5 grayscale hover:grayscale-0"
      unoptimized
      width={160}
      height={160}
      priority
    />
  </a>
  {/* Your Name or Brand */}
  <h1 className="mb-8 text-2xl font-medium tracking-tight">
    Emmanuel Yee
  </h1>
  <div className="prose prose-neutral dark:prose-invert">
    {/* Introduction Paragraph */}
    <p>
      Welcome to my portfolio! I’m Emmanuel Yee, a student passionate about electronics and Digital Citizenship. Here you’ll find a curated selection of my work, projects, and the creative process behind my innovations.
    </p>
    {/* About Your Work & Skills */}
    <p>
      In this space, I showcase my expertise in Electronics, Coding, Leadership and my journey through various projects. Whether it’s design, development, or a blend of both, my goal is to deliver quality and innovation in every endeavor.
    </p>
    {/* Project Highlights and Case Studies */}
    <p>
      Explore my work through detailed case studies and project overviews. Each project is a testament to my commitment to [Your Mission or Value Proposition]. For more details, check out my <a href="https://emmanuel-nu.vercel.app/projects" target="_blank">project portfolio</a>.
    </p>
    {/* Social and Professional Links */}
    <p>
      Connect with me on <a href="https://www.linkedin.com/in/emmanuelyee/" target="_blank">LinkedIn</a> or explore my code repositories on <a href="https://github.com/Liquefy7822" target="_blank">GitHub</a> to see my work in action.
    </p>
    {/* Closing / Additional Info */}
    <p>
      Thank you for visiting my portfolio. I continuously update this space with new projects and insights, so be sure to check back often!
    </p>
  </div>
</section>

  );
}
