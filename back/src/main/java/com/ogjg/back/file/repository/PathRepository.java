package com.ogjg.back.file.repository;

import com.ogjg.back.file.domain.Path;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface PathRepository extends JpaRepository<Path, String> {

    @Query("""
    select p.uuid from Path p join p.container c on p.container.containerId = c.containerId
    where c.containerId = :containerId
    and p.path = :key
    and p.name = :filename
""")
    Optional<String> findUuid(@Param("containerId") Long containerId, @Param("key") String key, @Param("filename") String filename);

    List<Path> findByPathStartsWith(String prefix);
}
