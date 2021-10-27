package com.example.chatservice.controller;

import com.example.chatservice.entity.ChatEntity;
import com.example.chatservice.jpa.ChatRepository;
import com.example.chatservice.service.S3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.query.Param;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/class")
@CrossOrigin("http://localhost:3000")
public class ChatController {

    @Autowired
    private ChatRepository chatRepository;

    @Autowired
    private final S3Service s3Service;

    @GetMapping("/{classId}/findall")
    public List<ChatEntity> readChat(@PathVariable Long classId) {
        final List<ChatEntity> chatget = chatRepository.findChatEntityByAndClassId(classId, Sort.by("id"));
        return chatget;
    }

    //    SELECT * FROM chat
//    WHERE class_id LIKE '2205'
//    and from_id LIKE '3205'
//    ORDER BY id;
    @GetMapping("/{classId}/lecture")
    @ResponseBody
    public List<ChatEntity> readChat(
            @PathVariable Long classId,
            @RequestParam("fromId") String fromId
    ) {
        final List<ChatEntity> chatall =
                chatRepository.findChatEntityByAndClassIdAndFromId(classId, fromId);
//                chatRepository.findChatEntityByAndClassIdOrFromIdOrToIdOrToId(
//                        classId,
//                        fromId,
//                        "1",
//                        fromId,
//                        Sort.by("id")
//                ); // classId, fromId, 전체, toId, 정렬
        return chatall;
    }

    //    @PostMapping("/images")

//    @PostMapping("/{classId}/lecture")
//
//    public String createChat(@RequestParam("images") MultipartFile multipartFile) throws IOException {
//        s3Service.upload(multipartFile, "static");
//
//        return "test";
//    }

    @PostMapping("/{classId}/lecture")
//    public void createChat(
//            HttpServletRequest req,
//            @RequestParam("fromId") String fromId,
//            @RequestParam("toId") String toId,
//            @RequestParam("chatContent") String chatContent,
//            @PathVariable long classId,
//            @RequestParam("file") MultipartFile multipartFile) throws IOException {
////        public void createChat(@RequestBody ChatEntity chatEntity, @PathVariable long classId, @RequestParam("images") MultipartFile multipartFile) throws IOException{
//
//        if (CollectionUtils.isEmpty(multipartFile)) {
//
//        }
//
//        ChatEntity chat = new ChatEntity();
//        chat.setClassId(classId);
//        chat.setFromId(fromId);
//        chat.setToId(toId);
//        chat.setChatContent(chatContent);
//        chat.setChatDate(LocalDateTime.now());
//
////        s3Service.upload(multipartFile, "static");
//        chatRepository.save(chat);
//    }

    public void createChat(
            @PathVariable long classId,
            @RequestParam("fromId") String fromId,
            @RequestParam("toId") String toId,
            @RequestParam("chatContent") String chatContent

    ) { //, @RequestParam("*") MultipartFile multipartFile) {
//        public void createChat(@RequestBody ChatEntity chatEntity, @PathVariable long classId, @RequestParam("images") MultipartFile multipartFile) throws IOException{
//        if (multipartFile != null) {
//            classId = 1234;
//        }
        ChatEntity chat = new ChatEntity();
        chat.setClassId(classId);
        chat.setFromId(fromId);
        chat.setToId(toId);
        chat.setChatContent(chatContent);
        chat.setChatDate(LocalDateTime.now());

//        if(multipartFile != null){
//            s3Service.upload(multipartFile, "static");
//        }

        chatRepository.save(chat);
    }

    @PutMapping("/{classId}/lecture")
    public String createChat(@RequestParam("*") MultipartFile multipartFile) throws IOException {
        s3Service.upload(multipartFile, "static");
        return "FileIN";
    }

    @DeleteMapping("/{id}")
    public void deleteChat(@PathVariable Long id) {
        chatRepository.deleteById(id);
    }
}
