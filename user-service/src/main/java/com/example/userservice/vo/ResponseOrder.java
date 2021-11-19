package com.example.userservice.vo;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.Date;

@Data
public class ResponseOrder {
    private Long productId;
    private Integer qty;
    private Integer unitPrice;
    private Integer totalPrice;
    private LocalDateTime createdAt;

    private String orderId;
}
