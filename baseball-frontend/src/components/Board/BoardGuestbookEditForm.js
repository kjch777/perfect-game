

function BoardGuestbookEditForm () {

    /***** 0828 게시글 수정 *****/
    const openModal = () => {
        setIsModalOpen(true);
    }
    const closeModal = () => {
        setIsModalOpen(false);
    }


    /* 수정버튼 */
    const handleModify = (board) => {
        setBoardToEdit(board); // 수정할 게시글 상태 설정
        setTitle(board.boardTitle);
        setContent(board.boardContents);
    }

    /* 수정완료버튼 */
    const handleUpdate = async () => {
        try {
        if (!boardToEdit || !boardToEdit.boardNo) {
            throw new Error('수정할 게시글 정보를 찾을 수 없습니다.');
        }

        const updatedBoard = {
            ...boardToEdit,
            boardTitle: title, // 제목 업데이트
            boardContents: content // 내용 업데이트
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

    /* 수정취소버튼 */
    const cancelEdit = () => {
        setBoardToEdit(null); // 수정 취소할 때 상태 초기화
    }
    /***** ***** ***** ***** ***** *****/
    
    return (

    )

}

export default BoardGuestbookEditForm;