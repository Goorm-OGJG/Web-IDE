package com.ogjg.back.file.controller;

import com.ogjg.back.common.ControllerTest;
import com.ogjg.back.file.dto.request.CreateFileRequest;
import com.ogjg.back.file.dto.request.UpdateFileRequest;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.ResultActions;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.BDDMockito.doNothing;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class FileControllerTest extends ControllerTest {


    public static final String PREFIX = "/api/containers/{containerId}/files";

    @DisplayName("파일 생성")
    @Test
    public void createFile() throws Exception {
        //given
        CreateFileRequest request = CreateFileRequest.builder()
                .uuid("uuid")
                .build();

        doNothing().when(fileService).createFile(anyLong(), anyString(), anyString());

        //when
        ResultActions result = this.mockMvc.perform(
                post(PREFIX, 1L)
                        .queryParam("filePath", "{filePath}")
                        .content(objectMapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
        );

        //then
        result.andDo(document("file/create",
                preprocessRequest(prettyPrint()),
                preprocessResponse(prettyPrint()),
                pathParameters(
                        parameterWithName("containerId").description("컨테이너 ID")
                ),
                queryParameters(
                        parameterWithName("filePath").description("생성할 파일 전체 경로")
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

    @DisplayName("파일 삭제")
    @Test
    public void deleteFile() throws Exception {
        //given
        doNothing().when(fileService).deleteFile(anyLong(), anyString());

        //when
        ResultActions result = this.mockMvc.perform(
                delete(PREFIX, 1L)
                        .queryParam("filePath", "{filePath}")
                        .accept(MediaType.APPLICATION_JSON)
        );

        //then
        result.andDo(document("file/delete",
                preprocessRequest(prettyPrint()),
                preprocessResponse(prettyPrint()),
                pathParameters(
                        parameterWithName("containerId").description("컨테이너 ID")
                ),
                queryParameters(
                        parameterWithName("filePath").description("삭제할 파일 전체 경로")
                ),
                responseFields(
                        fieldWithPath("status.code").description("응답 코드"),
                        fieldWithPath("status.message").description("응답 메시지"),
                        fieldWithPath("data").description("응답 데이터")
                )
        )).andExpect(status().isOk());
    }

    @DisplayName("파일 수정")
    @Test
    public void updateFile() throws Exception {
        //given
        UpdateFileRequest request = UpdateFileRequest.builder()
                .content("content...\n I'am a cbum. muscle king.\n" +
                        "do you know?")
                .build();

        doNothing().when(fileService).updateFile(anyLong(), anyString(), any(UpdateFileRequest.class));

        //when
        ResultActions result = this.mockMvc.perform(
                put(PREFIX, 1L)
                        .queryParam("filePath", "{filePath}")
                        .content(objectMapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
        );

        //then
        result.andDo(document("file/update",
                preprocessRequest(prettyPrint()),
                preprocessResponse(prettyPrint()),
                pathParameters(
                        parameterWithName("containerId").description("컨테이너 ID")
                ),
                queryParameters(
                        parameterWithName("filePath").description("수정할 파일의 전체 경로")
                ),
                requestFields(
                        fieldWithPath("content").description("수정할 파일의 전체 내용")
                ),
                responseFields(
                        fieldWithPath("status.code").description("응답 코드"),
                        fieldWithPath("status.message").description("응답 메시지"),
                        fieldWithPath("data").description("응답 데이터")
                )
        )).andExpect(status().isOk());
    }

    @DisplayName("파일 이름 수정")
    @Test
    public void updateFilename() throws Exception {
        //given
        doNothing().when(fileService).updateFilename(anyLong(), anyString(), anyString());

        //when
        ResultActions result = this.mockMvc.perform(
                put(PREFIX + "/rename", 1L)
                        .queryParam("filePath","{filePath}")
                        .queryParam("newFilename", "{newFilename}")
                        .accept(MediaType.APPLICATION_JSON)
        );

        //then
        result.andDo(document("file/rename",
                preprocessRequest(prettyPrint()),
                preprocessResponse(prettyPrint()),
                pathParameters(
                        parameterWithName("containerId").description("컨테이너 ID")
                ),
                queryParameters(
                        parameterWithName("filePath").description("수정할 파일의 전체 경로"),
                        parameterWithName("newFilename").description("새로 지정할 파일 이름")
                ),
                responseFields(
                        fieldWithPath("status.code").description("응답 코드"),
                        fieldWithPath("status.message").description("응답 메시지"),
                        fieldWithPath("data").description("응답 데이터")
                )
        )).andExpect(status().isOk());
    }
}
