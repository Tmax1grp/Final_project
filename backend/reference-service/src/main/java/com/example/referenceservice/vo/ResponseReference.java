package com.example.referenceservice.vo;


import lombok.Data;

import java.time.LocalDate;

@Data
public class ResponseReference {

    private Long referenceId;

    private Long classId;

    private Long userId;

    private String content;


    private Long clickCnt;


    private String delYn;


    private LocalDate createDate;


    private String userName;


    private String attach;
}
