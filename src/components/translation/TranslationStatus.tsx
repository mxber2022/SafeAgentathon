import React from 'react';
import { Coins } from 'lucide-react';

interface Translation {
  language: string;
  status: 'pending' | 'completed';
  hash: string;
}

interface TranslationStatusProps {
  translations: Translation[];
}

export function TranslationStatus({ translations }: TranslationStatusProps) {
  if (translations.length === 0) return null;

  return (
    <div className="animate-float">
      <h2 className="text-2xl text-surface-900 mb-4 flex items-center">
        <Coins className="mr-2 text-brand-500" /> Translation Status
      </h2>
      <div className="space-y-4">
        {translations.map((translation) => (
          <div
            key={translation.hash}
            className="p-6 border rounded-xl bg-surface-200 border-surface-300
                     hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold text-surface-900">{translation.language}</h3>
                <p className="text-surface-700 font-mono text-sm">IPFS Hash: {translation.hash}</p>
              </div>
              <span className="px-4 py-1 rounded-full text-sm bg-brand-100 text-brand-800 font-medium">
                {translation.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}