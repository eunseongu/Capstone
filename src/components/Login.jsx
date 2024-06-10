import './../styles/Login.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Image1 from './../img/cola.png'
import Image2 from './../img/egg.png'
import Image3 from './../img/pizza.png'
import Image4 from'./../img/cheese.png'
import Image5 from './../img/cupcake.png'
import Image6 from './../img/rebot.png'

export default function Login() {
    const navigate = useNavigate();

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState('');


    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const getCookie = (name) => {
      const cookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith(`${name}=`));
      return cookie ? decodeURIComponent(cookie.trim().substring(name.length + 1)) : null;
    };
    
      useEffect(() => {
        fetch('http://3.36.105.171:8000/set-csrf-token/', {
          method: 'GET',
          credentials: 'include'  // Include cookies in the request
        });
      }, []);

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        // navigate('/Chat');
        console.log('email', Email)
        console.log('password', Password)

        const userData = {
            email: Email,
            password: Password,
        };

    
        const response = await fetch('http://3.36.105.171:8000/login/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken')
          },
          body: JSON.stringify(userData),  // JSON 형식으로 전송
          credentials: 'include'  // Include cookies in the request
        });
    
        if (!response.ok) {
          const errorData = await response.json();
          setErrorMessage(errorData.error);
          console.error('>>> [로그인] 🤬 ERROR >>>', errorData);
        } else {
          const data= await response.json();
          localStorage.setItem('access_token', data.access_token);
          localStorage.setItem('refresh_token', data.refresh_token);
          console.log('>>> [로그인] ✅ SUCCESS >>>');
          navigate(`/Main/${data.username}`);  // 로그인 성공 시 리디렉션
          
        }

    }

    const { t, i18n } = useTranslation();

    useEffect(() => {
        const preferredLanguage = localStorage.getItem('i18nextLng');
        if (preferredLanguage) {
            i18n.changeLanguage(preferredLanguage);
        }
    }, [i18n]);

    return (
        <div className='login__container'>
            <div className="login__images">
        {/* <img src={Image1} alt="Decorative" className="login-left__image1" /> */}
        {/* <img src={Image2} alt="Decorative" className="login-left__image2" /> */}
        {/* <img src={Image3} alt="Decorative" className="login-left__image3" /> */}
        {/* <img src={Image4} alt="Decorative" className="login-left__image4" /> */}
        {/* <img src={Image5} alt="Decorative" className="login-left__image5" /> */}
        <img src={Image6} alt="Decorative" className="login-left__image6" />
      </div>
            <div className='login-right'>

                <div className='login-right__text-box'>
                    <p className='login-right__k-rebot'>K-REBOT</p>
                </div>
                <div className='login-right__text-box02'>
                    <p className='login-right__hello'>{t('Login.welcome')}</p>
                    <p className='login-right__hello'>{t('Login.glad')}</p>
                </div>
                <form onSubmit={onSubmitHandler}>
                    <input
                        className="login-right__input-box font" type="Email" placeholder={t('Login.enter_email')}
                        value={Email} onChange={onEmailHandler}
                    />
                    <input
                        className="login-right__input-box font" type="Password" placeholder={t('Login.enter_password')}
                        value={Password} onChange={onPasswordHandler}
                    />
                    {errorMessage && (<div className='login-right__error-message'>{errorMessage}</div>)}
                    <button className='login-right__button font' >Login</button>
                </form>
            </div>
        </div>

    );
}
