package com.example.assignmentservice.jpa;

import com.example.assignmentservice.entity.AssignmentEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AssignmentRepository extends JpaRepository<AssignmentEntity, Long> {
    List<AssignmentEntity> findAssignmentEntityByAssignmentId(Long AssignmentId);


    Page<AssignmentEntity> findAll(Pageable pageable);


    AssignmentEntity findByAssignmentId(Long assignmentId);

    Page<AssignmentEntity> findByClassId(Long classId, Pageable pageable);
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
    Page<AssignmentEntity> findByClassIdUserName(@Param("ClassId") Long classId, @Param("UserName") String userName, Pageable pageable);

    @Query(
            value = " SELECT * FROM assignment " +
                    "WHERE class_id LIKE :ClassId " +
                    "AND title LIKE %:Title%  "
            , nativeQuery = true
    )
    Page<AssignmentEntity> findByClassIdTitle(@Param("ClassId") Long classId, @Param("Title") String title, Pageable pageable);

    List<AssignmentEntity> findByClassId(long classId);


    @Query(value = " SELECT * FROM assignment WHERE assignment_id LIKE :AssignmentId", nativeQuery = true)
    AssignmentEntity findAllBy(@Param("AssignmentId") Long AssignmentId);

}