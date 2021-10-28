package com.example.classroomservice.controller;

import com.example.classroomservice.entity.ClassroomEntity;
import com.example.classroomservice.jpa.ClassroomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;


@RestController
//@RequestMapping("/classroom-service")
//@CrossOrigin(origins = {"http://localhost:3000"})
public class ClassroomController {

    @Autowired
    private ClassroomRepository classroomRepository;

    @GetMapping("/lectures/findall")
    @ResponseBody
    public List<ClassroomEntity> allSearchClassRoom(){
//        final List<ClassRoomEntity> classList = classRoomRepository.findAll();
        return classroomRepository.findAll();
    }

    @GetMapping("/lectures")
    @ResponseBody
    public List<ClassroomEntity> searchClassroom(@RequestBody ClassroomEntity classroomEntity){
        final List<ClassroomEntity> classList =
                classroomRepository.findClassroomEntityByClassId(
                        classroomEntity.getClassId()
                );
        return classList;
    }

    @PostMapping("/lectures")
    public void createClassRoom(@RequestBody ClassroomEntity classroomEntity){
        ClassroomEntity classRoom = new ClassroomEntity();
        classRoom.setName(classroomEntity.getName());
        classRoom.setImgPath(classroomEntity.getImgPath());
        classRoom.setUserId(classroomEntity.getUserId());
        classRoom.setContent(classroomEntity.getContent());
        classRoom.setParticipantNum(classroomEntity.getParticipantNum());
        classRoom.setStatus(classroomEntity.getStatus());
        classRoom.setCreatedDate(LocalDateTime.now());

        classroomRepository.save(classRoom);
    }

    @DeleteMapping("/lectures")
    public void deleteClassRoom(@RequestBody ClassroomEntity classRoomEntity){
        classroomRepository.deleteById(classRoomEntity.getClassId());
    }

}
