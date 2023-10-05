package com.ogjg.back.container.repository;

import com.ogjg.back.container.domain.Container;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ContainerRepository extends JpaRepository<Container, Long> {

    @Query("""
        select c from Container c 
            join c.user u
            where c.name =:containerName 
            and c.user.email =:email
    """)
    Optional<Container> findByNameAndEmail(
            @Param("containerName") String containerName,
            @Param("email")String email
    );

    List<Container> findAllByName(String email);

    List<Container> findAllByNameContainingAndUserEmail(String query, String email);
}
