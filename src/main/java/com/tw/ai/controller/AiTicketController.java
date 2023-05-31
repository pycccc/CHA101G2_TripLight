package com.tw.ai.controller;


import com.tw.ai.service.AiService;

import com.tw.ticket.controller.TicketController;
import com.tw.ticket.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class AiTicketController {
    private final TicketService ticketService;
    private final AiService aiService;

    @Autowired
    public AiTicketController(TicketService theticketService, AiService theaiService) {
        ticketService = theticketService;
        aiService = theaiService;
    }
    // 將推薦票券傳至前端  在表單送出時呼叫
    @GetMapping("/getTickets/{memberId}")
    public List<TicketController.RadAndHotResponse> getTickets(@PathVariable("memberId") String memberId){
        var destination = aiService.getDestination(memberId);
        return ticketService.getTicket(destination);
    }



}


