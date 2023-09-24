package com.ogjg.back.user.service;

import com.ogjg.back.user.domain.User;
import com.ogjg.back.user.domain.UserStatus;
import com.ogjg.back.user.exception.NotFoundUser;
import com.ogjg.back.user.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

@SpringBootTest
public class UserServiceIntegrationTest {

    private User user;
    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;

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

    @DisplayName("회원 조회")
    @Test
    @Transactional
    public void findByEmail() throws Exception {
        //given
        String email = "ogjg1234@naver.com";
        userRepository.save(user);

        //when
        User findUser = userService.findByEmail(email);

        //then
        assertThat(findUser.getEmail()).isEqualTo(user.getEmail());
    }

    @DisplayName("회원 조회 예외 - 존재하지 않는 회원")
    @Test
    @Transactional
    public void cannotFoundUser() throws Exception {
        //given
        String wrongEmail = "ogjg5678@naver.com";
        userRepository.save(user);

        //when, then
        assertThatThrownBy(() -> userService.findByEmail(wrongEmail))
                .isInstanceOf(NotFoundUser.class);
    }
}
