import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import GoodsDetail from './components/Goods/GoodsDetail.js';
import Weather from './components/Weather.js';
import GoodsMain from './components/Goods/GoodsMain.js';
import { Route, Routes } from 'react-router-dom';
import GoodsOrder from './components/Goods/GoodsOrder.js';
import Header from './components/Layout/Header.js';
import PaymentSuccessPage from './components/Goods/GoodsPaymentSuccessPage.js';
import PaymentCheckoutPage from './components/Goods/GoodsPaymentCheckoutPage.js';
import PaymentFailPage from './components/Goods/GoodsPaymentFailPage.js'
import Login from './components/Login/Login.js';
import LoginContext from './components/Login/LoginContext';
import Main from './components/Layout/Main.js';
import SignupForm from './components/Signup/SignupForm.js';
import Signupp from './components/Signup/Signupp.js';
import Footer from './components/Layout/Footer.js';
import OrderCheck from './components/Goods/OrderCheck.js';



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
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/members/signup" element={<Signupp/>}></Route>
        <Route path='/goods' element={<GoodsMain goods={goods} />} />
        <Route path='/goods/:goodsId' element={<GoodsDetail goods={goods} />} />
        <Route path='/goods/orders' element={<GoodsOrder />} />
        <Route path='/order-check' element={<OrderCheck />} />
        <Route path='/weather' element={<Weather />} />
        <Route path="/payment/checkout" element={<PaymentCheckoutPage />} />
        <Route path="/payment/success" element={<PaymentSuccessPage />} />
        <Route path="/payment/fail" element={<PaymentFailPage />} />
      </Routes>
      <Footer/>
    </div>
  </LoginContext.Provider>
  );
}

export default App;
