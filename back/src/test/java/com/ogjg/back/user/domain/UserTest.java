package com.ogjg.back.user.domain;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.assertj.core.api.Assertions.assertThat;

public class UserTest {

    private User user;

    @BeforeEach
    public void setUp() {
        PasswordEncoder encoder = new BCryptPasswordEncoder();

        user = User.builder()
                .email("ogjg1234@naver.com")
                .password(encoder.encode("1q2w3e4r!"))
                .name("김회원")
                .userImg("temp_url : {bucket-name}.s3.{region-code}.amazonaws.com/" + 1L + "/{fileName}")
                .userStatus(UserStatus.ACTIVE)
                .build();
    }

    @DisplayName("회원 이미지 업로드")
    @Test
    public void updateImg() throws Exception {
        //given
        String newUrl = "updated.img";

        //when
        User updatedUser = user.updateImg(newUrl);

        //then
        assertThat(updatedUser.getUserImg()).isEqualTo(newUrl);
     }

    @DisplayName("회원 정보 변경")
    @Test
    public void updateInfo() throws Exception {
        //given
        String newName = "김회장";

        //when
        User updatedUser = user.updateInfo(newName);

        //then
        assertThat(updatedUser.getName()).isEqualTo(newName);
    }

    @DisplayName("회원 비밀번호 변경")
    @Test
    public void updatePassword() throws Exception {
        //given
        PasswordEncoder encoder = new BCryptPasswordEncoder();
        String newPassword = encoder.encode("1q2w3e4r@");

        //when
        User updatedUser = user.updatePassword(newPassword);

        //then
        assertThat(updatedUser.getPassword()).isEqualTo(newPassword);
    }

    @DisplayName("회원 탈퇴")
    @Test
    public void deactivate() throws Exception {
        //given

        //when
        User updatedUser = user.deactivate();

        //then
        assertThat(updatedUser.getUserStatus()).isEqualTo(UserStatus.INACTIVE);
    }
}
