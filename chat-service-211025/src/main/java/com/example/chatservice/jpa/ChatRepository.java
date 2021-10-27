package com.example.chatservice.jpa;

import com.example.chatservice.entity.ChatEntity;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Repository
public interface ChatRepository extends JpaRepository<ChatEntity, Long> {

//    @Query(value =
//            "SELECT * FROM chatdata " +
//                    "WHERE chatdata.class_id LIKE chatdata.class_id = :ClassId " +
//                    "AND ( chatdata.from_id LIKE chatdata.from_id=:FromId " +
//                    "OR chatdata.to_id LIKE chatdata.to_id=:AllId " +
//                    "OR chatdata.to_id LIKE chatdata.to_id=:ToId " +
//                    " )" +
//                    "ORDER BY chatdata.id",
//            nativeQuery = true)
//    List<ChatEntity> findChatEntityByAndClassIdOrFromIdOrToIdOrToId(Long ClassId, String FromId, String AllId, String ToId , Sort sort);

    @Query(value =
            "SELECT * FROM chatdata " +
                    "WHERE class_id LIKE :ClassId " +
                    "AND ( from_id LIKE :FromId " +
                    "OR to_id LIKE '1' " +
                    "OR to_id LIKE :FromId " +
                    " )" +
                    "ORDER BY 'id'"
            , nativeQuery = true)
    List<ChatEntity> findChatEntityByAndClassIdAndFromId(@Param("ClassId") Long ClassId, @Param("FromId") String FromId);
    List<ChatEntity> findChatEntityByAndClassId(Long ClassId, Sort sort);
    List<ChatEntity> findAllById(Long Id);
}
