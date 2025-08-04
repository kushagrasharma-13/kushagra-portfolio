'use client';

import { useRef } from 'react';
import { Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ExternalLink, Zap, Wrench, Star } from 'lucide-react';

// An enhanced 3D briefcase model
function BriefcaseModel() {
  const groupRef = useRef<any>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01;
      const t = state.clock.getElapsedTime();
      groupRef.current.position.y = Math.sin(t) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh position={[0, 0, 0]}><boxGeometry args={[0.4, 0.3, 0.1]} /><meshStandardMaterial color="#5a6a7b" metalness={0.5} roughness={0.4} /></mesh>
      <mesh position={[0, 0.2, 0]}><boxGeometry args={[0.2, 0.05, 0.05]} /><meshStandardMaterial color="#3e4a59" metalness={0.5} roughness={0.4} /></mesh>
      <mesh position={[-0.1, 0.1, 0.05]}><boxGeometry args={[0.04, 0.06, 0.02]} /><meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.2} /></mesh>
      <mesh position={[0.1, 0.1, 0.05]}><boxGeometry args={[0.04, 0.06, 0.02]} /><meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.2} /></mesh>
    </group>
  );
}

interface Experience {
  id: string;
  role: string;
  company: string;
  company_url?: string | null;
  period: string;
  location: string;
  description: string[];
  skills?: string[];
  tools?: string[];
  highlights?: string[];
}

export default function ExperienceCard({ experience }: { experience: Experience }) {
  return (
    <div className="relative pl-12 sm:pl-32 py-4 group"> {/* Increased mobile padding */}
      <div className="flex items-center absolute left-0 sm:left-20 top-0 h-full">
        <div className="w-px h-full bg-gray-800 group-hover:bg-blue-500 transition-colors duration-300"></div>
        <div className="absolute top-1/2 -translate-y-1/2 -ml-3.5 flex items-center justify-center w-8 h-8 bg-transparent rounded-full">
          <Canvas camera={{ position: [0, 0, 1.4], fov: 30 }}>
            <Suspense fallback={null}>
              <ambientLight intensity={1.5} />
              <directionalLight position={[3, 3, 3]} intensity={2} />
              <BriefcaseModel />
            </Suspense>
          </Canvas>
        </div>
      </div>

      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 p-5 rounded-lg transition-all duration-300 group-hover:border-blue-500/50 group-hover:scale-105">
        {/* FIX: Period is now inside the card flow on mobile, and absolute on larger screens */}
        <p className="text-sm text-gray-500 mb-2 sm:absolute sm:top-5 sm:right-5 lg:right-auto lg:-left-32 sm:mb-0">{experience.period}</p>

        <h3 className="text-lg font-bold text-white mb-1">{experience.role}</h3>

        {/* FIX: This container now stacks vertically on mobile */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4">
          {experience.company_url ? (
            <a href={experience.company_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium rounded-full transition-all duration-300 transform bg-white/10 border border-transparent text-blue-400 hover:bg-white/20 hover:border-white/30 hover:scale-105 w-fit">
              {experience.company} <ExternalLink size={12} />
            </a>
          ) : (
            <span className="inline-block px-3 py-1 text-xs font-medium bg-white/5 text-blue-400 rounded-full w-fit">{experience.company}</span>
          )}
          <span className="text-sm text-gray-500">• {experience.location}</span>
        </div>

        <ul className="list-disc pl-5 space-y-2 text-gray-300 text-sm mb-6">
          {experience.description.map((desc, index) => (<li key={index}>{desc}</li>))}
        </ul>

        {experience.skills && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2"><Zap size={14} className="text-yellow-400" /> Key Skills</h4>
            <div className="flex flex-wrap gap-1">
              {experience.skills.map(skill => <span key={skill} className="px-2 py-1 text-[11px] bg-gray-800 text-gray-300 rounded">{skill}</span>)}
            </div>
          </div>
        )}

        {experience.tools && (
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2"><Wrench size={14} className="text-yellow-400" /> Tools & Technologies</h4>
            <div className="flex flex-wrap gap-1">
              {experience.tools.map(tool => <span key={tool} className="px-2 py-1 text-[11px] bg-gray-800 text-gray-300 rounded">{tool}</span>)}
            </div>
          </div>
        )}

        {experience.highlights && (
          <div>
            <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2"><Star size={14} className="text-yellow-400" /> Highlights</h4>
            <ul className="list-disc pl-5 space-y-1 text-gray-400 text-xs">
              {experience.highlights.map((highlight, index) => (<li key={index}>{highlight}</li>))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
