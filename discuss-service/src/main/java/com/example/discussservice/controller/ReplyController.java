package com.example.discussservice.controller;

import com.example.discussservice.entity.DiscussEntity;
import com.example.discussservice.entity.ReplyEntity;
import com.example.discussservice.jpa.DiscussRepository;
import com.example.discussservice.jpa.ReplyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("{classId}/discuss/{discussId}")

public class ReplyController {

    @Autowired
    private DiscussRepository discussRepository;



    @Autowired
    private ReplyRepository replyRepository;



//댓글 조회

    //
    @GetMapping("/reply")
    public List<ReplyEntity> getNoticeEntityReply(@PathVariable Long discussId, @PathVariable Long classId){

        DiscussEntity discussEntity = discussRepository.findById(discussId).get();

        return replyRepository.findReplyEntityByDiscussEntity(discussEntity);
    }


//댓글 등록

    @PutMapping("/reply")
    public ReplyEntity createReply(@PathVariable Long classId, @PathVariable Long discussId,  @RequestBody ReplyEntity replyEntity) {

        Optional<DiscussEntity> discuss = discussRepository.findById(discussId);
        replyEntity.setDiscussEntity(discuss.get());
        replyEntity.setCreateDate(LocalDateTime.now());
        replyRepository.save(replyEntity);

        return replyEntity;


    }


    //댓글 삭제

    @DeleteMapping("/reply/{replyId}")
    public String deleteReply(@PathVariable Long classId, @PathVariable Long noticeId, @PathVariable Long replyId){
        replyRepository.deleteById(replyId);
        return "댓글이 삭제되었습니다.";
    }


}
