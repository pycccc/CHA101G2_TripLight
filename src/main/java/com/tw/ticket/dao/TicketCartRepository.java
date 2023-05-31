package com.tw.ticket.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tw.ticket.model.TicketCart;
import com.tw.ticket.model.TicketCart.PrimaryKey;

@Repository
public interface TicketCartRepository extends JpaRepository<TicketCart, PrimaryKey> {

	// 不須實作 JpaRepository會自動解析 (其中 findBy And 是關鍵字)
	// KeyMemberId 表示 是變數key內的 memberId
	// KeyTicketId 表示 是變數key內的 ticketId
	public TicketCart findByKeyMemberIdAndKeyTicketId(long memberId, long ticketId);

	// 找出同一個MemberId的TicketCart
	public List<TicketCart> findByKeyMemberId(long memberId);
}
