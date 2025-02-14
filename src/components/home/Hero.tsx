import React from 'react';
import { Sparkles } from 'lucide-react';

export function Hero() {
  return (
    <header className="text-center mb-24">
      <div className="inline-flex items-center px-4 py-2 mb-8 rounded-full bg-surface-200/50 border border-surface-300/50 text-surface-700">
        <Sparkles className="w-4 h-4 mr-2 text-brand-500" />
        <span className="text-sm font-medium">Revolutionizing Content Translation with Blockchain</span>
      </div>
      
      <h1 className="text-7xl text-surface-900 mb-6 leading-tight bg-gradient-to-r from-brand-500 to-brand-300 bg-clip-text text-transparent animate-gradient">
        AI-Powered Content
        <span className="block">Translation</span>
      </h1>
      
      <p className="text-xl text-surface-700 max-w-2xl mx-auto font-medium leading-relaxed mb-12">
        Transform your content into multiple languages while preserving ownership and earning royalties through blockchain technology.
      </p>

      <div className="flex items-center justify-center gap-6">
        <button className="connect-button flex items-center space-x-2 group">
          <span>Start Creating</span>
        </button>
        <a href="#how-it-works" className="text-surface-700 hover:text-surface-900 font-medium transition-colors">
          Learn More →
        </a>
      </div>
    </header>
  );
}