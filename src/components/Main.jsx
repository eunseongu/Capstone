import './../styles/Main.css';
import './../styles/Bookmark.css';
import './../styles/Chat.css';
import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import Mapcustom from './Mapcustom';
import { useTranslation } from 'react-i18next';
import { MessageList } from './MessageList';
import { MessageForm } from './MessageForm';
import MapBookmark from './MapBookmark';
import Recommend from './Recommend';
import Bookmark from './Bookmark';
// import RestaurantCoordinates from './RestaurantCoordinates';
import { getRestaurantCoordinates } from './GetRestaurantCoordinates';
import robotImg from './../img/bot-img.png';
import userImg from './../img/user3D.png';
import Tooltip from './Tooltip';
import { restaurants_list } from './restaurant_list';
import IconSlider from './IconSlider';

function Popup({ onClose }) {
  const { t, i18n } = useTranslation();
  const language=localStorage.getItem('i18nextLng');
  return (
    <div className="popup">
      {language=='ko'&& (
        <div className="popup-inner">
        <button className="close-btn" onClick={onClose}>
          X
        </button>
      </div>)}
      {language=='en'&& (
        <div className="popup-inner-en">
        <button className="close-btn" onClick={onClose}>
          X
        </button>
      </div>)}
      {language=='ja'&& (
        <div className="popup-inner-ja">
        <button className="close-btn" onClick={onClose}>
          X
        </button>
      </div>)}
      {language=='zh'&& (
        <div className="popup-inner-zh">
        <button className="close-btn" onClick={onClose}>
          X
        </button>
      </div>)}
    </div>
  );
}
const Chat = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(true);

  const closePopup = () => {
    setIsPopupOpen(false);
  };
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { username } = useParams();
  const baseURL = 'http://3.36.105.171:8000/';

  const [messages, setMessages] = useState([]);
  const [selectedOption, setSelectedOption] = useState('map');
  const [bookmarkedRestaurants, setBookmarkedRestaurants] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState({ lat: 37.5412, lng: 127.0565 });
  const [zoom, setZoom] = useState(15);
  const [selectedRestaurant, setSelectedRestaurant] = useState('');
  const [recommendedRestaurants, setRecommendedRestaurants] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [userInfo, setUserInfo] = useState({ username: '', email: '', language: '' });

  const onLogoutHandler = async () => {
    try {
      const response = await fetch(`${baseURL}logout/`, {
        method: 'POST',
        headers: {
          'X-CSRFToken': getCookie('csrftoken'),
        },
        credentials: 'include',
      });

      if (response.ok) {
        i18n.changeLanguage('en');
        navigate('/');
        console.log('>>> [로그아웃] ✅ SUCCESS >>>');
      } else {
        console.log('Failed to logout');
      }
    } catch (error) {
      console.log('Failed to logout');
    }
  };

  const render = (status) => {
    switch (status) {
      case Status.LOADING:
        return <>로딩중...</>;
      case Status.FAILURE:
        return <>에러 발생</>;
      case Status.SUCCESS:
        return <>로드 성공</>;
      default:
        return null;
    }
  };


  const handleSendMessage_user = (message) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: message, isUser: true, id: Date.now() }
    ]);
  };

  const handleSendMessage_bot = (message) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: message, isUser: false, id: Date.now() }
    ]);
  };

  const handleRankingButtonClick = () => {
    setSelectedOption('recommend');
  };

  const resetMap = () => {
    setZoom(15);
    setSelectedLocation({ lat: 37.5412, lng: 127.0565 });
    setSelectedRestaurant('')
  };

  const logoOnClick = () => {
    navigate('/');
  };

  useEffect(() => {
    fetch(`${baseURL}set-csrf-token/`, {
      method: 'GET',
      credentials: 'include',
    });

    fetch(`${baseURL}get-username/${username}/`, {
      method: 'GET',
      credentials: 'include',
    })
      .then(response => response.ok ? response.json() : Promise.reject('Failed to fetch user info'))
      .then(data => {
        setUserInfo({ username: data.username, language: data.language });
        localStorage.setItem('userInfo', JSON.stringify({ username: data.username, language: data.language }));
        if (data.language === "Japanese") { i18n.changeLanguage('ja'); }
        if (data.language === "Korean") { i18n.changeLanguage('ko'); }
        if (data.language === "Chinese") { i18n.changeLanguage('zh'); }
        if (data.language === "English") { i18n.changeLanguage('en'); }
      })
      .catch(error => console.log(error));
  }, [username, i18n]);

  const [isEnlarged, setIsEnlarged] = useState(false);

  const handleRestaurantClick = async (restaurantName) => {
    try {
      const coords = await getRestaurantCoordinates(restaurantName);
      setSelectedLocation(coords);
      setZoom(23);
      setSelectedRestaurant(restaurantName);
      if (selectedOption === 'recommend' && selectedRestaurant) {
        setSelectedOption('map');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getCookie = (name) => {
    const cookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith(`${name}=`));
    return cookie ? decodeURIComponent(cookie.trim().substring(name.length + 1)) : null;
  };

  const fetchBookmarkedRestaurants = useCallback(async () => {
    try {
      const accessToken = localStorage.getItem('access_token');
      const response = await fetch(`${baseURL}api/saved-restaurants/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setBookmarkedRestaurants(data);
    } catch (error) {
      console.error('Error fetching bookmarked restaurants:', error);
    }
  }, []);

  const fetchRecommendedRestaurants = useCallback(async () => {
    try {
      const accessToken = localStorage.getItem('access_token');
      const response = await fetch(`${baseURL}api/recommend-restaurants/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setRecommendedRestaurants(data);
    } catch (error) {
      console.error('Error fetching recommended restaurants:', error);
    }
  }, []);

  const fetchChatHistory = useCallback(async () => {
    try {
      const response = await fetch(`${baseURL}chat_history/?username=${username}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      const newMessages = data.chat_history.reduce((acc, chat) => {
        acc.push(
          { text: chat.message, isUser: true, id: chat.timestamp },
          { text: chat.response, isUser: false, id: chat.timestamp }
        );
        return acc;
      }, []);
      setChatHistory([]);
      setChatHistory((prevMessages) => [...prevMessages, ...newMessages]);


    } catch (error) {
      console.error('Error fetching chat history:', error);
    }
  }, [username]);

  useEffect(() => {
    fetchBookmarkedRestaurants();
    fetchRecommendedRestaurants();
  }, [fetchBookmarkedRestaurants, fetchRecommendedRestaurants]);

  useEffect(() => {
    fetchChatHistory();
  }, [fetchChatHistory]);



  const handleDeleteAllChats = async () => {
    try {
      const response = await fetch(`${baseURL}delete_all_chats/`, {
        method: 'POST',
        headers: {
          'X-CSRFToken': getCookie('csrftoken'),
        },
        credentials: 'include',
      });

      if (response.ok) {
        setChatHistory([]);
      } else {
        console.log('Failed to delete chat history');
      }
    } catch (error) {
      console.log('Failed to delete chat history');
      console.error(error);
    }
  };


  const renderChatHistory = () => {
    const highlightRestaurants = (isUser, text) => {
      const pattern = new RegExp(`(${restaurants_list.join('|')})`, 'gi');
      const found = [];


      const highlightedText = text.split(pattern).map((part, index) => {
        if (!isUser && restaurants_list.includes(part)) {
          found.push(part);

          return (
            <span key={index} style={{ color: '#2845ed', cursor: 'pointer' }} onClick={() => handleRestaurantClick(part)}>
              {part}
            </span>
          );
        }
        return part;
      });

      return { highlightedText, found };
    };

    return (chatHistory.map((message) => {
      const { highlightedText } = highlightRestaurants(message.isUser, message.text);

      return (
        <div key={message.id} className={message.isUser ? 'chat__user-message-container' : 'chat__bot-message-container'}>
          {!message.isUser && (
            <img className='chat__bot-icon' src={robotImg} alt="Bot" />
          )}

          <div className={message.isUser ? 'chat__user-message-box' : 'chat__bot-message-box'}>
            <span >{highlightedText}</span>
          </div>

          {message.isUser && (
            <img className='chat__user-icon' src={userImg} alt="User" />
          )}
        </div>
      );
    })
    );
  };



  const handleBookmark = async (restaurantName) => {
    try {
      const accessToken = localStorage.getItem('access_token');
      await fetch(`${baseURL}api/save-restaurant/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
          'X-CSRFToken': getCookie('csrftoken'),
        },
        credentials: 'include',
        body: JSON.stringify({ name: restaurantName }),
      });
      fetchBookmarkedRestaurants();
    } catch (error) {
      console.error('Error bookmarking restaurant:', error);
    }
  };

  const handleUnbookmark = async (restaurantName) => {
    try {
      const accessToken = localStorage.getItem('access_token');
      await fetch(`${baseURL}api/unsave-restaurant/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
          'X-CSRFToken': getCookie('csrftoken'),
        },
        credentials: 'include',
        body: JSON.stringify({ name: restaurantName }),
      });
      fetchBookmarkedRestaurants();
    } catch (error) {
      console.error('Error unbookmarking restaurant:', error);
    }
  };
  const [name, setName] = useState('');
  const [showMap, setShowMap] = useState(false); // 상태를 추가하여 MapCustom 컴포넌트의 렌더링을 제어합니다.
  const [errorMessage, setErrorMessage] = useState('');
  const handleRestaurantSearch = async (e) => {
    e.preventDefault();

    try {
      const coords = await getRestaurantCoordinates(name);
      setErrorMessage('');
      setSelectedLocation(coords);
      setZoom(23);
      setSelectedRestaurant(name); // 검색된 식당 이름 상태 설정
      setSelectedOption('map'); // Mapcustom 컴포넌트를 다시 렌더링하도록 상태 변경
      setName('');
    } catch (error) {
      setErrorMessage('식당이 존재하지 않습니다.');
      console.log(error.message);
    }
  };

  return (
    <>
      {isPopupOpen && <Popup onClose={closePopup} />}
      <div className="container">
        <div className="top__container">
          <div className='header__text-box' onClick={logoOnClick}>
            <p className='header__k-rebot'>K-REBOT</p>
            <img className='header__k-rebot-img' src={robotImg}></img>
          </div>
          <div className='header__text-box03'>
            <p className='header__welcome font'>{t('Chat.user')} {userInfo.username}!</p>

          </div>
          <div className='header__text-box02'>
            <p className='header__logout' onClick={onLogoutHandler}>{t('Chat.logout')}</p>
            <IconSlider />

          </div>

        </div>

        <div className='main__container'>

          <aside className='recommend'>
            <div className="recommend__three-button">
              <button
                className={`recommend__map-button ${selectedOption === "map" ? "active" : ""
                  }`}
                onClick={() => setSelectedOption('map')}
              >
                {t("Chat.map")}
              </button>
              <button
                className={`recommend__recommend-button ${selectedOption === "recommend" ? "active" : ""
                  }`}
                onClick={() => { handleRankingButtonClick(); }}
              >
                {t("Chat.recommend")}
                <Tooltip >
                  <button className='recommend__tooltip-button'>?</button>
                </Tooltip>
              </button>

            </div>

            <div className='recommend__container'>
              <div className="searchandbutton">

                <form onSubmit={handleRestaurantSearch}>

                  <div className='recommend__input-box'>
                    <button className='recommend__reload-button'
                    type="button"
                     onClick={() => {
                      if (selectedOption === 'map') {
                        resetMap();
                      } else if (selectedOption === 'recommend') {
                        fetchRecommendedRestaurants();
                      }
                    }}>
                    </button>
                    <input
                      type="text"
                      className='recommend__input'
                      value={name}
                      placeholder={t('Map.search')}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <button type="submit" className='recommend__input_button'></button>
                  </div>
                  {errorMessage && <p className='recommend__error-message'>{errorMessage}</p>}

                </form>
              </div>
              <div className='recommend__map-recommend-container'>
                {selectedOption === 'map' &&
                  <Wrapper render={render}>

                    <Mapcustom
                      markerLocation={selectedLocation}
                      language={localStorage.getItem('i18nextLng')}
                      zoom={zoom}
                    />
                    {selectedRestaurant &&
                      <MapBookmark
                        restaurantName={selectedRestaurant}
                        handleBookmark={handleBookmark}
                        handleUnbookmark={handleUnbookmark}
                        bookmarkedRestaurants={bookmarkedRestaurants}
                      />}
                  </Wrapper>
                }
                {selectedOption === 'recommend' &&

                  <Recommend
                    recommendedRestaurants={recommendedRestaurants}
                    baseURL={baseURL}
                    handleBookmark={handleBookmark}
                    handleUnbookmark={handleUnbookmark}
                    fetchBookmarkedRestaurants={fetchBookmarkedRestaurants}
                    bookmarkedRestaurants={bookmarkedRestaurants}
                  />
                }
              </div>
            </div>
          </aside>

          <main className='chat'>


            <MessageList
              messages={messages}
              onRestaurantClick={handleRestaurantClick}
              renderChatHistory={renderChatHistory}
              handleDeleteAllChats={handleDeleteAllChats}
              chatHistory={chatHistory}
            />
            <MessageForm
              onSendMessage_user={handleSendMessage_user}
              onSendMessage_bot={handleSendMessage_bot}
              userinfo={userInfo}
            />
          </main>
          <aside className='bookmark'>

            <div className='bookmark__text-box'>
              <p className='bookmark__text font'>{t('Chat.bookmark')}</p>
            </div>
            <Bookmark bookmarkedRestaurants={bookmarkedRestaurants} baseURL={baseURL} handleBookmark={handleBookmark} handleUnbookmark={handleUnbookmark} />
          </aside>
        </div>
      </div>

    </>
  );
};

export default Chat;
