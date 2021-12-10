package com.example.noticeservice.dto;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
public class ReplyDto implements Serializable {
    private Long replyId;
    private String author;
    private String content;
    private String title;
    private Long noticeId;
    private Date createDate;
}
