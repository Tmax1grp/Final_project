package com.example.userservice.vo;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;

@Data
public class RequestUser {

    private Long userId;

    @NotNull(message = "Email cannot be null")
    @Size(min = 2, message = "Email not be less than two chrarcters")
    @Email
//    @Email(regexp = "/^(([^<>()].,;:\\s@\"]+(.[^<>()].,;:\\s@\"]+))|(\".+\"))@(([^<>()¥[].,;:\\s@\"]+.)+[^<>()[].,;:\\s@\"]{2,})$/i",
//            message = "이메일 형식을 확인해 주세요.")
    private String email;

    @NotNull(message ="Password cannot be null")
    @Size(min = 8, max = 20, message = "Password must be equal or grater than 8 characters and less than 20 characters")
//    @Pattern(regexp = "/^.(?=.{8,20})(?=.[0-9])(?=.[a-zA-Z])(?=.[@$!%#?&]).*$/", message = "비밀번호에 숫자, 영문자, 특수문자를 포함하세요.")
    private String password;

    @NotNull(message = "Name cannot be null")
    @Size(min = 2, message = "Name not be less than two characters")
    private String userName;

    @NotNull(message = "Tel cannot be null")
    @Size(min = 9, max = 13, message = "tel must be equal or greater than 9 characters and less than 13 characters")
//    @Pattern(regexp = "/^[0-9\b-]{0,13}$/", message = "숫자만 포함해야한다")
    private String tel;

    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt;


}
