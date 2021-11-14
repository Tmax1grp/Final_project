package com.example.referenceservice.dto;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;


@Data
public class ReferenceDto implements Serializable {
    private Long referenceId;
    private Long classId;
    private String title;
    private String content;
    private String author;
    private Date createdDate;
    private String attach;
    private Long clickCnt;
    private Long delYn;

}
