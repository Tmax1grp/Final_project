package com.example.notice.vo;

import com.sun.istack.NotNull;
import lombok.Data;

@Data
public class RequestNotice {

    private Long noticeId;
    private Long classId;
    private String title;
    private String content;
    private String author;



}
