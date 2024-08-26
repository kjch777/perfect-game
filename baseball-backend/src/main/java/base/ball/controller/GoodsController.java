package base.ball.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import base.ball.dto.Goods;
import base.ball.dto.Member;
import base.ball.dto.Orders;
import base.ball.service.GoodsService;

@RestController
@RequestMapping("/goods")
//@CrossOrigin(origins = "http://localhost:3000") 
public class GoodsController {
	@Autowired
	private GoodsService goodsService;
	
	@GetMapping
	public List<Goods> findAll(){
		List<Goods> goodsList = goodsService.findAll();
		System.out.println("goods list : " + goodsList);
		//return goodsService.findAll();
		return goodsList;
	}
	
	@PostMapping("/order")
	public void insertOrder(@RequestBody Orders orders) { //@RequestBody 전체
		System.out.println("Received Order: " + orders);
		goodsService.insertOrder(orders);
	}
	
	@PutMapping("/order")
	public ResponseEntity<String> updateAddress(@RequestBody Member member) {
	    try {
	        System.out.println("Received Member: " + member); // Debugging log
	        goodsService.updateAddress(member);
	        return new ResponseEntity<>("주소 업데이트 완료", HttpStatus.OK);
	    } catch (Exception e) {
	        e.printStackTrace(); // Print stack trace for debugging
	        return new ResponseEntity<>("주소 업데이트 실패", HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}

	
	
	
}