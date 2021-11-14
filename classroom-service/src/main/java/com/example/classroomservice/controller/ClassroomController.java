package com.example.classroomservice.controller;

import com.example.classroomservice.entity.ClassroomEntity;
import com.example.classroomservice.entity.LectureEntity;
import com.example.classroomservice.jpa.ClassroomRepository;
import com.example.classroomservice.jpa.LectureRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor
@RestController
//@RequestMapping("/classroom-service")
//@CrossOrigin(origins = {"http://localhost:3000"})
public class ClassroomController {

    @Autowired
    private ClassroomRepository classroomRepository;

    @Autowired
    private LectureRepository lectureRepository;

    @GetMapping("/lectures/all")
//    @ResponseBody
    public List<LectureEntity> allSearchClassRoom(@RequestParam("userId")Long userId){
//        final List<ClassRoomEntity> classList = classRoomRepository.findAll();
//        return classroomRepository.findAll();
        return lectureRepository.findClassroomEntityByUserId(userId);
    }

//    @GetMapping("/lectures")
//    @ResponseBody
//    public List<ClassroomEntity> searchClassroom(
//            @RequestBody ClassroomEntity classroomEntity){
//        final List<ClassroomEntity> classList =
//                classroomRepository.findClassroomEntityByClassId(
//                        classroomEntity.getClassId()
//                );
//        return classList;
//    }

//    @GetMapping("/lectures")
//    public List<ClassroomEntity> searchClassroom(@RequestParam("classId") Long classId){
//        return classroomRepository.findClassroomEntityByClassId(classId);
//    }

    @PostMapping("/lectures")
    public void createClassRoom(@RequestBody ClassroomEntity classroomEntity){
        ClassroomEntity classRoom = new ClassroomEntity();
        classRoom.setName(classroomEntity.getName());
        classRoom.setImgPath(classroomEntity.getImgPath());
        classRoom.setUserId(classroomEntity.getUserId());
        classRoom.setUserName(classroomEntity.getUserName());
        classRoom.setContent(classroomEntity.getContent());
        classRoom.setParticipantNum(classroomEntity.getParticipantNum());
        classRoom.setStatus(5); // 요거 바꿔야됨
        classRoom.setCreatedDate(LocalDateTime.now());

        classroomRepository.save(classRoom);

        LectureEntity lecture = new LectureEntity();
        lecture.setClassroomId(classRoom.getClassId());
        lecture.setUserId(classRoom.getUserId());
        lecture.setUserName(classRoom.getUserName());
        lecture.setContent(classRoom.getContent());
        lecture.setName(classRoom.getName());
        lecture.setRole("1");
        lecture.setStatus(5);
        lecture.setTeacher(classRoom.getUserName());

        lectureRepository.save(lecture);
;
        int sss = 0;
    }



    @DeleteMapping("/lectures")
    public void deleteClassRoom(Long classId){
        classroomRepository.deleteById(classId);
        //lecture에도 지워져야됨
    }

}
