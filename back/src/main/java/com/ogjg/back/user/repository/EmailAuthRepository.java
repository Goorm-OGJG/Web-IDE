package com.ogjg.back.user.repository;

import com.ogjg.back.user.domain.EmailAuth;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmailAuthRepository extends JpaRepository<EmailAuth, Long> {

    Optional<EmailAuth> findByEmail(String email);

}