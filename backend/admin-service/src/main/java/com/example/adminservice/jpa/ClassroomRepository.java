package com.example.adminservice.jpa;

import com.example.adminservice.entity.ClassroomEntity;
import com.example.adminservice.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ClassroomRepository extends JpaRepository<ClassroomEntity, Long> {
    @Query(value = " SELECT * FROM classroom WHERE class_id LIKE :ClassId", nativeQuery = true)
    ClassroomEntity findAllBy(@Param("ClassId") Long ClassId);
}
