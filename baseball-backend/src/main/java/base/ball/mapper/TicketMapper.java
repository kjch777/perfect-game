package base.ball.mapper;

import org.apache.ibatis.annotations.Mapper;

import base.ball.dto.Ticket;

@Mapper
public interface TicketMapper {

	void insertTicket(Ticket ticket);
	
	void deleteTicket(int bookingId);
}
