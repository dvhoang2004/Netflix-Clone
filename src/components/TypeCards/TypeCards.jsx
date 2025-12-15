import React, { useState, useEffect, useRef } from 'react'
import './TypeCards.css'
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useFavorites } from '../../context/FavouriteContext';
import { Heart } from 'lucide-react'; 
import { authorizationToken } from '../../../config';

const TypeCards = ({title, category}) => {
    
    const [apiData, setApiData] = useState([]);
    const [hoveredCard, setHoveredCard] = useState(null); 
    const cardsRef = useRef();
    const { selectedLanguage, selectedLocale } = useLanguage();
    const { addFavorite, removeFavorite, isFavorite } = useFavorites(); 
    
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: authorizationToken
        }
    };

    const handleWheel = (event) => {
        event.preventDefault();
        cardsRef.current.scrollLeft += event.deltaY;
    }
    
    useEffect(() => {
        const endpoint = `https://api.themoviedb.org/3/discover/${category}?with_original_language=${selectedLanguage}&language=${selectedLocale}&sort_by=popularity.desc`;
        
        fetch(endpoint, options)
            .then(res => res.json())
            .then(res => {
                console.log('Fetched data:', res);
                setApiData(res.results);
            })
            .catch(err => console.error(err));
        
        const currentRef = cardsRef.current;
        if (currentRef) {
            currentRef.addEventListener("wheel", handleWheel);
        }
        
        return () => {
            if (currentRef) {
                currentRef.removeEventListener("wheel", handleWheel);
            }
        };
    }, [category, selectedLanguage, selectedLocale])

    const handleFavoriteClick = (e, card) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (isFavorite(card.id)) {
            removeFavorite(card.id);
        } else {
            addFavorite({
                id: card.id,
                title: category === 'tv' ? card.original_name : card.original_title,
                backdrop_path: card.backdrop_path,
                poster_path: card.poster_path,
                vote_average: card.vote_average,
                type: category
            });
        }
    };
   
  return (
    <div className='movie-type'>
        <Navbar />
        <div className='more-cards'>
            <h2>{title} ({selectedLanguage.toUpperCase()})</h2>
            <div className="card-list" ref={cardsRef}>
                {
                    apiData.map((card, index) => {
                        const favorited = isFavorite(card.id);
                        
                        return (
                            <div 
                                className="card-wrapper" 
                                key={index}
                                onMouseEnter={() => setHoveredCard(card.id)}
                                onMouseLeave={() => setHoveredCard(null)}
                            >
                                <Link to={`/player/${card.id}`} className='card'>
                                    <img src={`https://image.tmdb.org/t/p/w500`+ card.backdrop_path} alt="" />
                                    <p>{category === 'tv' ? card.original_name : card.original_title}</p>
                                    
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
                    })
                }
            </div>
        </div>
        <Footer />
    </div>
  )
}

export default TypeCards