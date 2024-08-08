import React from 'react';
import './foodmap.css'

const FoodMap = () => {
  return (
    <div>
      <div className="playground-box">
        <div id="pg">
          <p><strong>인천 SSG랜더스필드</strong></p>
        </div>
        <img src="./images/SSGinside.png" alt="SSG야구장내부" />
        <div className="food-container">
            <a href="./fooddetail/7">맛집7</a><br />
            <a href="./fooddetail/8">맛집8</a><br />
        </div>
      </div>
    </div>
  );
};

export default FoodMap;
