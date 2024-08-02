package base.ball.service;

import java.util.List;

import org.springframework.stereotype.Service;

import base.ball.dto.Food;

@Service
public interface FoodService {
	List<Food> foodAll();
}
