package com.example.board.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Controller
@RequestMapping("/")

public class Replycontroller {

    private ReplyService replyService;


    //댓글 조회

    //댓글 작성
    @PostMapping(value="/write")
    public String postWrite(ReplyVO vo ) throws Exception{

        replyService.write(vo);

        return vo.get
    }
    //댓글 수정

    //댓글 삭제

}
