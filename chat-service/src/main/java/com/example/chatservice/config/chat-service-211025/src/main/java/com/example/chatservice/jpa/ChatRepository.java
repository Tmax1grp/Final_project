package com.example.chatservice.jpa;

import com.example.chatservice.entity.ChatEntity;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatRepository extends JpaRepository<ChatEntity, Long> {
    List<ChatEntity> findChatEntityByAndClassIdAndFromIdOrFromIdOrToId(Long ClassId, String FromId, String AllId, String ToId , Sort sort);
    List<ChatEntity> findChatEntityByAndClassId(Long ClassId, Sort sort);
    List<ChatEntity> findAllById(Long Id);
}
