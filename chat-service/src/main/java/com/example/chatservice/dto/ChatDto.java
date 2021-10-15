package com.example.chatservice.dto;

import lombok.Data;

import java.util.Date;

@Data
public class ChatDto {
    private Long classId;
    private String fromId;
    private String toId;
    private String chatContent;
    private Date chatDate;


}
