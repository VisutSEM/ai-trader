'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

interface ZoqiraNavbarProps {
  activePage: string;
  setActivePage: (page: string) => void;
  onOpenAuth: (mode: 'login' | 'register') => void;
}

export const ZoqiraNavbar: React.FC<ZoqiraNavbarProps> = ({
  activePage,
  setActivePage,
  onOpenAuth,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'signals', label: 'AI Signals' },
    { id: 'news-signals', label: 'News Signals' },
    { id: 'track-record', label: 'Track Record' },
    { id: 'certificates', label: 'Certificates' },
    { id: 'terminal', label: 'Market Analysis' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'news', label: 'News' },
    { id: 'blog', label: 'Blog' },
    { id: 'api', label: 'API' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 transition-colors duration-300 bg-[#050816]/95 backdrop-blur-md border-b border-white/5">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5">
        {/* Brand Logo */}
        <button
          onClick={() => setActivePage('home')}
          className="zq-hit inline-flex items-center gap-2.5 cursor-pointer"
        >
          <img
            src="/logo.png"
            alt="Zoqira"
            width={36}
            height={36}
            className="h-9 w-9 shrink-0 object-contain"
          />
          <span className="font-display text-lg font-bold tracking-tight text-white">
            Zoq<span className="text-gradient-gold">ira</span>
          </span>
        </button>

        {/* Center Desktop Navigation Links */}
        <div className="hidden items-center gap-5 text-sm font-medium lg:flex">
          {navLinks.map((link) => {
            const isActive = activePage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => setActivePage(link.id)}
                className={`rounded-md py-1 text-xs transition cursor-pointer ${
                  isActive
                    ? 'font-bold text-white'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </div>

        {/* Right CTA / Auth Buttons */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onOpenAuth('login')}
            className="hidden sm:inline-block rounded-xl px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white transition cursor-pointer"
          >
            Login
          </button>
          <button
            onClick={() => onOpenAuth('register')}
            className="rounded-full bg-white px-5 py-2 text-xs font-bold text-black hover:bg-slate-100 transition shadow-md cursor-pointer hover:scale-105 active:scale-95 duration-150"
          >
            Start Free Trial
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 text-slate-300 hover:text-white cursor-pointer"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/5 bg-[#070b18] px-5 py-4 space-y-2 animate-rise">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                setActivePage(link.id);
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left py-2 text-sm font-medium transition ${
                activePage === link.id ? 'text-amber-400 font-bold' : 'text-slate-300 hover:text-white'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-3 border-t border-white/5 flex gap-2">
            <button
              onClick={() => {
                onOpenAuth('login');
                setMobileMenuOpen(false);
              }}
              className="w-full py-2 text-center text-xs font-semibold text-slate-300 bg-white/5 rounded-xl"
            >
              Login
            </button>
            <button
              onClick={() => {
                onOpenAuth('register');
                setMobileMenuOpen(false);
              }}
              className="w-full py-2 text-center text-xs font-bold text-black bg-white rounded-xl"
            >
              Start Free Trial
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
