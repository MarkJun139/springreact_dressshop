package com.java.shop.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.java.shop.dto.Login;

@Repository
public interface MemberRepository extends JpaRepository<Login, Long> {
    Optional<Login> findById(String uId);
    
}
