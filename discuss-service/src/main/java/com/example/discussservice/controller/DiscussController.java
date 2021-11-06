package com.example.discussservice.controller;


import com.example.discussservice.entity.DiscussEntity;
import com.example.discussservice.jpa.DiscussRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/{classId}")


public class DiscussController {

    @Autowired
    private DiscussRepository discussRepository;

    //전체 조회
    @GetMapping("/discuss/all")
    public List<DiscussEntity> allSearchDiscuss() {
        return discussRepository.findAll();
    }


    //조회수, 상세조회
    @GetMapping("/discuss/{discussId}")
    public DiscussEntity searchDiscuss(@PathVariable Long discussId,
                                     @RequestParam(value = "clickCnt", required = false) Integer clickCnt ){

        DiscussEntity discuss = discussRepository.findByDiscussId(discussId); //    NoticeEntity findByNoticeId(Long noticeId); <- 원형

        int count = 0;
        if(clickCnt == null){
            count = 0;
        }
        else{
            count = 1;
        }
        discuss.setClickCnt(discuss.getClickCnt()+count);
        discussRepository.save(discuss);
        return discuss;
    }

    // 검색
    @PutMapping("/discuss/search")
    public List<DiscussEntity> allSearchDiscuss(@PathVariable Long classId,
                                              @RequestBody DiscussEntity discussEntity
    ){


        if(discussEntity.getTitle().length() > 0){
            return discussRepository.findByClassIdAndTitle(classId, discussEntity.getTitle());
        }
        else if(discussEntity.getAuthor().length() > 0){
            return discussRepository.findByClassIdAndAuthor(classId, discussEntity.getAuthor());
        }
        else{
            return discussRepository.findByClassId(classId);
        }
    }






    //글 작성
    @PostMapping("/discuss")
    public void createDiscuss(@RequestBody DiscussEntity discussEntity){
        DiscussEntity discuss = new DiscussEntity();
        discuss.setClassId(discussEntity.getClassId());
        discuss.setTitle(discussEntity.getTitle());
        discuss.setClickCnt(discussEntity.getClickCnt());
        discuss.setDelYn(discussEntity.getDelYn());
        discuss.setContent(discussEntity.getContent());
        discuss.setAuthor(discussEntity.getAuthor());
        discuss.setAttach(discussEntity.getAttach());
        discuss.setCreateDate(LocalDateTime.now());

        discussRepository.save(discuss);
    }

    //글 수정
    @PutMapping("/discuss/{discussId}")
    public DiscussEntity updateDiscuss(
            @PathVariable Long discussId,
            @RequestParam(value = "title", required = false) String title,
            @RequestParam(value = "content", required = false) String content

    ) {
        DiscussEntity discuss = discussRepository.findAllBy(discussId);

        if (title.length() > 0) {
            discuss.setTitle(title);
        }

        if (content.length() > 0) {
            discuss.setContent(content);
        }


        discussRepository.save(discuss);
        return discuss;
    }



    //글 삭제
    @DeleteMapping("/discuss")
    public void deleteDiscuss(@RequestBody DiscussEntity discussEntity){
        discussRepository.deleteById(discussEntity.getClassId());
    }

}
