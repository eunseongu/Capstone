import React, { useState } from 'react';

const RestaurantCoordinates = () => {
  const [name, setName] = useState('');
  const [coordinates, setCoordinates] = useState(null);
  const [error, setError] = useState('');

  
  const getCookie = (name) => {
    const cookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith(`${name}=`));
    return cookie ? decodeURIComponent(cookie.trim().substring(name.length + 1)) : null;
  };

  const handleCoordinatesSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const accessToken = localStorage.getItem('access_token');
      
      const response = await fetch('http://3.36.105.171:8000/get-restaurant-coordinates/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
          'X-CSRFToken': getCookie('csrftoken')
        },
        credentials: 'include',
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error);
        return;
      }

      const data = await response.json();
    //   setCoordinates(data);
    setCoordinates({ lat: data.latitude, lng: data.longitude });
      console.log('coordinates',coordinates);
    } catch (err) {
      setError('An error occurred');
    }
  };

  return (
    <div>
      <form onSubmit={handleCoordinatesSubmit}>
        <div>
          Restaurant Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        <button type="submit">Get Coordinates</button>

        </div>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {coordinates && (
        <div>
          {/* <p>Name: {coordinates.name_ko}</p> */}
          {/* <p>Latitude: {coordinates.lat}</p>
          <p>Longitude: {coordinates.lng}</p> */}
        </div>
      )}
    </div>
  );
};

export default RestaurantCoordinates;
