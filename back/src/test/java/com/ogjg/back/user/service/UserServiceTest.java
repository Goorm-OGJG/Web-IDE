package com.ogjg.back.user.service;

import com.ogjg.back.s3.service.S3ProfileImageService;
import com.ogjg.back.user.domain.User;
import com.ogjg.back.user.dto.response.ImgUpdateResponse;
import com.ogjg.back.user.repository.UserRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.*;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @InjectMocks
    private UserService userService;
    @Mock
    private UserRepository userRepository;
    @Mock
    private S3ProfileImageService s3ProfileImageService;

    @DisplayName("S3에 이미지 업로드 후 url 반환하는지 확인")
    @Test
    public void updateImg() throws Exception {
        //given
        String originFilename = "filename.jpg";
        String loginEmail = "ogjg1234@naver.com";
        String url = "https://{bucket}.{region}.amazonaws.com/"+loginEmail+"/"+originFilename;

        User mockUser = mock(User.class);
        MockMultipartFile multipartFile = new MockMultipartFile("img", originFilename, "image/jpeg", "image content".getBytes());
        User updatedUser = User.builder()
                .userImg(url)
                .build();

        given(userRepository.findByEmail(loginEmail))
                .willReturn(Optional.of(mockUser));
        given(s3ProfileImageService.saveImage(any(MultipartFile.class), any(String.class)))
                .willReturn(url);
        given(mockUser.updateImg(url))
                .willReturn(updatedUser);

        //when
        ImgUpdateResponse response = userService.updateImg(multipartFile, loginEmail);

        //then
        assertThat(response.getUrl()).isEqualTo(url);
    }
}
