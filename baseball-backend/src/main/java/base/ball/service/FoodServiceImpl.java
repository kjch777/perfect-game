package base.ball.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import base.ball.dto.Food;
import base.ball.mapper.FoodMapper;

@Service
public class FoodServiceImpl implements FoodService {
	@Autowired
	private FoodMapper foodMapper;
	
	@Override
	public Food getFoodById(int foodId){
		return foodMapper.getFoodById(foodId);
	}
	
	@Override
	public List<Food> foodAll(int foodId){
		return null;
	}
	
}
