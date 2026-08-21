'use client';

import Link from 'next/link';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { GraduationCap, MapPin, Trophy, HeartHandshake, ArrowRight } from 'lucide-react';

// Lazy load the 3D scene for better performance
const AboutScene = dynamic(() => import('@/components/3d/AboutScene'), {
  ssr: false,
});

const achievements = [
  { icon: Trophy, text: 'National Finalist at IBM ICE Hackathon 2024' },
  { icon: Trophy, text: 'Top 1% in Analysis & Algorithms Course at IIT Kharagpur' },
  { icon: Trophy, text: 'First Prize - Smart India Hackathon Senior Software Edition' },
];

export default function AboutPage() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white">About Me</h1>
        <p className="text-lg text-gray-400 mt-4 max-w-2xl mx-auto">
          A brief look into my background, skills, and what drives me.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
        {/* Left Column: 3D Scene and Quick Facts */}
        <div className="lg:col-span-2 space-y-8">
          <div
            className="h-64 rounded-xl bg-gray-900/50 border border-gray-800"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <AboutScene isHovered={isHovered} />
          </div>

          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-white mb-4">At a Glance</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center gap-3">
                <GraduationCap className="text-blue-400" size={20} />
                <span>B.Tech in CS (AI/ML) from GLA University</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="text-blue-400" size={20} />
                <span>Based in Delhi, India</span>
              </li>
              <li className="flex items-center gap-3">
                <HeartHandshake className="text-blue-400" size={20} />
                <span>Volunteer Teacher at Udaaan Asman Tak NGO</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column: Bio and Achievements */}
        <div className="lg:col-span-3">
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 p-8 rounded-xl">
            <h2 className="text-3xl font-bold text-white mb-4">My Story</h2>
            <div className="text-gray-300 text-lg leading-relaxed space-y-4">
              <p>
                From my first "Hello, World!" program, I've been captivated by the power of code to solve real-world problems. That curiosity led me into Computer Science with a specialization in AI & Machine Learning, and today it shows up in backend systems, cloud platform APIs, AI-native documentation, and GenAI/RAG applications.
              </p>
              <p>
                My professional journey has allowed me to apply these skills in diverse, fast-paced environments. At StoryVord, I engineered LLM-powered assistant bots for film-production workflows, while at WhatBytes, I built Django backend systems for ad-tech platforms. Currently, as an Associate Software Engineer at E2E Networks, I work across Python backend engineering, cloud platform APIs, AI-native documentation, billing workflow architecture, and internal developer tooling.
              </p>
              <p>
                I am driven by a constant curiosity and a desire to build tools that are technically strong, practical, and easy for other developers to use. Whether I am improving cloud documentation for LLM discoverability, building API automation, or shipping a RAG assistant over patent documents, I like work where engineering craft meets real user utility.
              </p>
            </div>

            <div className="mt-8">
              <h3 className="text-2xl font-bold text-white mb-4">Achievements</h3>
              <ul className="space-y-3">
                {achievements.map((ach, index) => (
                  <li key={index} className="flex items-center gap-3 text-gray-300">
                    <ach.icon className="text-yellow-400" size={20} />
                    <span>{ach.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link href="/Kushagra_Sharma_Resume.pdf" target="_blank" download
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg transition-all duration-300 hover:bg-blue-500 hover:scale-105"
              >
                Download Resume
              </Link>
              <Link href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-gray-700 text-white font-semibold rounded-lg transition-all duration-300 hover:bg-gray-600 hover:scale-105"
              >
                Get in Touch <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
