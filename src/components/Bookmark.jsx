import React from 'react';
import './../styles/Bookmark.css';
import { useTranslation } from 'react-i18next';
import { RestaurantIcons } from './RestaurantIcons';

const Bookmark = ({ bookmarkedRestaurants, baseURL, handleUnbookmark }) => {
  const { t, i18n } = useTranslation();

  const language=localStorage.getItem('i18nextLng');
  return(
  <div className="bookmark__box">
      {bookmarkedRestaurants.map(restaurant => (
        <div className='bookmark__item-container' key={restaurant.id}>
          <div>
            {/* <p>🌮</p> */}
            {restaurant.restaurant_images && restaurant.restaurant_images.map((image, index) => (
              <div key={index}>
   {language==='en'&&(
                <img className='bookmark__item-img' src={`${baseURL}${image.image_en}`} alt={`${restaurant.restaurant_name}`} />
              )}
             {language==='kr'&&(
                <img className='bookmark__item-img' src={`${baseURL}${image.image_ko}`} alt={`${restaurant.restaurant_name}`} />
              )}
             {language==='zh'&&(
                <img className='bookmark__item-img' src={`${baseURL}${image.image_zh}`} alt={`${restaurant.restaurant_name}`} />
              )}
             {language==='ja'&&(
                <img className='bookmark__item-img' src={`${baseURL}${image.image_ja}`} alt={`${restaurant.restaurant_name}`} />
              )}
              </div>
            ))}
          </div>
       
            <p className='bookmark__item-text'>  {restaurant.restaurant_name}</p>

          <button className='bookmark__delete-button'onClick={() => handleUnbookmark(restaurant.restaurant_name)}></button>
        </div>
      ))}
  </div>
  )
};

export default Bookmark;
