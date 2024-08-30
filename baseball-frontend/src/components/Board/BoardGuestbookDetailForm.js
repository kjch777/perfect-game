import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import '../../css/BoardGuestbookDetailForm.css';
import LoginContext from '../../components/Login/LoginContext';
import BoardModal from './BoardModal'; // 모달 컴포넌트 임포트
import BoardGuestbookEditForm from './BoardGuestbookEditForm'; // 수정 폼 컴포넌트 임포트

function BoardGuestbookDetailForm({ boardNo }) {
    const { loginMember } = useContext(LoginContext);
    const [boardList, setBoardList] = useState([]); // 게시글 리스트
    const [selectedBoard, setSelectedBoard] = useState(null); // 선택된 게시글
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태
    const [boardToEdit, setBoardToEdit] = useState(null); // 수정할 게시글
    const [name, setName] = useState('');
    const [writerId, setWriterId] = useState('');

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

    useEffect(() => {
        if (loginMember) {
            setWriterId(loginMember.memberId);
            setName(loginMember.memberName);
        }
    }, [loginMember]);

    const handleRefresh = () => {
        window.location.reload();
    }

    const handleModify = (board) => {
        setBoardToEdit(board);
        setIsModalOpen(true);
    }

    const handleDelete = async (boardNo) => {
        try {
            if (typeof boardNo !== 'number') {
                throw new Error('유효하지 않은 boardNo');
            }
    
            await axios.delete(`http://localhost:9090/board/lists?boardNo=${encodeURIComponent(boardNo)}`);
            setBoardList(boardList.filter(b => b.boardNo !== boardNo));
            setSelectedBoard(null);
            window.location.reload();
        } catch (error) {
            console.error("게시글 삭제 중 오류 발생:", error);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false); // 모달 닫기
        setBoardToEdit(null); // 모달 닫을 때 수정 상태 초기화
    }

    if (!selectedBoard) {
        return <div>게시글을 로딩 중입니다...</div>;
    }

    return (
        <div className='guestbook-detail-container'>
            <button className='hide-detail-button' onClick={handleRefresh}>
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
                <label>작성자 아이디 : </label>
                <div>{selectedBoard.boardMemberId}</div>
            </div>
            <div>
                <label>내용 : </label>
                <div>{selectedBoard.boardContents}</div>
            </div>
            <div className='guestbook-detail-image-list'>
                <label>이미지 : </label>
                <div className="images">
                    {selectedBoard.boardImageUrl.split(',').map(image => 
                        <img key={image} src={`http://localhost:9090/images/${image}`} alt="" />
                    )}
                </div>
            </div>
            {writerId === selectedBoard.boardMemberId && (
                <div className="board-container-actions">
                    <button className="board-container-modify-button" onClick={() => handleModify(selectedBoard)}>
                        수정
                    </button>
                    <button className="board-container-delete-button" onClick={() => handleDelete(selectedBoard.boardNo)}>
                        삭제
                    </button>
                </div>
            )}
            {isModalOpen && (
                <BoardModal isOpen={isModalOpen} onClose={closeModal}>
                    {boardToEdit && (
                        <BoardGuestbookEditForm
                            boardToEdit={boardToEdit}
                            closeModal={closeModal}
                            setBoardList={setBoardList} // 수정 후 게시글 목록 업데이트
                        />
                    )}
                </BoardModal>
            )}
        </div>
    );
}

export default BoardGuestbookDetailForm;
