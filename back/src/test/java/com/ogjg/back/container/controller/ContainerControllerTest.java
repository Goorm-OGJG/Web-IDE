package com.ogjg.back.container.controller;

import com.ogjg.back.common.ControllerTest;
import com.ogjg.back.container.dto.request.ContainerCreateRequest;
import com.ogjg.back.container.dto.request.ContainerGetDirectoryResponse;
import com.ogjg.back.container.dto.response.ContainerGetFileResponse;
import com.ogjg.back.container.dto.response.ContainerCheckNameResponse;
import com.ogjg.back.container.dto.response.ContainerGetNodeResponse;
import com.ogjg.back.container.dto.response.ContainerGetResponse;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.ResultActions;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.BDDMockito.*;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.*;
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
                .createContainer(anyString(), eq(request));

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

    @DisplayName("컨테이너 삭제")
    @Test
    public void deleteContainer() throws Exception {
        //given
        ContainerCreateRequest request = ContainerCreateRequest.builder()
                .name("이회장")
                .description("자바 연습 할거야")
                .isPrivate(false)
                .language("Java")
                .build();

        doNothing()
                .when(containerService)
                .deleteContainer(anyLong(), anyString());

        // when
        ResultActions result = this.mockMvc.perform(
                delete("/api/containers/{containerId}", 1L)
                        .accept(MediaType.APPLICATION_JSON)
        );

        // then
        result.andDo(document("container/delete",
                preprocessRequest(prettyPrint()),
                preprocessResponse(prettyPrint()),
                pathParameters(
                        parameterWithName("containerId").description("컨테이너 ID")
                )
        )).andExpect(status().isOk());
    }

    @DisplayName("컨테이너 이름 중복 체크")
    @Test
    public void checkDuplication() throws Exception {
        //given
        ContainerCheckNameResponse response = ContainerCheckNameResponse.builder().build().builder()
                .isDuplicated(true)
                .build();

        given(containerService.checkDuplication(anyString(), anyString()))
                .willReturn(response);

        // when
        ResultActions result = this.mockMvc.perform(
                get("/api/containers/check")
                        .param("name", "{name}")
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

    @DisplayName("컨테이너 모든 구조 가져오기")
    @Test
    public void getContainer() throws Exception {
        //given
        List<String> fileKeys = List.of(
                "/containerName/hello01.md", "/containerName/hello02.md",
                "/containerName/h1/hello1.txt", "/containerName/h1/hello2.txt",
                "/containerName/h1/h2/hello11.txt", "/containerName/h1/h3/hello13.txt"
        );

        List<String> directoryList = List.of("/containerName/",
                "/containerName/h1/", "/containerName/h2/",
                "/containerName/h3/", "/containerName/h4/",
                "/containerName/h1/h2/", "/containerName/h1/h3/"
        );

        List<String> parsedKeys = new ArrayList<>();
        parsedKeys.addAll(fileKeys);
        parsedKeys.addAll(directoryList);

        List<ContainerGetDirectoryResponse> directories = directoryList.stream()
                .map((key) -> ContainerGetDirectoryResponse.builder()
                        .directory(key)
                        .uuid("uuid")
                        .build())
                .toList();

        ContainerGetNodeResponse treeData = ContainerGetNodeResponse.buildTreeFromKeys(parsedKeys);
        List<ContainerGetFileResponse> fileData = fileKeys.stream()
                .map((key) -> ContainerGetFileResponse.builder()
                        .filePath(key)
                        .content("temp data")
                        .uuid("temp uuid")
                        .build())
                .toList();

        ContainerGetResponse response = ContainerGetResponse.builder()
                .language("Java")
                .treeData(treeData)
                .fileData(fileData)
                .directories(directories)
                .build();

        given(containerService.getAllFilesAndDirectories(anyLong(), anyString()))
                .willReturn(response);

        //when
        ResultActions result = this.mockMvc.perform(
                get("/api/containers/{containerId}", 1L)
                        .accept(MediaType.APPLICATION_JSON)
        );

        //then
        result.andDo(
                document("container/get",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(
                                parameterWithName("containerId").description("컨테이너 ID")
                        ),
                        responseFields(
                                fieldWithPath("status.code").description("응답 코드"),
                                fieldWithPath("status.message").description("응답 메시지"),

                                fieldWithPath("data.language").description("프로그래밍 언어"),
                                fieldWithPath("data.treeData.key").description("전체 경로"),
                                fieldWithPath("data.treeData.title").description("해당 디렉토리 혹은 파일의 이름"),
                                fieldWithPath("data.treeData.children[]").description("하위 디렉토리 및 파일들 정보").optional(),
                                fieldWithPath("data.treeData.children[].key").description("하위 항목의 전체 경로").optional(),
                                fieldWithPath("data.treeData.children[].title").description("하위 항목의 이름").optional(),
                                fieldWithPath("data.treeData.children[].children[]").description("...").optional(),
                                fieldWithPath("data.treeData.children[].children[].key").description("...").optional(),
                                fieldWithPath("data.treeData.children[].children[].title").description("...").optional(),
                                fieldWithPath("data.treeData.children[].children[].children[]").description("...").optional(),
                                fieldWithPath("data.treeData.children[].children[].children[].key").description("...").optional(),
                                fieldWithPath("data.treeData.children[].children[].children[].title").description("...").optional(),
                                fieldWithPath("data.fileData[]").description("모든 파일 데이터"),
                                fieldWithPath("data.fileData[].filePath").description("파일 경로"),
                                fieldWithPath("data.fileData[].content").description("파일 내용"),
                                fieldWithPath("data.fileData[].uuid").description("파일 uuid"),
                                fieldWithPath("data.directories[].directory").description("모든 디렉토리 경로"),
                                fieldWithPath("data.directories[].uuid").description("모든 디렉토리 경로")
                        )
                )
        ).andExpect(status().isOk());
     }
}
