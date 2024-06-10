import React from 'react';
import './../styles/Recommend.css';
import { useTranslation } from 'react-i18next';


export const RestaurantIcons = ({ category }) => {
    const { t, i18n } = useTranslation();

    return (
        <>
           {category === '감자탕' && (
    <div className='recommend-item__icon-container'>
        <p className='recommend-item__icon-text font'> 🍲 {t('Category.감자탕')}</p>
    </div>
)}
{category === '곱창,막창,양' && (
    <div className='recommend-item__icon-container'>
        <p className='recommend-item__icon-text font'> 🍢 {t('Category.곱창,막창,양')}</p>
    </div>
)}
{category === '국수' && (
    <div className='recommend-item__icon-container'>
        <p className='recommend-item__icon-text font'> 🍜 {t('Category.국수')}</p>
    </div>
)}
{category === '닭요리' && (
    <div className='recommend-item__icon-container'>
        <p className='recommend-item__icon-text font'> 🍗 {t('Category.닭요리')}</p>
    </div>
)}
{category === '덮밥' && (
    <div className='recommend-item__icon-container'>
        <p className='recommend-item__icon-text font'> 🍚 {t('Category.덮밥')}</p>
    </div>
)}
{category === '돈가스' && (
    <div className='recommend-item__icon-container'>
        <p className='recommend-item__icon-text font'> 🍖 {t('Category.돈가스')}</p>
    </div>
)}
{category === '돼지고기구이' && (
    <div className='recommend-item__icon-container'>
        <p className='recommend-item__icon-text font'> 🥩 {t('Category.돼지고기구이')}</p>
    </div>
)}
{category === '딤섬,중식만두' && (
    <div className='recommend-item__icon-container'>
        <p className='recommend-item__icon-text font'> 🥟 {t('Category.딤섬,중식만두')}</p>
    </div>
)}
{category === '떡볶이' && (
    <div className='recommend-item__icon-container'>
        <p className='recommend-item__icon-text font'> 🍢 {t('Category.떡볶이')}</p>
    </div>
)}
{category === '멕시코,남미음식' && (
    <div className='recommend-item__icon-container'>
        <p className='recommend-item__icon-text font'> 🌮 {t('Category.멕시코,남미음식')}</p>
    </div>
)}
{category === '바(BAR)' && (
    <div className='recommend-item__icon-container'>
        <p className='recommend-item__icon-text font'> 🍸 {t('Category.바(BAR)')}</p>
    </div>
)}
{category === '백반,가정식' && (
    <div className='recommend-item__icon-container'>
        <p className='recommend-item__icon-text font'> 🍱 {t('Category.백반,가정식')}</p>
    </div>
)}
{category === '베이커리' && (
    <div className='recommend-item__icon-container'>
        <p className='recommend-item__icon-text font'> 🥐 {t('Category.베이커리')}</p>
    </div>
)}
{category === '베트남음식' && (
    <div className='recommend-item__icon-container'>
        <p className='recommend-item__icon-text font'> 🍲 {t('Category.베트남음식')}</p>
    </div>
)}
{category === '브런치' && (
    <div className='recommend-item__icon-container'>
        <p className='recommend-item__icon-text font'> 🍳 {t('Category.브런치')}</p>
    </div>
)}
{category === '샌드위치' && (
    <div className='recommend-item__icon-container'>
        <p className='recommend-item__icon-text font'> 🥪 {t('Category.샌드위치')}</p>
    </div>
)}
{category === '샤브샤브' && (
    <div className='recommend-item__icon-container'>
        <p className='recommend-item__icon-text font'> 🍲 {t('Category.샤브샤브')}</p>
    </div>
)}
{category === '술집' && (
    <div className='recommend-item__icon-container'>
        <p className='recommend-item__icon-text font'> 🍶 {t('Category.술집')}</p>
    </div>
)}
{category === '스파게티,파스타전문' && (
    <div className='recommend-item__icon-container'>
        <p className='recommend-item__icon-text font'> 🍝 {t('Category.스파게티,파스타전문')}</p>
    </div>
)}
{category === '식당 종류' && (
    <div className='recommend-item__icon-container'>
        <p className='recommend-item__icon-text font'> 🍴 {t('Category.식당 종류')}</p>
    </div>
)}
{category === '아귀찜,해물찜' && (
    <div className='recommend-item__icon-container'>
        <p className='recommend-item__icon-text font'> 🍲 {t('Category.아귀찜,해물찜')}</p>
    </div>
)}
{category === '아시아음식' && (
    <div className='recommend-item__icon-container'>
        <p className='recommend-item__icon-text font'> 🍜 {t('Category.아시아음식')}</p>
    </div>
)}
{category === '양꼬치' && (
    <div className='recommend-item__icon-container'>
        <p className='recommend-item__icon-text font'> 🍢 {t('Category.양꼬치')}</p>
    </div>
)}
{category === '양식' && (
    <div className='recommend-item__icon-container'>
        <p className='recommend-item__icon-text font'> 🍽️ {t('Category.양식')}</p>
    </div>
)}
{category === '요리주점' && (
    <div className='recommend-item__icon-container'>
        <p className='recommend-item__icon-text font'> 🍶 {t('Category.요리주점')}</p>
    </div>
)}
{category === '우동,소바' && (
    <div className='recommend-item__icon-container'>
        <p className='recommend-item__icon-text font'> 🍜 {t('Category.우동,소바')}</p>
    </div>
)}
{category === '육류,고기요리' && (
    <div className='recommend-item__icon-container'>
        <p className='recommend-item__icon-text font'> 🍖 {t('Category.육류,고기요리')}</p>
    </div>
)}
{category === '이자카야' && (
    <div className='recommend-item__icon-container'>
        <p className='recommend-item__icon-text font'> 🍶 {t('Category.이자카야')}</p>
    </div>
)}
{category === '이탈리아음식' && (
    <div className='recommend-item__icon-container'>
        <p className='recommend-item__icon-text font'> 🍝 {t('Category.이탈리아음식')}</p>
    </div>
)}
{category === '일본식라면' && (
    <div className='recommend-item__icon-container'>
        <p className='recommend-item__icon-text font'> 🍜 {t('Category.일본식라면')}</p>
    </div>
)}
{category === '일식당' && (
    <div className='recommend-item__icon-container'>
        <p className='recommend-item__icon-text font'> 🍣 {t('Category.일식당')}</p>
    </div>
)}
{category === '일식튀김,꼬치' && (
    <div className='recommend-item__icon-container'>
        <p className='recommend-item__icon-text font'> 🍢 {t('Category.일식튀김,꼬치')}</p>
    </div>
)}
{category === '족발,보쌈' && (
    <div className='recommend-item__icon-container'>
        <p className='recommend-item__icon-text font'> 🍖 {t('Category.족발,보쌈')}</p>
    </div>
)}
{category === '종합분식' && (
    <div className='recommend-item__icon-container'>
        <p className='recommend-item__icon-text font'> 🍢 {t('Category.종합분식')}</p>
    </div>
)}
{category === '중식당' && (
    <div className='recommend-item__icon-container'>
        <p className='recommend-item__icon-text font'> 🍜 {t('Category.중식당')}</p>
    </div>
)}
{category === '초밥,롤' && (
    <div className='recommend-item__icon-container'>
        <p className='recommend-item__icon-text font'> 🍣 {t('Category.초밥,롤')}</p>
    </div>
)}
{category === '치킨,닭강정' && (
    <div className='recommend-item__icon-container'>
        <p className='recommend-item__icon-text font'> 🍗 {t('Category.치킨,닭강정')}</p>
    </div>
)}
{category === '카페,디저트' && (
    <div className='recommend-item__icon-container'>
        <p className='recommend-item__icon-text font'> ☕ {t('Category.카페,디저트')}</p>
    </div>
)}
{category === '칼국수,만두' && (
    <div className='recommend-item__icon-container'>
        <p className='recommend-item__icon-text font'> 🍜 {t('Category.칼국수,만두')}</p>
    </div>
)}
{category === '태국음식' && (
    <div className='recommend-item__icon-container'>
        <p className='recommend-item__icon-text font'> 🍲 {t('Category.태국음식')}</p>
    </div>
)}
{category === '퓨전음식' && (
    <div className='recommend-item__icon-container'>
        <p className='recommend-item__icon-text font'> 🍽️ {t('Category.퓨전음식')}</p>
    </div>
)}
{category === '피자' && (
    <div className='recommend-item__icon-container'>
        <p className='recommend-item__icon-text font'> 🍕 {t('Category.피자')}</p>
    </div>
)}
{category === '한식' && (
    <div className='recommend-item__icon-container'>
        <p className='recommend-item__icon-text font'> 🍲 {t('Category.한식')}</p>
    </div>
)}
{category === '햄버거' && (
    <div className='recommend-item__icon-container'>
        <p className='recommend-item__icon-text font'> 🍔 {t('Category.햄버거')}</p>
    </div>
)}

        </>
    );
};

