import React, {useEffect, useRef, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import '../../css/GameEdit.css';

const GameEdit = () => {

    const navigate = useNavigate();
    //const {locEditCode} = useParams();

    const location = useLocation();

    const locEditCode = location.state?.code;

    const [game, setGame] = useState(null);

    const [editData, setEditData] = useState(
        {
            gameCode:"",
	        gameWinnerTeamName:"",
	        gameDate:"",
	        gameTeamNameHome:"",
	        gameTeamNameAway:"",
	        gamePlayerListHome:"",
	        gamePlayerListAway:"",
	        gamePlaygroundId:""
        }
    );

    const [isEditing, setIsEditing] = useState(false);

    const gameInfoPut = () => {
        console.log(editData);
        axios.put(`/game/edit/${locEditCode}`, editData)
        .then(response => {
            setGame(response.data);
            setIsEditing(false);
        })
        .catch(error => {
            console.error('수정기능 문제발생');
        })

    }

    const handleEditGame = () => {
        setIsEditing(true);
    }

    useEffect(() => {
        axios.get(`/game/one/${locEditCode}`)
        .then(response => {
            setGame(response.data);
            setEditData(
                {
                    gameCode: response.data.gameCode,
                    gameWinnerTeamName: response.data.gameWinnerTeamName,
                    gameDate: response.data.gameDate,
                    gameTeamNameHome: response.data.gameTeamNameHome,
                    gameTeamNameAway: response.data.gameTeamNameAway,
                    gamePlayerListHome: response.data.gamePlayerListHome,
                    gamePlayerListAway: response.data.gamePlayerListAway,
                    gamePlaygroundId: response.data.gamePlaygroundId

                }
            );
        })
        .catch(e => alert('불러오는데 문제가 발생했습니다.'));
    },[])

    if(!game){
        return(
            <div>
                로딩중...
            </div>
        )
    }

    return(
        <div className="game-edit-container">
        {
            isEditing ? (
                <div className="gameInfo">
                    <input type="text" name="gameCode" value={editData.gameCode}
                    /><br/>

                    <label>승리팀:<input type="text" name="gameWinnerTeamName" value={editData.gameWinnerTeamName}
                    onChange={(e) => setEditData({...editData, gameWinnerTeamName:e.target.value})}/>
                    </label><br/>
{/*
                    <input type="text" name="gameDate" value={editData.gameDate}
                    onChange={(e) => setEditData({...editData, gameDate:e.target.value})}/><br/>
*/}
                    <label>Home :<input type="text" name="gameTeamNameHome" value={editData.gameTeamNameHome}
                    onChange={(e) => setEditData({...editData, gameTeamNameHome:e.target.value})}/>
                    </label><br/>

                    <label>Away :<input type="text" name="gameTeamNameAway" value={editData.gameTeamNameAway}
                    onChange={(e) => setEditData({...editData, gameTeamNameAway:e.target.value})}/>
                    </label><br/>
{/*
                    <input type="text" name="gamePlayerListHome" value={editData.gamePlayerListHome}
                    onChange={(e) => setEditData({...editData, gamePlayerListHome:e.target.value})}/><br/>

                    <input type="text" name="gamePlayerListAway" value={editData.gamePlayerListAway}
                    onChange={(e) => setEditData({...editData, gamePlayerListAway:e.target.value})}/><br/>

                    <input type="text" name="gamePlaygroundId" value={editData.gamePlaygroundId}
                    onChange={(e) => setEditData({...editData, gamePlaygroundId:e.target.value})}/><br/>
*/}


                    <button onClick={gameInfoPut}>수정완료</button>
                </div>
            ):(
                <div className="gameInfo">
                    <label>경기코드 : {game.gameCode} </label><br/>
                    <label>승리팀 : {game.gameWinnerTeamName}</label><br/>
                    <label>경기날짜 : {game.gameDate}</label><br/>
                    <label>Home : {game.gameTeamNameHome}</label><br/>
                    <label>Away : {game.gameTeamNameAway}</label><br/>
                    <label>홈라인업 : {game.gamePlayerListHome}</label><br/>
                    <label>원정라인업 : {game.gamePlayerListAway}</label><br/>
                    <label>구장번호 : {game.gamePlaygroundId}</label><br/>
                    <button onClick={handleEditGame}>수정하기</button>
                </div>
            )
        }
        </div>
    )

}
export default GameEdit;