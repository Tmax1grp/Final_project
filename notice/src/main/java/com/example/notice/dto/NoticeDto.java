package com.example.notice.dto;


import lombok.Data;

import java.io.Serializable;
import java.util.Date;


@Data
public class NoticeDto implements Serializable {
    private Long noticeId;
    private Long classId;
    private String title;
    private String content;
    private Long clickCnt;
    private Long delYn;
    private Date createDate;
    private String author;
    private String attach;


}
