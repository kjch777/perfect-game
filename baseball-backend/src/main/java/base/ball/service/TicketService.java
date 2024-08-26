package base.ball.service;

import java.util.List;

import org.springframework.data.repository.query.Param;

import base.ball.dto.Ticket;

public interface TicketService {
	
	List<Ticket> selectGame();
	
	void insertTicket(Ticket ticket);
	
	List<Ticket> selectTicket();
	
	void deleteTicket(int bookingId);
	
}