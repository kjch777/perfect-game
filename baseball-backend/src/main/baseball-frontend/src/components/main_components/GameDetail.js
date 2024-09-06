import React, {useEffect, useRef, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import '../../css/GameDetail.css';

const GameDetail = () => {

    const location = useLocation();

    const [homePlayers, setHomePlayers] = useState('');//배열이아니라 '0,17,20' String으로받아옴
    const [awayPlayers, setAwayPlayers] = useState('');

    const [listHomePlayers, setListHomePlayers] = useState([]);
    const [listAwayPlayers, setListAwayPlayers] = useState([]);

    //const nextPlayer = useRef(0);
    
    const [playerInfo, setPlayerInfo] = useState([]);// kia 0번 => 0,곽도규,투수
    const [playerInfoAway, setPlayerInfoAway] = useState([]);// kia 0번 => 0,곽도규,투수

    const loStCode = location.state?.code;//location State
    const loStHome = location.state?.home;
    const loStAway = location.state?.away;

    const [isEditing, setIsEditing] = useState(false);

    //순서1번-경기코드로 라인업문자열받아오기
    const homeLineUp = async() => {

        //console.log('-------1 homeLineUp start-------');
        const res = await axios.get(`/game/home/${loStCode}`);//state->loStCode
        setHomePlayers(res.data);
        //console.log('homePlayers:');
        //console.log(homePlayers);

        //splitLineupNo();//문자열 받아와서 배열로 바꿔서 listHomePlayers에저장
        //함수에서실행되는것 여기로옮김
        //console.log('-------2 splitLineupNo start-------');

        setListHomePlayers(homePlayers.split(','));//homeLineUp버튼 두번눌러야 실행됨.
        
        //console.log('listHomePlayers:');
        //console.log(listHomePlayers);

        //nextPlayer.current += 1;//useRef


    }

    const awayLineUp = async() => {

        const res = await axios.get(`/game/away/${loStCode}`)//state->loStCode
        setAwayPlayers(res.data);

        setListAwayPlayers(awayPlayers.split(','));//homeLineUp버튼 두번눌러야 실행됨.

    }
    
    //순서2번 라인업문자열을 배열로저장
    const splitLineupNo = () => {
        //console.log('-------2 splitLineupNo start-------');
        const arr = homePlayers.split(',');
        setListHomePlayers(arr);
        //console.log(listHomePlayers);

   }

    const homePlayerDetail = async(no) => {
        //console.log('-------homePlayerDetail start-------')
        
        const pathString = `/game/player/home/${loStHome}/${no}`;
        const res = await axios.get(pathString);
        //console.log('res.data===');
        //console.log(res.data);

        const dt = res.data;

        setPlayerInfo(playerInfo => [...playerInfo, dt]);
        //console.log('playerInfo Length : ')
        //console.log(playerInfo.length);
        //console.log('setPlayerInfo Finished.');

        //return playerInfo;//res.data 또는 playerInfo return
    }

    const awayPlayerDetail = async(no) => {
        
        const pathString = `/game/player/away/${loStAway}/${no}`;
        const res = await axios.get(pathString);

        const dt = res.data;

        setPlayerInfoAway(playerInfoAway => [...playerInfoAway, dt]);
    }

    const playerInfosMaker = () => {//listHomePlayers map으로 돌며 playerInfo에저장
        if(playerInfo.length===0){
        listHomePlayers.map((v) => {
            //console.log(v);
            homePlayerDetail(v)
            .catch(err => {return false;});//위의 homePlayerDetail함수사용해서 playerInfo생성
            //nextPlayer.current += 1;//useRef
        })
        //console.log('playerInfo:');
        //console.log(playerInfo);
    }else{
        return false;
    }

    }

    const playerInfosMakerAway = () => {//listHomePlayers map으로 돌며 playerInfo에저장
        if(playerInfoAway.length===0){
            listAwayPlayers.map((v) => {
                awayPlayerDetail(v)
                .catch(err => {/*alert('에러:불러올수없습니다.')*/
                    return false;
                });
            })
        }else{
            //alert('이미생성됨-away');
            return false;
        }

    }

    const handleEditClick = () => {
        setIsEditing(true);
    }

    const [editData, setEditData] = useState(
        {
            pno:"",
            pname:"",
            pposition:""
        }
    );

    
    useEffect(() => {
        
        homeLineUp();
        awayLineUp();

        //playerInfosMaker();
        
        //playerInfosMakerAway();

        //setHomePlayers('');
        //setAwayPlayers('');
        //setListHomePlayers([]);
        //setListAwayPlayers([]);
    },[listHomePlayers.length, playerInfo.length, listAwayPlayers.length, playerInfoAway.length])
    
    return(
        <div className="gameDetailPageContainer">
            
                    <div>
        
        <h1>경기정보</h1>
        <h3>경기코드 : {loStCode}</h3>
        
        <div className="twoTeamDiv">
        <div className="homeDiv">
        
        {/*
        <p>homePlayers(String) : {homePlayers}</p>
        <p>listHomePlayers(Array) : {listHomePlayers}</p>
        */}

        <table className="lineupTable">
            <thead>
                <tr>
                    <th>등번호</th>
                    <th>이름</th>
                    <th>포지션</th>
                </tr>
            </thead>
            <tbody>
                {playerInfo.length>0 && playerInfo.map( (j) => {// 0 17 20에 해당하는선수들json 3번돌것.
                    return(
                    <tr key={j[0].playerBackNo}>
                        <td>{j[0].playerBackNo}</td>
                        <td>{j[0].playerName}</td>
                        <td>{j[0].playerPosition}</td>
                    </tr>
                    )//홈라인업버튼2번,선수정보1번누르면 실행됨
                })}
            </tbody>
        </table>
        <button hidden onClick={()=>homeLineUp()}>2번클릭</button>
        <button  onClick={()=>playerInfosMaker()}>클릭</button>
        {/*<button onClick={handleEditClick}>수정하기</button>*/}
        
        </div>
        
        <h2 className="versusCenter">(홈){loStHome.toString().toUpperCase()} vs {loStAway.toString().toUpperCase()}</h2>
        

        <div className="awayDiv">
        
        {/*
        <p>awaylayers(String) : {awayPlayers}</p>
        <p>listAwayPlayers(Array) : {listAwayPlayers}</p>
        */}
        

        <table className="lineupTable">
            <thead>
                <tr>
                    <th>등번호</th>
                    <th>이름</th>
                    <th>포지션</th>
                </tr>
            </thead>
            <tbody>
                {playerInfoAway.length>0 && playerInfoAway.map( (j) => (// 0 17 20에 해당하는선수들json 3번돌것.
                    <>
                    <tr key={j[0].playerBackNo}>
                        <td>{j[0].playerBackNo}</td>
                        <td>{j[0].playerName}</td>
                        <td>{j[0].playerPosition}</td>
                    </tr>
                    </>
                ))}
            </tbody>
        </table>
        <button hidden onClick={()=>awayLineUp()}>2번클릭</button>
        <button  onClick={()=>playerInfosMakerAway()}>클릭</button>
        
        </div>
        
        </div>
        
        
        </div>
        </div>
    )

}
export default GameDetail;