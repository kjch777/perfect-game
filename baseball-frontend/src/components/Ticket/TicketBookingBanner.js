// import Swiper core and required modules
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

export const TicketBookingBanner = () => {
  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={0}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      autoplay={{delay: 2500, disableOnInteraction: false, pauseOnMouseEnter: true, reverseDirection: false,stopOnLastSlide: false, waitForTransition: true}} loop={true}
    >
      <SwiperSlide>
        <img src='/images/Banner-Bears.jpg' />
      </SwiperSlide>
      <SwiperSlide>
        <img src='/images/Banner-Dinos.jpg' />
      </SwiperSlide>
      <SwiperSlide>
        <img src='/images/Banner-Eagles.jpg' />
      </SwiperSlide>
      <SwiperSlide>
        <img src='/images/Banner-Giants.jpg' />
      </SwiperSlide>
      <SwiperSlide>
        <img src='/images/Banner-Heroes.jpg' />
      </SwiperSlide>
      <SwiperSlide>
        <img src='/images/Banner-Landers.jpg' />
      </SwiperSlide>
      <SwiperSlide>
        <img src='/images/Banner-Lions.jpg' />
      </SwiperSlide>
      <SwiperSlide>
        <img src='/images/Banner-Tigers.jpg' />
      </SwiperSlide>
      <SwiperSlide>
        <img src='/images/Banner-Twins.jpg' />
      </SwiperSlide>
      <SwiperSlide>
        <img src='/images/Banner-Wiz.jpg' />
      </SwiperSlide>
    </Swiper>
  );
};