'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Github, Youtube } from 'lucide-react';

// Re-using the custom icons from the project detail page
const KaggleIcon = (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
  <img src="/kaggle.svg" alt="Kaggle" {...props} />
);

const HuggingFaceIcon = (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
  <img src="/huggingface.svg" alt="Hugging Face" {...props} />
);

interface Project {
  slug: string;
  title: string;
  category: string;
  summary: string;
  techStack: string[];
  github_repo?: string | null;
  huggingface_link?: string | null;
  kaggle_link?: string | null;
  youtube_link?: string | null;
}

export default function ProjectCard({ project }: { project: Project }) {
  return (
    // The outer wrapper is now a div, not a Link
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden h-full flex flex-col group transition-all duration-300 hover:border-blue-500/50 hover:scale-105">

      {/* FIX: The image is now its own link to the project page */}
      <Link href={`/projects/${project.slug}`}>
        <div className="relative h-48 w-full overflow-hidden cursor-pointer">
          <Image
            src={`https://placehold.co/600x400/030712/a78bfa?text=${project.title.replace(/\s/g, '+')}`}
            alt={`${project.title} screenshot`}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 group-hover:scale-110"
            unoptimized
          />
        </div>
      </Link>

      <div className="p-6 flex-grow flex flex-col">
        <div>
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-widest text-blue-300 bg-blue-900/50 rounded-full mb-4">
            {project.category}
          </span>
          <h2 className="text-xl font-bold text-white mb-3">{project.title}</h2>
          <p className="text-gray-400 text-sm mb-4 leading-relaxed line-clamp-3 flex-grow">{project.summary}</p>
        </div>
        <div className="mt-auto">
          <div className="flex flex-wrap gap-2 mb-4">
            {project.techStack.slice(0, 5).map((tech) => (
              <span key={tech} className="px-2 py-1 text-xs text-gray-300 bg-gray-800 rounded">
                {tech}
              </span>
            ))}
          </div>

          <div className="border-t border-gray-800 pt-4 flex items-center justify-between">
            {/* FIX: The "View Details" text is now its own link */}
            <Link href={`/projects/${project.slug}`} className="inline-flex items-center text-sm text-blue-400 font-semibold group-hover:text-white transition-colors duration-300">
              View Details <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            {/* FIX: These links are no longer nested, resolving the error */}
            <div className="flex items-center space-x-5">
              {project.github_repo && (
                <a href={project.github_repo} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors"><Github size={18} /></a>
              )}
              {project.youtube_link && (
                <a href={project.youtube_link} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-red-500 transition-colors"><Youtube size={18} /></a>
              )}
              {project.kaggle_link && (
                <a href={project.kaggle_link} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-sky-400 transition-colors"><KaggleIcon className="w-6 h-6" /></a>
              )}
              {project.huggingface_link && (
                <a href={project.huggingface_link} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-yellow-400 transition-colors"><HuggingFaceIcon className="w-4 h-4" /></a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}