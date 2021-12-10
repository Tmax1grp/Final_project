package com.example.classroomservice.dto;

import javax.persistence.Column;
import java.util.Date;

public class ClassroomDto {
    private Long classId;
    private String name;
    private String imgPath;
    private Long userId;
    private String userName;
    private String content;
    private Integer participantNum;
    private Integer status;
    private Date createdDate;

}
