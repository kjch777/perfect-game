import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Board.css';

function Board() {
  const boardListAPI = "http://localhost:9090/board/lists";
  const boardUploadAPI = "http://localhost:9090/board/upload";

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState([]);
  const [board, setBoard] = useState([]);

  const uploadToJava = () => {
    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append("files", file);
    });
    formData.append("title", title);
    formData.append("content", content);

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
    getBoard();
  }, []);
    

  return (
    <div className="App">
      <div className='form-container'>
        <table>
          <tbody>
            <tr>
              <td>
                <label>제목</label>
              </td>
              <td>
                <input type='text' value={title} onChange={(e) => setTitle(e.target.value)}/>
              </td>
            </tr>
            <tr>
              <td>
                <label>내용</label>
              </td>
              <td>
                <textarea value={content} onChange={(e) => setContent(e.target.value)}/>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="a" className='file-label'>이미지선택
                  <input multiple
                        type="file"
                        className='img-input'
                        id="a"
                        accept="image.*" 
                        onChange={(e) => setFiles(e.target.files)}/>
                </label>
              </td>
            </tr>
            <tr>
              <td>
                <button onClick={uploadToJava}>Submit</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <hr/>
      <div>
        <table className="posts-container">
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>내용</th>
              <th>이미지</th>
              <th>작성일자</th>
              <th>수정버튼</th>
            </tr>
          </thead>
          <tbody>
            {board.map(b => (
            <tr key={b.id} className="board">
              <td>{b.id}</td>
              <td>{b.title}</td>
              <td>{b.content}</td>
              <td className="images">
                {b.imageUrl.split(',').map(image => 
                  <img key={image} src={`http://localhost:9008/images/${image}`}/>
                )}
              </td>
              <td>{b.createdAt}</td>
              <button>이미지 수정하기</button>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Board;