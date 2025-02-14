import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe2, X, Check, AlertTriangle } from 'lucide-react';

interface TranslationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  language: string;
  translatedText: string;
}

export function TranslationDialog({ isOpen, onClose, language, translatedText }: TranslationDialogProps) {
  const isPreview = translatedText.includes("Transaction failed");

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
                <div className={`w-10 h-10 rounded-xl ${isPreview ? 'bg-yellow-500/10' : 'bg-brand-500/10'} flex items-center justify-center`}>
                  {isPreview ? (
                    <AlertTriangle className="w-5 h-5 text-yellow-500" />
                  ) : (
                    <Check className="w-5 h-5 text-brand-500" />
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-surface-900">
                    {isPreview ? 'Translation Preview' : 'Translation Purchased!'}
                  </h3>
                  <p className="text-sm text-surface-700">
                    {isPreview 
                      ? 'Transaction failed, but here\'s a preview'
                      : `Your content has been translated to ${language}`}
                  </p>
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
                className={`connect-button group ${isPreview ? 'bg-yellow-500 hover:bg-yellow-600' : ''}`}
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