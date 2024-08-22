package base.ball.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import base.ball.dto.FoodComment;

@Mapper
public interface FoodCommentMapper {
	List<FoodComment> getCommentsByFoodId(int foodId);

    void addFoodComment(FoodComment foodComment);
    void updateFoodComment(FoodComment foodComment);
    void deleteFoodComment(int commentId);
 
}
