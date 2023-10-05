package com.ogjg.back.directory.controller;

import com.ogjg.back.common.ControllerTest;
import com.ogjg.back.directory.dto.request.CreateDirectoryRequest;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.ResultActions;

import static org.mockito.BDDMockito.any;
import static org.mockito.BDDMockito.doNothing;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.queryParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class DirectoryControllerTest extends ControllerTest {

    @DisplayName("디렉토리 생성 - 해당 컨테이너가 존재하고, 해당 경로가 존재하지 않는다면 디렉토리를 생성한다.")
    @Test
    public void createDirectory() throws Exception {
        //given
        CreateDirectoryRequest request = CreateDirectoryRequest.builder()
                .uuid("uuid")
                .build();

        doNothing().when(directoryService).createDirectory(any(String.class), any(String.class), any(CreateDirectoryRequest.class));

        //when
        ResultActions result = this.mockMvc.perform(
                post("/api/directories")
                        .queryParam("directoryPath", "{directoryPath}")
                        .content(objectMapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
        );

        //then
        result.andDo(document("directory/create",
                preprocessRequest(prettyPrint()),
                preprocessResponse(prettyPrint()),
                queryParameters(
                        parameterWithName("directoryPath").description("생성할 디렉토리 전체 경로")
                ),
                requestFields(
                        fieldWithPath("uuid").description("key값으로 사용하는 uuid")
                ),
                responseFields(
                        fieldWithPath("status.code").description("응답 코드"),
                        fieldWithPath("status.message").description("응답 메시지"),
                        fieldWithPath("data").description("응답 데이터")
                )
        )).andExpect(status().isOk());
     }

    @DisplayName("디렉토리 삭제")
    @Test
    public void deleteDirectory() throws Exception {
        //given
        doNothing().when(directoryService).deleteDirectory(any(String.class), any(String.class));

        //when
        ResultActions result = this.mockMvc.perform(
                delete("/api/directories")
                        .queryParam("directoryPath", "{directoryPath}")
                        .accept(MediaType.APPLICATION_JSON)
        );

        //then
        result.andDo(document("directory/delete",
                preprocessRequest(prettyPrint()),
                preprocessResponse(prettyPrint()),
                queryParameters(
                        parameterWithName("directoryPath").description("삭제할 디렉토리 전체 경로")
                ),
                responseFields(
                        fieldWithPath("status.code").description("응답 코드"),
                        fieldWithPath("status.message").description("응답 메시지"),
                        fieldWithPath("data").description("응답 데이터")
                )
        )).andExpect(status().isOk());
    }

    @DisplayName("디렉토리 이름 수정")
    @Test
    public void updateDirectoryName() throws Exception {
        //given
        doNothing().when(directoryService).updateDirectoryName(any(String.class), any(String.class), any(String.class));

        //when
        ResultActions result = this.mockMvc.perform(
                put("/api/directories/rename")
                        .queryParam("directoryPath", "{directoryPath}")
                        .queryParam("newDirectoryName", "{newDirectoryName}")
                        .accept(MediaType.APPLICATION_JSON)
        );

        //then
        result.andDo(document("directory/rename",
                preprocessRequest(prettyPrint()),
                preprocessResponse(prettyPrint()),
                queryParameters(
                        parameterWithName("directoryPath").description("수정할 디렉토리의 기존 전체 경로"),
                        parameterWithName("newDirectoryName").description("새로 지은 디렉토리의 이름")
                ),
                responseFields(
                        fieldWithPath("status.code").description("응답 코드"),
                        fieldWithPath("status.message").description("응답 메시지"),
                        fieldWithPath("data").description("응답 데이터")
                )
        )).andExpect(status().isOk());
     }
}
