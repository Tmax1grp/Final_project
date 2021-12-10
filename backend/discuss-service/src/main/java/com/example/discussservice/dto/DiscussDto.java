package com.example.discussservice.dto;


import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
public class DiscussDto implements Serializable {
    private Long discussId;
    private Long classId;
    private String title;
    private String content;
    private Long clickCnt;
    private Long delYn;
    private Date createDate;
    private String author;
    private String attach;
}
