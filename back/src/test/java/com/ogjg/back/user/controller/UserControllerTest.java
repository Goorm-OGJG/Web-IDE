package com.ogjg.back.user.controller;

import com.ogjg.back.common.ControllerTest;
import com.ogjg.back.user.dto.request.InfoUpdateRequest;
import com.ogjg.back.user.dto.request.PasswordUpdateRequest;
import com.ogjg.back.user.dto.response.ImgUpdateResponse;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.web.multipart.MultipartFile;

import static org.mockito.BDDMockito.*;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.multipart;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.patch;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.partWithName;
import static org.springframework.restdocs.request.RequestDocumentation.requestParts;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class UserControllerTest extends ControllerTest {

    @DisplayName("프로필 사진 업로드(변경 시 덮어씀)")
    @Test
    public void updateImg() throws Exception {
        //given
        String originFilename = "filename.jpg";
        String loginEmail = "ogjg1234@naver.com";
        String url = "https://{bucket}.{region}.amazonaws.com/"+loginEmail+"/"+originFilename;
        MockMultipartFile multipartFile = new MockMultipartFile("img", originFilename, "image/jpeg", "image content".getBytes());

        ImgUpdateResponse response = ImgUpdateResponse.builder()
                .url(url)
                .build();

        given(userService.updateImg(any(MultipartFile.class), eq(loginEmail)))
                .willReturn(response);

        //when
        ResultActions result = this.mockMvc.perform(
                multipart("/api/users/img")
                        .file(multipartFile)
                        .with(request -> {
                            request.setMethod("PATCH");
                            return request;
                        })
        );

        //then
        result.andDo(document("user/img",
                preprocessRequest(prettyPrint()),
                preprocessResponse(prettyPrint()),
                requestParts(
                        partWithName("img").description("업로드할 이미지 데이터")
                ),
                responseFields(
                        fieldWithPath("status.code").description("응답 코드"),
                        fieldWithPath("status.message").description("응답 메시지"),
                        fieldWithPath("data.url").description("업로드된 이미지의 url 주소")
                )
        )).andExpect(status().isOk());
    }


    @DisplayName("회원 정보 변경")
    @Test
    public void updateInfo() throws Exception {
        //given
        String loginEmail = "ogjg1234@naver.com";
        String newName = "이동진";

        InfoUpdateRequest request = InfoUpdateRequest.builder()
                .name(newName)
                .build();

        doNothing().when(userService).updateInfo(any(InfoUpdateRequest.class), eq(loginEmail));

        //when
        ResultActions result = this.mockMvc.perform(
                patch("/api/users/info")
                        .content(objectMapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON)
        );

        //then
        result.andDo(document("user/info",
                preprocessRequest(prettyPrint()),
                preprocessResponse(prettyPrint()),
                requestFields(
                        fieldWithPath("name").description("변경할 새 이름")
                )
         )).andExpect(status().isOk());
     }

    @DisplayName("회원 비밀번호 변경")
    @Test
    public void updatePassword() throws Exception {
        //given
        String loginEmail = "ogjg1234@naver.com";
        String currentPassword = "1q2w3e4r!";
        String newPassword = "1q2w3e4r!@#";

        PasswordUpdateRequest request = PasswordUpdateRequest.builder()
                .currentPassword(currentPassword)
                .newPassword(newPassword)
                .build();

        doNothing().when(userService).updatePassword(any(PasswordUpdateRequest.class), eq(loginEmail));

        //when
        ResultActions result = this.mockMvc.perform(
                patch("/api/users/password")
                        .content(objectMapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
        );

        //then
        result.andDo(document("user/password",
                preprocessRequest(prettyPrint()),
                preprocessResponse(prettyPrint()),
                requestFields(
                        fieldWithPath("currentPassword").description("검증할 현재 비밀번호"),
                        fieldWithPath("newPassword").description("새 비밀번호")
                )
        )).andExpect(status().isOk());
    }

    @DisplayName("회원 탈퇴")
    @Test
    public void deactivate() throws Exception {
        //given
        String loginEmail = "ogjg1234@naver.com";

        doNothing().when(userService).deactivate(eq(loginEmail));

        //when
        ResultActions result = this.mockMvc.perform(
                patch("/api/users/deactivate")
        );

        //then
        result.andDo(document("user/deactivate",
                preprocessRequest(prettyPrint()),
                preprocessResponse(prettyPrint())
        )).andExpect(status().isOk());
    }
}
