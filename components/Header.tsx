'use client';

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/projects', label: 'Projects' },
  { href: '/experience', label: 'Experience' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-gray-950/70 backdrop-blur-sm border-b border-gray-800' : 'bg-transparent border-b border-transparent'}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-2xl font-bold transition-transform hover:scale-105 bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
              KUSHAGRA SHARMA
            </Link>
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-4">
              {navLinks.map((link) => {
                const isActive = pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 transform hover:scale-110
                      ${isActive
                        ? 'bg-blue-500/20 border-blue-400/30 text-white shadow-lg shadow-blue-500/20'
                        : 'bg-white/10 border-white/20 text-gray-400 hover:bg-white/20 hover:text-white hover:border-white/30'
                      }
                      border backdrop-blur-sm
                    `}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white">
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 bg-gray-950/90 backdrop-blur-lg transition-transform duration-300 ease-in-out md:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <nav className="flex flex-col items-center justify-center h-full space-y-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-3xl font-bold text-gray-300 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
