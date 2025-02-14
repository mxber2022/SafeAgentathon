import React from 'react';
import { Globe2, Twitter, Github, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-surface-100 border-t border-surface-200">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center">
            <Globe2 className="h-6 w-6 text-brand-500" />
            <span className="ml-2 text-lg font-bold text-surface-900">PolyGlot</span>
          </div>
          <div className="flex space-x-6">
            <SocialLink href="#twitter" icon={<Twitter />} />
            <SocialLink href="#github" icon={<Github />} />
            <SocialLink href="#linkedin" icon={<Linkedin />} />
          </div>
          <p className="text-surface-600 text-sm">&copy; 2025 PolyGlot. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
}

function SocialLink({ href, icon }: SocialLinkProps) {
  return (
    <a href={href} className="text-surface-600 hover:text-brand-500 transition-colors">
      <div className="h-5 w-5">{icon}</div>
    </a>
  );
}