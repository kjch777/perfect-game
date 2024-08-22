package base.ball.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import base.ball.dto.FoodComment;
import base.ball.service.FoodCommentService;

@RestController
@RequestMapping("/comments")
@CrossOrigin(origins = "http://localhost:3000")
public class FoodCommentController {
	@Autowired
	private FoodCommentService foodCommentService;

	@GetMapping
	public List<FoodComment> getCommentsByFoodId(@RequestParam("foodId") int foodId) {
		return foodCommentService.getCommentsByFoodId(foodId);
	}

	@PostMapping
	public void addFoodComment(@RequestBody FoodComment foodComment) {
		foodCommentService.addFoodComment(foodComment);
	}

	@PutMapping("/{commentId}")
	public void updateFoodComment(@PathVariable("commentId") int commentId, @RequestBody FoodComment foodComment) {
	    foodComment.setCommentId(commentId);
	    foodCommentService.updateFoodComment(commentId, foodComment);
	}



	@DeleteMapping("/{commentId}")
	public void deleteFoodComment(@PathVariable("commentId") int commentId) {
	    foodCommentService.deleteFoodComment(commentId);
	}

}
