'use client';

import Link from 'next/link';
import { useState, use } from 'react';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import projects from '@/data/projects.json';
import { ArrowLeft, ExternalLink, Star, Zap, Cpu, BookOpen, Youtube, X, Github } from 'lucide-react';

// Lazy load the 3D scene for better performance
const ProjectScene3D = dynamic(() => import('@/components/3d/ProjectScene3D'), {
    ssr: false,
});

// Custom icons for Hugging Face and Kaggle
const KaggleIcon = (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img
        src="/kaggle.svg"
        alt="Kaggle"
        className="w-10 h-5 object-contain"
        {...props}
    />
);


const HuggingFaceIcon = (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img src="/huggingface.svg" alt="Hugging Face" {...props} />
);


export default function ProjectDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    // Use the `use` hook to unwrap the Promise
    const { slug } = use(params);

    const [isHovered, setIsHovered] = useState(false);
    const [showVideo, setShowVideo] = useState(false);

    const project = projects.find(p => p.slug === slug);

    if (!project) {
        notFound();
    }

    if (!project) {
        notFound();
    }

    const getYoutubeEmbedUrl = (url: string | null) => {
        if (!url) return null;
        const videoIdMatch = url.match(/(?:v=)([^&?]+)/);
        if (videoIdMatch && videoIdMatch[1]) {
            return `https://www.youtube.com/embed/${videoIdMatch[1]}`;
        }
        return null;
    };

    const embedUrl = getYoutubeEmbedUrl(project.youtube_link);

    return (
        <section className="py-12"> {/* Reduced vertical padding */}
            <div className="mb-10"> {/* Reduced margin */}
                <Link href="/projects" className="inline-flex items-center gap-2 text-blue-400 hover:text-white transition-colors">
                    <ArrowLeft size={16} />
                    Back to All Projects
                </Link>
            </div>

            <div className="text-center mb-12"> {/* Reduced margin */}
                <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-300 bg-blue-900/50 rounded-full mb-3"> {/* Reduced margin */}
                    {project.category}
                </span>
                <h1 className="text-3xl md:text-4xl font-extrabold text-white">{project.title}</h1> {/* Reduced font size */}
                {project.subtitle && <p className="text-md text-gray-400 mt-2">{project.subtitle}</p>} {/* Reduced font size */}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start"> {/* Reduced gap */}
                {/* Left Column: 3D Scene & Links */}
                <div className="lg:col-span-2 space-y-5 sticky top-24"> {/* Reduced spacing */}
                    <div
                        className="h-64 w-full rounded-xl bg-gray-900/50 border border-gray-800" // Reduced height
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <ProjectScene3D isHovered={isHovered} category={project.category} />
                    </div>
                    <div className="flex flex-col gap-3"> {/* Reduced gap */}
                        {project.github_repo && <Link href={project.github_repo} target="_blank" className="flex items-center justify-center gap-2 px-4 py-2 text-sm bg-gray-700 text-white font-semibold rounded-lg transition-all duration-300 hover:bg-gray-600 hover:scale-105"><Github size={16} /> View Repository</Link>}
                        {embedUrl && <button onClick={() => setShowVideo(true)} className="flex items-center justify-center gap-2 px-4 py-2 text-sm bg-red-600 text-white font-semibold rounded-lg transition-all duration-300 hover:bg-red-500 hover:scale-105"><Youtube size={16} /> Watch Demo</button>}
                        {project.huggingface_link && <Link href={project.huggingface_link} target="_blank" className="flex items-center justify-center gap-2 px-4 py-2 text-sm bg-yellow-500 text-black font-semibold rounded-lg transition-all duration-300 hover:bg-yellow-400 hover:scale-105"><HuggingFaceIcon className="w-4 h-4" /> View on Hugging Face</Link>}
                        {project.kaggle_link && <Link href={project.kaggle_link} target="_blank" className="flex items-center justify-center gap-2 px-4 py-2 text-sm bg-sky-600 text-white font-semibold rounded-lg transition-all duration-300 hover:bg-sky-700 hover:scale-105"><KaggleIcon className="w-10 h-5" /> View on Kaggle</Link>}
                    </div>
                </div>

                {/* Right Column: Project Details */}
                <div className="lg:col-span-3 space-y-6"> {/* Reduced spacing */}
                    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 p-6 rounded-xl"> {/* Reduced padding */}
                        <h2 className="text-xl font-bold text-white mb-3">Summary</h2> {/* Reduced font size */}
                        <p className="text-gray-400 text-sm leading-relaxed">{project.summary}</p> {/* Reduced font size */}
                    </div>

                    {project.keyFeatures && project.keyFeatures.length > 0 && (
                        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 p-6 rounded-xl">
                            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2"><Zap size={18} className="text-yellow-400" /> Key Features</h2>
                            <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm">
                                {project.keyFeatures.map((feature, index) => <li key={index}>{feature}</li>)}
                            </ul>
                        </div>
                    )}

                    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 p-6 rounded-xl">
                        <h2 className="text-xl font-bold text-white mb-3">Tech Stack</h2>
                        <div className="flex flex-wrap gap-2">
                            {project.techStack.map(tech => (
                                <span key={tech} className="px-3 py-1 text-xs bg-gray-800 text-gray-300 rounded-full">{tech}</span>
                            ))}
                        </div>
                    </div>

                    {project.architecture && project.architecture.length > 0 && (
                        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 p-6 rounded-xl">
                            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2"><Cpu size={18} className="text-yellow-400" /> Architecture</h2>
                            <div className="space-y-3">
                                {project.architecture.map((item, index) => (
                                    <div key={index} className="grid grid-cols-3 gap-4 text-xs">
                                        <strong className="col-span-1 text-gray-200">{item.component}</strong>
                                        <p className="col-span-2 text-gray-400">{item.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {project.impact && project.impact.length > 0 && (
                        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 p-6 rounded-xl">
                            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2"><Star size={18} className="text-yellow-400" /> Impact & Recognition</h2>
                            <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm">
                                {project.impact.map((item, index) => <li key={index}>{item}</li>)}
                            </ul>
                        </div>
                    )}

                    {project.learning && (
                        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 p-6 rounded-xl">
                            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2"><BookOpen size={18} className="text-yellow-400" /> Key Learnings</h2>
                            <p className="text-gray-300 text-sm leading-relaxed italic">{project.learning}</p>
                        </div>
                    )}
                </div>
            </div>

            {/* YouTube Video Modal */}
            {showVideo && embedUrl && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowVideo(false)}>
                    <div className="relative w-full max-w-4xl aspect-video" onClick={(e) => e.stopPropagation()}>
                        <iframe
                            src={embedUrl}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full rounded-lg"
                        ></iframe>
                        <button onClick={() => setShowVideo(false)} className="absolute -top-3 -right-3 bg-white text-black rounded-full p-2">
                            <X size={20} />
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
}
