package com.ogjg.back.container.controller;

import com.ogjg.back.common.ControllerTest;
import com.ogjg.back.container.dto.request.ContainerCreateRequest;
import com.ogjg.back.container.dto.response.ContainerNameCheckResponse;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.ResultActions;

import static org.mockito.BDDMockito.*;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.queryParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class ContainerControllerTest extends ControllerTest {

    @DisplayName("컨테이너 생성")
    @Test
    public void create() throws Exception {
        //given
        ContainerCreateRequest request = ContainerCreateRequest.builder()
                .name("이회장")
                .description("자바 연습 할거야")
                .isPrivate(false)
                .language("Java")
                .build();

        doNothing()
                .when(containerService)
                .createContainer(any(String.class), eq(request));

        // when
        ResultActions result = this.mockMvc.perform(
                post("/api/containers")
                        .content(objectMapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
        );

        // then
        result.andDo(document("container/create",
                preprocessRequest(prettyPrint()),
                preprocessResponse(prettyPrint()),
                requestFields(
                        fieldWithPath("name").description("컨테이너 이름"),
                        fieldWithPath("description").description("컨테이너 설명").optional(),
                        fieldWithPath("private").description("비공개 여부"),
                        fieldWithPath("language").description("프로그래밍 언어")
                )
        )).andExpect(status().isOk());
     }

    @DisplayName("컨테이너 이름 중복 체크")
    @Test
    public void checkDuplication() throws Exception {
        //given
        ContainerNameCheckResponse response = ContainerNameCheckResponse.builder()
                .isDuplicated(true)
                .build();

        given(containerService.checkDuplication(any(String.class), any(String.class)))
                .willReturn(response);

        // when
        ResultActions result = this.mockMvc.perform(
                get("/api/containers/check")
                        .param("name", "컨테이너 1")
                        .accept(MediaType.APPLICATION_JSON)
        );

        // then
        result.andDo(document("container/check",
                preprocessRequest(prettyPrint()),
                preprocessResponse(prettyPrint()),
                queryParameters(
                        parameterWithName("name").description("이름")
                ),
                responseFields(
                        fieldWithPath("status.code").description("응답 코드"),
                        fieldWithPath("status.message").description("응답 메시지"),
                        fieldWithPath("data.duplicated").description("중복 여부")
                )
        )).andExpect(status().isOk());
    }
}
