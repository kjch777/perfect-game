package base.ball.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import base.ball.dto.Food;
import base.ball.service.FoodService;

@RestController
@RequestMapping("/foods")
//@CrossOrigin(origins = "http://localhost:3000")
public class FoodController {
	@Autowired
	private FoodService foodService;
	
	@GetMapping("/{foodId}")
	public Food getFoodById(@PathVariable("foodId") int foodId) {
        return foodService.getFoodById(foodId);
    }
}
