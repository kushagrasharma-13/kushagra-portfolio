'use client';

import Link from 'next/link';
import { Mail, Linkedin, Github, Instagram } from 'lucide-react';

const contactMethods = [
  {
    icon: Mail,
    title: 'Email',
    description: 'The best way to reach me for any inquiries or opportunities.',
    href: 'mailto:sharmakushagra295@gmail.com',
    cta: 'Send an Email',
  },
  {
    icon: Linkedin,
    title: 'LinkedIn',
    description: 'Connect with me on a professional level and view my network.',
    href: 'https://www.linkedin.com/in/kush-shrm',
    cta: 'View Profile',
  },
  {
    icon: Github,
    title: 'GitHub',
    description: 'Explore my repositories and see my coding style firsthand.',
    href: 'https://github.com/kushagrasharma-13',
    cta: 'View Profile',
  },
  {
    icon: Instagram,
    title: 'Instagram',
    description: 'Follow my journey and see my creative side.',
    href: 'https://www.instagram.com/kushagrasharma_13',
    cta: 'View Profile',
  },
];

export default function ContactPage() {
  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white">Get in Touch</h1>
        <p className="text-lg text-gray-400 mt-4 max-w-2xl mx-auto">
          I'm always open to discussing new projects, creative ideas, or opportunities to be part of an ambitious vision.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {contactMethods.map((method) => (
          <Link href={method.href} key={method.title} target="_blank" rel="noopener noreferrer">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 p-8 rounded-xl h-full text-center group transition-all duration-300 hover:border-blue-500/50 hover:scale-105">
              <div className="flex justify-center mb-4">
                <method.icon className="text-blue-400 group-hover:text-white transition-colors" size={40} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{method.title}</h3>
              <p className="text-gray-400 mb-4 text-sm">{method.description}</p>
              <span className="font-semibold text-blue-400 group-hover:text-white transition-colors">
                {method.cta} &rarr;
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}