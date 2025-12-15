import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { LanguageProvider } from './context/LanguageContext'
import { FavoriteProvider } from './context/FavouriteContext'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <FavoriteProvider>
          <App />
        </FavoriteProvider>
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>,
)
