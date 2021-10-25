package com.example.notice.vo;

import lombok.Data;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.Column;
import java.time.LocalDate;

@Data
public class ResponseNotice {
    private Long notice_id;


    private Long class_id;


    private String title;


    private String content;


    private Long click_cnt;


    private String delyn;


    private LocalDate create_date;


    private String author;


    private String attach;
}
