import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import GoodsDetail from './components/Goods/GoodsDetail.js';
import Weather from './components/Weather.js';
import GoodsMain from './components/Goods/GoodsMain.js';
import { Route, Routes } from 'react-router-dom';
import GoodsOrder from './components/Goods/GoodsOrder.js';
import Header from './components/Header.js';

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

  return (
    
      <div className="App">
       
      <Routes>
        <Route path='/' element={<Header/>}  />
        <Route path='/goods' element={<GoodsMain goods={goods} />}  />
        <Route path='/goods/:goodsId' element={<GoodsDetail goods={goods} />}  />
        <Route path='/goods/orders' element={<GoodsOrder />} /> 
        <Route path='/weather' element={<Weather/>}/>
      </Routes>
        
      {/* 
      <Routes>
        <Route path='/' element={<Weather/>}  />
      </Routes>
      */}
      </div>

  );
}

export default App;
