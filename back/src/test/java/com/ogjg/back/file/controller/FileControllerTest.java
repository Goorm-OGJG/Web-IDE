package com.ogjg.back.file.controller;

import com.ogjg.back.common.ControllerTest;
import com.ogjg.back.file.dto.request.CreateFileRequest;
import com.ogjg.back.file.dto.request.DeleteFileRequest;
import com.ogjg.back.file.dto.request.UpdateFileRequest;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.ResultActions;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.doNothing;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.delete;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class FileControllerTest extends ControllerTest {

    @DisplayName("파일 생성")
    @Test
    public void createFile() throws Exception {
        //given
        CreateFileRequest request = CreateFileRequest.builder()
                .filePath("/my-container1/hello.txt")
                .build();

        doNothing().when(fileService).createFile(any(String.class), any(CreateFileRequest.class));

        //when
        ResultActions result = this.mockMvc.perform(
                post("/api/files")
                        .content(objectMapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
        );

        //then
        result.andDo(document("file/create",
                preprocessRequest(prettyPrint()),
                preprocessResponse(prettyPrint()),
                requestFields(
                        fieldWithPath("filePath").description("생성할 파일 전체 경로")
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
        DeleteFileRequest request = DeleteFileRequest.builder()
                .filePath("/my-container1/hello")
                .build();

        doNothing().when(fileService).deleteFile(any(String.class), any(DeleteFileRequest.class));

        //when
        ResultActions result = this.mockMvc.perform(
                delete("/api/files")
                        .content(objectMapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
        );

        //then
        result.andDo(document("file/delete",
                preprocessRequest(prettyPrint()),
                preprocessResponse(prettyPrint()),
                requestFields(
                        fieldWithPath("filePath").description("삭제할 파일 전체 경로")
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
                .filePath("/my-container1/hello")
                .build();

        doNothing().when(fileService).updateFile(any(String.class), any(UpdateFileRequest.class));

        //when
        ResultActions result = this.mockMvc.perform(
                delete("/api/files")
                        .content(objectMapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
        );

        //then
        result.andDo(document("file/update",
                preprocessRequest(prettyPrint()),
                preprocessResponse(prettyPrint()),
                requestFields(
                        fieldWithPath("filePath").description("수정할 파일 전체 경로"),
                        fieldWithPath("content").description("수정한 파일 전체 내용")
                ),
                responseFields(
                        fieldWithPath("status.code").description("응답 코드"),
                        fieldWithPath("status.message").description("응답 메시지"),
                        fieldWithPath("data").description("응답 데이터")
                )
        )).andExpect(status().isOk());
    }
}
