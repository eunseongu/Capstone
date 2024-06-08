import './../styles/Register.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Register() {
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState('')
    const [Language, setLanguage] = useState("")
    const [passwordError, setPasswordError] = useState('')
    const [fieldError, setFieldError] = useState('')

    const navigate = useNavigate();

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
        if (ConfirmPassword && event.target.value !== ConfirmPassword) {
            setPasswordError("Password confirmation doesn't match.");
        } else {
            setPasswordError('');
        }
    }

    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value)
        if (Password !== event.target.value) {
            setPasswordError("Password confirmation doesn't match.");
        } else {
            setPasswordError('');
        }
    }

    const onLanguageHandler = (event) => {
        setLanguage(event.currentTarget.value)
    }

    const isFormValid = () => {
        return Email !== '' && Password !== '' && ConfirmPassword !== '' && Language !== '' && Language !== 'Choose your language';
    };


   
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

        if (Password !== ConfirmPassword) {
            setPasswordError("Password confirmation doesn't match.")
            return;
        }

        if (!isFormValid()) {
            setFieldError("Please specify all fields.");
            return;
        }

        const userData = {
            username:Email,
            email: Email,
            password1: Password,
            password2: ConfirmPassword,
            language: Language
        };

        console.log('email', Email)
        console.log('password', Password)
        console.log('confirmpassword', ConfirmPassword)
        console.log('language', Language)
        console.log('userdata', JSON.stringify(userData))

        const response = await fetch('http://3.36.105.171:8000/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            },
            body: JSON.stringify(userData),  // JSON 형식으로 변환
            credentials: 'include'  // Include cookies in the request
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('>>> [회원가입] 🤬 ERROR >>>', errorData);
        } else {
            console.log('>>> [회원가입] ✅ SUCCESS >>>');
            navigate('/Login');
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
    <div className='register__container'>
        <div className='register-left'></div>
        <div className='register-right'>

            <div className='register-right__text-box'>
                <p className='register-right__k-rebot font'>K-REBOT</p>
            </div>
            <div className='register-right__text-box02'>
                <p className='register-right__hello font'>{t('Register.hello')}</p>
            </div>
            <form onSubmit={onSubmitHandler}>
                <input className="register-right__input-box font" name="email" type="Email" placeholder={t('Register.email')} value={Email} onChange={onEmailHandler} />
                <input className="register-right__input-box font" name="password" type="Password" placeholder={t('Register.password')} value={Password} onChange={onPasswordHandler} />

                <input
                    className="register-right__input-box font" name="confirm-password" type="Password" placeholder={t('Register.confirm_password')}
                    value={ConfirmPassword} onChange={onConfirmPasswordHandler}
                />
                {passwordError && <p className="register-right__error-message">{passwordError}</p>}

                <select className="register-right__input-box font" name="language" value={Language} onChange={onLanguageHandler}>
                    <option className='register-right__input-box font'>{t('Register.choose_language')}</option>

                    <option value="English">English</option>
                    <option value="Chinese">Chinese</option>
                    <option value="Japanese">Japanese</option>
                    <option value="Korean">Korean</option>
                </select>
                {fieldError && <p className="register-right__error-message">{fieldError}</p>}

                <button className='register-right__button font'>Register</button>

            </form>
        </div>
    </div>

);
}
