import './../styles/Chat.css';
import React, { useState, useEffect, useRef } from 'react';

export const MessageForm = ({ onSendMessage_user, onSendMessage_bot,userinfo }) => {
  const [message, setMessage] = useState('');
  const baseURL = 'http://3.36.105.171:8000/';

  useEffect(() => {
    fetch(`${baseURL}set-csrf-token/`, {
      method: 'GET',
      credentials: 'include',
    });
  }, []);

  
  const getCookie = (name) => {
    const cookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith(`${name}=`));
    return cookie ? decodeURIComponent(cookie.trim().substring(name.length + 1)) : null;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    onSendMessage_user(message);
    try {
      const response = await fetch(`${baseURL}chatbot/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCookie('csrftoken'),
        },
        credentials: 'include',
        body: JSON.stringify({ message,username:userinfo.username,language:userinfo.language }),
      });

      if (response.ok) {
        const data = await response.json();
        onSendMessage_bot(data.response);
      }

      const data = await response.json();
      console.log(data);

    } catch (error) {
      console.error('Failed to submit message');
    }

  }
  const handleOnKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='chat__input-box'>
          <input className='chat__input'
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleOnKeyPress}
          />
          <button type="submit" className='chat__input_button'></button>
        </div>

      </form>

    </div>

  );
};
