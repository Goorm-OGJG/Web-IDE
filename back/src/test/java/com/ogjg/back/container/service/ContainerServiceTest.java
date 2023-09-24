package com.ogjg.back.container.service;

import com.ogjg.back.container.domain.Container;
import com.ogjg.back.container.dto.request.ContainerCreateRequest;
import com.ogjg.back.container.dto.response.ContainerNameCheckResponse;
import com.ogjg.back.container.repository.ContainerRepository;
import com.ogjg.back.user.domain.User;
import com.ogjg.back.user.domain.UserStatus;
import com.ogjg.back.user.exception.NotFoundUser;
import com.ogjg.back.user.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.BDDMockito.*;

@ExtendWith(MockitoExtension.class)
public class ContainerServiceTest {

    @InjectMocks
    private ContainerService containerService;

    @Mock
    private ContainerRepository containerRepository;

    @Mock
    private UserRepository userRepository;

    private User user;

    @BeforeEach
    public void setUser() {
        user = User.builder()
                .email("ogjg1234@naver.com")
                .password("1q2w3e4r!")
                .name("김회원")
                .userImg("temp_url : {bucket-name}.s3.{region-code}.amazonaws.com/ogjg1234@naver.com/{fileName}")
                .userStatus(UserStatus.ACTIVE)
                .build();
    }

    @DisplayName("컨테이너 생성 - 유효한 요청이면 컨테이너 생성")
    @Test
    public void createContainer() {
        // given
        String loginEmail = "ogjg1234@naver.com";
        ContainerCreateRequest request = ContainerCreateRequest.builder()
                .name("컨테이너1")
                .description("자바 연습")
                .isPrivate(false)
                .language("Java")
                .build();

        given(userRepository.findByEmail(loginEmail))
                .willReturn(Optional.of(user));

        // when
        containerService.createContainer(loginEmail, request);

        // then
        then(containerRepository).should().save(any(Container.class));
    }

    @DisplayName("컨테이너 생성 - 유저가 존재하지 않는 경우")
    @Test
    public void createContainer_userNotFound() {
        // given
        String loginEmail = "nonexistent@naver.com";
        ContainerCreateRequest request = ContainerCreateRequest.builder()
                .name("컨테이너1")
                .description("자바 연습")
                .isPrivate(false)
                .language("Java")
                .build();

        given(userRepository.findByEmail(loginEmail))
                .willReturn(Optional.empty());

        // when, then
        assertThatThrownBy(() -> containerService.createContainer(loginEmail, request))
                .isInstanceOf(NotFoundUser.class);
    }

    @DisplayName("컨테이너 이름 중복 체크 - 이름이 존재한다면 true를 반환")
    @Test
    public void checkDuplication_true() {
        // given
        String containerName = "컨테이너1";
        String loginEmail = "ogjg1234@naver.com";

        Container container = Container.builder()
                .build();

        given(containerRepository.findByNameAndEmail(eq(containerName), eq(loginEmail)))
                .willReturn(Optional.of(container));

        // when
        ContainerNameCheckResponse response = containerService.checkDuplication(containerName, loginEmail);

        // then
        assertThat(response.isDuplicated()).isTrue();
    }


    @DisplayName("컨테이너 이름 중복 체크 - 이름이 존재하지 않는다면 false를 반환")
    @Test
    public void checkDuplication_false() {
        // given
        String containerName = "컨테이너1";
        String loginEmail = "ogjg1234@naver.com";

        Container container = Container.builder()
                .build();

        given(containerRepository.findByNameAndEmail(eq(containerName), eq(loginEmail)))
                .willReturn(Optional.empty());

        // when
        ContainerNameCheckResponse response = containerService.checkDuplication(containerName, loginEmail);

        // then
        assertThat(response.isDuplicated()).isFalse();
    }
}

