'use client';

import React from 'react';
import { BookOpen, Calendar, ArrowRight, User } from 'lucide-react';

export const ZoqiraBlogPage: React.FC = () => {
  const posts = [
    {
      id: 1,
      title: "How Zoqira's Multi-Agent Council Predicted the Gold Rally to $3,600",
      date: 'November 20, 2026',
      author: 'Visut · Dev & Founder',
      category: 'MARKET INSIGHTS',
      summary:
        'A technical deep-dive into how our LLM auto-analysis scanned Treasury yields, central bank buying data, and 15-minute order blocks to catch the $120/oz Gold expansion.',
      readTime: '6 min read',
    },
    {
      id: 2,
      title: 'Risk-First Execution: Why 1:2 R:R Outperforms High-Winrate Scalping',
      date: 'November 15, 2026',
      author: 'Zoqira Quantitative Team',
      category: 'TRADING PSYCHOLOGY',
      summary:
        'Why win rate alone is a vanity metric, and how enforcing systematic stop-loss invalidation creates consistent compounding across Forex and Crypto portfolios.',
      readTime: '8 min read',
    },
    {
      id: 3,
      title: 'Architecture Overview: Sub-Second Signal Dispatch to Telegram & Webhooks',
      date: 'November 08, 2026',
      author: 'Visut · Dev & Founder',
      category: 'ENGINEERING',
      summary:
        'A behind-the-scenes look at our event-driven Laravel & WebSocket architecture that delivers institutional signals to 15,000+ traders simultaneously.',
      readTime: '5 min read',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-5 py-12">
      <div className="mb-10 text-center">
        <span className="lp-eyebrow">Knowledge Base</span>
        <h1 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Zoqira <span className="text-gradient-gold">Blog &amp; Updates</span>
        </h1>
        <p className="mt-3 text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">
          Deep-dives into AI market reasoning, algorithmic order flow, and quantitative risk management.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="rounded-2xl bg-[#080c16] border border-white/10 p-6 flex flex-col justify-between hover:border-amber-400/30 transition group shadow-xl"
          >
            <div>
              <span className="px-2.5 py-1 rounded-md bg-amber-400/10 text-amber-300 font-mono text-[10px] font-bold border border-amber-400/20">
                {post.category}
              </span>
              <h3 className="text-base font-bold text-white mt-4 tracking-tight leading-snug group-hover:text-amber-300 transition">
                {post.title}
              </h3>
              <p className="text-xs text-slate-400 mt-3 leading-relaxed font-normal">
                {post.summary}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-500 font-mono">
              <span>{post.readTime}</span>
              <span className="text-amber-400 group-hover:translate-x-1 transition-transform flex items-center gap-1 font-bold">
                Read article <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
