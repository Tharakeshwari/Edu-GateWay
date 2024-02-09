package com.example.edugateway_app.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.edugateway_app.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
