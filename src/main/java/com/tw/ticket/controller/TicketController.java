package com.tw.ticket.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tw.ticket.model.Ticket;
import com.tw.ticket.service.TicketService;

import lombok.Data;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/TripLight")
public class TicketController {

	@Autowired
	private TicketService ticketService;

	// 隨機票券
	@GetMapping("/rndtickets")
	public List<RadAndHotResponse> randomTickets() {
		return ticketService.getRnd();
	}

	// 熱門票券
	@GetMapping("/hottickets")
	public List<RadAndHotResponse> hotTickets() {
		return ticketService.getHot();
	}

	// 搜尋票券
	@PostMapping("/searchtickets")
	public SearchResponse searchTickets(@RequestBody final SearchRequest searchRequest) {
		return ticketService.getSearch(searchRequest);
	}

	@GetMapping("/front-end/tickets_detail.html")
	public List<RadAndHotResponse> test(@RequestParam("id") final Long id) {
		System.out.println("id=" + id);
		return null;
	}

	// 定義請求物件
	@Data
	static public class SearchRequest {
		private String keyword;
		private int[] types;
		private String[] cities;
		private int page;
		private int size;
	}

	// 定義回傳物件
	@Data
	static public class SearchResponse {
		private int curPage;
		private int totalPage;
		private ArrayList<RadAndHotResponse> tickets = new ArrayList<>();
	}

	@Data
	static public class RadAndHotResponse {
		public RadAndHotResponse(final Ticket ticket) {
			this.ticketId = ticket.getTicketId();
			this.name = ticket.getName();
			this.price = ticket.getPrice();
			this.rating = ticket.getRatingSum() / ticket.getRatingCount();
			this.ratingPerson = ticket.getRatingCount();
			this.city = ticket.getCity();
			this.description = ticket.getDescription();
			this.image = ticket.getImgUrlEx(0);
		}

		private final int ticketId;
		private final String name;
		private final int price;
		private final int rating;
		private final int ratingPerson;
		private final String city;
		private final String description;
		private final String image;
	}
}
