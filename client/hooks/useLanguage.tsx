import React, { createContext, useContext, useState, useEffect } from "react";
import {
  Language,
  SUPPORTED_LANGUAGES,
  MarketTier,
  MARKET_TIERS,
} from "@/lib/regionalLanguage";

interface LanguageContextType {
  currentLanguage: Language;
  selectedMarketTier: MarketTier;
  setLanguage: (language: Language) => void;
  setMarketTier: (tier: MarketTier) => void;
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(
    SUPPORTED_LANGUAGES[0],
  );
  const [selectedMarketTier, setSelectedMarketTier] = useState<MarketTier>(
    MARKET_TIERS[0],
  );
  const [isLoading, setIsLoading] = useState(false);

  // Load saved preferences from localStorage
  useEffect(() => {
    const savedLang = localStorage.getItem("adora-language");
    const savedTier = localStorage.getItem("adora-market-tier");

    if (savedLang) {
      const language = SUPPORTED_LANGUAGES.find(
        (lang) => lang.code === savedLang,
      );
      if (language) setCurrentLanguage(language);
    }

    if (savedTier) {
      const tier = MARKET_TIERS.find((t) => t.id === savedTier);
      if (tier) setSelectedMarketTier(tier);
    }
  }, []);

  const setLanguage = (language: Language) => {
    setIsLoading(true);
    setCurrentLanguage(language);
    localStorage.setItem("adora-language", language.code);

    // Simulate loading time for language switching
    setTimeout(() => setIsLoading(false), 300);
  };

  const setMarketTier = (tier: MarketTier) => {
    setSelectedMarketTier(tier);
    localStorage.setItem("adora-market-tier", tier.id);
  };

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        selectedMarketTier,
        setLanguage,
        setMarketTier,
        isLoading,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
