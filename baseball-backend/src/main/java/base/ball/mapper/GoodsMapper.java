package base.ball.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import base.ball.dto.Goods;
import base.ball.dto.Member;
import base.ball.dto.Orders;

@Mapper
public interface GoodsMapper {
	List<Goods> findAll();
	
	void insertOrder(Orders orders);
	
	void updateAddress(Member member);
	
	void deleteOrderById(int orderId);
	
}
