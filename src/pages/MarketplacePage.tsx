import React, { useState, useEffect } from 'react';
import { Search, Filter, Globe2, Sparkles, Users, Languages, FileText, Tag, X, Coins, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { Database } from '../lib/database.types';
import { useNavigate } from 'react-router-dom';
import { useAppKitAccount } from '@reown/appkit/react';
import { purchaseTranslation } from '../lib/contract';

type Content = Database['public']['Tables']['content']['Row'];

interface TranslationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  language: string;
  translatedText: string;
}

function TranslationDialog({ isOpen, onClose, language, translatedText }: TranslationDialogProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-surface-50/80 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-surface-100 rounded-2xl p-6 max-w-2xl w-full mx-4 border border-surface-200 shadow-xl"
          >
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center">
                  <Check className="w-5 h-5 text-brand-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-surface-900">Translation Purchased!</h3>
                  <p className="text-sm text-surface-700">Your content has been translated to {language}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-surface-200 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-surface-700" />
              </button>
            </div>

            <div className="bg-surface-200 rounded-xl p-6 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Globe2 className="w-4 h-4 text-brand-500" />
                <h4 className="font-medium text-surface-900">{language} Translation</h4>
              </div>
              <p className="text-surface-700 whitespace-pre-wrap">{translatedText}</p>
            </div>

            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="connect-button group"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedCreator, setSelectedCreator] = useState<string>('');
  const [showLanguageDialog, setShowLanguageDialog] = useState(false);
  const [selectedContent, setSelectedContent] = useState<Content | null>(null);
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [purchaseStatus, setPurchaseStatus] = useState<'idle' | 'purchasing' | 'success'>('idle');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const [showTranslationDialog, setShowTranslationDialog] = useState(false);
  const [currentTranslation, setCurrentTranslation] = useState<{ language: string; text: string } | null>(null);
  const { address } = useAppKitAccount();
  const navigate = useNavigate();
  
  
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

  useEffect(() => {
    fetchContents();
  
  }, []);

  const fetchContents = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('content')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setContents(data || []);
    } catch (err) {
      console.error('Error fetching contents:', err);
      setError('Failed to load content');
    } finally {
      setLoading(false);
    }
  };

  const handleAction = (content: Content, type: 'translate' | 'purchase') => {
    if (type === 'translate') {
      setSelectedContent(content);
      setShowLanguageDialog(true);
    } else if (type === 'purchase') {
      // Navigate to the content page
      navigate(`/api/content/${content.id}`);
    }
  };

  const handleTranslationRequest = async (language: string) => {
    if (!selectedContent || !address) return;
    
    try {
      setPurchaseStatus('purchasing');
      setSelectedLanguage(language);

      // For demonstration, let's show a German translation
      const translatedText = language === 'German' 
        ? "Berlin ist gut"
        : `[Translation of original content]\n\nThis is a placeholder for the AI-translated content in ${language}. In a production environment, this would be generated by a language model.`;

      try {
        // Attempt to purchase translation through smart contract
        await purchaseTranslation(
          selectedContent.id,
          language,
          selectedContent.creator_id,
          selectedContent.creator_share || 85,
          selectedContent.agent_share || 15
        );

        // If successful, update content in Supabase
        const updatedContent = {
          ...selectedContent,
          content_data: {
            ...selectedContent.content_data,
            attributes: [
              ...(selectedContent.content_data?.attributes || []).filter(
                attr => attr.trait_type.toLowerCase() !== language.toLowerCase()
              ),
              {
                trait_type: language,
                value: translatedText
              }
            ]
          }
        };

        const { error: updateError } = await supabase
          .from('content')
          .update({ 
            content_data: updatedContent.content_data,
            updated_at: new Date().toISOString()
          })
          .eq('id', selectedContent.id);

        if (updateError) throw updateError;
        
        setPurchaseStatus('success');
      } catch (error) {
        console.error('Transaction failed:', error);
        // Even if transaction fails, we'll still show the dialog
        setPurchaseStatus('idle');
      }

      // Show the translation dialog regardless of transaction success
      setCurrentTranslation({ language, text: translatedText });
      setShowTranslationDialog(true);

      // Reset purchase status after a delay
      setTimeout(() => {
        setPurchaseStatus('idle');
      }, 2000);

    } catch (error) {
      console.error('Error in translation process:', error);
      setPurchaseStatus('idle');
      
      // Show error translation dialog
      setCurrentTranslation({ 
        language, 
        text: "Note: Transaction failed, but here's a preview of the translation:\n\n" + 
              (language === 'German' ? "Berlin ist gut" : "Translation preview not available.")
      });
      setShowTranslationDialog(true);
    }
  };

  const filteredContent = contents.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (item.description || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || selectedCategory === 'All Categories';
    const matchesCreator = !selectedCreator || selectedCreator === 'all' ||
                          item.creator_id === selectedCreator;
    return matchesSearch && matchesCategory && matchesCreator;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FileText className="w-16 h-16 text-surface-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-surface-900 mb-2">Error Loading Content</h1>
          <p className="text-surface-700">{error}</p>
        </div>
      </div>
    );
  }

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
                <option value="All Categories">All Categories</option>
                <option value="Technical">Technical</option>
                <option value="Art">Art</option>
                <option value="Marketing">Marketing</option>
                <option value="Literature">Literature</option>
                <option value="Education">Education</option>
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
                {Array.from(new Set(contents.map(item => item.creator_id))).map(creatorId => (
                  <option key={creatorId} value={creatorId}>
                    {creatorId.slice(0, 6)}...{creatorId.slice(-4)}
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
                  
                  {/* Display content features/attributes */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full text-sm bg-surface-200 text-surface-700 border border-surface-300">
                      Original: {item.language}
                    </span>
                    {item.content_data?.attributes?.length > 1 && (
                      <span className="px-3 py-1 rounded-full text-sm bg-surface-200 text-surface-700 border border-surface-300">
                        {item.content_data.attributes.length - 1} Translations
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-surface-600">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{item.creator_id.slice(0, 6)}...{item.creator_id.slice(-4)}</span>
                    </div>
                    <span>Created: {new Date(item.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-3">
                  <div className="text-2xl font-bold text-brand-500">
                    View Content
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAction(item, 'translate')}
                      className="px-4 py-2 rounded-xl border border-surface-300 text-surface-700 hover:text-surface-900 hover:border-brand-500/30 transition-all flex items-center gap-2"
                    >
                      <Globe2 className="w-4 h-4" />
                      Translate
                    </button>
                    <button
                      onClick={() => handleAction(item, 'purchase')}
                      className="connect-button group flex items-center gap-2"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredContent.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-surface-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-surface-900 mb-2">No Content Found</h3>
              <p className="text-surface-700">
                {searchQuery 
                  ? "No items match your search criteria" 
                  : "No content has been published yet"}
              </p>
            </div>
          )}
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
                  <h3 className="text-xl font-bold text-surface-900">Purchase Translation</h3>
                  <button
                    onClick={() => setShowLanguageDialog(false)}
                    className="p-2 hover:bg-surface-200 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-surface-700" />
                  </button>
                </div>

                <div className="mb-6 space-y-4">
                  <div className="flex items-start gap-3 bg-surface-200/50 rounded-xl p-4">
                    <div className="p-2 bg-brand-500/10 rounded-lg">
                      <Coins className="w-5 h-5 text-brand-500" />
                    </div>
                    <div>
                      <h4 className="font-medium text-surface-900 mb-1">Translation Purchase</h4>
                      <p className="text-sm text-surface-700">
                        Purchase this translation to unlock the content in your selected language.
                        Revenue is shared between the creator ({selectedContent.creator_share || 85}%)
                        and the platform ({selectedContent.agent_share || 15}%).
                      </p>
                    </div>
                  </div>

                  <div className="bg-surface-200/50 rounded-xl p-4">
                    <p className="text-sm text-surface-700 mb-2">
                      Original Language: <span className="font-medium text-surface-900">{selectedContent.language}</span>
                    </p>
                    <p className="text-sm text-surface-700">
                      Content Length: {selectedContent.content_data?.attributes?.[0]?.value?.length || 0} characters
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[40vh] overflow-y-auto p-1">
                  {availableLanguages
                    .filter(lang => lang.name.toLowerCase() !== selectedContent.language.toLowerCase())
                    .map(lang => (
                      <button
                        key={lang.code}
                        onClick={() => handleTranslationRequest(lang.code)}
                        disabled={purchaseStatus !== 'idle' || !address}
                        className={`p-3 rounded-xl border text-left group transition-all
                          ${purchaseStatus === 'idle'
                            ? 'border-surface-300 bg-surface-200 hover:bg-surface-300/50 hover:border-brand-500/50'
                            : 'opacity-50 cursor-not-allowed'
                          }
                          ${selectedLanguage === lang.code && purchaseStatus !== 'idle'
                            ? 'border-brand-500 bg-brand-500/10'
                            : ''
                          }
                        `}
                      >
                        <div className="font-medium text-surface-900 group-hover:scale-105 transition-transform">
                          {lang.name}
                        </div>
                        <div className="text-sm text-surface-700">{lang.nativeName}</div>
                        {selectedLanguage === lang.code && purchaseStatus !== 'idle' && (
                          <div className="mt-2 text-sm font-medium text-brand-500">
                            {purchaseStatus === 'purchasing' ? 'Purchasing...' : 'Purchased!'}
                          </div>
                        )}
                      </button>
                    ))}
                </div>

                {!address && (
                  <div className="mt-4 text-center text-sm text-surface-700">
                    Please connect your wallet to purchase translations
                  </div>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Add the TranslationDialog component */}
        {currentTranslation && (
          <TranslationDialog
            isOpen={showTranslationDialog}
            onClose={() => {
              setShowTranslationDialog(false);
              setSelectedContent(null);
              fetchContents(); // Refresh content when dialog is closed
            }}
            language={currentTranslation.language}
            translatedText={currentTranslation.text}
          />
        )}
      </div>
       <div>
      {/* Always show the TranslationDialog */}

    </div>
    </div>
  );
}