package base.ball.service;

import java.util.List;

import base.ball.dto.Ticket;

public interface TicketService {
	
	List<Ticket> selectGame();
	
	void insertTicket(Ticket ticket);
	
	List<Ticket> selectTicket(int memberNo);
	
	void deleteTicket(List<Integer> bookingIds);
	
	List<Ticket> checkSeatStatus(String gameCode);
	
	Ticket checkBookingStatus(String gameCode);
	
	/** Seat **/
	
	boolean lockSeat(String seatId, String memberNo);
    
	boolean isSeatLocked(String seatId);
    
	void unlockSeat(String seatId);
}