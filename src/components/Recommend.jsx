import React from 'react';
import './../styles/Recommend.css';
import heartEmpty from './../img/heart_empty.png';
import heartFilled from './../img/heart_filled.png';
import coupleIcon from './../img/romantic-couple.png';

const Recommend = ({ recommendedRestaurants, baseURL, handleBookmark, handleUnbookmark, bookmarkedRestaurants }) => {
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
            <img className='recommend-item__img' src={`${baseURL}${restaurant.resimages[0].image_ko}`} alt={`${restaurant.name}`} />
            <div className='recommend-item__text-box'>
              <p className='recommend-item__text'>{restaurant.name}</p>
              <p className='recommend-item__text'>({restaurant.category})</p>
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
          <div className='recommend-item__icon-container'>
            {/* <img src={coupleIcon} className='couple-icon' alt="couple icon" /> */}
            <p className='recommend-item__icon-text font'> 🥰 연인과 함께</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Recommend;
