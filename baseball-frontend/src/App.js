import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import GoodsDetail from './component/GoodsDetail.js';
import Weather from './component/Weather.js';

function App() {

  const [goods, setGoods] = useState([]);

  useEffect(() => {
    모든상품보기();
  }, [] );

  const 모든상품보기 = async () => {
    const res = await axios.get('/goods');
    setGoods(res.data);
  };

  return (
    <div className="App">
       {/* 
       <h1>BEST ITEM</h1>
      <GoodsDetail goods={goods}/>
     
      */}
       <Weather/>
    </div>
  );
}

export default App;
