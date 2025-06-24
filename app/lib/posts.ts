import fs from "fs";
import path from "path";

export type Metadata = {
  title: string;
  publishedAt: string;
  summary: string;
  tags?: string;
  image?: string;
  updatedAt?: string;
  // Allow for additional properties with index signature
  [key: string]: string | undefined;
};

// Type for the complete post object
export interface BlogPost {
  metadata: Metadata;
  slug: string;
  content: string;
}

function parseFrontmatter(fileContent: string) {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  const match = frontmatterRegex.exec(fileContent);
  
  if (!match || !match[1]) {
    console.warn('No frontmatter found in post');
    return { 
      metadata: { 
        title: 'Untitled Post', 
        publishedAt: new Date().toISOString(),
        summary: '',
        tags: ''
      }, 
      content: fileContent.trim() 
    };
  }

  const frontMatterBlock = match[1];
  const content = fileContent.replace(frontmatterRegex, "").trim();
  const frontMatterLines = frontMatterBlock.trim().split("\n");
  const metadata: Partial<Metadata> = {};

  frontMatterLines.forEach((line) => {
    const separatorIndex = line.indexOf(':');
    if (separatorIndex === -1) return;
    
    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim();
    
    if (key && value) {
      // Remove surrounding quotes if present
      const cleanValue = value.replace(/^['"](.*)['"]$/, "$1");
      metadata[key as keyof Metadata] = cleanValue as any;
    }
  });

  // Ensure required fields have default values
  if (!metadata.title) metadata.title = 'Untitled Post';
  if (!metadata.publishedAt) metadata.publishedAt = new Date().toISOString();
  if (!metadata.summary) metadata.summary = '';
  if (!metadata.tags) metadata.tags = '';

  return { metadata: metadata as Metadata, content };
}

function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath: string) {
  let rawContent = fs.readFileSync(filePath, "utf-8");
  return parseFrontmatter(rawContent);
}

function getMDXData(dir: string) {
  let mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    let { metadata, content } = readMDXFile(path.join(dir, file));
    let slug = path.basename(file, path.extname(file));

    return {
      metadata,
      slug,
      content,
    };
  });
}

export function getBlogPosts() {
  return getMDXData(path.join(process.cwd(), "content"));
}

export function formatDate(date: string, includeRelative = false) {
  if (!date) return 'Unknown date';
  
  let currentDate = new Date();
  let targetDate: Date;
  
  try {
    // Handle various date formats
    if (date.includes('T')) {
      targetDate = new Date(date);
    } else if (date.includes('-')) {
      // Handle YYYY-MM-DD format
      targetDate = new Date(`${date}T00:00:00`);
    } else if (date.includes('/')) {
      // Handle MM/DD/YYYY format
      const [month, day, year] = date.split('/').map(Number);
      targetDate = new Date(year, month - 1, day);
    } else {
      // Fallback to current date if format is unknown
      targetDate = new Date();
    }
    
    // If date is invalid, use current date
    if (isNaN(targetDate.getTime())) {
      targetDate = new Date();
    }
  } catch (e) {
    console.error('Error parsing date:', date, e);
    targetDate = new Date();
  }

  if (!includeRelative) {
    return targetDate.toLocaleString('en-us', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }

  // Calculate relative time
  const diffInMs = currentDate.getTime() - targetDate.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  
  let formattedDate = '';
  if (diffInDays >= 365) {
    const years = Math.floor(diffInDays / 365);
    formattedDate = `${years}y ago`;
  } else if (diffInDays >= 30) {
    const months = Math.floor(diffInDays / 30);
    formattedDate = `${months}mo ago`;
  } else if (diffInDays > 0) {
    formattedDate = `${diffInDays}d ago`;
  } else {
    formattedDate = 'Today';
  }

  let fullDate = targetDate.toLocaleString("en-us", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  if (!includeRelative) {
    return fullDate;
  }

  return `${fullDate} (${formattedDate})`;
}
