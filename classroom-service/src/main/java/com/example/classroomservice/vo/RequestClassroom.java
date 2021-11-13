package com.example.classroomservice.vo;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;


public class RequestClassroom {

    private Long classId;

    @NotNull(message = "name cannot be null")
    @Size(min=2)
    private String name;

    @NotNull(message = "image cannot be null")
    @Size(min=2)
    private String imgPath;

    @NotNull(message = "userID cannot be null")
    @Size(min=2)
    private Long userId;

    @NotNull(message = "userName cannot be null")
    @Size(min=2)
    private String userName;

    @NotNull(message = "content cannot be null")
    private String content;

    @NotNull(message = "participant Number cannot be null")
    private Integer participantNum;

    @NotNull(message = "status cannot be null")
    private Integer status;


}
