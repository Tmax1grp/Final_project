package com.example.noticeservice.vo;

import lombok.Data;

@Data
public class RequestNotice {



    private Long noticeId;
    private Long classId;
    private String title;
    private String content;
    private String author;



}
