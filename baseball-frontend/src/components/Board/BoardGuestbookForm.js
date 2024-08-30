import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import '../../css/BoardGuestbookForm.css';
import LoginContext from '../../components/Login/LoginContext';

function BoardGuestbookForm() {
    const { loginMember } = useContext(LoginContext);
    const boardUploadAPI = "http://localhost:9090/board/upload";

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [writerId, setWriterId] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [selectPrivate, setSelectPrivate] = useState('N');
    const [files, setFiles] = useState([]);


    /***** 게시글 작성 *****/
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
            window.location.reload();
        }).catch(error => {
            console.error("게시글 작성 중 오류 발생:", error);
        });
    }

    useEffect(() => {
        if (loginMember) {
          setWriterId(loginMember.memberId);
          setName(loginMember.memberName);
        }
    }, [loginMember]);

    const handleFileChange = (e) => {
        const fileList = Array.from(e.target.files);
        setFiles(fileList);
    };

    const handleSelectPrivateChange = (e) => {
        setSelectPrivate(e.target.checked ? 'Y' : 'N');
    }

    const handleCancelSubmit = () => {
        window.location.reload();
    }

    return (
        <div className='guestbook-form-container'>
            <ul>
            <li className='guestbook-form-item'>
                <button className='guestbook-cancel-submit-button'
                        onClick={handleCancelSubmit}>
                    &times;
                </button>

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
                        accept="image/*" 
                        onChange={handleFileChange}/>
                </div>

                <div className='guestbook-image-preview-list'>
                    {files.length > 0 && 
                        files.map((file, index) => (
                            <div key={index} className='guestbook-image-preview'>
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
                        onClick={uploadToJava}>
                    작성하기
                </button>
            </li>
            </ul>
        </div>
    )
}

export default BoardGuestbookForm;