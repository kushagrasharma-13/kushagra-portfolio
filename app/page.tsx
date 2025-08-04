'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Code, BrainCircuit, Library, Database } from 'lucide-react';

// Data Imports
import skillsData from '@/data/skills.json';
import projectsData from '@/data/projects.json';

// Component Imports
import ProjectCard from '@/components/ui/ProjectCard';

// Lazy load the 3D scene for better performance and to prevent SSR issues
const Scene = dynamic(() => import('@/components/3d/Scene'), {
  ssr: false,
  loading: () => <div className="h-[100vh] w-full flex justify-center items-center bg-[#030712]"><p className="text-white">Loading 3D Experience...</p></div>
});

// --- CONFIGURATION ---
const featuredProjectSlugs = [
  "rag-patent-qa-system",
  "brain-disease-detection-app",
  "ai-powered-voice-assistant"
];
const featuredProjects = projectsData.filter(p => featuredProjectSlugs.includes(p.slug));

// --- MAIN PAGE COMPONENT ---
export default function HomePage() {
  return (
    <div className="bg-[#030712] min-h-screen">
      {/* 3D Hero Section */}
      <div className="relative">
        <Scene />
      </div>

      {/* 2D Content Sections */}
      <div className="bg-[#030712] relative z-10">
        <section className="py-20 px-4">
          <h2 className="text-3xl font-bold text-center text-white mb-12">Core Competencies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-lg border border-gray-800 transition-transform hover:scale-105 hover:border-blue-500/50">
              <div className="flex items-center gap-3 mb-4">
                <Code className="text-blue-400" size={24} />
                <h3 className="text-xl font-semibold text-white">Programming Expertise</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {skillsData.programming.map(skill => <span key={skill} className="px-3 py-1 text-sm bg-gray-800 text-gray-300 rounded-full">{skill}</span>)}
              </div>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-lg border border-gray-800 transition-transform hover:scale-105 hover:border-blue-500/50">
              <div className="flex items-center gap-3 mb-4">
                <BrainCircuit className="text-blue-400" size={24} />
                <h3 className="text-xl font-semibold text-white">AI & Machine Learning</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {skillsData.ml_dl_nlp.map(skill => <span key={skill} className="px-3 py-1 text-sm bg-gray-800 text-gray-300 rounded-full">{skill}</span>)}
              </div>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-lg border border-gray-800 transition-transform hover:scale-105 hover:border-blue-500/50">
              <div className="flex items-center gap-3 mb-4">
                <Library className="text-blue-400" size={24} />
                <h3 className="text-xl font-semibold text-white">Frameworks & Libraries</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {skillsData.frameworks_libraries.map(skill => <span key={skill} className="px-3 py-1 text-sm bg-gray-800 text-gray-300 rounded-full">{skill}</span>)}
              </div>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-lg border border-gray-800 transition-transform hover:scale-105 hover:border-blue-500/50">
              <div className="flex items-center gap-3 mb-4">
                <Database className="text-blue-400" size={24} />
                <h3 className="text-xl font-semibold text-white">Databases, Cloud & DevOps</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {skillsData.databases_cloud_devops.map(skill => <span key={skill} className="px-3 py-1 text-sm bg-gray-800 text-gray-300 rounded-full">{skill}</span>)}
              </div>
            </div>
          </div>
        </section>

        <hr className="border-gray-800 mx-4" />

        <section className="py-20 px-4">
          <h2 className="text-3xl font-bold text-center text-white mb-12">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/projects" className="text-blue-400 font-semibold hover:underline">
              View All Projects &rarr;
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}