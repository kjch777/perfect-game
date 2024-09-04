import './App.css';
import React, { useState, useEffect } from "react";
import {Routes, Route, useLocation} from "react-router-dom";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import GoodsDetail from './components/Goods/GoodsDetail.js';
import Weather from './components/Weather.js';
import GoodsMain from './components/Goods/GoodsMain.js';
import GoodsOrder from './components/Goods/GoodsOrder.js';
import Header from './components/Layout/Header.js';
import PaymentSuccessPage from './components/Goods/GoodsPaymentSuccessPage.js';
import PaymentCheckoutPage from './components/Goods/GoodsPaymentCheckoutPage.js';
import PaymentFailPage from './components/Goods/GoodsPaymentFailPage.js'
import Login from './components/Login/Login.js';
import LoginContext from './components/Login/LoginContext';
import Signupp from './components/Signup/Signupp.js';
import Footer from './components/Layout/Footer.js';
import FoodMain from "./components/Food/foodMain";
import FoodMapLG from "./components/Food/foodMapLG";
import FoodMapKIWOOM from "./components/Food/foodMapKIWOOM";
import FoodMapSSG from "./components/Food/foodMapSSG";
import FoodMapKIA from "./components/Food/foodMapKIA";
import FoodDetail from "./components/Food/foodDetail";
import FoodComment from "./components/Food/foodComment";
import MyPage from './components/MyPage/myPage';
import MyPageEdit from './components/MyPage/myPageEdit';
import MyPageDelete from './components/MyPage/myPageDelete';
import MainApp from './components/main_components/MainApp';
import GameDetail from './components/main_components/GameDetail';
import GameAddPage from './components/main_components/GameAddPage';
import BoardMain from './components/Board/BoardMain';
import Chat from './components/chat/Chat';
import { TicketBookingMain } from "./components/Ticket/TicketBookingMain";
import { TicketBookingSub } from "./components/Ticket/TicketBookingSub";
import { BookingStepTwo } from "./components/Ticket/BookingStepTwo";
import { BookingInfoView } from "./components/Ticket/BookingInfoView";
import { TicketPaymentCheckoutPage } from './components/Ticket/TicketPaymentCheckoutPage';
import { TicketPaymentSuccessPage } from './components/Ticket/TicketPaymentSuccessPage';
import { TicketPaymentFailPage } from './components/Ticket/TicketPaymentFailPage';

function App() {
  
  const location = useLocation();
  const [goods, setGoods] = useState([]);
  
  const hideHeaderFooter = location.pathname.startsWith('/ticket/bookingSub')
  || location.pathname.startsWith('/ticket/payment');
  
  const 모든상품보기 = async () => {
    const res = await axios.get('/goods');
    setGoods(res.data);
    console.log("goods" , res.data);
  };
  
  useEffect(() => {
    모든상품보기(); 
  }, [] );

  const [loginMember, setLoginMember] = useState(null);
  
  useEffect(() => {
    const savedMember = localStorage.getItem("loginMember");
    if(savedMember) {
      setLoginMember(JSON.parse(savedMember));
    }
  }, []);

  useEffect(() => {
    if(loginMember) {
      localStorage.setItem("loginMember", JSON.stringify(loginMember));
    }
  }, [loginMember]);
  
  return (
    <LoginContext.Provider value={{ loginMember, setLoginMember }}>
      <div className="App">
        {!hideHeaderFooter && <Header />}
        <div id="main-content">
          <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/members/signup" element={<Signupp/>}></Route>
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/mypage/edit" element={<MyPageEdit />} />
          <Route path="/foodmain" element={<FoodMain />} />
          <Route path="/foodmapLG" element={<FoodMapLG />} />
          <Route path="/foodmapSSG" element={<FoodMapSSG />} />
          <Route path="/foodmapKIWOOM" element={<FoodMapKIWOOM />} />
          <Route path="/foodmapKIA" element={<FoodMapKIA />} />
          <Route path="/fooddetail/:foodId" element={<FoodDetail />} />
          <Route path="/foodComment" element={<FoodComment />} />
          <Route path='/mypage/delete' element={<MyPageDelete />} />
          <Route path='/goods' element={<GoodsMain goods={goods} />} />
          <Route path='/goods/:goodsId' element={<GoodsDetail goods={goods} />} />
          <Route path='/goods/orders' element={<GoodsOrder />} />
          <Route path='/weather' element={<Weather />} />
          <Route path="/payment/checkout" element={<PaymentCheckoutPage />} />
          <Route path="/payment/success" element={<PaymentSuccessPage />} />
          <Route path="/payment/fail" element={<PaymentFailPage />} />
          <Route path='/' element={<MainApp/>}>메인페이지(달력,경기)</Route>
          <Route path='/gameDetail' element={<GameDetail/>}>경기상세페이지</Route>
          <Route path='/gameAddPage' element={<GameAddPage/>}>경기추가페이지</Route>
          <Route path="/board/*" element={<BoardMain/>}></Route>
          <Route path="/Chat" element={<Chat/>}></Route>
            <Route path="/ticket/bookingMain" element={<TicketBookingMain />} />
            <Route path="/ticket/bookingSub/:gameCode" element={<TicketBookingSub />} />
            <Route path="/ticket/bookingSub/:gameCode/bookingStepTwo" element={<BookingStepTwo />} />
            <Route path="/ticket/payment/checkout" element={<TicketPaymentCheckoutPage />} />
            <Route path="/ticket/payment/success" element={<TicketPaymentSuccessPage />} />
            <Route path="/ticket/payment/fail" element={<TicketPaymentFailPage />} />
            <Route path="/ticket/bookingInfoView" element={<BookingInfoView />} />
          </Routes>
        </div>
        {!hideHeaderFooter && <Footer />}
      </div>
    </LoginContext.Provider>
  );
}

export default App;