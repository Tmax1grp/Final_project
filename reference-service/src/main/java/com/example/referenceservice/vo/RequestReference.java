package com.example.referenceservice.vo;


import lombok.Data;

@Data
public class RequestReference {

    private Long referenceId;
    private Long classId;
    private String title;
    private String content;
    private String author;
}
