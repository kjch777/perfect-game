import React, {useEffect} from "react";
import '../../css/CalendarTable.css';

const CalendarTable = ({ games }) => {
  //const [gamesToday, setGamesToday] = useState([]);//games는 이미 Month.js에정의돼있음

  /*
  let tYear;
  let tMonth;

  let today = new Date();
  let presentYear = today.getFullYear();
  let presentMonth = today.getMonth()+1;

  tMonth = presentMonth;
  */

  return (
    <div>
      <div className="calendarFrame">
      {/* 달력 월조절 좌우방향버튼, 달력 표 CalendarMonth.js return부분으로이동*/}
      </div>
      {/* 달력 날짜 클릭시 경기일정 나오는 표 CalendarMonth.js return부분으로이동*/}

    </div>
    
  );
};
export default CalendarTable;