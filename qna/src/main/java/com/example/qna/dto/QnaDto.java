package com.example.qna.dto;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
public class QnaDto implements Serializable {

    private Long disscuss_id;
    private Long class_id;
    private String title;
    private String content;
    private String author;
    private Date created_date;
    private String attach;
}
