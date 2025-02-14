import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Database } from '../lib/database.types';
import { FileText, Globe2, ExternalLink, ShoppingBag, Coins, X, Check } from 'lucide-react';
import { useAppKitAccount } from '@reown/appkit/react';
import { purchaseTranslation } from '../lib/contract';
import { motion, AnimatePresence } from 'framer-motion';

type Content = Database['public']['Tables']['content']['Row'];

interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  external_url: string;
  attributes: Array<{
    trait_type: string;
    value: string;
  }>;
  properties: {
    language: string;
    creator_share: number;
    agent_share: number;
  };
}

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

export function ContentPage() {
  const { id } = useParams<{ id: string }>();
  const [content, setContent] = useState<Content | null>(null);
  const [metadata, setMetadata] = useState<NFTMetadata | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<'rendered' | 'json'>('rendered');
  const [purchaseStatus, setPurchaseStatus] = useState<'idle' | 'purchasing' | 'success'>('idle');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const [showTranslationDialog, setShowTranslationDialog] = useState(false);
  const [currentTranslation, setCurrentTranslation] = useState<{ language: string; text: string } | null>(null);
  const { address } = useAppKitAccount();

  const fetchContent = async () => {
    try {
      const { data, error } = await supabase
        .from('content')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setContent(data);

      if (data) {
        // Get the original content
        const originalContent = data.content_data?.attributes?.find(
          (attr: any) => attr.trait_type.toLowerCase() === data.language.toLowerCase()
        );

        // Create metadata
        const nftMetadata: NFTMetadata = {
          name: data.title,
          description: data.description || '',
          image: data.image_url || '',
          external_url: window.location.href,
          attributes: data.content_data?.attributes || [],
          properties: {
            language: data.language,
            creator_share: data.creator_share || 0,
            agent_share: data.agent_share || 0
          }
        };
        setMetadata(nftMetadata);
      }
    } catch (err) {
      console.error('Error fetching content:', err);
      setError('Content not found or inaccessible');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchContent();
    }
  }, [id]);

  const handleTranslationPurchase = async (language: string) => {
    if (!content || !address) return;
    
    try {
      setPurchaseStatus('purchasing');
      setSelectedLanguage(language);

      // Purchase translation through smart contract
      await purchaseTranslation(
        content.id,
        language,
        content.creator_id,
        content.creator_share || 85,
        content.agent_share || 15
      );

      // Get the original content text
      const originalContent = content.content_data?.attributes?.find(
        (attr: any) => attr.trait_type.toLowerCase() === content.language.toLowerCase()
      );

      if (!originalContent) {
        throw new Error('Original content not found');
      }

      // In a real app, this would be an API call to a translation service
      const translatedText = `[Translation of: ${originalContent.value}]\n\nThis is a placeholder for the AI-translated content in ${language}. In a production environment, this would be generated by a language model.`;
      
      // Update content with new translation
      const updatedContent = {
        ...content,
        content_data: {
          ...content.content_data,
          attributes: [
            ...(content.content_data?.attributes || []).filter(
              attr => attr.trait_type.toLowerCase() !== language.toLowerCase()
            ),
            {
              trait_type: language,
              value: translatedText
            }
          ]
        }
      };

      // Update the content in Supabase
      const { error: updateError } = await supabase
        .from('content')
        .update({ 
          content_data: updatedContent.content_data,
          updated_at: new Date().toISOString()
        })
        .eq('id', content.id);

      if (updateError) throw updateError;

      // Update local state
      setContent(updatedContent);
      setPurchaseStatus('success');

      // Show the translation dialog
      setCurrentTranslation({ language, text: translatedText });
      setShowTranslationDialog(true);

      // Reset purchase status after a delay
      setTimeout(() => {
        setPurchaseStatus('idle');
      }, 2000);

    } catch (error) {
      console.error('Error purchasing translation:', error);
      setPurchaseStatus('idle');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-500"></div>
      </div>
    );
  }

  if (error || !content || !metadata) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FileText className="w-16 h-16 text-surface-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-surface-900 mb-2">Content Not Found</h1>
          <p className="text-surface-700">{error || 'Unable to load content'}</p>
        </div>
      </div>
    );
  }

  // Get all translations
  const translations = content.content_data?.attributes?.filter(
    (attr: any) => attr.trait_type.toLowerCase() !== content.language.toLowerCase()
  ) || [];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* View Toggle */}
        <div className="flex justify-end mb-4">
          <div className="inline-flex rounded-lg overflow-hidden">
            <button
              onClick={() => setView('rendered')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                view === 'rendered'
                  ? 'bg-brand-500 text-white'
                  : 'bg-surface-200 text-surface-700 hover:bg-surface-300'
              }`}
            >
              Rendered View
            </button>
            <button
              onClick={() => setView('json')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                view === 'json'
                  ? 'bg-brand-500 text-white'
                  : 'bg-surface-200 text-surface-700 hover:bg-surface-300'
              }`}
            >
              JSON Metadata
            </button>
          </div>
        </div>

        {view === 'rendered' ? (
          <div className="bg-surface-100 rounded-2xl p-8 border border-surface-200">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-surface-900 mb-4">{content.title}</h1>
              {content.description && (
                <p className="text-surface-700 mb-4">{content.description}</p>
              )}
              <div className="flex items-center gap-2 text-sm text-surface-600">
                <Globe2 className="w-4 h-4" />
                <span>Original Language: {content.language}</span>
              </div>
            </div>

            {/* Original Content */}
            {content.content_data?.attributes?.find(
              (attr: any) => attr.trait_type.toLowerCase() === content.language.toLowerCase()
            ) && (
              <div className="mb-8">
                <div className="bg-surface-200 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Globe2 className="w-4 h-4 text-brand-500" />
                    <h3 className="font-medium text-surface-900">Original Content ({content.language})</h3>
                  </div>
                  <p className="text-surface-700 whitespace-pre-wrap">
                    {content.content_data.attributes.find(
                      (attr: any) => attr.trait_type.toLowerCase() === content.language.toLowerCase()
                    )?.value}
                  </p>
                </div>
              </div>
            )}

            {/* Translations */}
            {translations.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-surface-900 mb-4">Translations</h3>
                <div className="space-y-4">
                  {translations.map((translation: any, index: number) => (
                    <div key={index} className="bg-surface-200 rounded-xl p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Globe2 className="w-4 h-4 text-brand-500" />
                        <h3 className="font-medium text-surface-900">{translation.trait_type}</h3>
                      </div>
                      <p className="text-surface-700 whitespace-pre-wrap">{translation.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Purchase New Translation */}
            <div className="mt-8 pt-8 border-t border-surface-200">
              <h3 className="text-xl font-bold text-surface-900 mb-4">Purchase New Translation</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {['Spanish', 'French', 'German', 'Italian', 'Chinese', 'Japanese'].map(language => {
                  const hasTranslation = translations.some(
                    t => t.trait_type.toLowerCase() === language.toLowerCase()
                  );
                  const isProcessing = selectedLanguage === language && purchaseStatus !== 'idle';

                  return (
                    <button
                      key={language}
                      onClick={() => !hasTranslation && handleTranslationPurchase(language)}
                      disabled={hasTranslation || isProcessing || !address}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        hasTranslation
                          ? 'border-brand-500 bg-brand-500/10'
                          : isProcessing
                          ? 'border-brand-500 bg-brand-500/5 cursor-wait'
                          : 'border-surface-300 bg-surface-200 hover:bg-surface-300/50 hover:border-brand-500/50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-surface-900">{language}</span>
                        {hasTranslation ? (
                          <span className="text-xs bg-brand-500 text-white px-2 py-1 rounded-full">
                            Purchased
                          </span>
                        ) : (
                          <Coins className="w-4 h-4 text-brand-500" />
                        )}
                      </div>
                      <div className="text-sm text-surface-700">
                        {hasTranslation 
                          ? 'Translation available'
                          : isProcessing
                          ? purchaseStatus === 'purchasing' ? 'Purchasing...' : 'Success!'
                          : '0.01 ETH'}
                      </div>
                    </button>
                  );
                })}
              </div>
              {!address && (
                <p className="mt-4 text-sm text-surface-600 text-center">
                  Connect your wallet to purchase translations
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-surface-100 rounded-2xl p-8 border border-surface-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-surface-900">NFT Metadata</h2>
              <button
                onClick={() => {
                  const jsonString = JSON.stringify(metadata, null, 2);
                  const blob = new Blob([jsonString], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `metadata-${id}.json`;
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                  URL.revokeObjectURL(url);
                }}
                className="px-4 py-2 bg-surface-200 rounded-lg text-surface-700 hover:bg-surface-300 transition-colors flex items-center gap-2 text-sm"
              >
                <ExternalLink className="w-4 h-4" />
                Download JSON
              </button>
            </div>
            <pre className="bg-surface-200 p-6 rounded-xl overflow-x-auto">
              <code className="text-sm text-surface-900">
                {JSON.stringify(metadata, null, 2)}
              </code>
            </pre>
          </div>
        )}
      </div>

      {/* Add the TranslationDialog component */}
      {currentTranslation && (
        <TranslationDialog
          isOpen={showTranslationDialog}
          onClose={() => {
            setShowTranslationDialog(false);
            fetchContent(); // Refresh content when dialog is closed
          }}
          language={currentTranslation.language}
          translatedText={currentTranslation.text}
        />
      )}
    </div>
  );
}