package base.ball.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import base.ball.dto.Ticket;
import base.ball.mapper.TicketMapper;

@Service
public class TicketServiceImpl implements TicketService {

	@Autowired
	TicketMapper ticketMapper;
	
	@Override
	public List<Ticket> selectGame() {
		return ticketMapper.selectGame();
	}
	
	@Override
	public void insertTicket(Ticket ticket) {
		ticketMapper.insertTicket(ticket);
	}
	
	@Override
	public void deleteTicket(int bookingId) {
		ticketMapper.deleteTicket(bookingId);
	}
}
