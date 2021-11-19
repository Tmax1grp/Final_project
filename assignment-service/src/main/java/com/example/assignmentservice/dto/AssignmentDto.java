package com.example.assignmentservice.dto;


import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
public class AssignmentDto implements Serializable {

    private Long assignmentId;
    private Long classId;
    private String title;
    private String content;
    private String author;
    private Long clickCnt;
    private Long delYn;
    private Date createdDate;
    private String attach;


}
