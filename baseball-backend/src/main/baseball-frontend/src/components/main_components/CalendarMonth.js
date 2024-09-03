import axios from 'axios';
import React, { useState, useContext, useEffect } from "react";//useEffect를 어디에서사용할지.
import { useNavigate } from 'react-router-dom';
import '../../css/CalendarMonth.css';
import Chat from "../chat/Chat";
import LoginContext from '../../components/Login/LoginContext';

const CalendarMonth = ( {cmy, cmm}) => {

  const { loginMember, setLoginMember } = useContext(LoginContext);

  const navigate = useNavigate();

  let daysList = [];

  const [games, setGames] = useState([]);

  const [clickedGameDate, setClickedGameDate] = useState('');
  //const [dateCode, setDateCode] = useState('');//날짜 - 없는 코드버전.

  let yearVar = cmy;
  let monthVar = cmm;
  
  const dayClick = async(d) => {

    const gameDate = `${yearVar}-${String(monthVar).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    

    const res = await axios
    .get(`/game/${gameDate}`);
    
    setGames(res.data);

    setClickedGameDate(gameDate);
    
  }

//날짜별말고 경기테이블 모두볼수있음
/*
  const 모든경기보기 = async() => {
    const res = await axios.get('/game');
    setGames(res.data);
  };
*/

  //경기 하나 클릭하면 동작할 함수
  const gameClick = (gameCode) => {
    alert("gameClick : gameCode="+gameCode);
  }

  const gameDetailClick = (code, home, away) => {
   navigate("/gameDetail", {
    state : {
      code,
      home,
      away}
    });//GameDetail.js의 useLocation
  }

  const gameAddClick = (ymd) => {
    navigate("/gameAddPage", {
      state : {
        ymd
      }
    });
  }

  const gameDeleteClick = async(gameCode) => {
    if(!window.confirm('정말 삭제하시겠습니까?')){
      return false;
    }
    await axios.delete(`/game/${gameCode}`);
    alert('경기삭제완료 : ' + gameCode);
    
  }

  const daysInMonth = [31, -1, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  const febDaysInTheYear = (y) => {
    var febDays = isLeapYear(y) ? 29 : 28;

    return febDays;
  };

  const isLeapYear = (y) => {
    var isLY = y % 4 === 0 && (y % 100 !== 0 || y % 400 === 0);
    return isLY;
  };

  const allDaysBeforeTheYear = (y) => {
    var days = 0;

    for (var i = 1; i < y; i++) {
      if (isLeapYear(i)) {
        days += 366;
      } else {
        days += 365;
      }
    }
    return days;
  };

  const theYearPastDays = (y, m, day) => {
    var pastDays;
    // ↓↓↓ i can provide a simple code example later ↓↓↓
    var febDays = febDaysInTheYear(y);
    switch (m) {
      case 0:
        pastDays = day;
        break;
      case 1:
        pastDays = 31 + day;
        break;
      case 2:
        pastDays = 31 + febDays + day;
        break;
      case 3:
        pastDays = 62 + febDays + day;
        break;
      case 4:
        pastDays = 92 + febDays + day;
        break;
      case 5:
        pastDays = 123 + febDays + day;
        break;
      case 6:
        pastDays = 153 + febDays + day;
        break;
      case 7:
        pastDays = 184 + febDays + day;
        break;
      case 8:
        pastDays = 215 + febDays + day;
        break;
      case 9:
        pastDays = 245 + febDays + day;
        break;
      case 10:
        pastDays = 276 + febDays + day;
        break;
      case 11:
        pastDays = 306 + febDays + day;
        break;
      default:
        pastDays = -1;
    }
    return pastDays;
  };

  const dayOfTheWeek = (y, m, day) => {
    var allDays = allDaysBeforeTheYear(y) + theYearPastDays(y, m, day);
    var remain = allDays % 7;

    return remain;
  }  

  const calendarArrayMake = (year, month) => {

    let monthDaysArr = new Array(6);

  for(let i = 0; i < monthDaysArr.length; i++){
      monthDaysArr[i] = new Array(7);
  }

  for(let i = 0; i < monthDaysArr.length; i++){
    for(let j = 0; j < monthDaysArr[i].length; j++){
      monthDaysArr[i][j] = 0;//초기화
    }
  }

    var day = 1;
    var firstDOW = dayOfTheWeek(year, month, 1);

    for(let j = firstDOW; j < monthDaysArr[0].length; j++){
        monthDaysArr[0][j] = day++;
    }

    for(let i = 1; i < monthDaysArr.length; i++){
        for(let j = 0; j < monthDaysArr[i].length; j++){
            monthDaysArr[i][j] = day++;
        }
    }

    if(month === 1){//2월
        for(let i = 0; i < monthDaysArr.length; i++){
            for(let j = 0; j < monthDaysArr[i].length; j++){
                if(monthDaysArr[i][j] > febDaysInTheYear(year)){
                    monthDaysArr[i][j] = 0;
                }
            }
        }
    }else{
        for(let i = 0; i < monthDaysArr.length; i++){
            for(let j = 0; j < monthDaysArr[i].length; j++){
                if(monthDaysArr[i][j] > daysInMonth[month]){
                    monthDaysArr[i][j] = 0;
                }
            }
        }
    }
    
    
    for(let i = 0; i < daysList.length; i++){
        for(let j = 0; j < daysList[i].length; j++){
            
                console.log('days : %d', daysList[i][j]);
            
        }

    }
        
    //

    return(
      monthDaysArr
    );
  }

  useEffect(() => {
    const curMember = localStorage.getItem('loginMember');
    if (curMember) {
      setLoginMember(JSON.parse(curMember));
    }
  }, [setLoginMember]);

  return(
    <div className='calendarMonthContainer'>
      <div className='calendarTableDiv'>
      <div className='calendarGameDiv'>
        <h2>{clickedGameDate} 경기일정</h2>

        <table className='gameTable'>
          <thead>
            <tr>
              <th>코드</th>
              <th>승리팀</th>
              {/*<th>경기날짜</th>*/}
              <th>홈팀</th>
              <th>원정팀</th>
              <th>구장</th>
              <th>라인업</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {games.map((game)=>(
              <tr key={game.gameCode}>
              <td className='gameCodeArea' onClick={()=>gameClick(game.gameCode)}>{game.gameCode}</td>
              <td>{game.gameWinnerTeamName}</td>
              {/*<td>{game.gameDate}</td>*/}
              <td>{game.gameTeamNameHome}</td>
              <td>{game.gameTeamNameAway}</td>
              
              <td>{game.gamePlaygroundId}</td>
              <td><button 
                onClick={() => 
                gameDetailClick(game.gameCode, game.gameTeamNameHome, game.gameTeamNameAway)}
                >
                자세히
                </button></td>
                {/*삭제는로그인세션추가할것*/}
              <td>
                {loginMember!==null && loginMember.memberId ==='admin' &&
                <button 
                className='deleteButton' 
                onClick={() => gameDeleteClick(game.gameCode)}
                >삭제
                </button>
                }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {clickedGameDate && loginMember!==null && loginMember.memberId ==='admin' &&
        <button className='gameAddButton' 
          onClick={() => gameAddClick(clickedGameDate)}
        >{clickedGameDate}경기추가</button>}
      </div>
        <div className='ctd_tableDiv'>
        <table className='calendarTable'>
          <thead>
            <tr>
              <th>일</th>
              <th>월</th>
              <th>화</th>
              <th>수</th>
              <th>목</th>
              <th>금</th>
              <th>토</th>
            </tr>
          </thead>
          <tbody>
            {calendarArrayMake(cmy, cmm-1).map((v,i) => (
              <tr>
                {v.map( (d,j) => (
                  <td onClick={() => dayClick(d)}>{d>0 ? d : ''}</td>
                  ))}
              </tr>
              ))}
          </tbody>
        </table>
        </div>
{/*
        <div className='calendarCenterDiv'>
          <img src='../../images/mainapp/stadium-1118445_1280.jpg' />
        </div>
        */}

        <div className='calendarSideDiv'>
          <Chat/>
        </div>

      </div>

      
    </div>
  );
};
export default CalendarMonth;
