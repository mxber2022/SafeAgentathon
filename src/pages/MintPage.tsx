import React, { useState } from 'react';
import { FileUp, Globe2, Coins, Info } from 'lucide-react';

interface RoyaltySettings {
  creatorShare: number;
  agentShare: number;
}

interface Language {
  code: string;
  name: string;
  nativeName: string;
}

export function MintPage() {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [originalLanguage, setOriginalLanguage] = useState<string>('');
  const [royalties, setRoyalties] = useState<RoyaltySettings>({
    creatorShare: 85,
    agentShare: 15,
  });
  const [isUploading, setIsUploading] = useState(false);

  const languages: Language[] = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'es', name: 'Spanish', nativeName: 'Español' },
    { code: 'fr', name: 'French', nativeName: 'Français' },
    { code: 'de', name: 'German', nativeName: 'Deutsch' },
    { code: 'it', name: 'Italian', nativeName: 'Italiano' },
    { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
    { code: 'ru', name: 'Russian', nativeName: 'Русский' },
    { code: 'zh', name: 'Chinese', nativeName: '中文' },
    { code: 'ja', name: 'Japanese', nativeName: '日本語' },
    { code: 'ko', name: 'Korean', nativeName: '한국어' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية' }
  ];

  const handleOriginalLanguageSelect = (code: string) => {
    setOriginalLanguage(code);
  };

  const handleMint = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    // Simulating minting process
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsUploading(false);
  };

  const inputClasses = "w-full px-4 py-2.5 bg-surface-200 rounded-xl text-surface-900 placeholder:text-surface-600 focus:ring-2 focus:ring-brand-500 focus:outline-none transition-all";

  return (
    <div className="container mx-auto px-4 pb-16">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-surface-900 mb-4 bg-gradient-to-r from-brand-500 to-brand-300 bg-clip-text text-transparent animate-gradient">
            Mint Your Content
          </h1>
          <p className="text-xl text-surface-700 max-w-2xl mx-auto leading-relaxed">
            Transform your content into an NFT with secure ownership and customizable royalty settings. Your content will be available for translation by our global community.
          </p>
        </div>

        <form onSubmit={handleMint} className="space-y-8">
          {/* Content Details */}
          <div className="bg-surface-100 rounded-2xl p-8 border border-surface-200 hover:border-brand-500/20 transition-all duration-500">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center">
                <FileUp className="w-5 h-5 text-brand-500" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-surface-900">Content Details</h2>
                <p className="text-sm text-surface-700">Provide information about your content</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-surface-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className={inputClasses}
                  placeholder="Give your content a memorable title"
                />
              </div>

              <div>
                <label htmlFor="content" className="block text-sm font-medium text-surface-700 mb-2">
                  Content
                </label>
                <textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className={`${inputClasses} h-48 resize-none`}
                  placeholder="Enter the content you want to make available for translation..."
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-surface-700 mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={`${inputClasses} h-24 resize-none`}
                  placeholder="Provide context about your content and its purpose..."
                />
              </div>
            </div>
          </div>

          {/* Original Language */}
          <div className="bg-surface-100 rounded-2xl p-8 border border-surface-200 hover:border-brand-500/20 transition-all duration-500">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center">
                <Globe2 className="w-5 h-5 text-brand-500" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-surface-900">Original Language</h2>
                <p className="text-sm text-surface-700">Select the language of your content</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {languages.map(lang => (
                <button
                  key={`original-${lang.code}`}
                  type="button"
                  onClick={() => handleOriginalLanguageSelect(lang.code)}
                  className={`group p-3 rounded-xl border text-sm transition-all duration-300 ${
                    originalLanguage === lang.code
                      ? 'bg-brand-500 border-brand-600 text-white shadow-lg shadow-brand-500/20'
                      : 'bg-surface-200 border-surface-300 text-surface-700 hover:border-brand-500/50 hover:bg-surface-300/50'
                  }`}
                >
                  <div className="font-medium group-hover:scale-105 transition-transform">
                    {lang.name}
                  </div>
                  <div className="text-xs opacity-80">{lang.nativeName}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Royalty Settings */}
          <div className="bg-surface-100 rounded-2xl p-8 border border-surface-200 hover:border-brand-500/20 transition-all duration-500">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center">
                <Coins className="w-5 h-5 text-brand-500" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-surface-900">Royalty Settings</h2>
                <p className="text-sm text-surface-700">Configure revenue sharing between you and your agent</p>
              </div>
            </div>

            <div className="bg-surface-200/50 rounded-xl p-4 mb-6 flex items-start gap-3">
              <Info className="w-5 h-5 text-brand-500 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-surface-700">
                <p className="font-medium text-surface-900 mb-1">About Royalty Distribution</p>
                <p>Creator share is your portion of the revenue generated from translations. Agent share covers platform fees and services. The remaining portion will be allocated to translators.</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-surface-700">
                    Creator Share
                  </label>
                  <span className="text-sm font-bold text-brand-500">
                    {royalties.creatorShare}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={royalties.creatorShare}
                  onChange={(e) => setRoyalties(prev => ({
                    creatorShare: parseInt(e.target.value),
                    agentShare: 100 - parseInt(e.target.value)
                  }))}
                  className="w-full h-2 bg-surface-200 rounded-lg appearance-none cursor-pointer accent-brand-500"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-surface-700">
                    Agent Share
                  </label>
                  <span className="text-sm font-bold text-brand-500">
                    {royalties.agentShare}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={royalties.agentShare}
                  onChange={(e) => setRoyalties(prev => ({
                    agentShare: parseInt(e.target.value),
                    creatorShare: 100 - parseInt(e.target.value)
                  }))}
                  className="w-full h-2 bg-surface-200 rounded-lg appearance-none cursor-pointer accent-brand-500"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={!content || !title || !originalLanguage || isUploading}
            className="connect-button w-full py-4 flex items-center justify-center"
          >
            {isUploading ? (
              <div className="flex items-center space-x-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Minting...</span>
              </div>
            ) : (
              'Mint Content'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}