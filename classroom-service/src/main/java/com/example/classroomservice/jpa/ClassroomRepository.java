package com.example.classroomservice.jpa;

import com.example.classroomservice.entity.ClassroomEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClassroomRepository extends JpaRepository<ClassroomEntity, Long> {
    List<ClassroomEntity> findClassroomEntityByClassId(Long ClassId);
}
