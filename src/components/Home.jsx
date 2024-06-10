import './../styles/Home.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './../img/dish.png';
import { useTranslation } from 'react-i18next';
import Image1 from './../img/earth.png'
import Image2 from './../img/bubble.png'
import Image3 from './../img/egg.png'
import Image4 from'./../img/flight.png'
import Image5 from './../img/korea.png'
import Image6 from './../img/rebot.png'
import Typical from 'react-typical';

export default function Home() {
  const navigate = useNavigate();
  const [animationKey, setAnimationKey] = useState(0);

  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('i18nextLng', lng);
    setAnimationKey(animationKey + 1);
  };


  const logoOnClick=()=>{
    navigate('/Main');

  };

  


  // .home-left__image1 {
  //   bottom: 35%;
  //   right: 27%;
  //   width: 17%;
  //   background-image: url('./../img/earth.png');
  //   background: rgba(255, 255, 255, 0); /* 배경 제거 */
  // }
  return (
    <div className='home__container'>
      <div className="home__images">
        {/* <img src={Image1} alt="Decorative" className="home-left__image1" /> */}
        <img src={Image2} alt="Decorative" className="home-left__image2" />
        <img src={Image3} alt="Decorative" className="home-left__image3" />
        <img src={Image4} alt="Decorative" className="home-left__image4" />
        <img src={Image5} alt="Decorative" className="home-left__image5" />
        <img src={Image6} alt="Decorative" className="home-left__image6" />
      </div>
      <div className='home-right'>
        <div className='home-right__button-container'>
          <button className='home-right__language-button' onClick={() => changeLanguage('en')}>English</button>
          <button className='home-right__language-button' onClick={() => changeLanguage('kr')}>Korean</button>
          <button className='home-right__language-button' onClick={() => changeLanguage('ja')}>Japanese</button>
          <button className='home-right__language-button' onClick={() => changeLanguage('zh')}>Chinese</button>
        </div>

        <div className='home-right__text-box' onClick={logoOnClick}>
          <p className='home-right__k-rebot'>K-REBOT</p>
          </div>
          <div className='home-right__korean-text-box' onClick={logoOnClick}>

          <p className='home-right__korean font'  key={animationKey}>{t('Home.seongsu')}</p>
     
        </div>
        <p className='home-right__seongsu font' >In Seongsu-Dong</p>


        <button className='home-right__button font' onClick={() => { navigate('/Login'); }}>{t('Home.login')}</button>
        <button className='home-right__button font' onClick={() => { navigate('/Register'); }}> {t('Home.register')}</button>


      </div>
    </div>

  );
}