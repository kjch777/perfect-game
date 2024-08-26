package base.ball.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import base.ball.dto.FoodComment;
import base.ball.mapper.FoodCommentMapper;

@Service
public class FoodCommentServiceImpl implements FoodCommentService{
	
	@Autowired
	FoodCommentMapper foodCommentMapper;
	
	@Override
	public List<FoodComment> getCommentsByFoodId(int foodId){
		return foodCommentMapper.getCommentsByFoodId(foodId);
	}
	
	@Override
	public void addFoodComment(FoodComment foodComment) {
		foodCommentMapper.addFoodComment(foodComment);
	}
	
	@Override
	public void updateFoodComment(int commentId, FoodComment foodComment) {
	    foodComment.setCommentId(commentId);
	    foodCommentMapper.updateFoodComment(foodComment);
	}




	@Override
	public void deleteFoodComment(int commentId) {
	    foodCommentMapper.deleteFoodComment(commentId);
	}

}
