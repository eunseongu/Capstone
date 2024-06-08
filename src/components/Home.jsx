import './../styles/Home.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './../img/dish.png';
import { useTranslation } from 'react-i18next';


export default function Home() {
  const navigate = useNavigate();


  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('i18nextLng', lng);
  };


  const logoOnClick=()=>{
    navigate('/Chat');

  };

  return (
    <div className='home__container'>
      <div className='home-left'>
        <img className='home-left__logo' src={logo} ></img>
      </div>
      <div className='home-right'>
        <div className='home-right__button-container'>
          <button className='home-right__language-button font' onClick={() => changeLanguage('en')}>English</button>
          <button className='home-right__language-button font' onClick={() => changeLanguage('kr')}>Korean</button>
          <button className='home-right__language-button font' onClick={() => changeLanguage('ja')}>Japanese</button>
          <button className='home-right__language-button font' onClick={() => changeLanguage('zh')}>Chinese</button>
        </div>
        <div className='home-right__text-box' onClick={logoOnClick}>
          <p className='home-right__k-rebot font'>K-REBOT</p>
        </div>

        <button className='home-right__button font' onClick={() => { navigate('/Login'); }}>{t('Home.login')}</button>
        <button className='home-right__button font' onClick={() => { navigate('/Register'); }}> {t('Home.register')}</button>


      </div>
    </div>

  );
}