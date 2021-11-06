package com.example.assignmentservice.jpa;

import com.example.assignmentservice.entity.AssignmentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AssignmentRepository extends JpaRepository<AssignmentEntity, Long> {
    List<AssignmentEntity> findAssignmentEntityByAssignmentId(Long AssignmentId);


    AssignmentEntity findByAssignmentId(Long assignmentId);

//    @Query(
//            value = "SELECT * FROM notice WHERE notice.title LIKE :notice.title OR notice.author LIKE :notice.author",
//            nativeQuery = true)
//    List<NoticeEntity> findByClassIdAndAuthor(Long noticeId, String author);
//    List<NoticeEntity> findByClassIdAndTitle(Long noticeId, String title);
//

    @Query(
            value = " SELECT * FROM assignment " +
                    "WHERE class_id LIKE :ClassId " +
                    "AND author LIKE %:Author%  "
            , nativeQuery = true
    )
    List<AssignmentEntity> findByClassIdAndAuthor(@Param("ClassId") Long classId, @Param("Author") String author);

    @Query(
            value = " SELECT * FROM assignment " +
                    "WHERE class_id LIKE :ClassId " +
                    "AND title LIKE %:Title%  "
            , nativeQuery = true
    )
    List<AssignmentEntity> findByClassIdAndTitle(@Param("ClassId") Long classId, @Param("Title") String title);

    List<AssignmentEntity> findByClassId(long classId);


    @Query(value = " SELECT * FROM assignment WHERE assignment_id LIKE :AssignmentId", nativeQuery = true)
    AssignmentEntity findAllBy(@Param("AssignmentId") Long AssignmentId);

}