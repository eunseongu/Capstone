import React, { useState, useEffect, useRef } from 'react';
import robotImg from './../img/bot-img.png';
import userImg from './../img/user3D.png';
import { restaurants_list } from './restaurant_list';
import './../styles/Chat.css';
import { useTranslation } from 'react-i18next';

export const MessageList = ({ 
    handleDeleteAllChats,
    renderChatHistory,
    messages, 
    onRestaurantClick,
    chatHistory }) => {
    const messagesEndRef = useRef(null);
    const { t, i18n } = useTranslation();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);
    

    const highlightRestaurants = (isUser, text) => {
        const pattern = new RegExp(`(${restaurants_list.join('|')})`, 'gi');
        const found = [];


        const highlightedText = text.split(pattern).map((part, index) => {
            if (!isUser && restaurants_list.includes(part)) {
                found.push(part);

                return (
                    <span key={index} style={{ color: '#2845ed', cursor: 'pointer' }} onClick={() => onRestaurantClick(part)}>
                        {part}
                    </span>
                );
            }
            return part;
        });

        return { highlightedText, found };
    };

    return (
        <div className='chat__messages-container'>

{messages.length !== 0 && chatHistory.length !== 0  && (
        
            <button className='chat__delete-button' onClick={handleDeleteAllChats}>{t('Chat.delete')}</button>
            
      )}
      {renderChatHistory()}

            {messages.map((message) => {
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
            })}
            <div ref={messagesEndRef}></div>
        </div>
    );
};