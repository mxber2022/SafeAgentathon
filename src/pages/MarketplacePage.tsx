import React, { useState } from 'react';
import { Search, Filter, Globe2, Sparkles, ArrowRight, Users, Languages, FileText, Tag, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Creator {
  id: string;
  address: string;
  name: string;
  reputation: number;
}

interface ContentItem {
  id: string;
  title: string;
  description: string;
  author: Creator;
  originalLanguage: string;
  category: string;
  price: number;
  features: string[];
  timestamp: string;
}

interface ActionRequest {
  contentId: string;
  type: 'translate' | 'purchase' | 'license';
  selectedLanguage?: string;
}

interface SelectedTranslations {
  [key: string]: string; // contentId -> languageCode
}

export function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedCreator, setSelectedCreator] = useState<string>('');
  const [actionRequest, setActionRequest] = useState<ActionRequest | null>(null);
  const [showLanguageDialog, setShowLanguageDialog] = useState(false);
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
  const [selectedTranslations, setSelectedTranslations] = useState<SelectedTranslations>({});

  // Available languages for translation
  const availableLanguages = [
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

  // Mock creators data
  const creators: Creator[] = [
    { id: '1', address: '0x1234...5678', name: 'TechDocs Pro', reputation: 4.8 },
    { id: '2', address: '0x9876...4321', name: 'Literary Works', reputation: 4.9 },
    { id: '3', address: '0x5678...9012', name: 'Global Marketing', reputation: 4.7 },
  ];

  // Mock content data
  const contentItems: ContentItem[] = [
    {
      id: '1',
      title: 'Advanced AI Framework Documentation',
      description: 'Complete technical documentation and implementation guide for a cutting-edge AI framework.',
      author: creators[0],
      originalLanguage: 'English',
      category: 'Technical',
      price: 500,
      features: ['Translation Available', 'Source Code', 'API Documentation'],
      timestamp: '2024-03-15'
    },
    {
      id: '2',
      title: 'Digital Art Collection: "Future Visions"',
      description: 'A curated collection of AI-generated artwork exploring themes of technology and nature.',
      author: creators[1],
      originalLanguage: 'French',
      category: 'Art',
      price: 300,
      features: ['High Resolution', 'Commercial License', 'Translation Available'],
      timestamp: '2024-03-14'
    },
    {
      id: '3',
      title: 'Global Brand Strategy Guide',
      description: 'Comprehensive marketing strategy and brand guidelines for international markets.',
      author: creators[2],
      originalLanguage: 'English',
      category: 'Marketing',
      price: 750,
      features: ['Translation Available', 'Case Studies', 'Templates'],
      timestamp: '2024-03-13'
    }
  ];

  const categories = [
    'All Categories',
    'Technical',
    'Art',
    'Marketing',
    'Literature',
    'Education',
    'Music'
  ];

  const filteredContent = contentItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || 
                           selectedCategory === 'All Categories' ||
                           item.category === selectedCategory;
    const matchesCreator = !selectedCreator || 
                          selectedCreator === 'all' ||
                          item.author.id === selectedCreator;
    return matchesSearch && matchesCategory && matchesCreator;
  });

  const handleAction = (contentId: string, type: 'translate' | 'purchase' | 'license') => {
    const content = contentItems.find(item => item.id === contentId);
    if (!content) return;

    if (type === 'translate') {
      setSelectedContent(content);
      setShowLanguageDialog(true);
    } else {
      setActionRequest({ contentId, type });
    }
  };

  const handleTranslationRequest = (language: string) => {
    if (!selectedContent) return;
    
    setSelectedTranslations(prev => ({
      ...prev,
      [selectedContent.id]: language
    }));
    
    console.log(`Processing translation request for content ${selectedContent.id} to ${language}`);
    // Here you would handle the translation request
    
    setShowLanguageDialog(false);
    setSelectedContent(null);
  };

  const getTranslateButtonText = (contentId: string) => {
    const selectedLanguage = selectedTranslations[contentId];
    if (!selectedLanguage) return 'Translate';
    
    const language = availableLanguages.find(lang => lang.code === selectedLanguage);
    return language ? `Translate to ${language.name}` : 'Translate';
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 mb-6 rounded-full bg-surface-200/50 border border-surface-300/50 text-surface-700">
            <Tag className="w-4 h-4 mr-2 text-brand-500" />
            <span className="text-sm font-medium">Digital Content Marketplace</span>
          </div>
          <h1 className="text-4xl font-bold text-surface-900 mb-4">
            Discover Digital Content
          </h1>
          <p className="text-xl text-surface-700 max-w-2xl mx-auto">
            Browse unique digital content with built-in translation capabilities. Purchase, license, or contribute translations.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-surface-600 w-5 h-5" />
            <input
              type="text"
              placeholder="Search content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-surface-200 rounded-xl text-surface-900 placeholder:text-surface-600 focus:ring-2 focus:ring-brand-500 focus:outline-none transition-all"
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Category Filter */}
            <div className="relative">
              <FileText className="absolute left-4 top-1/2 transform -translate-y-1/2 text-surface-600 w-5 h-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-surface-200 rounded-xl text-surface-900 appearance-none focus:ring-2 focus:ring-brand-500 focus:outline-none transition-all"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Creator Filter */}
            <div className="relative">
              <Users className="absolute left-4 top-1/2 transform -translate-y-1/2 text-surface-600 w-5 h-5" />
              <select
                value={selectedCreator}
                onChange={(e) => setSelectedCreator(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-surface-200 rounded-xl text-surface-900 appearance-none focus:ring-2 focus:ring-brand-500 focus:outline-none transition-all"
              >
                <option value="all">All Creators</option>
                {creators.map(creator => (
                  <option key={creator.id} value={creator.id}>
                    {creator.name} ({creator.address}) - ⭐ {creator.reputation}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 gap-6">
          {filteredContent.map(item => (
            <div
              key={item.id}
              className="bg-surface-100 rounded-2xl p-6 border border-surface-200 hover:border-brand-500/30 transition-all duration-500 group"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-5 h-5 text-brand-500" />
                    <h3 className="text-xl font-bold text-surface-900">{item.title}</h3>
                  </div>
                  <p className="text-surface-700 mb-4">{item.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.features.map(feature => (
                      <span
                        key={feature}
                        className="px-3 py-1 rounded-full text-sm bg-surface-200 text-surface-700 border border-surface-300"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-surface-600">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{item.author.name}</span>
                      <span className="text-brand-500">⭐ {item.author.reputation}</span>
                    </div>
                    <span>Category: {item.category}</span>
                    <span>Language: {item.originalLanguage}</span>
                    <span>Posted: {item.timestamp}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-3">
                  <div className="text-2xl font-bold text-brand-500">
                    {item.price} POLY
                  </div>
                  <div className="flex gap-2">
                  
                    {item.features.includes('Translation Available') && (
                      <button
                        onClick={() => handleAction(item.id, 'translate')}
                        className={`px-4 py-2 rounded-xl border border-surface-300 text-surface-700 hover:text-surface-900 hover:border-brand-500/30 transition-all flex items-center gap-2 ${
                          selectedTranslations[item.id] ? 'bg-surface-200' : ''
                        }`}
                      >
                        <Globe2 className="w-4 h-4" />
                        {getTranslateButtonText(item.id)}
                      </button>
                    )}
                      <button
                      onClick={() => handleAction(item.id, 'purchase')}
                      className="connect-button group flex items-center gap-2"
                    >
                      Purchase
                      
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Language Selection Dialog */}
        <AnimatePresence>
          {showLanguageDialog && selectedContent && (
            <div className="fixed inset-0 bg-surface-50/80 backdrop-blur-sm flex items-center justify-center z-50">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-surface-100 rounded-2xl p-6 max-w-lg w-full mx-4 border border-surface-200 shadow-xl"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-surface-900">Select Translation Language</h3>
                  <button
                    onClick={() => setShowLanguageDialog(false)}
                    className="p-2 hover:bg-surface-200 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-surface-700" />
                  </button>
                </div>

                <div className="mb-4">
                  <p className="text-surface-700">
                    Original: <span className="font-medium text-surface-900">{selectedContent.originalLanguage}</span>
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[60vh] overflow-y-auto p-1">
                  {availableLanguages
                    .filter(lang => lang.name !== selectedContent.originalLanguage)
                    .map(lang => (
                      <button
                        key={lang.code}
                        onClick={() => handleTranslationRequest(lang.code)}
                        className="p-3 rounded-xl border border-surface-300 bg-surface-200 hover:bg-surface-300/50 
                                 hover:border-brand-500/50 transition-all text-left group"
                      >
                        <div className="font-medium text-surface-900 group-hover:scale-105 transition-transform">
                          {lang.name}
                        </div>
                        <div className="text-sm text-surface-700">{lang.nativeName}</div>
                      </button>
                    ))}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}