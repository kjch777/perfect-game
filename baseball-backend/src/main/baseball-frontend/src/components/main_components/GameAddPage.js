import React, {useEffect, useRef, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Select from 'react-select';
import '../../css/GameAddPage.css';

const GameAddPage = () => {

    const navigate = useNavigate();

    const [codeNo, setCodeNo] = useState('');
    const [gameCode, setGameCode] = useState('');
    
    const [gameTeamNameHome, setGameTeamNameHome] = useState('');
    const [gameTeamNameAway, setGameTeamNameAway] = useState('');
    const [gamePlayerListHome, setGamePlayerListHome] = useState('');
    const [gamePlayerListAway, setGamePlayerListAway] = useState('');
    const [gamePlaygroundId, setGamePlaygroundId] = useState();

    const [allPlayersHome, setAllPlayersHome] = useState([]);
    const [allPlayersAway, setAllPlayersAway] = useState([]);

    const [playerTeamNameHome, setPlayerTeamNameHome] = useState('');
    const [playerTeamNameAway, setPlayerTeamNameAway] = useState('');

    const [checkedHomePlayers, setCheckedHomePlayers] = useState([]);
    const [checkedAwayPlayers, setCheckedAwayPlayers] = useState([]);

    const [showList, setShowList] = useState(true);
    const [tableStyle, setTableStyle] = useState(null);

    const [toggleButtonText, setToggleButtonText] = useState('숨기기');

    const handlePlayersCheckHome = (e, item) => {
        const isChecked = e.target.checked;
        setCheckedHomePlayers((prev) => {
            if(isChecked){
                return [...prev, parseInt(item.playerBackNo)];
            }else{
                //console.log('prev',prev);
                return prev.filter((n) => n !== parseInt(item.playerBackNo));
            }
        });
        console.log(checkedHomePlayers);
    }

    const handleStringHome = () => {
        setGamePlayerListHome(checkedHomePlayers.toString());

    }

    const handlePlayersCheckAway = (e, item) => {
        const isChecked = e.target.checked;
        setCheckedAwayPlayers((prev) => {
            if(isChecked){
                return [...prev, parseInt(item.playerBackNo)];
            }else{
                return prev.filter((playerBackNo) => playerBackNo !== parseInt(item.playerBackNo));
            }
        });
        console.log(checkedAwayPlayers);
    }

    const handleStringAway = () => {
        setGamePlayerListAway(checkedAwayPlayers.toString());

    }
    

    const options = [
        {value:'kia', label:'kia'},
        {value:'lg', label:'lg'},
        {value:'samsung', label:'samsung'},
        {value:'kt', label:'kt'},
        {value:'ssg', label:'ssg'},
        {value:'doosan', label:'doosan'},
        {value:'nc', label:'nc'},
        {value:'lotte', label:'lotte'},
        {value:'hanwha', label:'hanwha'},
        {value:'kiwoom', label:'kiwoom'}
    ]
    const [selectedHome, setSelectedHome] = useState(null);
    const [selectedAway, setSelectedAway] = useState(null);

    const handleHomeChange = (o) =>{
        setSelectedHome(o);
    }
    const handleAwayChange = (o) =>{
        setSelectedAway(o);
    }

    const handleHomeOption = async() => {
        if(selectedHome===null){
            alert("홈팀을선택하세요");
            return false;
        }
        setPlayerTeamNameHome(selectedHome.value);
        setGameTeamNameHome(selectedHome.value);
        const res = await axios.get(`/game/player/${selectedHome.value}`);
        setAllPlayersHome(res.data);
    }

    const handleAwayOption = async() => {
        if(selectedAway===null){
            alert("원정팀을선택하세요");
            return false;
        }
        setPlayerTeamNameAway(selectedAway.value);
        setGameTeamNameAway(selectedAway.value);
        const res = await axios.get(`/game/player/${selectedAway.value}`);
        setAllPlayersAway(res.data);
    }

    const location = useLocation();

    const loStYmd = location.state?.ymd;//CalendarMonth에서 24-08-01 형식 ymd가져옴
    const gameDate = loStYmd;

    const dateNoHyphen = loStYmd?.replace(/-/g,"");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('handleSubmit Start');
        //setGameCode(dateNoHyphen + codeNo);//여기서작동안되는거같음
        console.log(gameCode);
        addGame({gameCode, 
            gameDate,
            gameTeamNameHome, 
            gameTeamNameAway, 
            gamePlayerListHome, 
            gamePlayerListAway, 
            gamePlaygroundId})
            .catch(err=>console.log(err));
            /*alert('handleSubmit finish');*/
            navigate('/');

    }

    const addGame = async(game) => {
        const res = await axios.post('/game/add', game);
        alert('경기등록 성공');

    }

    const hideList = () => {
        showList ? setShowList(false) : setShowList(true);
        

    }
/*
    useEffect(()=>{

        allPlayersHome.map(v =>{
            console.log(v);
        })
    },[allPlayersHome])
    */

    useEffect(()=>{
        setTableStyle( showList ? null : { display: "none"});
        setToggleButtonText( showList ? '숨기기' : '펼치기')
    },[showList])

    return(
        <div className="gameAddPageContainer">
            <h1>경기등록</h1>
            <form onSubmit={handleSubmit}>
                <div className="gameAddParts">
                    <label className="inputLabel">경기날짜 :&nbsp;</label><br/>
                    <input
                    className="inputDate"
                    type="text"
                    value={loStYmd}
                    required
                    />    
                </div>
                <div className="gameAddParts">
                    <label className="inputLabel">경기번호 :&nbsp;</label><br/>
                    <input type="text"
                    value={codeNo}
                    onChange={(e) => setCodeNo(e.target.value)
                    }
                    required
                    />
                    
                </div>

                <div className="gameAddParts">
                    <label className="inputLabel">구장번호 :&nbsp;</label><br/>
                    <input type="number"
                    value={gamePlaygroundId}
                    onChange={(e) => setGamePlaygroundId(e.target.value)}
                    required
                    />
                </div>

                <div className="gameAddParts">
                    <label className="inputLabel">Home :&nbsp;</label><br/>
                    <Select
                        className="selectBox"
                        options={options}
                        onChange={handleHomeChange}
                    />
                    <label>
                        <button type="button"
                        onClick={()=>handleHomeOption()}>선수불러오기</button>
                    </label>
                </div>
                <div className="gameAddParts">
                    <label className="inputLabel">Away :&nbsp;</label><br/>
                    <Select
                        className="selectBox"
                        options={options}
                        onChange={handleAwayChange}
                    />
                    <label>
                        <button type="button"
                        onClick={()=>handleAwayOption()}>선수불러오기</button>
                    </label>
                </div>
                
                <button 
                    id="lineupToggleButton"
                    type="button" 
                    onClick={hideList}>{toggleButtonText}</button>
                <div className="gameAddParts allPlayersHomeAway">
                    <div className="allPlayers">
                    
                    <br/>
                    {allPlayersHome &&
                    <table style={tableStyle} className="lineUpCheckTable">
                        <thead>
                            <th>체크</th>
                            <th>등번호</th>
                            <th>이름</th>
                            <th>포지션</th>
                        </thead>
                        <tbody>
                            {allPlayersHome.map(v => {
                        return(
                                    <tr className={checkedHomePlayers.includes(v.playerBackNo)?
                                        "select":""} 
                                    key={v.playerBackNo}
                                    >
                                        <td className="playerCheckBoxTd"><input 
                                        type="checkbox"
                                        onChange={(e)=>handlePlayersCheckHome(e, v)}/></td>
                                        <td>{v.playerBackNo}</td>
                                        <td>{v.playerName}</td>
                                        <td>{v.playerPosition}</td>
                                    </tr>
                        )
                    })}
                        </tbody>
                    </table>
                        
                    }
                    
                    <button type="button" onClick={()=>handleStringHome()}>홈라인업확정하기</button>
                    <p>{gamePlayerListHome}</p>
                    </div>
                    <div className="allPlayers">
                    <br/>
                    {allPlayersAway &&
                    <table style={tableStyle} className="lineUpCheckTable">
                    <thead>
                        <th>체크</th>
                        <th>등번호</th>
                        <th>이름</th>
                        <th>포지션</th>
                    </thead>
                    <tbody>
                        {allPlayersAway.map(v => {
                        return(
                                    <tr className={checkedAwayPlayers.includes(v.playerBackNo)?
                                        "select":""} 
                                    key={v.playerBackNo}
                                    >
                                        <td className="playerCheckBoxTd"><input
                                        type="checkbox"
                                        id="labelBox"
                                        onChange={(e)=>handlePlayersCheckAway(e, v)}/></td>
                                        <td>{v.playerBackNo}</td>
                                        <td>{v.playerName}</td>
                                        <td>{v.playerPosition}</td>
                                    </tr> 
                        )
                    })}
                    </tbody>
                </table> 
                    }
                    <button type="button" onClick={()=>handleStringAway()}>원정라인업확정하기</button>
                    <p>{gamePlayerListAway}</p>
                    </div>
                    
                </div>
                
                <button hidden type="submit">경기추가하기</button>
                <button className="gameAddButtonSubmit" onClick={()=>setGameCode(dateNoHyphen+codeNo)}>등록하기</button>
            </form>
        </div>
    )

}
export default GameAddPage;