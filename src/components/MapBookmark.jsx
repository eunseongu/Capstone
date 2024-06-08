import React, { useState, useEffect } from 'react';
import './../styles/MapBookmark.css';
import { useTranslation } from 'react-i18next';
import bookmark from './../img/bookmark.png';
import unbookmark from './../img/unbookmark.png';

const MapBookmark = ({ restaurantName, handleBookmark, handleUnbookmark, bookmarkedRestaurants }) => {
    const { t, i18n } = useTranslation();
    const [isEnlarged, setIsEnlarged] = useState(false);
    
    useEffect(() => {
        const preferredLanguage = localStorage.getItem('i18nextLng');
        if (preferredLanguage) {
            i18n.changeLanguage(preferredLanguage);
        }
    }, [i18n]);

    const isBookmarked = (restaurant) => {
        return bookmarkedRestaurants.some(r => r.restaurant_name === restaurant);
    };

    const handleThumbnailClick = () => {
        setIsEnlarged(!isEnlarged);
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
            <button className="map-bookmark__thumbnail-button" onClick={handleThumbnailClick}>{t('Map.thumbnail')}</button>
            <img className={`map-bookmark__img ${isEnlarged ? 'enlarged' : ''}`} />
        </div>
    );
};

export default MapBookmark;
