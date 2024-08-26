import React from "react";
import "../../css/foodmap.css";
import { Link } from "react-router-dom";

const FoodMapLG = () => {
  return (
    <div>
      <div className="playground-box">
        <div id="pg">
          <p>
            <strong>서울 잠실야구장</strong>
          </p>
        </div>
        <img className="foodmap-img" src="./images/LGinside.png" alt="LG야구장내부" />
        <div className="food-container">
          <div className="food-item">
            <Link to={`/fooddetail/1`}>잭슨피자</Link>
          </div>
          <div className="food-item">
            <Link to={`/fooddetail/2`}>원샷치킨</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodMapLG;
