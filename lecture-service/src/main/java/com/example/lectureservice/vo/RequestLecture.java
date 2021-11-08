package com.example.lectureservice.vo;

import lombok.Data;

@Data
public class RequestLecture {
    private Long lectureId;
    private Long ClassroomId;
    private Long userId;
    private String userName;
    private String role;
    private Integer status;
}
