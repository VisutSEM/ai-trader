'use client';

import React, { useState } from 'react';
import { X, Zap, Mail, Lock, User, ArrowRight } from 'lucide-react';

interface ZoqiraAuthModalProps {
  isOpen: boolean;
  initialMode: 'login' | 'register';
  onClose: () => void;
  onSuccess: () => void;
}

export const ZoqiraAuthModal: React.FC<ZoqiraAuthModalProps> = ({
  isOpen,
  initialMode,
  onClose,
  onSuccess,
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md px-4 animate-in fade-in">
      <div className="w-full max-w-md rounded-3xl bg-[#0c121c] border border-[#23354d] p-6 shadow-2xl relative space-y-5">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 text-slate-400 hover:text-white transition"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center space-y-1">
          <div className="w-10 h-10 rounded-xl bg-[#141e2e] border border-[#27384e] flex items-center justify-center font-black text-base text-white mx-auto shadow-inner">
            <span className="bg-gradient-to-tr from-amber-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Z
            </span>
          </div>
          <h2 className="text-xl font-bold text-white">
            {mode === 'login' ? 'Welcome Back to Zoqira' : 'Start Your Free Trial'}
          </h2>
          <p className="text-xs text-slate-400">
            {mode === 'login'
              ? 'Access real-time AI signals and clear trade setups'
              : 'Join 15,290+ traders receiving institutional setups'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          {mode === 'register' && (
            <div>
              <label className="text-slate-300 font-semibold mb-1 block">Full Name</label>
              <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-[#121926] border border-[#202e43]">
                <User className="w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full bg-transparent text-white outline-none placeholder:text-slate-500 text-xs"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-slate-300 font-semibold mb-1 block">Email Address</label>
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-[#121926] border border-[#202e43]">
              <Mail className="w-4 h-4 text-slate-400" />
              <input
                type="email"
                required
                placeholder="trader@zoqira.pro"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-transparent text-white outline-none placeholder:text-slate-500 text-xs"
              />
            </div>
          </div>

          <div>
            <label className="text-slate-300 font-semibold mb-1 block">Password</label>
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-[#121926] border border-[#202e43]">
              <Lock className="w-4 h-4 text-slate-400" />
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-transparent text-white outline-none placeholder:text-slate-500 text-xs"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-white text-black font-extrabold text-sm hover:bg-slate-100 transition shadow-lg flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            <span>{mode === 'login' ? 'Sign In to Desk' : 'Activate Free Trial'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2 border-t border-[#1a2536] text-xs text-slate-400">
          {mode === 'login' ? (
            <p>
              Don&apos;t have an account?{' '}
              <button
                onClick={() => setMode('register')}
                className="text-emerald-400 font-bold hover:underline"
              >
                Start Free Trial
              </button>
            </p>
          ) : (
            <p>
              Already registered?{' '}
              <button
                onClick={() => setMode('login')}
                className="text-emerald-400 font-bold hover:underline"
              >
                Login
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
