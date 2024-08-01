import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import GoodsDetail from './components/Goods/GoodsDetail.js';
import Weather from './components/Weather.js';
import GoodsMain from './components/Goods/GoodsMain.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

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
    <Router>
      <div className="App">
      <Routes>
        <Route path='/' element={<GoodsMain goods={goods} />}  />
        <Route path='/goods/:goodsId' element={<GoodsDetail goods={goods} />}  />
      </Routes>
      </div>
    </Router>

  );
}

export default App;
