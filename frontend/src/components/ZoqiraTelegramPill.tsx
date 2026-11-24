'use client';

import React from 'react';
import { Send } from 'lucide-react';

export const ZoqiraTelegramPill: React.FC = () => {
  return (
    <a
      href="https://t.me"
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-4 right-4 z-40 flex items-center gap-2.5 pl-2 pr-3.5 py-1.5 rounded-full bg-[#0a121e]/90 backdrop-blur-xl border border-[#203248] shadow-2xl hover:border-sky-400 transition cursor-pointer group"
    >
      <div className="w-8 h-8 rounded-full bg-[#0284c7] text-white flex items-center justify-center shadow-md shadow-sky-500/20 group-hover:scale-105 transition">
        <Send className="w-4 h-4 -rotate-12 translate-x-[-1px] translate-y-[-1px]" />
      </div>
      <div className="text-left font-sans">
        <div className="text-[11px] font-bold text-white leading-tight">Join community</div>
        <div className="text-[9px] font-mono font-bold tracking-wider text-sky-400 uppercase">
          TELEGRAM • FREE
        </div>
      </div>
    </a>
  );
};
