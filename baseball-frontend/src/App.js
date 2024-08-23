import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
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
import Main from './components/Layout/Main.js';
import Signupp from './components/Signup/Signupp.js';
import Footer from './components/Layout/Footer.js';
import OrderCheck from './components/Goods/OrderCheck.js';
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

function App() {

  const [goods, setGoods] = useState([]);

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
    if (savedMember) {
      setLoginMember(JSON.parse(savedMember));
    }
  }, []);


  useEffect(() => {
    if (loginMember) {
      localStorage.setItem("loginMember", JSON.stringify(loginMember));
    }
  }, [loginMember]);

  return (
    <LoginContext.Provider value={{ loginMember, setLoginMember }}>
    <div className="App">
      <Header />
      <div id="main-content">
      <Routes>
        <Route path="/" element={<Main />} />
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
        <Route path='/order-check' element={<OrderCheck />} />
        <Route path='/weather' element={<Weather />} />
        <Route path="/payment/checkout" element={<PaymentCheckoutPage />} />
        <Route path="/payment/success" element={<PaymentSuccessPage />} />
        <Route path="/payment/fail" element={<PaymentFailPage />} />
        <Route path='/' element={<MainApp/>}>메인페이지(달력,경기)</Route>
        <Route path='/gameDetail' element={<GameDetail/>}>경기상세페이지</Route>
        <Route path='/gameAddPage' element={<GameAddPage/>}>경기추가페이지</Route>
        </Routes>
      </div>
      <Footer/>
    </div>
    </LoginContext.Provider>
  );
}

export default App;
