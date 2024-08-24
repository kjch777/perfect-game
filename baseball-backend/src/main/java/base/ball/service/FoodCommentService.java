package base.ball.service;

import java.util.List;

import base.ball.dto.FoodComment;

public interface FoodCommentService {
	List<FoodComment> getCommentsByFoodId(int foodId);

    void addFoodComment(FoodComment foodComment);
	void updateFoodComment(int commentId, FoodComment foodComment);
    void deleteFoodComment(int commentId);

}
