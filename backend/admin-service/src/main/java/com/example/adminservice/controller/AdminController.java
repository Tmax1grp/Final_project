package com.example.adminservice.controller;


import com.example.adminservice.entity.ClassroomEntity;
import com.example.adminservice.entity.LectureEntity;
import com.example.adminservice.entity.UserEntity;
import com.example.adminservice.jpa.ClassroomRepository;
import com.example.adminservice.jpa.LectureRepository;
import com.example.adminservice.jpa.UserRepository;
import lombok.RequiredArgsConstructor;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor
@RestController
//@RequestMapping("/")
public class AdminController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ClassroomRepository classroomRepository;

    @Autowired
    private LectureRepository lectureRepository;

    @GetMapping("/admin/user/all") //
    public List<UserEntity> readUser(){
        final List<UserEntity> findall = userRepository.findAll();
        return findall;
    }

    // 회원가입은 어드민 X, 유저 자신이 회원가입하기
//    @PostMapping("/admin/user/input")
//    public UserEntity createUser(
//            @RequestParam("email") String email,
//            @RequestParam("password") String password,
//            @RequestParam("userName") String userName,
//            @RequestParam("tel") String tel
//            ){
//        UserEntity user = new UserEntity();
//        user.setEmail(email);
//        user.setUserName(userName);
//        user.setTel(tel);
//        user.setCreatedAt(LocalDateTime.now());
//        userRepository.save(user);
//        return user;
//    }

    @PutMapping("/admin/user/{userId}")
    public UserEntity updateUser(
            @PathVariable Long userId,
//            @RequestParam(value = "password",required = false) String password,
            @RequestParam(value = "userName",required = false) String userName,
            @RequestParam(value = "tel",required = false) String tel
    ){
        UserEntity user = userRepository.findAllBy(userId);

//        if(password.length() > 0){
//            user.setPassword(password);
//        }

        if(userName.length() > 0){
            user.setUserName(userName);
        }

        if(tel.length() > 0){
            user.setTel(tel);
        }

        userRepository.save(user);

        return user;
    }

    @DeleteMapping("/admin/user/{userId}")
    public void deleteUser(@PathVariable Long userId){
        userRepository.deleteById(userId);
    }

    @GetMapping("/admin/classroom/all")
    public List<ClassroomEntity> readClassroom(){
        final List<ClassroomEntity> all = classroomRepository.findAll();
        return all;
    }

    @PostMapping("/admin/classroom/input")
    public ClassroomEntity createClassroom(
            @RequestParam("name") String name,
            @RequestParam("userId") Long userId,
            @RequestParam("content") String content,
            @RequestParam("participantNum") Integer participantNum,
            @RequestParam("status") Integer status
    ){
        ClassroomEntity classroom = new ClassroomEntity();
        classroom.setName(name);
        classroom.setUserId(userId);
        classroom.setContent(content);
        classroom.setParticipantNum(participantNum);
        classroom.setStatus(status);
        classroom.setCreatedDate(LocalDateTime.now());
        classroomRepository.save(classroom);
        return classroom;
    }

    @PutMapping("/admin/classroom/{classId}")
    public ClassroomEntity updateClassroom(
            @PathVariable Long classId,
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "userId", required = false) Long userId,
            @RequestParam(value = "content", required = false) String content,
            @RequestParam(value = "participantNum", required = false) Integer participantNum,
            @RequestParam(value = "status", required = false) Integer status
    ){
        ClassroomEntity classroom = classroomRepository.findAllBy(classId);

        if(name.length() > 0){
            classroom.setName(name);
        }


        if(userId != null){
            classroom.setUserId(userId);
        }
        if(content.length() > 0){
            classroom.setContent(content);
        }

        if(participantNum != null){
            classroom.setParticipantNum(participantNum);
        }
        int k = status;
        if(status != null){
            classroom.setStatus(status);
        }

        classroomRepository.save(classroom);

        lectureRepository.findAllByLecture(classroom.getName(),classroom.getContent(),classroom.getStatus(),classroom.getClassId());
        return classroom;
    }

    @DeleteMapping("/admin/classroom/{classId}")
    public void deleteClassroom(@PathVariable Long classId){
        classroomRepository.deleteById(classId);
        lectureRepository.findLectureEntityByDelete(classId);
//        while (count != 0){
//            LectureEntity delete = lectureRepository.findLectureEntityByDelete(classId).get(count);
//            count--;
//
//        }
    }



    /*

    위에는 admin
    아래는 mypage

     */

    @GetMapping("/mypage/{userId}")
    public UserEntity readMypage(@PathVariable Long userId){
        UserEntity user = userRepository.findAllBy(userId);
        return user;
    }

    //  user-service api 사용하기
//    @PutMapping("/mypage/{userId}")
//    public UserEntity updataMypage(
//            @PathVariable Long userId,
//            @RequestParam(value = "password",required = false) String password,
//            @RequestParam(value = "userName",required = false) String userName,
//            @RequestParam(value = "tel",required = false) String tel){
//
//        UserEntity user = userRepository.findAllBy(userId);
//
//        if(password.length() > 0){
//            user.setPassword(password);
//        }
//
//        if(userName.length() > 0){
//            user.setUserName(userName);
//        }
//
//        if(tel.length() > 0){
//            user.setTel(tel);
//        }
//
//        userRepository.save(user);
//        return user;
//    }


    @DeleteMapping("/mypage/{userId}")
    public void deleteMypage(@PathVariable Long userId){
        userRepository.deleteById(userId);
    }



}
