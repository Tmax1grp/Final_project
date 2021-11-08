package com.example.lectureservice.controller;

import com.example.lectureservice.entity.LectureEntity;
import com.example.lectureservice.jpa.LectureRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/lecture-service")
public class LectureController {

    @Autowired
    private LectureRepository lectureRepository;

    @GetMapping("/students") // 수강생 목록 (강사 , 수강생)
    public List<LectureEntity> readStudent(
            @RequestParam("classroomId") Long classroomId
    ){
        return lectureRepository.findByClassroomId(classroomId);
    }
    @PostMapping("/students") // classroom, userid, status - 수강 신청
    public String createStudent(
            @RequestParam(value = "classroomId",required = false) Long classroomId,
            @RequestParam(value = "userId",required = false) Long userId,
            @RequestParam(value = "userName",required = false) String userName,
            @RequestParam(value = "role",required = false) String role,
            @RequestParam(value = "status",required = false) Integer status
    ){

        List<LectureEntity> lectureSearch = lectureRepository.findByClassroomIdAndUserId(classroomId, userId);

        if(lectureSearch.isEmpty()){
            LectureEntity lecture = new LectureEntity();

            lecture.setClassroomId(classroomId);
            lecture.setUserId(userId);
            lecture.setUserName(userName);
            lecture.setRole(role);
            lecture.setStatus(status);

            lectureRepository.save(lecture);
            return "수강 신청이 완료 되었습니다.";
        }else {
            return "이미 수강 신청을 하였습니다.";
        }
    }

    @PutMapping("/students") // classroom, userid, role, status - 수강 취소 / 수강생 상태 변경(0:신청 -> 1:승인 등)
    public String updateStudent(
            @RequestParam(value = "classroomId") Long classroomId,
            @RequestParam(value = "userId") Long userId,
            @RequestParam(value = "status") Integer status
    ){
        List<LectureEntity> search = lectureRepository.findByClassroomId(classroomId);
        if(search.isEmpty()){
            return Long.toString(userId)+"는 없습니다";
        }
        else {

            LectureEntity lectureSearch = lectureRepository.findLectureEntityByClassroomIdAndUserId(classroomId, userId);
            lectureSearch.setStatus(status);
            lectureRepository.save(lectureSearch);
            return Integer.toString(status)+"로 변경 되었습니다.";
        }

    }

    @DeleteMapping("/students") // classroom, userid - 수강생 삭제
    public void deleteStudent(
            @RequestParam(value = "classroomId") Long classroomId,
            @RequestParam(value = "userId") Long userId
    ){
        LectureEntity lectureSearch = lectureRepository.findLectureEntityByClassroomIdAndUserId(classroomId, userId);
        lectureRepository.deleteById(lectureSearch.getLectureId());
    }
}
