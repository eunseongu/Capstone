import React, { useState, useEffect } from 'react';
import './../styles/MapBookmark.css';
import { useTranslation } from 'react-i18next';
import bookmark from './../img/bookmark_yellow.png';
import unbookmark from './../img/unbookmark.png';

const MapBookmark = ({ restaurantName, handleBookmark, handleUnbookmark, bookmarkedRestaurants }) => {
    const [isEnlarged, setIsEnlarged] = useState(false);
    const [thumbnailImg, setThumbnailImg] = useState([]);
    const { t, i18n } = useTranslation();

    const language=localStorage.getItem('i18nextLng');
    console.log('lan',language);
    
    // useEffect(() => {
    //     const preferredLanguage = localStorage.getItem('i18nextLng');
    //     if (preferredLanguage) {
    //         i18n.changeLanguage(preferredLanguage);
    //     }
    // }, [i18n]);

    const isBookmarked = (restaurant) => {
        return bookmarkedRestaurants.some(r => r.restaurant_name === restaurant);
    };
    const getCookie = (name) => {
      const cookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith(`${name}=`));
      return cookie ? decodeURIComponent(cookie.trim().substring(name.length + 1)) : null;
    };

    const handleThumbnailClick = async() => {
       
          try {
            setIsEnlarged(!isEnlarged);
        
            const accessToken = localStorage.getItem('access_token');
            const response = await fetch('http://3.36.105.171:8000/api/restaurant-images/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
                'X-CSRFToken': getCookie('csrftoken')
              },
              credentials: 'include',
              body: JSON.stringify({ restaurant: restaurantName })
            });
      
            if (response.ok) {
              const data = await response.json();
              console.log('Fetched images:', data); // 콘솔 로그 추가
              if (language==='en'){
                setThumbnailImg(data[0].image_en);
              }
              else if (language==='ko'){
                setThumbnailImg(data[0].image_ko);
              }
              else if (language==='zh'){
                setThumbnailImg(data[0].image_zh);
              }
              else if (language==='ja'){
                setThumbnailImg(data[0].image_ja);
              }
              
            } else {
              const errorData = await response.json();
              console.log(errorData.error);
            }
          } catch (error) {
            console.log('Failed to fetch test images');
            console.error(error);
          }
    };

    const toggleBookmark = (restaurant) => {
        const isAlreadyBookmarked = isBookmarked(restaurant);

        if (isAlreadyBookmarked) {
            handleUnbookmark(restaurant);
        } else {
            handleBookmark(restaurant);
        }
    };
      
    return (
        <div className='map-bookmark__container'>
          

            <div className="map-bookmark__text-icon-container">
                <p className="map-bookmark__text font">{restaurantName}</p>
                {isBookmarked(restaurantName) ? (
                    <img
                        src={bookmark}
                        alt="bookmark"
                        className='map-bookmark__heart-icon'
                        onClick={() => toggleBookmark(restaurantName)}
                    />
                ) : (
                    <img
                        src={unbookmark}
                        alt="unbookmark"
                        className='map-bookmark__heart-icon'
                        onClick={() => toggleBookmark(restaurantName)}
                    />
                )}
            </div>

            <button className="map-bookmark__thumbnail-button" onClick={handleThumbnailClick}>{isEnlarged ? t('Map.closethumbnail') : t('Map.thumbnail')}</button>
            <img src={`http://3.36.105.171:8000${thumbnailImg}`} className={`map-bookmark__img ${isEnlarged ? 'enlarged' : ''}`} />
          
        </div>
    );
};

export default MapBookmark;
