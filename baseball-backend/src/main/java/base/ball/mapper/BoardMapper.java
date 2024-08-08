package base.ball.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import base.ball.dto.Board;

@Mapper
public interface BoardMapper {
	List<Board> findAllBoard();
	void insertBoard(Board board);
}
