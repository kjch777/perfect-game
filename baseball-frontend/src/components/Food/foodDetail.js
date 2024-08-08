import React, { useState, useEffect } from "react";
import "./foodDetail.css";
import axios from "axios";
import { useParams } from "react-router-dom";

function FoodDetail() {
  const { foodId } = useParams();
  const [food, setFood] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log(`Fetching data for foodId: ${foodId}`);
    axios
      .get(`http://localhost:9090/foods/${foodId}`)
      .then((response) => {
        console.log('Response data:', response.data);
        setFood(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
        setError(error);
        setLoading(false);
      });
  }, [foodId]);

  if (loading) {
    return <p>로딩 중...</p>;
  }

  if (error) {
    return <p>데이터 로드 중 오류가 발생했습니다: {error.message}</p>;
  }

 
  return (
    <div className="App">
      <div className="playground-box">
        <div id="pg">
          <p>
            <strong>{food.food_name}</strong>
          </p>
        </div>
        <div className="food-container">
          {food.foodMenu && Object.entries(food.foodMenu).map(([menu, price]) => (
            <div key={menu}>
              <p>
                {menu}: {price}원
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FoodDetail;
