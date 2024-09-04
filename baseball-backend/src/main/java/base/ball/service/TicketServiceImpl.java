package base.ball.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
	public List<Ticket> selectTicket(int memberNo) {
		return ticketMapper.selectTicket(memberNo);
	}
	
	@Override
	public void deleteTicket(List<Integer> bookingIds) {
		ticketMapper.deleteTicket(bookingIds);
	}
	
	@Override
	public List<Ticket> checkSeatStatus(String gameCode) {
		return ticketMapper.checkSeatStatus(gameCode);
	}
	
	@Override
    public Ticket checkBookingStatus(String gameCode) {
        Ticket ticket = ticketMapper.checkBookingStatus(gameCode);
        // 매진 상태 계산
        if (ticket != null) {
            boolean isSoldOut = ticket.getBookedSeats() >= ticket.getTotalSeats();
        }
        return ticket;
    }
	
	/** Seat **/
	
	@Override
	public boolean lockSeat(String seatId, String memberNo) {
		Ticket ticket = ticketMapper.findById(seatId);
		
		if (ticket == null) {
			return false;
		}
		
		if (ticket.isLockStatus()) {
			if (ticket.getLockTime().isAfter(LocalDateTime.now().minusMinutes(1))) {
				return false;
			} else {
				ticket.setLockStatus(true);
				ticket.setLockTime(LocalDateTime.now());
				ticket.setReservedBy(memberNo);
				ticketMapper.updateSeat(ticket);
				return true;
			}
		} else {
			ticket.setLockStatus(true);
			ticket.setLockTime(LocalDateTime.now());
			ticket.setReservedBy(memberNo);
			ticketMapper.updateSeat(ticket);
			return true;
		}
	}
	
	@Override
	public boolean isSeatLocked(String seatId) {
		Ticket ticket = ticketMapper.findById(seatId);
		if (ticket != null && ticket.isLockStatus()) {
			return ticket.getLockTime().isAfter(LocalDateTime.now().minusMinutes(1));
		}
		return false;
	}
	
	@Override
	public void unlockSeat(String seatId) {
		Ticket ticket = ticketMapper.findById(seatId);
		if (ticket != null) {
			ticket.setLockStatus(false);
			ticket.setReservedBy(null);
			ticketMapper.updateSeat(ticket);
		}
	}
}