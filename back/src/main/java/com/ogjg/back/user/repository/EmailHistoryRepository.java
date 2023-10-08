package com.ogjg.back.user.repository;

import com.ogjg.back.user.domain.EmailHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmailHistoryRepository extends JpaRepository<EmailHistory, Long> {
}
