package com.ogjg.back.file.repository;

import com.ogjg.back.file.domain.S3PathMap;
import org.springframework.data.jpa.repository.JpaRepository;

public interface S3PathMapRepository extends JpaRepository<S3PathMap, String> {

}
