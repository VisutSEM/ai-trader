'use client';

import React, { useState } from 'react';
import { Send, Mail, MessageSquare, Check, Shield } from 'lucide-react';

export const ZoqiraContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'Support',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-5 py-12">
      <div className="mb-10 text-center">
        <span className="lp-eyebrow">Trader Concierge</span>
        <h1 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Get in Touch with <span className="text-gradient-gold">Zoqira Desk</span>
        </h1>
        <p className="mt-3 text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">
          Questions about AI signals, broker partnerships, or custom institutional feeds? Our team is available 24/7.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Column: Direct Community Links */}
        <div className="md:col-span-5 space-y-4">
          <a
            href="https://t.me/rithcommunity"
            target="_blank"
            rel="noopener noreferrer"
            className="block p-5 rounded-2xl bg-[#090e1c] border border-white/10 hover:border-amber-400/40 transition group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400">
                <Send className="w-5 h-5 -rotate-45" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Telegram Community</h4>
                <p className="text-xs text-slate-400">@rithcommunity</p>
              </div>
            </div>
            <p className="mt-3 text-xs text-slate-400 leading-relaxed font-normal">
              Direct access to Visut, live trader discussion, and instant signal announcements.
            </p>
          </a>

          <div className="p-5 rounded-2xl bg-[#090e1c] border border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-300">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">VIP Desk Email</h4>
                <p className="text-xs text-slate-400">support@zoqira.pro</p>
              </div>
            </div>
            <p className="mt-3 text-xs text-slate-400 leading-relaxed font-normal">
              Average response time under 15 minutes for verified Pro &amp; Partner members.
            </p>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="md:col-span-7">
          <div className="rounded-3xl bg-[#080c16] border border-white/10 p-6 sm:p-8 shadow-2xl">
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center mb-4">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>
                <h3 className="text-lg font-bold text-white">Message Dispatched</h3>
                <p className="text-xs text-slate-400 mt-2 max-w-sm mx-auto">
                  Thank you! Our trading desk has received your note and will follow up shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Trader Alex"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-amber-400 outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@trading.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-amber-400 outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Topic</label>
                  <select
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0e1422] border border-white/10 text-white text-xs focus:border-amber-400 outline-none transition"
                  >
                    <option value="Support">Signal Support &amp; Follow Execution</option>
                    <option value="Partner">Broker Partner Verification (Exness/GTC/Lirunex)</option>
                    <option value="Institutional">Institutional API &amp; Webhooks</option>
                    <option value="Other">General Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Message</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="How can our AI desk assist your trading today?"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-amber-400 outline-none transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full btn-gold btn-shine py-3 rounded-xl font-bold text-xs text-slate-950 transition hover:scale-[1.02] cursor-pointer shadow-lg"
                >
                  Send Inquiry to Desk
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
