import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { TRANSLATIONS, EXCHANGE_RATE } from '../constants';

type Language = 'en' | 'ar';
type Currency = 'USD' | 'EGP';
type Direction = 'ltr' | 'rtl';

interface LanguageContextType {
  language: Language;
  currency: Currency;
  direction: Direction;
  setLanguage: (lang: Language) => void;
  setCurrency: (curr: Currency) => void;
  t: (key: keyof typeof TRANSLATIONS['en']) => string;
  formatPrice: (price: number) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [currency, setCurrency] = useState<Currency>('USD');

  const direction = language === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = direction;
  }, [language, direction]);

  const t = (key: keyof typeof TRANSLATIONS['en']) => {
    return TRANSLATIONS[language][key] || key;
  };

  const formatPrice = (price: number) => {
    let finalPrice = price;
    if (currency === 'EGP') {
      finalPrice = price * EXCHANGE_RATE;
    }
    
    // Format with commas
    const formatted = finalPrice.toLocaleString(language === 'ar' ? 'ar-EG' : 'en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });

    return currency === 'EGP' ? `EGP ${formatted}` : `$${formatted}`;
  };

  return (
    <LanguageContext.Provider value={{
      language,
      currency,
      direction,
      setLanguage,
      setCurrency,
      t,
      formatPrice
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
};