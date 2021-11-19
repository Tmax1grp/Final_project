package com.example.discussservice.vo;

import lombok.Data;

import java.time.LocalDate;


@Data
public class ResponseDiscuss {
    private Long discussId;


    private Long classId;


    private String title;


    private String content;


    private Long clickCnt;


    private String delYn;


    private LocalDate createDate;


    private String author;


    private String attach;
}
