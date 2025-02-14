import React from 'react';
import { Hero } from '../components/home/Hero';
import { Features } from '../components/home/Features';
import { HowItWorks } from '../components/home/HowItWorks';

export function HomePage() {
  return (
    <div className="container mx-auto px-4">
      <div className="max-w-5xl mx-auto">
        <Hero />
        <Features />
        <HowItWorks />
      </div>
    </div>
  );
}