package com.example.noticeservice.controller;

import com.example.noticeservice.entity.NoticeEntity;
import com.example.noticeservice.entity.ReplyEntity;
import com.example.noticeservice.jpa.NoticeRepository;
import com.example.noticeservice.jpa.ReplyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("notice/{noticeId}")
public class ReplyController {

    @Autowired
    NoticeRepository noticeRepository;

    @Autowired
    ReplyRepository replyRepository;

    @GetMapping("/reply")
    public List<ReplyEntity> getNoticeEntityReply(@PathVariable Long noticeId, @RequestBody ReplyEntity replyEntity){

        NoticeEntity notice = noticeRepository.findByNoticeId(noticeId);

        return replyRepository.findAll();
    }


    @PostMapping("/reply/{replyId}")
    public void createReply(@PathVariable Long noticeId,@PathVariable Long replyId, @RequestBody ReplyEntity replyEntity){
        Optional<NoticeEntity> noticeEntityItem = noticeRepository.findById(noticeId);
        replyEntity.setNoticeEntity(noticeEntityItem.get());

        ReplyEntity reply = replyRepository.findById(replyId).get();
        reply.setTitle(replyEntity.getTitle());
        reply.setContent(replyEntity.getContent());
        reply.setAuthor(replyEntity.getAuthor());

        replyRepository.save(reply);
    }


    @DeleteMapping("reply/{replyId}")
    public void deleteReply(@PathVariable Long noticeId, @PathVariable Long replyId, @RequestBody ReplyEntity replyEntity){
        replyRepository.deleteById(replyEntity.getReplyId());
    }
}
