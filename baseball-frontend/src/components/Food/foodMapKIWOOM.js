import React from 'react';
import './foodmap.css'

const FoodMap = () => {
  return (
    <div>
      <div className="playground-box">
        <div id="pg">
          <p><strong>서울 고척스카이돔</strong></p>
        </div>
        <img src="./images/KIWOOMinside.jpg" alt="고척야구장내부" />
        <div className="food-container">
            <a href="./fooddetail/3">맛집3</a><br />
            <a href="./fooddetail/4">맛집4</a><br />
        </div>
      </div>
    </div>
  );
};

export default FoodMap;
