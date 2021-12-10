package com.example.discussservice.vo;

import lombok.Data;

@Data
public class RequestDiscuss {

    private Long discussId;
    private Long classId;
    private String title;
    private String content;
    private String author;
}
