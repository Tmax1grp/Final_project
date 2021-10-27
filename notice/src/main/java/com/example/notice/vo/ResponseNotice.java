package com.example.notice.vo;

import lombok.Data;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.Column;
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
