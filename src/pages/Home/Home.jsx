import React from 'react'
import './Home.css' 
import Navbar from '../../components/Navbar/Navbar'
import TitleCards from '../../components/TitleCards/TitleCards'
import Footer from '../../components/Footer/Footer'
import hero_banner from '../../assets/hero_banner.jpg'
import hero_caption from '../../assets/hero_title.png'
import play_icon from '../../assets/play_icon.png'
import info_icon from '../../assets/info_icon.png'

const Home = () => {
  return (
    <div className='home'>
      <Navbar/>
      <div className='hero'>
        <img src={hero_banner} alt="" className='banner-img'/>
        <div className="hero-caption">
          <img src={hero_caption} alt="" className='caption-img'/>
          <p>
            Discovering his ties to a secret ancient order, a young 
            man living in modern Istanbul embarks on a quest to save the 
            city from an immortal enemy.
          </p>
          <div className="hero-btns">
            <button className='btn'>
              <img src={play_icon} alt="" />Play
            </button>
            <button className='btn dark-btn'>
              <img src={info_icon} alt="" />More
            </button>
          </div>
        </div>
      </div>
      <div className='more-cards'>
        <TitleCards title='Now Playing' category={'now_playing'}/>
        <TitleCards title='Top Rated' category={'top_rated'}/>
        <TitleCards title='Upcoming' category={'upcoming'}/>
        <TitleCards title='Popular on Netflix' category={'popular'}/>
      </div>
      <Footer />
    </div>
  )
}

export default Home
