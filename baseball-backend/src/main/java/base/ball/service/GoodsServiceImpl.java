package base.ball.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import base.ball.dto.Goods;
import base.ball.dto.Member;
import base.ball.dto.Orders;
import base.ball.mapper.GoodsMapper;

@Service
public class GoodsServiceImpl implements GoodsService {

	@Autowired
	public GoodsMapper goodsMapper;
	
	@Override
	public List<Goods> findAll(){
		return goodsMapper.findAll();
	}
	
	@Override
	public void insertOrder (Orders orders) {
		goodsMapper.insertOrder(orders);
	}
	
	@Override
	public void updateAddress (Member member) {
		goodsMapper.updateAddress(member);
	}

}
