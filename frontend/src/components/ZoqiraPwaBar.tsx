'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';

interface ZoqiraPwaBarProps {
  onInstall?: () => void;
}

export const ZoqiraPwaBar: React.FC<ZoqiraPwaBarProps> = ({ onInstall }) => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-4 px-4 py-2.5 rounded-2xl bg-[#0c121b]/95 backdrop-blur-xl border border-[#223349] shadow-2xl select-none animate-in slide-in-from-bottom-3 duration-200">
      <div className="w-9 h-9 rounded-xl bg-[#141e2e] border border-[#26374d] flex items-center justify-center font-black text-sm text-white shadow-inner">
        <span className="bg-gradient-to-tr from-amber-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
          Z
        </span>
      </div>
      <div>
        <div className="font-bold text-xs text-white">Install Zoqira</div>
        <div className="text-[11px] text-slate-400">Add to your home screen</div>
      </div>
      <button
        onClick={() => {
          if (onInstall) {
            onInstall();
          } else {
            alert('PWA installation prompt triggered! Added to home screen.');
          }
          setVisible(false);
        }}
        className="px-4 py-1.5 rounded-xl bg-white text-black font-bold text-xs hover:bg-slate-100 transition shadow cursor-pointer ml-1"
      >
        Install
      </button>
      <button
        onClick={() => setVisible(false)}
        className="text-slate-400 hover:text-white transition cursor-pointer p-1"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
