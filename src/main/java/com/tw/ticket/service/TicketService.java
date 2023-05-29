package com.tw.ticket.service;

import java.util.List;

import com.tw.ticket.controller.TicketController.RadAndHotResponse;
import com.tw.ticket.controller.TicketController.SearchRequest;
import com.tw.ticket.controller.TicketController.SearchResponse;

public interface TicketService {

	// 隨機票券
	public List<RadAndHotResponse> getRnd();

	// 熱門票券
	public List<RadAndHotResponse> getHot();

	// 搜尋票券
	public SearchResponse getSearch(SearchRequest searchRequest);
}
