import React from 'react';
import './foodmap.css'

const FoodMap = () => {
  return (
    <div>
      <div className="playground-box">
        <div id="pg">
          <p><strong>인천 SSG랜더스필드</strong></p>
        </div>
        <img src="LGinside.png" alt="LG야구장내부" />
        <div className="food-container">
            <a href="./food-detail">맛집1</a><br />
            <a href="#">맛집2</a><br />
        </div>
      </div>
    </div>
  );
};

export default FoodMap;
