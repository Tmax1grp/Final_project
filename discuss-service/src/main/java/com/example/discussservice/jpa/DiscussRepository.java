package com.example.discussservice.jpa;

import com.example.discussservice.entity.DiscussEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DiscussRepository extends JpaRepository<DiscussEntity, Long> {
    List<DiscussEntity> findDiscussEntityByDiscussId(Long discussId);
}
