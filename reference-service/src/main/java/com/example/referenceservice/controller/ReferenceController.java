package com.example.referenceservice.controller;


import com.example.referenceservice.entity.ReferenceEntity;
import com.example.referenceservice.jpa.ReferenceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/{classId}")

public class ReferenceController {

    @Autowired
    private ReferenceRepository referenceRepository;


// 전체조회
@GetMapping("/reference/all/{page}")
public Page<ReferenceEntity> allSearchReference(@PathVariable Long classId, @PathVariable int page){
    if(page <= 1)
        page = 1;
    PageRequest pageRequest = PageRequest.of(page-1, 10, Sort.Direction.DESC,("referenceId") );
//    return noticeRepository.findAll(PageRequest.of(1,10, Sort.Direction.DESC,"noticeId"));
    return referenceRepository.findByClassId(classId ,pageRequest);
}

    //조회수, 상세조회
    @GetMapping("/reference/{referenceId}")
    public ReferenceEntity searchReference(@PathVariable Long referenceId,
                                     @RequestParam(value = "clickCnt", required = false) Integer clickCnt ){

        ReferenceEntity reference = referenceRepository.findByReferenceId(referenceId); //    NoticeEntity findByNoticeId(Long noticeId); <- 원형

        int count = 0;
        if(clickCnt == null){
            count = 0;
        }
        else{
            count = 1;
        }
        reference.setClickCnt(reference.getClickCnt()+count);
        referenceRepository.save(reference);
        return reference;
    }

//검색

    @PutMapping("/reference/search/{page}")
    public Page<ReferenceEntity> allSearchReference(@PathVariable Long classId,
                                              @RequestParam(value = "title", required = false) String title,
                                              @RequestParam(value = "userName", required = false) String userName,
                                              //@RequestBody NoticeEntity noticeEntity,
                                              @PathVariable int page
    ){
        if(page <= 1)
            page = 1;
        PageRequest pageRequest = PageRequest.of(page-1, 10,Sort.Direction.DESC,("reference_id") );
        PageRequest pageRequestall = PageRequest.of(page-1, 10,Sort.Direction.DESC,("referenceId") );

//        if(noticeEntity.getTitle().length() > 0){
        if(title != ""){
            return referenceRepository.findByClassIdTitle(classId, title, pageRequest);
        }
        else if(userName != ""){
//        else if(noticeEntity.getUserName().length() > 0){
            return referenceRepository.findByClassIdUserName(classId,userName, pageRequest);
        }
        else{
            return referenceRepository.findByClassId(classId, pageRequestall);
        }
    }




    //글 작성
    @PostMapping("/reference")
    public void createReference(@RequestBody ReferenceEntity referenceEntity){
        ReferenceEntity reference = new ReferenceEntity();
        reference.setClassId(referenceEntity.getClassId());
        reference.setTitle(referenceEntity.getTitle());
        reference.setClickCnt(0L);
        reference.setDelYn("0");
        reference.setContent(referenceEntity.getContent());
//        reference.setContent("asdfsdfsdf");
        reference.setUserName(referenceEntity.getUserName());
        reference.setUserId(referenceEntity.getUserId());
        reference.setAttach("1");
        reference.setCreateDate(LocalDateTime.now());

        referenceRepository.save(reference);
    }


    //글 수정
    @PutMapping("/reference/{referenceId}")
    public ReferenceEntity updateReference(
            @PathVariable Long referenceId,
            @RequestParam(value = "title", required = false) String title,
            @RequestParam(value = "content", required = false) String content

    ) {
        ReferenceEntity reference = referenceRepository.findAllBy(referenceId);

        if (title.length() > 0) {
            reference.setTitle(title);
        }

        if (content.length() > 0) {
            reference.setContent(content);
        }


        referenceRepository.save(reference);
        return reference;
    }





    //글 삭제

    @DeleteMapping("/reference/{referenceId}")
    public void deleteReference( @PathVariable Long referenceId){
//    public void deleteNotice( @PathVariable Long noticeId, @RequestBody NoticeEntity noticeEntity){
//        noticeRepository.deleteById(noticeEntity.getNoticeId());
        referenceRepository.deleteById(referenceId);
    }

}
