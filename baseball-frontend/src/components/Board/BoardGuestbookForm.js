import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import '../../css/BoardGuestbookForm.css';
import LoginContext from '../../components/Login/LoginContext';

function BoardGuestbookForm() {
    const { loginMember } = useContext(LoginContext);
    const boardUploadAPI = "http:///board/upload";

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [writerId, setWriterId] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [selectPrivate, setSelectPrivate] = useState('N');
    const [files, setFiles] = useState([]);
    const [errors, setErrors] = useState({});
    
    useEffect(() => {
        if (loginMember) {
            setWriterId(loginMember.memberId);
            setName(loginMember.memberName);
        }
    }, [loginMember]);

    // 비밀번호 유효성 검사
    const validatePw = (pw) => {
        const pwRegex = /^[0-9]{4}$/;
        return pwRegex.test(pw) ? "" : "비밀번호는 4자리의 숫자만 가능합니다.";
    };

    // 비밀번호 입력 핸들러
    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        setErrors(prevErrors => ({
            ...prevErrors,
            password: validatePw(value)
        }));
    };

    // 파일 선택 핸들러
    const handleFileChange = (e) => {
        const fileList = Array.from(e.target.files);
        setFiles(fileList);
    };

    // 비밀 글 설정 핸들러
    const handleSelectPrivateChange = (e) => {
        setSelectPrivate(e.target.checked ? 'Y' : 'N');
    };

    // 게시글 작성 함수
    const uploadToJava = () => {
        if (selectPrivate === 'Y' && errors.password) {
            alert(errors.password);
            return;
        }
        const formData = new FormData();
        if (files.length < 0 ) {
            alert('이미지를 1개 이상 선택하세요.');
        }
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
    };

    // 취소 버튼 핸들러
    const handleCancelSubmit = () => {
        window.location.reload();
    };

    return (
        <div className='guestbook-form-container'>
            <ul>
                <li className='guestbook-form-item'>
                    <button className='guestbook-cancel-submit-button' onClick={handleCancelSubmit}>
                        &times;
                    </button>

                    <div className='guestbook-form-item'>
                        <label>제목</label>
                        <div>
                            <input type='text'
                                   value={title}
                                   onChange={(e) => setTitle(e.target.value)} />
                        </div>
                    </div>

                    <div className='guestbook-form-item'>
                        <label>내용</label>
                        <div>
                            <textarea value={content} onChange={(e) => setContent(e.target.value)} />
                        </div>
                    </div>

                    <div className='guestbook-form-item'>
                        <label>작성자아이디</label>
                        <div>
                            <input type="text" value={writerId} readOnly />
                        </div>
                    </div>

                    <div className='guestbook-form-item'>
                        <label>작성자</label>
                        <div>
                            <input type="text" value={name} readOnly />
                        </div>
                    </div>

                    <div className='guestbook-form-item'>
                        <label>이미지선택</label>
                        <div>
                            <input multiple
                                    type="file"
                                    className='img-input'
                                    id="a"
                                    accept="image/*"
                                    onChange={handleFileChange} />
                        </div>
                    </div>

                    <div className='guestbook-form-item'>
                        <div className='guestbook-image-preview-list'>
                            {files.length > 0 &&
                                files.map((file, index) => (
                                    <div key={index}
                                         className='guestbook-image-preview'>
                                        <img src={URL.createObjectURL(file)} alt='이미지 미리보기' />
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <div className='guestbook-form-item'>
                        <div className='guestbook-select-private'>
                            <label>비밀 글 설정</label>
                            <div>
                                <input type='checkbox'
                                       className='guestbook-select-private-checkbox'
                                       checked={selectPrivate === 'Y'}
                                       onChange={handleSelectPrivateChange} />
                            </div>
                        </div>
                    </div>

                    {selectPrivate === 'Y' && (
                        <div className='guestbook-form-item'>
                            <div className='guestbook-password'>
                                <label>비밀번호</label>
                                <div>
                                    <input type='text'
                                           className='guestbook-password-input'
                                           value={password}
                                           onChange={handlePasswordChange} />
                                </div>
                                {errors.password && <span className='error'>{errors.password}</span>}
                            </div>
                        </div>
                    )}

                    <button className='guestbook-submit-button' onClick={uploadToJava}>
                        작성하기
                    </button>
                </li>
            </ul>
        </div>
    );
}

export default BoardGuestbookForm;
