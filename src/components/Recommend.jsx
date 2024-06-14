import React from 'react';
import './../styles/Recommend.css';
import heartEmpty from './../img/heart_empty.png';
import heartFilled from './../img/heart_filled.png';
import coupleIcon from './../img/romantic-couple.png';
import { RestaurantIcons } from './RestaurantIcons';
import { useTranslation } from 'react-i18next';
import bookmark from './../img/bookmark_yellow.png';
import unbookmark from './../img/unbookmark.png';

const Recommend = ({ recommendedRestaurants, baseURL, handleBookmark, handleUnbookmark, bookmarkedRestaurants }) => {
  const { t, i18n } = useTranslation();

  const language=localStorage.getItem('i18nextLng');
  const isBookmarked = (restaurant) => {
    return bookmarkedRestaurants.some(r => r.restaurant_name === restaurant.name);
  };

  const toggleBookmark = (restaurant) => {
    console.log('toggle', restaurant);

    if (isBookmarked(restaurant)) {
      handleUnbookmark(restaurant.name);
    } else {
      handleBookmark(restaurant.name);
    }
  };

  return (
    <div>
      {recommendedRestaurants.map(restaurant => (
        <div key={restaurant.id}>
          <div className='recommend-item__container'>
            <div className='recommend-item__img-text-icon'>
            {language==='en'&&(
            <img className='recommend-item__img' src={`${baseURL}${restaurant.resimages[0].image_en}`} alt={`${restaurant.name}`} />
            )}
             {language==='ko'&&(
            <img className='recommend-item__img' src={`${baseURL}${restaurant.resimages[0].image_ko}`} alt={`${restaurant.name}`} />
            )}
             {language==='zh'&&(
            <img className='recommend-item__img' src={`${baseURL}${restaurant.resimages[0].image_zh}`} alt={`${restaurant.name}`} />
            )}
             {language==='ja'&&(
            <img className='recommend-item__img' src={`${baseURL}${restaurant.resimages[0].image_ja}`} alt={`${restaurant.name}`} />
            )}
            <div className='recommend-item__text-box'>
              <p className='recommend-item__text'>{restaurant.name}</p>
            </div>
            {isBookmarked(restaurant) ? (
              <img
                src={heartFilled}
                alt="heart"
                className="heart-icon"
                onClick={() => toggleBookmark(restaurant)}
              />
            ) : (
              <img
                src={heartEmpty}
                alt="heart"
                className="heart-icon"
                onClick={() => toggleBookmark(restaurant)}
              />
            )}
          </div>
          <div className='recommned-item__icon-all-container'>
            {restaurant.mood === '연인·배우자' &&
            <div className='recommend-item__icon-container'>
              <p className='recommend-item__icon-text font'> 🥰 {t('Mood.연인')}</p>
            </div>
          }
          {restaurant.mood === '지인·동료' &&
            <div className='recommend-item__icon-container'>

              <p className='recommend-item__icon-text font'> 🍽️ {t('Mood.지인')}</p>
            </div>
          }
          {restaurant.mood === '친구' &&
            <div className='recommend-item__icon-container'>
              <p className='recommend-item__icon-text font'> 🤗 {t('Mood.친구')}</p>
            </div>
          }

          <RestaurantIcons category={restaurant.category} />
          </div>
          </div>
          



        </div>
      ))}
    </div>
  );
};

export default Recommend;
