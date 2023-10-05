package com.ogjg.back.file.repository;

import com.ogjg.back.file.domain.File;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface FileRepository extends JpaRepository<File, String> {

    @Query("""
    select f.uuid from File f join f.container c on f.container.containerId = c.containerId
    where c.containerId = :containerId
    and f.path = :key
    and f.name = :filename
""")
    Optional<String> findUuid(@Param("containerId") Long containerId, @Param("key") String key, @Param("filename") String filename);
}
