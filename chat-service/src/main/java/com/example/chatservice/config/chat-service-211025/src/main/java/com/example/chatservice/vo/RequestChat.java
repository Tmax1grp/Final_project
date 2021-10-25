package com.example.chatservice.vo;

import lombok.Data;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
public class RequestChat {

//    @NotNull(message = "classID cannot be null")
//    @Size(min=2)
//    private String classId;

    @NotNull(message = "fromID cannot be null")
    @Size(min=2)
    private String fromId;

    @NotNull(message = "toID cannot be null")
    @Size(min=2)
    private String toId;

    @NotNull(message = "chatContent cannot be null")
    @Size(min=1)
    private String chatContent;

    private String orgFileName;
    private String filePath;
    private int fileSize;
}
