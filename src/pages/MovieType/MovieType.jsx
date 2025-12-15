import React from 'react'
import './MovieType.css'
import TypeCards from '../../components/TypeCards/TypeCards'
import { useLocation } from 'react-router-dom'

const MovieType = () => {
  const location = useLocation();
  
  let title = "Movies";
  let category = "movie";
  
  if(location.pathname === '/tv-shows') {
    title = "TV Shows";
    category = "tv";
  } 
  else if(location.pathname === '/movies') {
    title = "Movies";
    category = "movie";
  } 
  else if(location.pathname === '/new-popular') {
    title = "New & Popular";
    category = "all"; 
  }

  return (
    <div>
      <TypeCards title={title} category={category} />
    </div>
  )
}

export default MovieType