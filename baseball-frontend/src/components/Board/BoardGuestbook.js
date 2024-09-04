import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import '../../css/BoardGuestbook.css';
import LoginContext from '../../components/Login/LoginContext';
import BoardGuestbookForm from './BoardGuestbookForm';
import BoardGuestbookDetailForm from './BoardGuestbookDetailForm';

function BoardGuestbook() {
  const { loginMember } = useContext(LoginContext);
  const boardListAPI = "http://localhost:9090/board/lists";

  const [writerId, setWriterId] = useState('');
  const [name, setName] = useState('');

  const [board, setBoard] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showDetailForm, setDetailShowForm] = useState(false);
  const [selectedBoardNo, setSelectedBoardNo] = useState(null);
  const [selectedSelectPrivate, setSelectedSelectPrivate] = useState(null);
  const [selectedPassword, setSelectedPassword] = useState(null);
  
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordPrompt, setPasswordPrompt] = useState(false);
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleAddPost = () => {
    setShowForm(true);
    setDetailShowForm(false);
  };

  const handleShowDetailForm = (boardNo, boardPrivate, boardPassword) => {
    setDetailShowForm(false);
    if (boardPrivate === 'Y') {
      alert('비밀 글 입니다. 비밀번호를 입력하세요.');
      setSelectedBoardNo(boardNo);
      setSelectedSelectPrivate(boardPrivate);
      setSelectedPassword(boardPassword);
      setPasswordPrompt(true);
    } else {
      setSelectedBoardNo(boardNo);
      setSelectedSelectPrivate(boardPrivate);
      setSelectedPassword(boardPassword);
      setDetailShowForm(true);
      setShowForm(false);
      setPasswordPrompt(false);
    }
  };

  const handlePasswordSubmit = () => {
    if (passwordInput === selectedPassword) {
      setDetailShowForm(true);
      setPasswordPrompt(false);
      setShowForm(false);
      setPasswordInput('');
    } else {
      alert('비밀번호가 일치하지 않습니다.');
    }
  };

  const getBoard = () => {
    axios.get(boardListAPI)
      .then(response => {
        setBoard(response.data);
      })
      .catch(error => {
        console.error("게시글 목록 가져오기 중 오류 발생:", error);
      });
  };

  useEffect(() => {
    if (loginMember) {
      setWriterId(loginMember.memberId);
      setName(loginMember.memberName);
    }
    getBoard();
  }, [loginMember]);

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

  /* 0903 페이지네이션 */
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = board.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(board.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPageNumbers = () => {
    let pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button className='board-main-pagination'
                key={i}
                onClick={() => handlePageChange(i)}
                style={{
                  color: i === currentPage ? '#8A1A4D' : 'black',
                  fontWeight: i === currentPage ? 'bold' : '',
                }}>
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className='board-guestbook-main-container'>
      <div className='board-main-header'>
        <div className='board-main-header-contents'>
          <h1 className='board-main-h3'>방명록</h1>
          <button className='form-button' onClick={handleAddPost}>
            방명록 작성하기
          </button>
        </div>
        <hr className='board-main-hr'/>
      </div>
      {showForm && 
        <BoardGuestbookForm />
      }
      {passwordPrompt && (
        <div className="password-prompt">
          <input 
            type="password" 
            placeholder="비밀번호 입력" 
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
          />
          <button onClick={handlePasswordSubmit}>확인</button>
          <button onClick={() => setPasswordPrompt(false)}>취소</button>
        </div>
      )}
      {showDetailForm && selectedBoardNo && (
        <BoardGuestbookDetailForm 
          boardNo={selectedBoardNo}
          selectPrivate={selectedSelectPrivate}
          password={selectedPassword}
        />
      )}
      <div>
        <table className="board-container">
          <thead>
            <tr>
              <th className='board-container-no'>
                번호
              </th>
              <th className='board-container-title'>
                제목
              </th>
              <th className='board-container-name'>
                작성자
              </th>
              <th className='board-container-id'>
                아이디
              </th>
              <th className='board-container-createdat'>
                작성일자
              </th>
              <th className='board-container-detail'>
                자세히보기
              </th>
              <th className='board-container-delete'
                  style={{color: "red"}}>
                삭제
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map(b => (
              <tr key={b.boardNo} className="board">
                <td className='board-container-no'>
                  <a href="#"
                     className='board-link'
                     onClick={(e) => {
                        e.preventDefault();
                        handleShowDetailForm(b.boardNo, b.boardPrivate, b.boardPassword);
                      }}>
                    {b.boardNo}
                  </a>
                </td>
                <td className='board-container-title'>
                  <div className='board-private-img-container'>
                    {b.boardPrivate === 'Y' ? 
                      <img src='/board-images/board-locked.png'
                           className='board-private-img'
                           alt="Private"/>
                      : <img src='/board-images/board-unlocked.png'
                             className='board-private-img'
                             alt="Public"/>
                    }
                  </div>
                  <a href="#"
                     className='board-link'
                     onClick={(e) => {
                        e.preventDefault();
                        handleShowDetailForm(b.boardNo, b.boardPrivate, b.boardPassword);
                      }}>
                    {b.boardTitle}
                  </a>
                </td>
                <td className='board-container-name'>
                  {b.boardMemberName}
                </td>
                <td className='board-container-id'>
                  {b.boardMemberId}
                </td>
                <td className='board-container-createdat'>
                  {b.createdAt}
                </td>
                <td className='board-container-detail'>
                  <button className='board-container-detail-button'
                          onClick={() => handleShowDetailForm(b.boardNo, b.boardPrivate, b.boardPassword)}>
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
      <div className="pagination">
        {renderPageNumbers()}
      </div>
    </div>
  );
}

export default BoardGuestbook;
