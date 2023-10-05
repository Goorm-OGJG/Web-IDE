package com.ogjg.back.container.controller;

import com.ogjg.back.common.ControllerTest;
import com.ogjg.back.container.dto.request.ContainerCreateRequest;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.ResultActions;

import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.doNothing;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.delete;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class MainControllerTest extends ControllerTest {

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
                delete("/api/main/containers/{containerId}", 1L)
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
}
