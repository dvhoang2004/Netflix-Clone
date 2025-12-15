import React, { useEffect, useRef, useState } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import search_icon from '../../assets/search_icon.svg'
import bell_icon from '../../assets/bell_icon.svg'
import profile_img from '../../assets/profile_img.png'
import caret_icon from '../../assets/caret_icon.svg'
import { logOut } from '../../firebase'
import { useLanguage } from '../../context/LanguageContext' 

const Navbar = () => {

  const navRef = useRef();
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  
  const { selectedLanguage, selectedLocale, changeLanguage } = useLanguage();

  const languages = [
    { code: 'en', name: 'English', locale: 'en-US' },
    { code: 'es', name: 'Spanish (Español)', locale: 'es-ES' },
    { code: 'fr', name: 'French (Français)', locale: 'fr-FR' },
    { code: 'de', name: 'German (Deutsch)', locale: 'de-DE' },
    { code: 'ja', name: 'Japanese (日本語)', locale: 'ja-JP' },
    { code: 'ko', name: 'Korean (한국어)', locale: 'ko-KR' },
    { code: 'zh', name: 'Chinese (中文)', locale: 'zh-CN' },
    { code: 'hi', name: 'Hindi (हिन्दी)', locale: 'hi-IN' },
    { code: 'pt', name: 'Portuguese (Português)', locale: 'pt-BR' },
    { code: 'it', name: 'Italian (Italiano)', locale: 'it-IT' },
    { code: 'ru', name: 'Russian (Русский)', locale: 'ru-RU' },
    { code: 'ar', name: 'Arabic (العربية)', locale: 'ar-SA' },
    { code: 'th', name: 'Thai (ไทย)', locale: 'th-TH' },
    { code: 'vi', name: 'Vietnamese (Tiếng Việt)', locale: 'vi-VN' },
  ];

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if(window.scrollY >= 80){
        navRef.current.classList.add('nav-dark');
      }
      else{
        navRef.current.classList.remove('nav-dark'); 
      }
    });
  }, []);

  const handleLanguageSelect = (langCode, locale) => {
    changeLanguage(langCode, locale); 
    setShowLanguageDropdown(false);
    console.log('Selected language:', langCode);
    console.log('Selected language code:', locale);
  };
  
  return (
    <div ref={navRef} className='navbar'>
      <div className="navbar-left">
        <img src={logo} alt="" />
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/tv-shows">TV Shows</a></li>
          <li><a href="/movies">Movies</a></li>
          <li><a href="/mylist">My List</a></li>
          <li 
            className="language-menu"
            onMouseEnter={() => setShowLanguageDropdown(true)}
            onMouseLeave={() => setShowLanguageDropdown(false)}
          >
            Browse by Languages ({selectedLanguage.toUpperCase()})
            {showLanguageDropdown && (
              <div className="language-dropdown">
                {languages.map(lang => (
                  <div 
                    key={lang.code}
                    className={`language-item ${lang.code === selectedLanguage ? 'active' : ''}`}
                    onClick={() => handleLanguageSelect(lang.code, lang.locale)}
                  >
                    {lang.name} {lang.code === selectedLanguage && '✓'}
                  </div>
                ))}
              </div>
            )}
          </li>
        </ul>
      </div>

      <div className="navbar-right">
        <div className='navbar-profile'>
          <img src={profile_img} alt="" className='profile'/>
          <img src={caret_icon} alt=""/>
          <div className="dropdown">
            <p onClick={() => {logOut()}}>Sign Out</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar