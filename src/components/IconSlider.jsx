import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './../styles/Icon.css';
import Image1 from './../img/rice.png'
import Image2 from './../img/taco.png'
import Image3 from './../img/burger.png'
import Image4 from './../img/fishcake.png'
import Image5 from './../img/cola.png'
import Image6 from './../img/pizza.png'

// 이미지 경로 배열
const images = [
    Image1,Image2,Image3,Image4,Image5,Image6

];

function IconSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 다음 이미지로 넘어가는 함수
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  // 일정 시간마다 이미지 변경
  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 3000); // 3초마다 변경
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="icon-slider">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Image ${index + 1}`}
          className={index === currentIndex ? 'active' : ''}
        />
      ))}
    </div>
  );
}

export default IconSlider;
