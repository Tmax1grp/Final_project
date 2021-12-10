package com.example.referenceservice.vo;


import lombok.Data;

@Data
public class RequestReference {

    private Long referenceId;
    private Long classId;
    private Long userId;
    private String content;
    private String userName;
}
