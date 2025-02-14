import React, { useState } from "react";
import { FileUp, Globe2, Coins, Info, Plus, X } from "lucide-react";

interface RoyaltySettings {
  creatorShare: number;
  agentShare: number;
}

interface Language {
  code: string;
  name: string;
  nativeName: string;
}

interface Attribute {
  trait_type: string;
  value: string;
}

export function MintPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [newTraitType, setNewTraitType] = useState("");
  const [newTraitValue, setNewTraitValue] = useState("");
  const [originalLanguage, setOriginalLanguage] = useState<string>("");
  const [royalties, setRoyalties] = useState<RoyaltySettings>({
    creatorShare: 85,
    agentShare: 15,
  });
  const [isUploading, setIsUploading] = useState(false);

  const languages: Language[] = [
    { code: "en", name: "English", nativeName: "English" },
    { code: "es", name: "Spanish", nativeName: "Español" },
    { code: "fr", name: "French", nativeName: "Français" },
    { code: "de", name: "German", nativeName: "Deutsch" },
    { code: "it", name: "Italian", nativeName: "Italiano" },
    { code: "pt", name: "Portuguese", nativeName: "Português" },
    { code: "ru", name: "Russian", nativeName: "Русский" },
    { code: "zh", name: "Chinese", nativeName: "中文" },
    { code: "ja", name: "Japanese", nativeName: "日本語" },
    { code: "ko", name: "Korean", nativeName: "한국어" },
    { code: "hi", name: "Hindi", nativeName: "हिन्दी" },
    { code: "ar", name: "Arabic", nativeName: "العربية" },
  ];

  const handleOriginalLanguageSelect = (code: string) => {
    setOriginalLanguage(code);
    const selectedLang = languages.find((lang) => lang.code === code);
    if (selectedLang) {
      setNewTraitType(selectedLang.name);
    }
  };

  const handleAddAttribute = () => {
    if (newTraitType && newTraitValue) {
      setAttributes([
        ...attributes,
        { trait_type: newTraitType, value: newTraitValue },
      ]);
      setNewTraitValue("");
      // Don't reset newTraitType as it should keep the selected language
    }
  };

  const handleRemoveAttribute = (index: number) => {
    setAttributes(attributes.filter((_, i) => i !== index));
  };

  const handleMint = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    const metadata = {
      name: title,
      description,
      image: imageUrl,
      language: originalLanguage,
      attributes,
    };

    console.log("NFT Metadata:", metadata);

    // Simulating minting process
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsUploading(false);
  };

  const inputClasses =
    "w-full px-4 py-2.5 bg-surface-200 rounded-xl text-surface-900 placeholder:text-surface-600 focus:ring-2 focus:ring-brand-500 focus:outline-none transition-all";

  return (
    <div className="container mx-auto px-4 pb-16">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-surface-900 mb-4 bg-gradient-to-r from-brand-500 to-brand-300 bg-clip-text text-transparent animate-gradient">
            Mint Your Content
          </h1>
          <p className="text-xl text-surface-700 max-w-2xl mx-auto leading-relaxed">
            Transform your content into an NFT with secure ownership and
            customizable royalty settings.
          </p>
        </div>

        <form onSubmit={handleMint} className="space-y-8">
          {/* NFT Details */}
          <div className="bg-surface-100 rounded-2xl p-8 border border-surface-200 hover:border-brand-500/20 transition-all duration-500">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center">
                <FileUp className="w-5 h-5 text-brand-500" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-surface-900">
                  NFT Details
                </h2>
                <p className="text-sm text-surface-700">
                  Configure your NFT metadata
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-surface-700 mb-2"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className={inputClasses}
                  placeholder="Give your NFT a name"
                />
              </div>

              <div>
                <label
                  htmlFor="imageUrl"
                  className="block text-sm font-medium text-surface-700 mb-2"
                >
                  Image URL (IPFS)
                </label>
                <input
                  type="text"
                  id="imageUrl"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className={inputClasses}
                  placeholder="ipfs://..."
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-surface-700 mb-2"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={`${inputClasses} h-24 resize-none`}
                  placeholder="Describe your NFT..."
                />
              </div>

              {/* Attributes/Traits */}
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-4">
                  Content
                </label>
                <div className="space-y-4">
                  {attributes.map((attr, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-4 bg-surface-200 rounded-xl"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Globe2 className="w-4 h-4 text-brand-500" />
                          <p className="text-sm font-medium text-surface-900">
                            {attr.trait_type}
                          </p>
                        </div>
                        <p className="text-sm text-surface-700 whitespace-pre-wrap">
                          {attr.value}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveAttribute(index)}
                        className="p-1.5 hover:bg-surface-300 rounded-lg transition-colors"
                      >
                        <X className="w-4 h-4 text-surface-700" />
                      </button>
                    </div>
                  ))}

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Globe2 className="w-4 h-4 text-brand-500" />
                      <div className="text-sm font-medium text-surface-900">
                        {newTraitType || "Select a language below"}
                      </div>
                    </div>
                    <textarea
                      value={newTraitValue}
                      onChange={(e) => setNewTraitValue(e.target.value)}
                      placeholder={
                        originalLanguage
                          ? "Enter your content here..."
                          : "Please select a language first"
                      }
                      disabled={!originalLanguage}
                      className={`${inputClasses} h-32 resize-none ${
                        !originalLanguage ? "cursor-not-allowed opacity-50" : ""
                      }`}
                    />
                    <button
                      type="button"
                      onClick={handleAddAttribute}
                      disabled={!newTraitType || !newTraitValue}
                      className="w-full px-4 py-2.5 bg-surface-200 rounded-xl text-surface-700 hover:bg-surface-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Content</span>
                    </button>
                  </div>
                </div>
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
                <h2 className="text-xl font-bold text-surface-900">
                  Original Language
                </h2>
                <p className="text-sm text-surface-700">
                  Select the language of your content
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {languages.map((lang) => (
                <button
                  key={`original-${lang.code}`}
                  type="button"
                  onClick={() => handleOriginalLanguageSelect(lang.code)}
                  className={`group p-3 rounded-xl border text-sm transition-all duration-300 ${
                    originalLanguage === lang.code
                      ? "bg-brand-500 border-brand-600 text-white shadow-lg shadow-brand-500/20"
                      : "bg-surface-200 border-surface-300 text-surface-700 hover:border-brand-500/50 hover:bg-surface-300/50"
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
                <h2 className="text-xl font-bold text-surface-900">
                  Royalty Settings
                </h2>
                <p className="text-sm text-surface-700">
                  Configure revenue sharing between you and your agent
                </p>
              </div>
            </div>

            <div className="bg-surface-200/50 rounded-xl p-4 mb-6 flex items-start gap-3">
              <Info className="w-5 h-5 text-brand-500 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-surface-700">
                <p className="font-medium text-surface-900 mb-1">
                  About Royalty Distribution
                </p>
                <p>
                  Creator share is your portion of the revenue generated from
                  translations. Agent share covers platform fees and services.
                </p>
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
                  onChange={(e) =>
                    setRoyalties((prev) => ({
                      creatorShare: parseInt(e.target.value),
                      agentShare: 100 - parseInt(e.target.value),
                    }))
                  }
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
                  onChange={(e) =>
                    setRoyalties((prev) => ({
                      agentShare: parseInt(e.target.value),
                      creatorShare: 100 - parseInt(e.target.value),
                    }))
                  }
                  className="w-full h-2 bg-surface-200 rounded-lg appearance-none cursor-pointer accent-brand-500"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={!title || !originalLanguage || isUploading}
            className="connect-button w-full py-4 flex items-center justify-center"
          >
            {isUploading ? (
              <div className="flex items-center space-x-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Minting...</span>
              </div>
            ) : (
              "Mint Content"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
