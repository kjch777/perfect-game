import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../css/BoardGuestbookDetailForm.css';

function BoardGuestbookDetailForm({ boardNo }) {
    const [boardList, setBoardList] = useState([]); // 게시글 리스트
    const [selectedBoard, setSelectedBoard] = useState(null); // 선택된 게시글

    useEffect(() => {
        axios.get(`http://localhost:9090/board/lists?boardNo=${encodeURIComponent(boardNo)}`)
            .then(response => {
                setBoardList(response.data);
            })
            .catch(error => {
                console.error("게시글 목록 가져오기 중 오류 발생:", error);
            });
    }, [boardNo]);

    useEffect(() => {
        if (boardList.length > 0) {
            const board = boardList.find(b => b.boardNo === boardNo);
            setSelectedBoard(board);
        }
    }, [boardList, boardNo]);

    if (!selectedBoard) {
        return <div>게시글을 로딩 중입니다...</div>;
    }

    const handleRefresh = () => {
        window.location.reload();
    }

    return (
        <div className='guestbook-detail-container'>
            <button className='hide-detail-button'
                    onClick={handleRefresh}>
                &times;
            </button>
            <div>
                <label>번호 : </label>
                <div>{selectedBoard.boardNo}</div>
            </div>
            <div>
                <label>제목 : </label>
                <div>{selectedBoard.boardTitle}</div>
            </div>
            <div>
                <label>작성자 : </label>
                <div>{selectedBoard.boardMemberName}</div>
            </div>
            <div>
                <label>내용 : </label>
                <div>{selectedBoard.boardContents}</div>
            </div>
            <div className='guestbook-detail-image-list'>
                <label>이미지 : </label>
                <div className="images">
                    {selectedBoard.boardImageUrl.split(',').map(image => 
                        <img key={image} src={`http://localhost:9090/images/${image}`}/>
                    )}
                </div>
            </div>
        </div>
    );
}

export default BoardGuestbookDetailForm;
