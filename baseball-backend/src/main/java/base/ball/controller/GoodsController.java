package base.ball.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import base.ball.dto.Goods;
import base.ball.service.GoodsService;

@RestController
@RequestMapping("/goods")
@CrossOrigin(origins = "http://localhost:3000") 
public class GoodsController {
	@Autowired
	private GoodsService goodsService;
	
	@GetMapping
	public List<Goods> findAll(){
		List<Goods> goodsList = goodsService.findAll();
		System.out.println("Fetched goods list : " + goodsList);
		return goodsList;
	}
}
