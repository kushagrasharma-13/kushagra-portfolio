'use client';

import Image from 'next/image';
import { Mail, Linkedin, Github, Youtube, FileText } from 'lucide-react';

const socialLinks = [
  { href: 'mailto:sharmakushagra2b@gmail.com', icon: <Mail size={20} />, label: 'Email' },
  { href: 'https://www.linkedin.com/in/kush-shrm', icon: <Linkedin size={20} />, label: 'LinkedIn' },
  { href: 'https://github.com/kushagrasharma-13', icon: <Github size={20} />, label: 'GitHub' },
  {
    href: 'https://www.kaggle.com/kushagrasharma13',
    icon: <Image src="/kaggle.svg" alt="Kaggle logo" width={100} height={100} className="filter brightness-0 invert" unoptimized />,
    label: 'Kaggle'
  },
  {
    href: 'https://huggingface.co/kushagrasharma-13',
    icon: <Image src="/huggingface.svg" alt="Hugging Face logo" width={100} height={100} unoptimized />,
    label: 'Hugging Face'
  },
  { href: 'https://www.youtube.com/@KushagraSharma-13', icon: <Youtube size={20} />, label: 'YouTube' },
  { href: 'https://drive.google.com/file/d/1EI4bup_Ua4kl4mtfFYtOWX7drJ_-dO8K/view?usp=sharing', icon: <FileText size={20} />, label: 'Resume' },
];

export default function Footer() {
  return (
    // FIX: Added a semi-transparent background to create the glassy effect
    <footer className="mt-20">
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col items-center justify-center">
          <nav className="flex items-center space-x-4 mb-4 flex-wrap justify-center">
            {socialLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 bg-white/10 border border-white/20 text-gray-400 rounded-full transition-all duration-300 transform hover:scale-110 hover:bg-white/20 hover:text-white hover:border-white/30"
                aria-label={link.label}
              >
                {link.icon}
              </a>
            ))}
          </nav>
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Kushagra Sharma. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}