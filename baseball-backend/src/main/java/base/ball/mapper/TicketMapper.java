package base.ball.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.data.repository.query.Param;

import base.ball.dto.Ticket;

@Mapper
public interface TicketMapper {
	
	List<Ticket> selectGame();

	void insertTicket(Ticket ticket);
	
	void deleteTicket(int bookingId);
}
