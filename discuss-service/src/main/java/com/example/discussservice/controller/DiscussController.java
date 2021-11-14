package com.example.discussservice.controller;


import com.example.discussservice.entity.DiscussEntity;
import com.example.discussservice.jpa.DiscussRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/{classId}")


public class DiscussController {

    @Autowired
    private DiscussRepository discussRepository;

    //전체 조회
    @GetMapping("/discuss/all/{page}")
    public Page<DiscussEntity> allSearchDiscuss( @PathVariable Long classId, @PathVariable int page){
        if(page <= 1)
            page = 1;
        PageRequest pageRequest = PageRequest.of(page-1, 10,Sort.Direction.DESC,("discussId") );
//    return noticeRepository.findAll(PageRequest.of(1,10, Sort.Direction.DESC,"noticeId"));
        return discussRepository.findByClassId(classId ,pageRequest);
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
    @PutMapping("/discuss/search/{page}")
    public Page<DiscussEntity> allSearchDiscuss(@PathVariable Long classId,
                                              @RequestParam(value = "title", required = false) String title,
                                              @RequestParam(value = "userName", required = false) String userName,
                                              //@RequestBody NoticeEntity noticeEntity,
                                              @PathVariable int page
    ){
        if(page <= 1)
            page = 1;
        PageRequest pageRequest = PageRequest.of(page-1, 10,Sort.Direction.DESC,("discussId") );
        PageRequest pageRequestall = PageRequest.of(page-1, 10,Sort.Direction.DESC,("discussId") );

//        if(noticeEntity.getTitle().length() > 0){
        if(title != ""){
            return discussRepository.findByClassIdTitle(classId, title, pageRequest);
        }
        else if(userName != ""){
//        else if(noticeEntity.getUserName().length() > 0){
            return discussRepository.findByClassIdUserName(classId,userName, pageRequest);
        }
        else{
            return discussRepository.findByClassId(classId, pageRequestall);
        }
    }





    //글 작성
    @PostMapping("/notice")
    public void createNotice(@RequestBody DiscussEntity discussEntity){
        DiscussEntity discuss = new DiscussEntity();
        discuss.setClassId(discussEntity.getClassId());
        discuss.setTitle(discussEntity.getTitle());
        discuss.setClickCnt(0L);
        discuss.setDelYn("0");
        discuss.setContent(discussEntity.getContent());
//        notice.setContent("asdfsdfsdf");
        discuss.setUserName(discussEntity.getUserName());
        discuss.setUserId(discussEntity.getUserId());
        discuss.setAttach("1");
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
    @DeleteMapping("/discuss/{discussId}")
    public void deleteDiscuss( @PathVariable Long discussId){
//    public void deleteNotice( @PathVariable Long noticeId, @RequestBody NoticeEntity noticeEntity){
//        noticeRepository.deleteById(noticeEntity.getNoticeId());
        discussRepository.deleteById(discussId);
    }


}
