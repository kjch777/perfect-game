package base.ball.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import base.ball.dto.Ticket;
import base.ball.mapper.TicketMapper;

@Service
public class TicketServiceImpl implements TicketService {

	@Autowired
	TicketMapper ticketMapper;
	
	@Override
	public void insertTicket(Ticket ticket) {
		ticketMapper.insertTicket(ticket);
	}
	
	@Override
	public void deleteTicket(int bookingId) {
		ticketMapper.deleteTicket(bookingId);
	}
}
