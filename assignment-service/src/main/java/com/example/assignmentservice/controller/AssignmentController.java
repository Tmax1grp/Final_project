package com.example.assignmentservice.controller;


import com.example.assignmentservice.entity.AssignmentEntity;
import com.example.assignmentservice.jpa.AssignmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/{classId}")
public class AssignmentController {


    @Autowired
    private AssignmentRepository assignmentRepository;



// 전체조회
@GetMapping("/assignment/all/{page}")
public Page<AssignmentEntity> allSearchAssignment( @PathVariable Long classId, @PathVariable int page){
    if(page <= 1)
        page = 1;
    PageRequest pageRequest = PageRequest.of(page-1, 10,Sort.Direction.DESC,("assignmentId") );
//    return noticeRepository.findAll(PageRequest.of(1,10, Sort.Direction.DESC,"noticeId"));
    return assignmentRepository.findByClassId(classId ,pageRequest);
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
    @PutMapping("/assignment/search/{page}")
    public Page<AssignmentEntity> allSearchAssignment(@PathVariable Long classId,
                                              @RequestParam(value = "title", required = false) String title,
                                              @RequestParam(value = "userName", required = false) String userName,
                                              //@RequestBody NoticeEntity noticeEntity,
                                              @PathVariable int page
    ){
        if(page <= 1)
            page = 1;
        PageRequest pageRequest = PageRequest.of(page-1, 10,Sort.Direction.DESC,("assignment_id") );
        PageRequest pageRequestall = PageRequest.of(page-1, 10,Sort.Direction.DESC,("assignmentId") );

//        if(noticeEntity.getTitle().length() > 0){
        if(title != ""){
            return assignmentRepository.findByClassIdTitle(classId, title, pageRequest);
        }
        else if(userName != ""){
//        else if(noticeEntity.getUserName().length() > 0){
            return assignmentRepository.findByClassIdUserName(classId,userName, pageRequest);
        }
        else{
            return assignmentRepository.findByClassId(classId, pageRequestall);
        }
    }


    //글 작성
    @PostMapping("/assignment")
    public void createAssignment(@RequestBody AssignmentEntity assignmentEntity){
        AssignmentEntity assignment = new AssignmentEntity();
        assignment.setClassId(assignmentEntity.getClassId());
        assignment.setTitle(assignmentEntity.getTitle());
        assignment.setClickCnt(0L);
        assignment.setDelYn("0");
        assignment.setContent(assignmentEntity.getContent());
//        assignment.setContent("asdfsdfsdf");
        assignment.setUserName(assignmentEntity.getUserName());
        assignment.setUserId(assignmentEntity.getUserId());
        assignment.setAttach("1");
        assignment.setCreateDate(LocalDateTime.now());

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
    public void deleteAssignment( @PathVariable Long assignmentId){
//    public void deleteNotice( @PathVariable Long noticeId, @RequestBody NoticeEntity noticeEntity){
//        noticeRepository.deleteById(noticeEntity.getNoticeId());
        assignmentRepository.deleteById(assignmentId);
    }



}
