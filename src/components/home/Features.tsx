import React from 'react';
import { Zap, Lock, Shield } from 'lucide-react';

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
      icon: <Zap />,
      title: 'AI Translation',
      description: 'State-of-the-art AI models for accurate translations.',
    },
    {
      icon: <Lock />,
      title: 'Blockchain Security',
      description: 'Immutable ownership records and royalty distribution.',
    },
    {
      icon: <Shield />,
      title: 'Rights Management',
      description: 'Automated licensing and royalty tracking.',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
      {features.map((feature) => (
        <FeatureCard key={feature.title} {...feature} />
      ))}
    </div>
  );
}