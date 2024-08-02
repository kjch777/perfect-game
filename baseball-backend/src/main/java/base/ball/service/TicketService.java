package base.ball.service;

import base.ball.dto.Ticket;

public interface TicketService {

	void insertTicket(Ticket ticket);
	
	void deleteTicket(int bookingId);
}
