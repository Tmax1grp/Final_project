package com.example.notice.vo;

import com.sun.istack.NotNull;
import lombok.Data;

@Data
public class RequestNotice {

    private Long notice_id;
    private Long class_id;
    private String title;
    private String content;
    private String author;



}
