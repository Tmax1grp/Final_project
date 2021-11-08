package com.example.adminservice.dto;

import lombok.Data;

@Data
public class ClassroomDto {

    private Long classId;
    private String name;
    private String imgPath;
    private Long userId;
    private String content;
    private Long participantNum;
    private Integer status;
}
