import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import '../../css/BoardGuestbook.css';
import LoginContext from '../../components/Login/LoginContext';

function BoardGuestbook() {
  const { loginMember } = useContext(LoginContext);
  const [board, setBoard] = useState([]);
  const navigate = useNavigate('');



  const boardListAPI = "/board/lists";
  const boardUploadAPI = "/board/upload";

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [writerId, setWriterId] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [selectPrivate, setSelectPrivate] = useState('N');

  const [files, setFiles] = useState([]);



  const uploadToJava = () => {
    const formData = new FormData();

    Array.from(files).forEach((file) => {
      formData.append("files", file);
    });

    formData.append("title", title);
    formData.append("content", content);
    formData.append("writerId", writerId);
    formData.append("name", name);
    formData.append("password", password);
    formData.append("selectPrivate", selectPrivate);

    axios.post(boardUploadAPI, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(() => {
      alert("게시글 작성 완료!");
      getBoard();
    }).catch(error => {
      console.error("게시글 작성 중 오류 발생:", error);
    });
  }

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

  //이미지 파일 여러 개 입력 시 files를 배열을 변화
  const handleFileChange = (e) => {
    const fileList = Array.from(e.target.files);
    setFiles(fileList);
  };
  
  /*************************/
  /* 0828 비밀번호 설정 추가하기 */
  const handleSelectPrivateChange = (e) => {
    setSelectPrivate(e.target.checked ? 'Y' : 'N');
  }

  /* 0827 삭제버튼 추가하기 */
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


  /*************************/

  return (

    <div>
      <table className="board-container">
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일자</th>
            <th>상세보기</th>
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
            <button className='detail-button'
                    onClick={() => navigate(`/board/${b.boardNo}`)}>
              상세보기
            </button>
            {name === b.boardMemberName &&
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
  );
}

export default BoardGuestbook;