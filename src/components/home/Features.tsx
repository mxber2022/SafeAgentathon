import React from 'react';
import { Zap, Lock, Shield, Globe2, Coins, FileText } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="feature-card">
      <div className="h-10 w-10 text-brand-500 mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2 text-surface-900">{title}</h3>
      <p className="text-surface-700 leading-relaxed">{description}</p>
    </div>
  );
}

export function Features() {
  const features = [
    {
      icon: <FileText />,
      title: 'Digital Content NFTs',
      description: 'Transform your content into unique NFTs with verifiable ownership and royalty settings.',
    },
    {
      icon: <Globe2 />,
      title: 'Global Translations',
      description: 'Enable AI-powered translations to reach a global audience while maintaining content rights.',
    },
    {
      icon: <Coins />,
      title: 'Royalty System',
      description: 'Earn from content sales, translations, and usage through automated smart contracts.',
    },
    {
      icon: <Lock />,
      title: 'Content Rights',
      description: 'Protect your intellectual property with blockchain-backed ownership and licensing.',
    },
    {
      icon: <Zap />,
      title: 'Instant Minting',
      description: 'Create and list your digital content NFTs in minutes with gas-efficient transactions.',
    },
    {
      icon: <Shield />,
      title: 'Secure Platform',
      description: 'Built on Sei Network with enterprise-grade security and scalability.',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
      {features.map((feature) => (
        <FeatureCard key={feature.title} {...feature} />
      ))}
    </div>
  );
}