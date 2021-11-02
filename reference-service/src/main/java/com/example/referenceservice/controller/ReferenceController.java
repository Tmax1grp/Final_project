package com.example.referenceservice.controller;


import com.example.referenceservice.entity.ReferenceEntity;
import com.example.referenceservice.jpa.ReferenceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/{classId}")
//@CrossOrigin(origins = {"http://localhost:3000"})
public class ReferenceController {

    @Autowired
    private ReferenceRepository referenceRepository;


//    @Autowired
//    public NoticeController(NoticeRepository noticeRepository) {
//        this.noticeRepository = noticeRepository;
//    }

    @GetMapping("/reference/findall")
    public List<ReferenceEntity> allSearchReference(){
        return referenceRepository.findAll();
    }

    @GetMapping("/reference/{referenceId}")
    public List<ReferenceEntity> searchReference(@PathVariable String referenceId , @RequestBody ReferenceEntity referenceEntity){
        final List<ReferenceEntity> referenceList =
                referenceRepository.findReferenceEntityByReferenceId(
                        referenceEntity.getReferenceId()
                );
        return referenceList;
    }

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

    @DeleteMapping("/reference")
    public void deleteReference(@RequestBody ReferenceEntity referenceEntity){
        referenceRepository.deleteById(referenceEntity.getClassId());
    }

}