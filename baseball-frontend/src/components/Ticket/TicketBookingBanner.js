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
  ]

  const [nowImg, setNowImg] = useState(images[0]);
  
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
          }}
          allowTouchMove={false}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <img src={image} className='slide-img' />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};