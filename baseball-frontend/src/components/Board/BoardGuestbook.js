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

  const [boardToEdit, setBoardToEdit] = useState(null);
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
  /* 수정버튼 */
  const handleModify = (board) => {
    setBoardToEdit(board); // 수정할 게시글 상태 설정
    setTitle(board.boardTitle);
    setContent(board.boardContents);
  }

  /***** 0828 게시글 삭제 *****/
  const handleDelete = async (boardNo) => {
    try {
      if (typeof boardNo !== 'number') {
        throw new Error('유효하지 않은 boardNo');
      }
  
      await axios.delete(`/board/lists?boardNo=${encodeURIComponent(boardNo)}`);
      alert('게시글이 삭제되었습니다.');
      setBoard(board.filter(b => b.boardNo !== boardNo));
    } catch (error) {
      console.error("게시글 삭제 중 오류 발생:", error);
    }
  };
  /***** ***** ***** ***** ***** *****/

  return (
    <div className='board-guestbook-main-container'>
      <div className='board-main-header'>
            {/*<h1 className='board-main-h0'>게시판</h1>
            <h1 className='board-main-h1'>공지사항</h1>
            <h1 className='board-main-h2'>구단별 소개</h1>
            <h1 className='board-main-h4'>규정, 자료실</h1>*/}
            <h1 className='board-main-h3'>방명록</h1>
            <hr className='board-main-hr'/>
      </div>
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
              <th>아이디</th>
              <th>작성일자</th>
              <th>자세히보기</th>
              <th style={{color: "red"}}>삭제</th>
            </tr>
          </thead>
          <tbody>
            {board.map(b => (
              <tr key={b.boardNo} className="board">
                <td>{b.boardNo}</td>
                <td>{b.boardTitle}</td>
                <td>{b.boardMemberName}</td>
                <td>{b.boardMemberId}</td>
                <td className="board-container-createdat">
                  {b.createdAt}
                </td>
                <td>
                <button onClick={() => handleShowDetailForm(b.boardNo)}>
                  자세히보기
                </button>
                  </td>
                
                {writerId === b.boardMemberId &&
                <>
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
    </div>
  );
}

export default BoardGuestbook;
