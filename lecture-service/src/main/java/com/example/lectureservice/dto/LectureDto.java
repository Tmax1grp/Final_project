package com.example.lectureservice.dto;

import lombok.Data;

@Data
public class LectureDto {
    private Long lectureId;
    private Long classroomId;
    private Long userId;
    private String userName;
    private String role;
    private Integer status;
}
