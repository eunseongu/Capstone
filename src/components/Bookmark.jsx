import React from 'react';
import './../styles/Bookmark.css';

const Bookmark = ({ bookmarkedRestaurants, baseURL, handleUnbookmark }) => (
  <div className="bookmark__box">
      {bookmarkedRestaurants.map(restaurant => (
        <div className='bookmark__item-container' key={restaurant.id}>
          <div>
            {restaurant.restaurant_images && restaurant.restaurant_images.map((image, index) => (
              <div key={index}>
                <img className='bookmark__item-img' src={`${baseURL}${image.image_en}`} alt={`${restaurant.restaurant_name}`} />
                {/* <img  className='bookmark__item-img'src={`${baseURL}${image.image_ko}`} alt={`${restaurant.restaurant_name} Korean`} />
                <img className='bookmark__item-img' src={`${baseURL}${image.image_zh}`} alt={`${restaurant.restaurant_name} Chinese`} />
                <img  className='bookmark__item-img'src={`${baseURL}${image.image_ja}`} alt={`${restaurant.restaurant_name} Japanese`} /> */}
              </div>
            ))}
          </div>
       
            <p className='bookmark__item-text'>  {restaurant.restaurant_name}</p>

          <button className='bookmark__delete-button'onClick={() => handleUnbookmark(restaurant.restaurant_name)}></button>
        </div>
      ))}
  </div>
);

export default Bookmark;
