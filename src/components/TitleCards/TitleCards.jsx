import React, { useRef, useEffect, useState } from 'react'
import './TitleCards.css'
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useFavorites } from '../../context/FavouriteContext';
import { Heart } from 'lucide-react'; 
import { authorizationToken } from '../../../config';

const TitleCards = ({title, category}) => {

  const [apiData, setApiData] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null); 
  const { selectedLanguage, selectedLocale } = useLanguage();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites(); 
  
  const map = {
      'now_playing': 'popularity.desc',
      'popular': 'popularity.desc', 
      'top_rated': 'vote_average.desc',
      'upcoming': 'popularity.desc'
    };

  const cardsRef = useRef();

  const options = {
    method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: authorizationToken
      }
  };

  const handleWheel = (event)=>{
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  }

  useEffect(()=>{
    let endpoint = `https://api.themoviedb.org/3/discover/movie?with_original_language=${selectedLanguage}&language=${selectedLocale}&page=1&sort_by=${category === 'top_rated' ? 'vote_average.desc' : 'popularity.desc'}`;

    fetch(endpoint, options)
    .then(res => res.json())
    .then(res => setApiData(res.results))
    .catch(err => console.error(err));

    cardsRef.current.addEventListener("wheel", handleWheel);
  }, [category, selectedLanguage, selectedLocale])

  const handleFavoriteClick = (e, card) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isFavorite(card.id)) {
      removeFavorite(card.id);
    } else {
      addFavorite({
        id: card.id,
        title: card.original_title,
        backdrop_path: card.backdrop_path,
        poster_path: card.poster_path,
        vote_average: card.vote_average,
        type: 'movie' 
      });
    }
  };

  return (
    <div className='titlecards'>
      <h2>{title ? title : 'Popular on Netflix'}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          const favorited = isFavorite(card.id);
          
          return (
            <div 
              className="card-wrapper" 
              key={index}
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <Link to={`/player/${card.id}`} className="card">
                <img src={`https://image.tmdb.org/t/p/w500/` + card.backdrop_path} alt="" />
                <p>{card.original_title}</p>
                
                {hoveredCard === card.id && (
                  <div className="card-overlay">
                    <button 
                      className={`favorite-btn ${favorited ? 'favorited' : ''}`}
                      onClick={(e) => handleFavoriteClick(e, card)}
                      title={favorited ? 'Xóa khỏi danh sách' : 'Thêm vào danh sách'}
                    >
                      <Heart 
                        size={20} 
                        fill={favorited ? 'currentColor' : 'none'}
                      />
                    </button>
                  </div>
                )}

                {favorited && hoveredCard !== card.id && (
                  <div className="favorite-indicator">
                    <Heart size={16} fill="white" color="white" />
                  </div>
                )}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default TitleCards