package base.ball.service;

import java.util.List;

import base.ball.dto.Goods;
import base.ball.dto.Orders;

public interface GoodsService {
	List<Goods> findAll();
	void insertOrder(Orders orders);
	
}
