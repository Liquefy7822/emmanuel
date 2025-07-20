import fs from "fs";
import path from "path";

const ACHIEVEMENTS_DIR = path.join(process.cwd(), "content/achievements");

export type AchievementMetadata = {
  title: string;
  date: string;
  description: string;
  image?: string;
  tags?: string[];
  featured?: boolean;
  // Allow for additional properties with index signature
  [key: string]: any;
};

export interface AchievementPost {
  metadata: AchievementMetadata;
  slug: string;
  content: string;
}

function parseFrontmatter(fileContent: string) {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  const match = frontmatterRegex.exec(fileContent);
  
  if (!match || !match[1]) {
    console.warn('No frontmatter found in achievement post');
    return { 
      metadata: { 
        title: 'Untitled Achievement', 
        date: new Date().toISOString(),
        description: '',
        tags: []
      }, 
      content: fileContent.trim() 
    };
  }

  const frontMatterBlock = match[1];
  const content = fileContent.replace(frontmatterRegex, "").trim();
  const frontMatterLines = frontMatterBlock.trim().split("\n");
  const metadata: Partial<AchievementMetadata> = {};

  frontMatterLines.forEach((line) => {
    const separatorIndex = line.indexOf(':');
    if (separatorIndex === -1) return;
    
    const key = line.slice(0, separatorIndex).trim();
    let value: any = line.slice(separatorIndex + 1).trim();
    
    // Remove surrounding quotes if present
    if (value.startsWith('"') && value.endsWith('"') || 
        value.startsWith("'") && value.endsWith("'")) {
      value = value.slice(1, -1);
    }
    
    // Handle array values (tags)
    if (key === 'tags') {
      value = value.split(',').map((tag: string) => tag.trim());
    }
    
    // Handle boolean values
    if (value === 'true') value = true;
    if (value === 'false') value = false;
    
    (metadata as any)[key] = value;
  });

  return {
    metadata: {
      title: metadata.title || 'Untitled Achievement',
      date: metadata.date || new Date().toISOString(),
      description: metadata.description || '',
      image: metadata.image || '',
      tags: metadata.tags || [],
      ...metadata
    },
    content
  };
}

function getMDXFiles(dir: string) {
  try {
    return fs.readdirSync(dir).filter((file) => file.endsWith(".mdx"));
  } catch (e) {
    console.error(`Error reading directory ${dir}:`, e);
    return [];
  }
}

function readMDXFile(filePath: string) {
  try {
    return fs.readFileSync(filePath, "utf-8");
  } catch (e) {
    console.error(`Error reading file ${filePath}:`, e);
    return '';
  }
}

export function getAchievementSlugs() {
  try {
    if (!fs.existsSync(ACHIEVEMENTS_DIR)) {
      fs.mkdirSync(ACHIEVEMENTS_DIR, { recursive: true });
      return [];
    }
    return getMDXFiles(ACHIEVEMENTS_DIR).map((file) => file.replace(/\.mdx$/, ''));
  } catch (e) {
    console.error('Error getting achievement slugs:', e);
    return [];
  }
}

export function getAchievementBySlug(slug: string): AchievementPost | null {
  try {
    const fullPath = path.join(ACHIEVEMENTS_DIR, `${slug}.mdx`);
    const fileContent = readMDXFile(fullPath);
    if (!fileContent) return null;
    
    const { metadata, content } = parseFrontmatter(fileContent);
    
    return {
      metadata: {
        ...metadata,
        date: metadata.date || new Date().toISOString(),
      },
      slug,
      content,
    };
  } catch (e) {
    console.error(`Error getting achievement by slug ${slug}:`, e);
    return null;
  }
}

export function getAllAchievements(): AchievementPost[] {
  try {
    const slugs = getAchievementSlugs();
    return slugs
      .map((slug) => getAchievementBySlug(slug))
      .filter((achievement): achievement is AchievementPost => achievement !== null)
      .sort((a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime());
  } catch (e) {
    console.error('Error getting all achievements:', e);
    return [];
  }
}

export function getFeaturedAchievements(): AchievementPost[] {
  try {
    return getAllAchievements().filter(achievement => achievement.metadata.featured);
  } catch (e) {
    console.error('Error getting featured achievements:', e);
    return [];
  }
}
