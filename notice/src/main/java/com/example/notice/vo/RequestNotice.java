package com.example.notice.vo;

import com.sun.istack.NotNull;
import lombok.Data;

@Data
public class RequestNotice {

    private Long noticeId;
    private Long classCd;
    private String title;
    private String content;
    private String author;



}
