import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [selectedLocale, setSelectedLocale] = useState('en-US'); 

  const changeLanguage = (langCode, locale) => {
    setSelectedLanguage(langCode);
    setSelectedLocale(locale); 
    localStorage.setItem('selectedLanguage', langCode);
    localStorage.setItem('selectedLocale', locale); 
  };

  React.useEffect(() => {
    const savedLang = localStorage.getItem('selectedLanguage');
    const savedLocale = localStorage.getItem('selectedLocale');
    if (savedLang && savedLocale) {
      setSelectedLanguage(savedLang);
      setSelectedLocale(savedLocale);
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ selectedLanguage, selectedLocale, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};