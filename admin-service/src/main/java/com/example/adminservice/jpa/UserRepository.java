package com.example.adminservice.jpa;

import com.example.adminservice.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository  extends JpaRepository<UserEntity, Long> {
    @Query(value = " SELECT * FROM user WHERE user_id LIKE :UserId", nativeQuery = true)
    UserEntity findAllBy(@Param("UserId") Long UserId);
    UserEntity findByUserId(Long UserId);
}
