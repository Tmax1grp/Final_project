package com.example.referenceservice.controller;


import com.example.referenceservice.entity.ReferenceEntity;
import com.example.referenceservice.jpa.ReferenceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/{classId}")

public class ReferenceController {

    @Autowired
    private ReferenceRepository referenceRepository;


// 전체조회
    @GetMapping("/reference/all")
    public List<ReferenceEntity> allSearchReference(){
        return referenceRepository.findAll();
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

    @PutMapping("/reference/search")
    public List<ReferenceEntity> allSearchReference(@PathVariable Long classId,
                                              @RequestBody ReferenceEntity referenceEntity
    ){


        if(referenceEntity.getTitle().length() > 0){
            return referenceRepository.findByClassIdAndTitle(classId, referenceEntity.getTitle());
        }
        else if(referenceEntity.getAuthor().length() > 0){
            return referenceRepository.findByClassIdAndAuthor(classId, referenceEntity.getAuthor());
        }
        else{
            return referenceRepository.findByClassId(classId);
        }
    }






    //글 작성
    @PostMapping("/reference")
    public void createReference(@RequestBody ReferenceEntity referenceEntity){
        ReferenceEntity reference = new ReferenceEntity();
        reference.setClassId(referenceEntity.getClassId());
        reference.setTitle(referenceEntity.getTitle());
        reference.setClickCnt(referenceEntity.getClickCnt());
        reference.setDelYn(referenceEntity.getDelYn());
        reference.setContent(referenceEntity.getContent());
        reference.setAuthor(referenceEntity.getAuthor());
        reference.setAttach(referenceEntity.getAttach());
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
    @DeleteMapping("/reference")
    public void deleteReference(@RequestBody ReferenceEntity referenceEntity){
        referenceRepository.deleteById(referenceEntity.getClassId());
    }

}