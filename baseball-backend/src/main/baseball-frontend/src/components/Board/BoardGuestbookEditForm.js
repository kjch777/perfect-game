import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../css/BoardGuestbookForm.css';

function BoardGuestbookEditForm({ boardToEdit, closeModal, setBoard }) {
  const [title, setTitle] = useState(boardToEdit.boardTitle);
  const [content, setContent] = useState(boardToEdit.boardContents);

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
      window.location.reload();
    } catch (error) {
      console.error("게시글 수정 중 오류 발생:", error);
    }
  };

  return (
    <div className='edit-form'>
      <h3>게시글 수정</h3>
      <div>
        <label>제목</label>
        <input
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>내용</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <button onClick={handleUpdate}>수정 완료</button>
      <button onClick={closeModal}>수정 취소</button>
    </div>
  );
}

export default BoardGuestbookEditForm;