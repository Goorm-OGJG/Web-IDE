package com.ogjg.back.s3entry.repository;

import com.ogjg.back.s3entry.domain.S3Entry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface S3EntryRepository extends JpaRepository<S3Entry, String> {

    @Query("""
    select se.uuid from S3Entry se join se.container c on se.container.containerId = c.containerId
    where c.containerId = :containerId
    and se.path = :key
    and se.name = :filename
""")
    Optional<String> findUuid(@Param("containerId") Long containerId, @Param("key") String key, @Param("filename") String filename);

    List<S3Entry> findByPathStartsWith(String prefix);
}
