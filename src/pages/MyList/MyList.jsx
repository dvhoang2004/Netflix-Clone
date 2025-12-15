import React from 'react';
import './MyList.css';
import { useFavorites } from '../../context/FavouriteContext';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { Heart, Trash2 } from 'lucide-react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

const MyList = () => {
  const { favorites, removeFavorite, clearFavorites } = useFavorites();
  const navigate = useNavigate();
  const user = auth.currentUser;

  if (!user) {
    return (
      <div className="mylist-page">
        <Navbar />
        <div className="mylist-container">
          <div className="not-logged-in">
            <Heart size={80} color="#e50914" />
            <h2>Sign In</h2>
            <p>Sign in to access.</p>
            <button onClick={() => navigate('/login')} className="login-btn">
              Sign In
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="mylist-page">
      <Navbar />
      
      <div className="mylist-container">
        {/* Header */}
        <div className="mylist-header">
          <div className="header-left">
            <h1>My List</h1>
            <p className="count">
              {favorites.length} {favorites.length === 1 ? 'movie' : 'movies'}
            </p>
          </div>
          
          {favorites.length > 0 && (
            <button
              onClick={() => {
                if (window.confirm('Do you want to remove all?')) {
                  clearFavorites();
                }
              }}
              className="clear-all-btn"
            >
              <Trash2 size={18} />
              Remove All
            </button>
          )}
        </div>

        {/* Content */}
        {favorites.length === 0 ? (
          <div className="empty-state">
            <Heart size={100} color="#e50914" />
            <h2>Empty list</h2>
            <button onClick={() => navigate('/')} className="explore-btn">
              Explore Movies
            </button>
          </div>
        ) : (
          <div className="favorites-grid">
            {favorites.map((item) => (
              <div className="favorite-card" key={item.id}>
                <Link to={`/player/${item.id}`} className="card-link">
                  <img 
                    src={`https://image.tmdb.org/t/p/w500${item.backdrop_path || item.poster_path}`} 
                    alt={item.title} 
                  />
                  <div className="card-info">
                    <h3>{item.title}</h3>
                    {item.vote_average && (
                      <span className="rating">⭐ {item.vote_average.toFixed(1)}</span>
                    )}
                  </div>
                </Link>
                
                <button 
                  className="remove-btn"
                  onClick={() => removeFavorite(item.id)}
                  title="Remove from My List"
                >
                  <Heart size={20} fill="white" color="white" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default MyList;