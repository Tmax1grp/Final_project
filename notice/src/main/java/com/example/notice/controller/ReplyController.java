package com.example.notice.controller;

import com.example.notice.entity.NoticeEntity;
import com.example.notice.entity.ReplyEntity;
import com.example.notice.jpa.NoticeRepository;
import com.example.notice.jpa.ReplyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ReplyController {

    @Autowired
    NoticeRepository noticeRepository;
    ReplyRepository replyRepository;

    @GetMapping("/notice/{noticeId}/reply")
    public List<ReplyEntity> getNoticeReply(@PathVariable Long replyId){
        NoticeEntity noticeEntity = noticeRepository.findByNoticeId(noticeId).get();

        return noticeRepository.findReplyByNoticeEntity(noticeEntity);
    }


    @PostMapping("/notice/{noticeId}/reply/{replyId}")
    public


    @DeleteMapping("/notice/{noticeId}/reply/{replyId}")
    public void deleteReply(@PathVariable Long noticeId, @PathVariable Long replyId, @RequestBody ReplyEntity replyEntity){
        replyRepository.deleteById(replyEntity.getReplyId());
    }
}
