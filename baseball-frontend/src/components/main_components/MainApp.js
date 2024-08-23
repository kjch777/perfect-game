import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import "../../css/MainApp.css";
import CalendarMonth from "./CalendarMonth";


function MainApp() {//App.js는 공통파일이므로 바꿔야 할수도 있음

  //const clickedDate = useContext(DateContext);//App이최상위컴포넌트라는가정

  let daysList = [];

  const [games, setGames] = useState([]);

  let today = new Date();
  
  const [yearVar, setYearVar] = useState(today.getFullYear());
  const [monthVar, setMonthVar] = useState(today.getMonth()+1);

  //왼쪽버튼
  const monthMinus = () => {
    if(monthVar === 1){//1월에서 0월이될 수 없음. 년도-1,12월로
      setYearVar(yearVar-1);
      setMonthVar(12);
    }else{
    setMonthVar(monthVar-1);
    }
    console.log("-monthVar:" + monthVar);

  };

  //오른쪽버튼
  const monthPlus = () => {
    if(monthVar === 12){//12월에서 13월 될 수 없음. 년도+1,1월로
      setYearVar(yearVar+1);
      setMonthVar(1);
    }else{
      setMonthVar(monthVar+1);
    }
    console.log("+monthVar:" + monthVar);
   
  };

/*********************** 실시간 달력 월 바뀌게 *********************/

  return (
  
    <div className="mainApp">
      <div className="mainBanner">
      
      <img src='../images/banner-image.jpg'/>
      </div>

      <div className="calendarFrame">
        
        <div className="calendarMonthNav">
          <h4 className="arrowButton" onClick={monthMinus}>
            ◀
          </h4>
          <h3>&nbsp;{monthVar}월&nbsp;</h3>
          <h4 className="arrowButton" onClick={monthPlus}>
            ▶
          </h4>
          </div>
        
        <div className="gameFrame">
          
          <CalendarMonth cmy={yearVar} cmm={monthVar} />

        </div>
        

      </div>
    </div>
   
  );
}

export default MainApp;
