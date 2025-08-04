'use client';

import { useState } from 'react';
import projects from '@/data/projects.json';
import ProjectCard from '@/components/ui/ProjectCard';


const categories = ["All", "LLM & Generative AI", "Computer Vision", "Backend & Cloud", "Data Science & Analytics"];

export default function ProjectsPage() {
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredProjects = activeCategory === "All"
        ? projects
        : projects.filter(p => p.category === activeCategory);

    return (
        <section className="py-12"> {/* Reduced vertical padding */}
            <div className="text-center mb-12"> {/* Reduced margin */}
                <h1 className="text-3xl md:text-4xl font-extrabold text-white">My Work</h1> {/* Reduced font size */}
                <p className="text-base text-gray-400 mt-3 max-w-2xl mx-auto"> {/* Reduced font size and margin */}
                    Here is a collection of my projects, showcasing my skills in AI, backend development, and data science. Use the filters to explore different categories.
                </p>
            </div>

            <div className="flex justify-center flex-wrap gap-3 mb-10"> {/* Reduced gap and margin */}
                {categories.map(category => (
                    <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all duration-300 transform hover:scale-110 border backdrop-blur-sm
              ${activeCategory === category
                                ? 'bg-blue-500/20 border-blue-400/30 text-white shadow-lg shadow-blue-500/20'
                                : 'bg-white/10 border-white/20 text-gray-400 hover:bg-white/20 hover:text-white hover:border-white/30'
                            }
            `}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"> {/* Reduced gap */}
                {filteredProjects.map((project) => (
                    <ProjectCard key={project.slug} project={project} />
                ))}
            </div>
        </section>
    );
}