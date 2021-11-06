package com.example.assignmentservice.controller;


import com.example.assignmentservice.entity.AssignmentEntity;
import com.example.assignmentservice.jpa.AssignmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/{classId}")
public class AssignmentController {


    @Autowired
    private AssignmentRepository assignmentRepository;



// 전체조회
    @GetMapping("/assignment/all")
    @ResponseBody
    public List<AssignmentEntity> allSearchAssignment(){

        return assignmentRepository.findAll();
    }


// 조회수, 상세조회

    @GetMapping("/assignment/{assignmentId}")
    public AssignmentEntity searchAssignment(@PathVariable Long assignmentId,
                                     @RequestParam(value = "clickCnt", required = false) Integer clickCnt ){

        AssignmentEntity assignment = assignmentRepository.findByAssignmentId(assignmentId); //    NoticeEntity findByNoticeId(Long noticeId); <- 원형

        int count = 0;
        if(clickCnt == null){
            count = 0;
        }
        else{
            count = 1;
        }
        assignment.setClickCnt(assignment.getClickCnt()+count);
        assignmentRepository.save(assignment);
        return assignment;
    }

    //검색
    @PutMapping("/assignment/search")
    public List<AssignmentEntity> allSearchAssignment(@PathVariable Long classId,
                                              @RequestBody AssignmentEntity assignmentEntity
    ){


        if(assignmentEntity.getTitle().length() > 0){
            return assignmentRepository.findByClassIdAndTitle(classId, assignmentEntity.getTitle());
        }
        else if(assignmentEntity.getAuthor().length() > 0){
            return assignmentRepository.findByClassIdAndAuthor(classId, assignmentEntity.getAuthor());
        }
        else{
            return assignmentRepository.findByClassId(classId);
        }
    }




    //글 작성
    @PostMapping("/assignment")
    public void createAssignment(@RequestBody AssignmentEntity assignmentEntity){
        AssignmentEntity assignment = new AssignmentEntity();
        assignment.setClassId(assignmentEntity.getClassId());
        assignment.setTitle(assignmentEntity.getTitle());
        assignment.setClickCnt(assignmentEntity.getClickCnt());
        assignment.setDelYn(assignmentEntity.getDelYn());
        assignment.setContent(assignmentEntity.getContent());
        assignment.setAuthor(assignmentEntity.getAuthor());
        assignment.setAttach(assignmentEntity.getAttach());
        assignment.setCreatedDate(LocalDateTime.now());

        assignmentRepository.save(assignment);
    }

    //글 수정
    @PutMapping("/assignment/{assignmentId}")
    public AssignmentEntity updateAssignment(
            @PathVariable Long assignmentId,
            @RequestParam(value = "title", required = false) String title,
            @RequestParam(value = "content", required = false) String content

    ) {
        AssignmentEntity assignment = assignmentRepository.findAllBy(assignmentId);

        if (title.length() > 0) {
            assignment.setTitle(title);
        }

        if (content.length() > 0) {
            assignment.setContent(content);
        }


        assignmentRepository.save(assignment);
        return assignment;
    }


    //글 삭제
    @DeleteMapping("/assignment/{assignmentId}")
    public void deleteAssignment(@RequestBody AssignmentEntity assignmentEntity){
        assignmentRepository.deleteById(assignmentEntity.getClassId());
    }


}
