import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import '../../css/BoardGuestbook.css';
import LoginContext from '../../components/Login/LoginContext';
import BoardGuestbookForm from './BoardGuestbookForm';
import BoardGuestbookDetailForm from './BoardGuestbookDetailForm';

function BoardGuestbook() {
  const { loginMember } = useContext(LoginContext);
  const boardListAPI = "http://localhost:9090/board/lists";

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [writerId, setWriterId] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [selectPrivate, setSelectPrivate] = useState('N');
  const [files, setFiles] = useState([]);

  const [board, setBoard] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [boardToEdit, setBoardToEdit] = useState(null); // 수정할 게시글의 상태 추가
  const [showForm, setShowForm] = useState(false);
  const [showDetailForm, setDetailShowForm] = useState(false);
  const [selectedBoardNo, setSelectedBoardNo] = useState(null);

  /* 방명록 작성하기 버튼 클릭 시 폼 토글 */
  const handleAddPost = () => {
    setShowForm(true);
  }

  /* 자세히보기 버튼 클릭 시 게시글 세부정보 표시 */
  const handleShowDetailForm = (boardNo) => {
    setSelectedBoardNo(boardNo);
    setDetailShowForm(true);
  }

  /* 게시글 보기 */
  const getBoard = () => {
    axios.get(boardListAPI)
    .then(response => {
        setBoard(response.data);
    })
    .catch(error => {
      console.error("게시글 목록 가져오기 중 오류 발생:", error);
    });
  }

  useEffect(() => {
    if (loginMember) {
      setWriterId(loginMember.memberId);
      setName(loginMember.memberName);
    }
    getBoard();
  }, [loginMember]);

  /***** 0828 게시글 수정 *****/
  const openModal = () => {
    setIsModalOpen(true);
  }
  const closeModal = () => {
    setIsModalOpen(false);
  }

  /* 수정버튼 */
  const handleModify = (board) => {
    setBoardToEdit(board); // 수정할 게시글 상태 설정
    setTitle(board.boardTitle);
    setContent(board.boardContents);
  }

  /* 수정완료버튼 */
  const handleUpdate = async () => {
    try {
      if (!boardToEdit || !boardToEdit.boardNo) {
        throw new Error('수정할 게시글 정보를 찾을 수 없습니다.');
      }

      const updatedBoard = {
        ...boardToEdit,
        boardTitle: title, // 제목 업데이트
        boardContents: content // 내용 업데이트
      };

      await axios.put(`/board/lists/${updatedBoard.boardNo}`, updatedBoard, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      alert('게시글이 수정되었습니다.');
      getBoard();
      setBoardToEdit(null);
    } catch (error) {
      console.error("게시글 수정 중 오류 발생:", error);
    }
  };

  /* 수정취소버튼 */
  const cancelEdit = () => {
    setBoardToEdit(null); // 수정 취소할 때 상태 초기화
  }
  /***** ***** ***** ***** ***** *****/

  /***** 0828 게시글 삭제 *****/
  const handleDelete = async (boardNo) => {
    try {
      if (typeof boardNo !== 'number') {
        throw new Error('유효하지 않은 boardNo');
      }
  
      await axios.delete(`/board/lists?boardNo=${encodeURIComponent(boardNo)}`);
      setBoard(board.filter(b => b.boardNo !== boardNo));
    } catch (error) {
      console.error("게시글 삭제 중 오류 발생:", error);
    }
  };
  /***** ***** ***** ***** ***** *****/

  return (
    <>
      <button className='form-button' onClick={handleAddPost}>
        방명록 작성하기
      </button>
      {showForm && <BoardGuestbookForm />}
      {showDetailForm && selectedBoardNo && (
        <BoardGuestbookDetailForm boardNo={selectedBoardNo} />
      )}
      <div>
        <table className="board-container">
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>작성자</th>
              <th>작성일자</th>
              <th>자세히보기</th>
              <th style={{color: "orange"}}>수정</th>
              <th style={{color: "red"}}>삭제</th>
            </tr>
          </thead>
          <tbody>
            {board.map(b => (
              <tr key={b.boardNo} className="board">
                <td>{b.boardNo}</td>
                <td>{b.boardTitle}</td>
                <td>{b.boardMemberName}</td>
                <td className="board-container-createdat">
                  {b.createdAt}
                </td>
                <td>
                <button onClick={() => handleShowDetailForm(b.boardNo)}>
                  자세히보기
                </button>
                  </td>
                
                {name === b.boardMemberName &&
                <>
                  <td className="board-container-modify">
                    <button className="board-container-modify-button"
                            onClick={() => handleModify(b)}>
                      수정
                    </button>
                  </td>
                  <td className="board-container-delete">
                    <button className="board-container-delete-button"
                            onClick={() => handleDelete(b.boardNo)}>
                      삭제
                    </button>
                  </td>
                </>
                }
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 수정 폼 표시: 현재 수정 중인 게시글만 표시 */}
      {boardToEdit && (
        <div className='edit-form'>
          <h3>게시글 수정</h3>
          <div>
            <label>제목</label>
            <input type='text'
                   value={title}
                   onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div>
            <label>내용</label>
            <textarea value={content}
                      onChange={(e) => setContent(e.target.value)} />
          </div>
          <button onClick={handleUpdate}>수정 완료</button>
          <button onClick={cancelEdit}>수정 취소</button>
        </div>
      )}
    </>
  );
}

export default BoardGuestbook;
