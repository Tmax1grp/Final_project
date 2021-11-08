package com.example.lectureservice.jpa;

import com.example.lectureservice.dto.LectureDto;
import com.example.lectureservice.entity.LectureEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LectureRepository extends JpaRepository<LectureEntity, Long> {

    @Query(
            value = "SELECT * FROM lecture " +
                    "WHERE classroom_id LIKE :ClassroomId "
            , nativeQuery = true
    )
    List<LectureEntity> findByClassroomId(@Param("ClassroomId")Long classroomId);

    @Query(
            value = "SELECT * FROM lecture WHERE classroom_id LIKE :ClassroomId AND user_id LIKE :UserId"
            , nativeQuery = true
    )
    List<LectureEntity> findByClassroomIdAndUserId(@Param("ClassroomId")Long classroomId, @Param("UserId") Long userId);

    @Query(
            value = "SELECT * FROM lecture WHERE classroom_id LIKE :ClassroomId AND user_id LIKE :UserId"
            , nativeQuery = true
    )
    LectureEntity findLectureEntityByClassroomIdAndUserId(@Param("ClassroomId")Long classroomId, @Param("UserId") Long userId);

}
