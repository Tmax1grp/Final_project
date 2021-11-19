package com.example.assignmentservice.vo;

import lombok.Data;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
public class RequestAssignment {

    private Long assignmentId;

    private Long classId;

    @NotNull(message = "title cannot be null")
    private String title;

    @NotNull(message = "content cannot be null")
    private String content;

    @NotNull(message = "author cannot be null")
    private String author;







}
