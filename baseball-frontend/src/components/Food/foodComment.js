import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import LoginContext from '../../components/Login/LoginContext';
import '../../css/foodComment.css';

const API_URL = 'http://localhost:9090/comments';

function FoodComment({ foodId }) {
    const [commentList, setCommentList] = useState([]);
    const [content, setContent] = useState('');
    const [editCommentId, setEditCommentId] = useState(null);
    const [editContent, setEditContent] = useState('');
    const { loginMember } = useContext(LoginContext);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`${API_URL}?foodId=${foodId}`);
                const sortedComments = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setCommentList(sortedComments);
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        };

        fetchComments();
    }, [foodId]);

    const fetchAndUpdateComments = async () => {
        try {
            const response = await axios.get(`${API_URL}?foodId=${foodId}`);
            const sortedComments = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setCommentList(sortedComments);
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    };

    const handleCommentSubmit = async () => {
        if (content.trim() === '') {
            alert('댓글 내용을 입력하세요.');
            return;
        }

        if (!loginMember) {
            alert('로그인 후 댓글을 작성할 수 있습니다.');
            return;
        }

        const newComment = {
            foodId: Number(foodId),
            memberId: loginMember.memberId,
            commentText: content,
        };

        try {
            await axios.post(API_URL, newComment);
            setContent('');
            await fetchAndUpdateComments();
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };

    const handleEditComment = async () => {
        if (editContent.trim() === '') {
            alert('댓글 내용을 입력하세요.');
            return;
        }

        try {
            const response = await axios.put(`${API_URL}/${editCommentId}`, {
                commentText: editContent
            });

            if (response.status === 200) {
                setEditCommentId(null);
                setEditContent('');
                await fetchAndUpdateComments();
            } else {
                console.error('Failed to save comment:', response.status, response.statusText);
            }
        } catch (error) {
            console.error("Error updating comment:", error);
        }
    };

    const handleDeleteComment = async (commentId) => {
        if (window.confirm('후기를 정말 삭제하시겠습니까?')) {
            try {
                await axios.delete(`${API_URL}/${commentId}`);
                await fetchAndUpdateComments();
            } catch (error) {
                console.error("Error deleting comment:", error);
            }
        }
    };

    const handleInputChange = (setter) => (e) => {
        setter(e.target.value);
    };

    const Comment = ({ comment }) => (
        <div className="comment">
            <span className="food-userName">{comment.memberId}</span>
            {editCommentId === comment.commentId ? (
                <div>
                    <input
                        type="text"
                        value={editContent}
                        onChange={handleInputChange(setEditContent)}
                        autoFocus
                    />
                    <button onClick={handleEditComment} className="comment-button">저장</button>
                    <button onClick={() => setEditCommentId(null)} className="comment-button">취소</button>
                </div>
            ) : (
                <div>
                    <span className="comment-content">{comment.commentText}</span>
                    <span className="comment-time">{new Date(comment.createdAt).toLocaleString()}</span>
                    {loginMember && loginMember.memberId === comment.memberId && (
                        <div>
                            <button onClick={() => {
                                setEditCommentId(comment.commentId);
                                setEditContent(comment.commentText);
                            }} className="comment-button">수정</button>
                            <button onClick={() => handleDeleteComment(comment.commentId)} className="comment-button">삭제</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );

    return (
        <div>
            <div className="feeds-comment-section">
                <input
                    type="text"
                    className="comment-input"
                    placeholder="후기를 남겨주세요."
                    value={content}
                    onChange={handleInputChange(setContent)}
                />
                <button
                    className="comment-btn"
                    onClick={handleCommentSubmit}
                    disabled={content.trim() === ''}
                >
                    등록
                </button>
            </div>

            <div className="comment-list">
                {commentList.map((comment) => (
                    <Comment
                        key={comment.commentId}
                        comment={comment}
                    />
                ))}
            </div>
        </div>
    );
}

export default FoodComment;
