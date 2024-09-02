import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import '../../css/BoardGuestbook.css';
import LoginContext from '../../components/Login/LoginContext';

function BoardGuestbook() {
  const { loginMember, setLoginMember } = useContext(LoginContext);
  const boardListAPI = "http://localhost:9090/board/lists";
  const boardUploadAPI = "http://localhost:9090/board/upload";

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [name, setName] = useState('');

  const [files, setFiles] = useState([]);
  const [board, setBoard] = useState([]);

  const uploadToJava = () => {
    const formData = new FormData();

    Array.from(files).forEach((file) => {
      formData.append("files", file);
    });

    formData.append("title", title);
    formData.append("content", content);
    formData.append("name", name);

    axios.post(boardUploadAPI, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    alert("게시글 작성 완료!");
    getBoard();
  }

  const getBoard = () => {
    axios.get(boardListAPI)
    .then(response => {
        setBoard(response.data);
        console.log(response.data);
    })
  }

  useEffect(() => {
    if (loginMember) {
      setName(loginMember.memberName);
    }
    getBoard();
  }, [loginMember]);

    //이미지 파일 여러 개 입력 시 files를 배열을 변화
    const handleFileChange = (e) => {
      const fileList = Array.from(e.target.files);
      setFiles(fileList);
    };
    

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

            <div className='guestbook-writer'>
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
              <th>내용</th>
              <th>이미지</th>
              <th>작성일자</th>
            </tr>
          </thead>
          <tbody>
            {board.map(b => (
            <tr key={b.boardNo} className="board">
              <td>{b.boardNo}</td>
              <td>{b.boardTitle}</td>
              <td>{b.boardMemberName}</td>
              <td>{b.boardContents}</td>
              <td className="images">
                {b.boardImageUrl.split(',').map(image => 
                  <img key={image} src={`http://localhost:9090/images/${image}`}/>
                )}
              </td>
              <td>{b.createdAt}</td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default BoardGuestbook;