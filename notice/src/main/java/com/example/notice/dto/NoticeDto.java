package com.example.notice.dto;

import lombok.Builder;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;


@Data
public class NoticeDto implements Serializable {
    private Long notice_id;
    private Long class_id;
    private String title;
    private String content;
    private Long click_cnt;
    private Date create_date;
    private String author;
    private String attach;


}
