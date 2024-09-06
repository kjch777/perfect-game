import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import '../../css/BoardGuestbook.css';
import LoginContext from '../../components/Login/LoginContext';

function BoardGuestbook() {
  const { loginMember } = useContext(LoginContext);
  const [board, setBoard] = useState([]);
  const navigate = useNavigate('');



  const boardListAPI = "http:///board/lists";
  const boardUploadAPI = "http:///board/upload";

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
    <> 
      <div className='guestbook-container'>
        <ul>
          <li className='guestbook-item'>
            <div className='guestbook-title'>
              <label>제목</label>
              <input type='text'
                     value={title}
                     onChange={(e) => setTitle(e.target.value)}/>
            </div>

            <div className='guestbook-content'>
              <label>내용</label>
              <textarea value={content}
                        onChange={(e) => setContent(e.target.value)}/>
            </div>

            <div className='guestbook-writer-id'>
              <label>작성자아이디</label>
              <input type="text"
                     value={writerId}
                     readOnly/>
            </div>

            <div className='guestbook-writer-name'>
              <label>작성자</label>
              <input type="text"
                     value={name}
                     readOnly/>
            </div>

            <div className='guestbook-image'>
              <label>이미지선택</label>
              <br/>
              <input multiple
                      type="file"
                      className='img-input'
                      id="a"
                      accept="image.*" 
                      onChange={handleFileChange}/>
            </div>

            <div className='guestbook-image-preview-list'>
                {files.length > 0 && 
                    files.map((file, index) => (
                        <div key={index}  className='guestbook-image-preview'>
                            <img src={URL.createObjectURL(file)} alt='이미지 미리보기'/>
                        </div>
                    ))
                }
            </div>

            <div className='guestbook-select-private'>
              <label>비밀 글 설정</label>
              <input type='checkbox'
                     className='guestbook-select-private-checkbox'
                     checked={selectPrivate === 'Y'}
                     onChange={handleSelectPrivateChange}/>
            </div>

            {selectPrivate === 'Y' && (
              <div className='guestbook-password'>
                <label>비밀번호</label>
                <input type='text'
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}/>
              </div>
            )}

            <button className='guestbook-submit-button'
                    onClick={uploadToJava}>작성하기</button>
          </li>
        </ul>
      </div>


      <div>
        <table className="board-container">
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>작성자</th>
              {/* ******************** */}
              <th>내용</th>
              <th>이미지</th>
              {/* ******************** */}
              <th>작성일자</th>
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
              {/* ******************** */}
              <td className="board-container-boardcontents">
                {b.boardContents}
              </td>
              <td className="images">
                {b.boardImageUrl.split(',').map(image => 
                  <img key={image} src={`http:///images/${image}`}/>
                )}
              </td>
              {/* ******************** */}
              <td  className="board-container-createdat">
                {b.createdAt}
              </td>
              
              {name === b.boardMemberName &&
              <>
                <td className="board-container-modify">
                  <button className="board-container-modify-button"
                          onClick={() => handleModify(b.boardNo)}>
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
                   value={boardToEdit.boardTitle}
                   onChange={(e) => setBoardToEdit({...boardToEdit, boardTitle: e.target.value})} />
          </div>
          <div>
            <label>내용</label>
            <textarea value={boardToEdit.boardContents}
                      onChange={(e) => setBoardToEdit({...boardToEdit, boardContents: e.target.value})} />
          </div>
          <button onClick={handleUpdate}>수정 완료</button>
          <button onClick={cancelEdit}>수정 취소</button>
        </div>
      )}
    </>
  );
}

export default BoardGuestbook;