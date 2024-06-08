import React, { useEffect } from 'react';

const KeepAlive = () => {
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

    const sendKeepAliveRequest = () => {
        fetch('http://3.36.105.171:8000/keep-alive/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken') // CSRF 토큰 설정
            },
            body: JSON.stringify({}) // 필요한 데이터가 있으면 여기에 추가
        })
        .then(response => {
            if (response.ok) {
                console.log('Keep-alive request successful');
            } else {
                console.error('Keep-alive request failed');
            }
        })
        .catch(error => {
            console.error('Error sending keep-alive request:', error);
        });
    };

    useEffect(() => {
        const intervalId = setInterval(sendKeepAliveRequest, 300000); // 5분(300000 밀리초)마다 요청 보내기
        return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 인터벌 클리어
    }, []);

    return (
        <div>
        </div>
    );
};

export default KeepAlive;
