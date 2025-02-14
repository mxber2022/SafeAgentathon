import React from 'react';
import { FileText, Globe2 } from 'lucide-react';

interface TranslationFormProps {
  content: string;
  setContent: (content: string) => void;
  selectedLanguages: string[];
  onLanguageSelect: (language: string) => void;
  onTranslate: () => void;
  isProcessing: boolean;
}

export function TranslationForm({
  content,
  setContent,
  selectedLanguages,
  onLanguageSelect,
  onTranslate,
  isProcessing,
}: TranslationFormProps) {
  return (
    <div className="bg-surface-100 rounded-2xl shadow-lg p-8 mb-8 border border-surface-200">
      <div className="mb-8">
        <h2 className="text-2xl text-surface-900 mb-4 flex items-center">
          <FileText className="mr-2 text-brand-500" /> Enter Content
        </h2>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter your text content here..."
          className="w-full h-48 p-4 bg-surface-200 border-surface-300 rounded-xl 
                   focus:ring-2 focus:ring-brand-500 focus:border-transparent 
                   transition-all resize-none text-surface-900 
                   placeholder:text-surface-600"
        />
      </div>

      {content && (
        <div className="mb-8 animate-float">
          <h2 className="text-2xl text-surface-900 mb-4 flex items-center">
            <Globe2 className="mr-2 text-brand-500" /> Translation Options
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <LanguageOption
              language="Spanish"
              isSelected={selectedLanguages.includes('Spanish')}
              onClick={() => onLanguageSelect('Spanish')}
            />
            <LanguageOption
              language="Hindi"
              isSelected={selectedLanguages.includes('Hindi')}
              onClick={() => onLanguageSelect('Hindi')}
            />
          </div>
          <button
            onClick={onTranslate}
            disabled={isProcessing || !content.trim() || selectedLanguages.length === 0}
            className="mt-6 w-full connect-button py-4 group"
          >
            {isProcessing ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              'Start Translation'
            )}
          </button>
        </div>
      )}
    </div>
  );
}

interface LanguageOptionProps {
  language: string;
  isSelected: boolean;
  onClick: () => void;
}

function LanguageOption({ language, isSelected, onClick }: LanguageOptionProps) {
  return (
    <div
      className={`language-option ${isSelected ? 'ring-2 ring-brand-500' : ''}`}
      onClick={onClick}
    >
      <h3 className="font-bold mb-2 text-surface-900">{language}</h3>
      <p className="text-surface-700">AI-powered translation</p>
    </div>
  );
}