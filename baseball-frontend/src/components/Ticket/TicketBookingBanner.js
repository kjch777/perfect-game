import { useState } from 'react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
// import Swiper core and required modules

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
// import Swiper styles

import '../../css/TicketBooking.css';

export const TicketBookingBanner = () => {
  
  const images = [
    '/images/Banner-Bears.jpg',
    '/images/Banner-Dinos.jpg',
    '/images/Banner-Eagles.jpg',
    '/images/Banner-Giants.jpg',
    '/images/Banner-Heroes.jpg',
    '/images/Banner-Landers.jpg',
    '/images/Banner-Lions.jpg',
    '/images/Banner-Tigers.jpg',
    '/images/Banner-Twins.jpg',
    '/images/Banner-Wiz.jpg'
  ];

  const textOverlay = [
    '247 TEAM DOOSAN',
    'THE ROAD TO GREATNESS',
    'DIFFERENT US : 2024',
    '투혼 투지',
    'WIN THE CHAMPIONSHIP - 영웅질주 키움승리',
    'NO LIMITS AMAZING LANDERS',
    'WIN OR WOW',
    '압도하라! ALWAYS KIA TIGERS',
    '무적 LG! 끝까지 TWINS! 승리를 향해, 하나의 트윈스!',
    'WE ARE GREAT MAGIC WINNING KT'
  ];

  const links = [
    'https://www.doosanbears.com/',
    'https://www.ncdinos.com/',
    'https://www.hanwhaeagles.co.kr/index.do',
    'https://www.giantsclub.com/html/',
    'https://heroesbaseball.co.kr/index.do',
    'https://www.ssglanders.com/main',
    'https://www.samsunglions.com/',
    'https://tigers.co.kr/',
    'https://www.lgtwins.com/service/html.ncd?view=/pc_twins/twins_main/twins_main',
    'https://www.ktwiz.co.kr/'
  ];

  const altTexts = [
    '사진을 클릭하시면 두산 베어스 홈 페이지로 이동합니다.',
    '사진을 클릭하시면 NC 다이노스 홈 페이지로 이동합니다.',
    '사진을 클릭하시면 한화 이글스 홈 페이지로 이동합니다.',
    '사진을 클릭하시면 롯데 자이언츠 홈 페이지로 이동합니다.',
    '사진을 클릭하시면 키움 히어로즈 홈 페이지로 이동합니다.',
    '사진을 클릭하시면 SSG 랜더스 홈 페이지로 이동합니다.',
    '사진을 클릭하시면 삼성 라이온즈 홈 페이지로 이동합니다.',
    '사진을 클릭하시면 기아 타이거즈 홈 페이지로 이동합니다.',
    '사진을 클릭하시면 LG 트윈스 홈 페이지로 이동합니다.',
    '사진을 클릭하시면 KT 위즈 홈 페이지로 이동합니다.'
  ];

  const [nowImg, setNowImg] = useState(images[0]);
  const [currentText, setCurrentText] = useState(textOverlay[0]);
  
  return (
    <div className="banner-container" style={{ backgroundImage: `url(${nowImg})` }}>
      <div className="overlay">
        <Swiper
          // install Swiper modules
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{delay: 2500, disableOnInteraction: false, pauseOnMouseEnter: true, reverseDirection: false,stopOnLastSlide: false, waitForTransition: true}} 
          loop={true}
          speed={0}
          onSlideChange={(swiper) => {
            const nowImgIndex = swiper.realIndex;
            setNowImg(images[nowImgIndex]);
            setCurrentText(textOverlay[nowImgIndex]);
          }}
          allowTouchMove={false}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <a href={links[index]} target="_blank" className='slide-links'>
                <img src={image} className='slide-img' title={altTexts[index]}/>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className='overlay-text'>{currentText}</div>
      </div>
    </div>
  );
};