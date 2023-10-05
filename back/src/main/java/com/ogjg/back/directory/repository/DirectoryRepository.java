package com.ogjg.back.directory.repository;

import com.ogjg.back.file.domain.Path;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DirectoryRepository extends JpaRepository<Path, String> {
}
