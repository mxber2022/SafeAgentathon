import React, { useState } from "react";
import {
  FileText,
  Globe2,
  Tag,
  Search,
  Filter,
  ExternalLink,
} from "lucide-react";
import { motion } from "framer-motion";

interface CollectionItem {
  id: string;
  title: string;
  description: string;
  creator: string;
  purchaseDate: string;
  type: "purchase" | "translation";
  originalLanguage: string;
  translatedLanguage?: string;
  price: number;
  features: string[];
}

export function CollectionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");

  // Mock collection data
  const collectionItems: CollectionItem[] = [
    {
      id: "1",
      title: "Advanced AI Framework Documentation",
      description:
        "Complete technical documentation and implementation guide for a cutting-edge AI framework.",
      creator: "TechDocs Pro",
      purchaseDate: "2024-03-15",
      type: "purchase",
      originalLanguage: "English",
      price: 500,
      features: ["Source Code", "API Documentation", "Updates Included"],
    },
    {
      id: "2",
      title: 'Digital Art Collection: "Future Visions"',
      description:
        "A curated collection of AI-generated artwork exploring themes of technology and nature.",
      creator: "ArtisticMinds",
      purchaseDate: "2024-03-14",
      type: "translation",
      originalLanguage: "French",
      translatedLanguage: "English",
      price: 300,
      features: ["High Resolution", "Commercial License"],
    },
  ];

  const filteredItems = collectionItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "all" || item.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 mb-6 rounded-full bg-surface-200/50 border border-surface-300/50 text-surface-700">
            <FileText className="w-4 h-4 mr-2 text-brand-500" />
            <span className="text-sm font-medium">Your Digital Collection</span>
          </div>
          <h1 className="text-4xl font-bold text-surface-900 mb-4">
            My Collection
          </h1>
          <p className="text-xl text-surface-700 max-w-2xl mx-auto">
            View and manage your purchased content and translations
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-surface-600 w-5 h-5" />
              <input
                type="text"
                placeholder="Search your collection..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-surface-200 rounded-xl text-surface-900 placeholder:text-surface-600 focus:ring-2 focus:ring-brand-500 focus:outline-none transition-all"
              />
            </div>

            {/* Type Filter */}
            <div className="relative min-w-[200px]">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-surface-600 w-5 h-5" />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-surface-200 rounded-xl text-surface-900 appearance-none focus:ring-2 focus:ring-brand-500 focus:outline-none transition-all"
              >
                <option value="all">All Items</option>
                <option value="purchase">Purchases</option>
                <option value="translation">Translations</option>
              </select>
            </div>
          </div>
        </div>

        {/* Collection Grid */}
        <div className="grid grid-cols-1 gap-6">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-surface-100 rounded-2xl p-6 border border-surface-200 hover:border-brand-500/30 transition-all duration-500 group"
            >
              <div className="flex flex-col md:flex-row justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {item.type === "translation" ? (
                      <Globe2 className="w-5 h-5 text-brand-500" />
                    ) : (
                      <FileText className="w-5 h-5 text-brand-500" />
                    )}
                    <h3 className="text-xl font-bold text-surface-900">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-surface-700 mb-4">{item.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-3 py-1 rounded-full text-sm bg-surface-200 text-surface-700 border border-surface-300"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-surface-600">
                    <span>Creator: {item.creator}</span>
                    <span>Purchased: {item.purchaseDate}</span>
                    {item.type === "translation" ? (
                      <span className="flex items-center gap-1">
                        <Globe2 className="w-4 h-4" />
                        {item.originalLanguage} → {item.translatedLanguage}
                      </span>
                    ) : (
                      <span>Language: {item.originalLanguage}</span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-3">
                  <div className="text-2xl font-bold text-brand-500">
                    {item.price} POLY
                  </div>
                  <button className="connect-button group flex items-center gap-2">
                    View Content
                    <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-surface-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-surface-900 mb-2">
                No items found
              </h3>
              <p className="text-surface-700">
                {searchQuery
                  ? "No items match your search criteria"
                  : "Your collection is empty. Start by purchasing or translating content!"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
