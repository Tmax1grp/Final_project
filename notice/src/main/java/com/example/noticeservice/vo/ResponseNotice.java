package com.example.noticeservice.vo;

import lombok.Data;

import java.time.LocalDate;

@Data
public class ResponseNotice {
    private Long noticeId;


    private Long classId;


    private String title;


    private String content;


    private Long clickCnt;


    private String delYn;


    private LocalDate createDate;


    private String author;


    private String attach;
}
