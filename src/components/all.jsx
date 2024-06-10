import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CombinedPage = () => {
  const restaurants = [
    "201호", "37.5 시그니처 성수", "ATE 성수", "Bored&Hungry", "ERN", "HDD피자",
    "bd버거 성수", "가나초콜릿하우스", "갓잇 성수홀리워터점", "계월", "고우성수", "규카츠정 성수점",
    "까사아지오 성수본점", "깔리뇨타코", "꾸아 성수점", "꿉당 성수점", "난포", "누메로도스",
    "뉴믹스커피", "능동미나리 성수직영점", "니카이 우동", "다반", "다이닝 목로 성수점",
    "담솥 성수점", "대낚식당 성수직영점", "대림국수 성수점", "대성갈비", "대취", "댓길함박",
    "데이릿", "뚝도농원 성수본점", "라무라 성수", "루비스카페 SM성수점", "르프리크", "리볼리",
    "리타르단도", "리틀포레스트", "마리오네", "마하차이 성수본점", "맥시크", "메종 파이프그라운드",
    "멘츠루 성수점", "무식당 성수본점", "문화식당", "미도인 성수", "미쁘동 서울숲",
    "미스타쌀국수 성수점", "미테이블 성수점", "버섯집", "벱", "봄의정원 성수점",
    "봉땅 서울숲점", "부우이 성수", "브리비트", "빙봉", "빠오즈푸 서울숲직영점",
    "뽈로파스타 서울숲", "산도스 성수", "살라댕템플", "샤블리 성수서울숲점",
    "서울숲누룽지통닭구이", "서울숲포도피자 성수", "성수AGU", "성수다락", "성수명당",
    "성수신데렐라", "성수온실 성수본점", "성수족발", "세븐버거스 어 위크", "소랑호젠",
    "소문난성수감자탕", "소바식당", "소인수서울 본점", "스시도쿠 더성수", "시옹마오",
    "신기루오뎅바", "신사소곱창 성수점", "심퍼티쿠시 성수점", "싹쓰리곱창", "쎄콩데live",
    "앤드밀 성수점", "어라운드데이", "엘더버거 성수", "연남토마 성수점", "오뜨로 성수",
    "오마카세 오사이초밥 성수직영점", "오와리 본점", "오지상 성수", "오프트", "오후",
    "온량", "요쇼쿠 서울숲 본점", "우동가조쿠 성수점", "우리마키 성수점", "위풍당당족발",
    "육육면관", "이가네양꼬치 성수직영점", "이로우", "이오로비스트로 성수점",
    "일상담미 성수점", "잠수교집 성수 직영점", "정돈 성수점", "제스티살룬 성수", "제제",
    "조조칼국수 성수점", "죠죠 성수점", "중앙감속기", "진작다이닝", "차만다 서울숲점",
    "초이다이닝 성수점", "쵸리상경", "코치", "쿠나", "타코튜즈데이 성수 본점", "탐광",
    "파르코", "퍼프피자", "평이담백뼈칼국수 성수점", "포피나", "프레고클럽", "하노이102",
    "한양떡방앗간 성수", "할머니의 레시피", "핵밥 성수본점", "헤이든 성수점", "호감도",
    "호보식당 성수직영점", "호호식당 성수", "홍보석", "훈연", "훼미리손칼국수보쌈"
  ];

  const [bookmarkedRestaurants, setBookmarkedRestaurants] = useState([]);
  const [recommendedRestaurants, setRecommendedRestaurants] = useState([]);
  const { username } = useParams();
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState(null);
  const [userInfo, setUserInfo] = useState({ username: '', email: '', language: '' });
  const [highlightedResponse, setHighlightedResponse] = useState('');
  const [foundRestaurants, setFoundRestaurants] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [restaurantName, setRestaurantName] = useState('');
  const [testImages, setTestImages] = useState([]);
  const [restaurantMood, setRestaurantMood] = useState(null);
  const navigate = useNavigate();
  
  const baseURL = 'http://127.0.0.1:8000';  // Django 서버의 base URL
  
  const getCookie = (name) => {
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
  };

  const fetchBookmarkedRestaurants = useCallback(async () => {
    try {
      const accessToken = localStorage.getItem('access_token');
      const response = await fetch('http://127.0.0.1:8000/api/saved-restaurants/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        credentials: 'include'
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      setBookmarkedRestaurants(data);
    } catch (error) {
      console.error('Error fetching bookmarked restaurants:', error);
    }
  }, []);

  const fetchRecommendedRestaurants = useCallback(async () => {
    try {
      const accessToken = localStorage.getItem('access_token');
      const response = await fetch('http://127.0.0.1:8000/api/recommend-restaurants/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        credentials: 'include'
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
      const response = await fetch(`http://127.0.0.1:8000/chat_history/?username=${username}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setChatHistory(data.chat_history);
    } catch (error) {
      console.error('Error fetching chat history:', error);
    }
  }, [username]);

  useEffect(() => {
    fetchBookmarkedRestaurants();
    fetchRecommendedRestaurants();
    fetchChatHistory();
  }, [fetchBookmarkedRestaurants, fetchRecommendedRestaurants, fetchChatHistory]);

  const handleBookmark = async (restaurantName) => {
    try {
      const accessToken = localStorage.getItem('access_token');
      await fetch('http://127.0.0.1:8000/api/save-restaurant/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
          'X-CSRFToken': getCookie('csrftoken')
        },
        credentials: 'include',
        body: JSON.stringify({ name: restaurantName })
      });
      fetchBookmarkedRestaurants();
    } catch (error) {
      console.error('Error bookmarking restaurant:', error);
    }
  };

  const handleUnbookmark = async (restaurantName) => {
    try {
      const accessToken = localStorage.getItem('access_token');
      await fetch('http://127.0.0.1:8000/api/unsave-restaurant/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
          'X-CSRFToken': getCookie('csrftoken')
        },
        credentials: 'include',
        body: JSON.stringify({ name: restaurantName })
      });
      fetchBookmarkedRestaurants();
    } catch (error) {
      console.error('Error unbookmarking restaurant:', error);
    }
  };

  useEffect(() => {
    fetch(`${baseURL}/set-csrf-token/`, {
      method: 'GET',
      credentials: 'include'
    });

    fetch(`${baseURL}/get-username/${username}/`, {
      method: 'GET',
      credentials: 'include'
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to fetch user info');
      }
    })
    .then(data => {
      setUserInfo({ username: data.username, language: data.language });
    })
    .catch(error => {
      setError(error.message);
    });
  }, [username]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${baseURL}/chatbot/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCookie('csrftoken'),
        },
        credentials: 'include',
        body: JSON.stringify({ username: userInfo.username, message, language : userInfo.language}),
      });

      if (response.ok) {
        const data = await response.json();
        setResponse(data.response);
        highlightRestaurants(data.response);
        fetchChatHistory(); // Update chat history after sending a new message
      } else {
        setError('Failed to submit message');
      }
    } catch (error) {
      setError('Failed to submit message');
      console.error(error);
    }
  };

  const highlightRestaurants = (response) => {
    let highlighted = response;
    let found = [];

    restaurants.forEach(restaurant => {
      if (response.includes(restaurant)) {
        highlighted = highlighted.replace(new RegExp(restaurant, 'g'), `<span style="color:red;">${restaurant}</span>`);
        found.push(restaurant);
      }
    });

    setHighlightedResponse(highlighted);
    setFoundRestaurants(found);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(`${baseURL}/logout/`, {
        method: 'POST',
        headers: {
          'X-CSRFToken': getCookie('csrftoken'),
        },
        credentials: 'include',
      });

      if (response.ok) {
        navigate('/login');
      } else {
        setError('Failed to logout');
      }
    } catch (error) {
      setError('Failed to logout');
      console.error(error);
    }
  };

  const handleNavigateToRestaurant = () => {
    navigate('/restaurant');
  };

  const handleDeleteAllChats = async () => {
    try {
      const response = await fetch(`${baseURL}/delete_all_chats/`, {
        method: 'POST',
        headers: {
          'X-CSRFToken': getCookie('csrftoken'),
        },
        credentials: 'include',
      });

      if (response.ok) {
        setChatHistory([]); // Clear chat history state
      } else {
        setError('Failed to delete chat history');
      }
    } catch (error) {
      setError('Failed to delete chat history');
      console.error(error);
    }
  };

  const renderChatHistory = () => {
    return chatHistory.map((chat, index) => (
      <div key={index} className="chat-message">
        <div className="user-message">
          <strong>{chat.message}</strong>
        </div>
        <div className="bot-response">
          {chat.response}
        </div>
      </div>
    ));
  };

  const handleTestApi = async () => {
    try {
      const accessToken = localStorage.getItem('access_token');
      const response = await fetch('http://127.0.0.1:8000/api/restaurant-images/', {
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
        setTestImages(data);
      } else {
        const errorData = await response.json();
        setError(errorData.error);
      }
    } catch (error) {
      setError('Failed to fetch test images');
      console.error(error);
    }
  };

  const handleFetchRestaurantMood = async () => {
    try {
      const accessToken = localStorage.getItem('access_token');
      const response = await fetch('http://127.0.0.1:8000/get-restaurant-mood/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
          'X-CSRFToken': getCookie('csrftoken'),
          
        },
        credentials: 'include',
        body: JSON.stringify({ restaurant: restaurantName })
      });

      if (response.ok) {
        const data = await response.json();
        setRestaurantMood(data);
      } else {
        const errorData = await response.json();
        setError(errorData.error);
      }
    } catch (error) {
      setError('Failed to fetch restaurant mood');
      console.error(error);
    }
  };

  return (
    <div className="combined-page">
      <div className="section recommended">
        <h2>Recommended Restaurants</h2>
        <ul>
          {recommendedRestaurants.map(restaurant => (
            <li key={restaurant.id}>
              {restaurant.name} ({restaurant.category})
              <div>
                {restaurant.resimages && restaurant.resimages.map((image, index) => (
                  <div key={index}>
                    <img src={`${baseURL}${image.image_en}`} alt={`${restaurant.name} English`} />
                    <img src={`${baseURL}${image.image_ko}`} alt={`${restaurant.name} Korean`} />
                    <img src={`${baseURL}${image.image_zh}`} alt={`${restaurant.name} Chinese`} />
                    <img src={`${baseURL}${image.image_ja}`} alt={`${restaurant.name} Japanese`} />
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="section chatbot">
        <h1>Welcome, {userInfo.username}!</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
        <button onClick={handleLogout}>Logout</button>
        <button onClick={handleNavigateToRestaurant}>Go to Restaurant Page</button>
        <button onClick={handleDeleteAllChats}>Delete All Chat History</button>
        <div className="chat-history">
          {renderChatHistory()}
        </div>
        {error && <p>Error: {error}</p>}
      </div>
      <div className="section bookmarked">
        <h2>Bookmarked Restaurants</h2>
        <ul>
          {bookmarkedRestaurants.map(restaurant => (
            <li key={restaurant.id}>
              {restaurant.restaurant_name}
              <div>
                {restaurant.restaurant_images && restaurant.restaurant_images.map((image, index) => (
                  <div key={index}>
                    <img src={`${baseURL}${image.image_en}`} alt={`${restaurant.restaurant_name} English`} />
                    <img src={`${baseURL}${image.image_ko}`} alt={`${restaurant.restaurant_name} Korean`} />
                    <img src={`${baseURL}${image.image_zh}`} alt={`${restaurant.restaurant_name} Chinese`} />
                    <img src={`${baseURL}${image.image_ja}`} alt={`${restaurant.restaurant_name} Japanese`} />
                  </div>
                ))}
              </div>
              <button onClick={() => handleUnbookmark(restaurant.restaurant_name)}>Unbookmark</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="section test-api">
        <h2>Test API</h2>
        <input
          type="text"
          value={restaurantName}
          onChange={(e) => setRestaurantName(e.target.value)}
          placeholder="Enter restaurant name"
        />
        <button onClick={handleTestApi}>Test API</button>
        <div className="test-images">
          {testImages.map((image, index) => (
            <div key={index} className="image-container">
              <p>{image.image_name}</p>
              <img src={`http://127.0.0.1:8000${image.image_en}`} alt={`${image.image_name} English`} />
              <img src={`http://127.0.0.1:8000${image.image_ko}`} alt={`${image.image_name} Korean`} />
              <img src={`http://127.0.0.1:8000${image.image_zh}`} alt={`${image.image_name} Chinese`} />
              <img src={`http://127.0.0.1:8000${image.image_ja}`} alt={`${image.image_name} Japanese`} />
            </div>
          ))}
        </div>
        <h2>Get Restaurant Mood</h2>
        <input
          type="text"
          value={restaurantName}
          onChange={(e) => setRestaurantName(e.target.value)}
          placeholder="Enter restaurant name"
        />
        <button onClick={handleFetchRestaurantMood}>Get Mood</button>
        {restaurantMood && (
          <div>
            <p>Mood: {restaurantMood.mood}</p>
            <p>Category: {restaurantMood.category}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CombinedPage;