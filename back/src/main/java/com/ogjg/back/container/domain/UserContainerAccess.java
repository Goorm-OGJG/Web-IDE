package com.ogjg.back.container.domain;

import jakarta.persistence.Embeddable;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.io.Serializable;

import static lombok.AccessLevel.PROTECTED;

@Entity
@NoArgsConstructor(access = PROTECTED)
public class UserContainerAccess {
    @EmbeddedId
    private UserContainerAccessPK id;

    @Embeddable
    @EqualsAndHashCode
    @NoArgsConstructor(access = PROTECTED)
    static class UserContainerAccessPK implements Serializable {
        private String email;
        private Long containerId;

        public UserContainerAccessPK(String email, Long containerId) {
            this.email = email;
            this.containerId = containerId;
        }
    }
}
