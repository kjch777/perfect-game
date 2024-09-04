import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import '../../css/BoardGuestbook.css';
import LoginContext from '../../components/Login/LoginContext';

function BoardGuestbook() {
  const { loginMember } = useContext(LoginContext);
  const boardListAPI = "http://localhost:9090/board/lists";
  const boardUploadAPI = "http://localhost:9090/board/upload";

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [writerId, setWriterId] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [selectPrivate, setSelectPrivate] = useState('N');

  const [files, setFiles] = useState([]);
  const [board, setBoard] = useState([]);

  /***** 0828 게시글 수정 ******/
  /*const {id} = useParams();
  console.log("id : ", id);*/
  const [boardDetail, setBoardDetail] = useState(null);
  const [editData, setEditData] = useState({
    title: "",
    content: "",
    password: "",
    selectPrivate: ""
  })
  const [isEditing, setIsEditing] = useState(false);
  /*const navigate = useNavigate();*/

/*
  useEffect (() => {
    axios.get(`http://localhost:9090/board/lists/${id}`)
    .then(response => {
        setBoardDetail(response.data);
        setEditData({
          title: response.data.title, 
          content : response.data.content,
          password : response.data.password,
          selectPrivate : response.data.selectPrivate
        })
    })
    .catch(e=> alert("불러오는데 문제가 발생했습니다."));
  }, [])
*/

/*
  const handleSaveEdit = () => {
    axios.put(`http://localhost:9091/api/chicken/${id}`, editData)
    .then(response => {
        setChicken(response.data);//기존의 DB에 저장된 내용 가져오기
        setIsEditing(false);
    })
    .catch(error => {
        console.error("수정하는데 문제가 발생했습니다.", error);
    })
  }
*/

  const handleEdit = () => {
      setIsEditing(true);
  }

  const handleCancelEdit = () => {
      setIsEditing(false);
  }
  /****************************/

  /***** ***** 게시글 작성 ***** *****/
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
  /***** ***** 회원 이름, 아이디 가져오기 ***** *****/
  useEffect(() => {
    if (loginMember) {
      setWriterId(loginMember.memberId);
      setName(loginMember.memberName);
    }
    getBoard();
  }, [loginMember]);
  /**************************************************/

  /***** ***** 이미지 파일 여러 개 입력 시 files를 배열을 변화 ***** *****/
  const handleFileChange = (e) => {
    const fileList = Array.from(e.target.files);
    setFiles(fileList);
  };
  /**************************************************/
  /* 0828 비밀번호 설정 추가하기 */
  const handleSelectPrivateChange = (e) => {
    setSelectPrivate(e.target.checked ? 'Y' : 'N');
  }
  /**************************************************/
  /**************************************************/

  /***** ***** 게시글 보기 ***** *****/
  const getBoard = () => {
    axios.get(boardListAPI)
    .then(response => {
        setBoard(response.data);
    })
    .catch(error => {
      console.error("게시글 목록 가져오기 중 오류 발생:", error);
    });
  }
  /**************************************************/
  /* 0828 삭제버튼 추가하기 */
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
  /* 0827 수정버튼 추가하기 */
/*
  const handleModify = (board) => {
    setBoardToEdit(board);
    setTitle(board.boardTitle);
    setContent(board.boardContents);
  }

  const handleUpdate = async () => {
    try {
      if (!boardToEdit || !boardToEdit.boardNo) {
        throw new Error('수정할 게시글 정보를 찾을 수 없습니다.');
      }

      const updatedBoard = {
        ...boardToEdit,
        boardTitle: title,
        boardContents: content
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

  const cancelEdit = () => {
    setBoardToEdit(null);
  }

*/

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


      <div className="board-container">
        <ul>
          <li className='board-item'>
            <div className='board-item-no'>번호</div>
            <div className='board-item-title'>제목</div>
            <div className='board-item-contents'>내용</div>
            <div className='board-item-writerName'>작성자</div>
            <div className='board-item-image'>이미지</div>
            <div className='board-item-createdAt'>수정일자</div>
            <div className='board-item-edit-button'
                  style={{color: "orange"}}>수정</div>
            <div className='board-item-delete-button'
                  style={{color: "red"}}>삭제</div>
          </li>

          {board.map(b => (
            <li key={b.boardNo} className='board-item'>
              <div className='board-item-no'>{b.boardNo}</div>
              <div className='board-item-title'>{b.boardTitle}</div>
              <div className='board-item-contents'>{b.boardContents}</div>
              <div className='board-item-writerName'>{b.boardMemberName}</div>
              <div className='board-item-image'>
                {b.boardImageUrl.split(',').map(image => 
                  <img key={image} src={`http://localhost:9090/images/${image}`}/>
                )}
              </div>
              <div className='board-item-createdAt'>{b.createdAt}</div>
              <div className='board-item-edit-button'>
                <button>
                  수정
                </button>
              </div>
              <div className='board-item-delete-button'>
                <button onClick={() => handleDelete(b.boardNo)}>
                  삭제
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>



    </>
  );
}

export default BoardGuestbook;