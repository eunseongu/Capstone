import { useState } from 'react';

export const getRestaurantCoordinates = async (name) => {
  try {
    const accessToken = localStorage.getItem('access_token');
    const csrfToken = getCookie('csrftoken');

    const response = await fetch('http://3.36.105.171:8000/get-restaurant-coordinates/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        'X-CSRFToken': csrfToken
      },
      credentials: 'include',
      body: JSON.stringify({ name }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error);
    }

    const data = await response.json();
    return { lat: data.latitude, lng: data.longitude };
  } catch (err) {
    throw new Error('An error occurred');
  }
};

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
