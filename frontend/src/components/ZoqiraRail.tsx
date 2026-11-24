'use client';

import React, { useState, useEffect } from 'react';

export const ZoqiraRail: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('zq-hero');

  const sections = [
    { id: 'zq-hero', label: 'Start' },
    { id: 'zq-features', label: 'Features' },
    { id: 'zq-how', label: 'How it works' },
    { id: 'zq-markets', label: 'Markets' },
    { id: 'zq-cta', label: 'Get started' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.35;
      for (const sec of sections) {
        const el = document.getElementById(sec.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sec.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className="lp-rail" data-rail="" aria-label="Page sections">
      {sections.map((sec) => (
        <a
          key={sec.id}
          href={`#${sec.id}`}
          onClick={(e) => {
            e.preventDefault();
            scrollTo(sec.id);
          }}
          className={activeSection === sec.id ? 'is-active' : ''}
        >
          <span>{sec.label}</span>
        </a>
      ))}
    </nav>
  );
};
