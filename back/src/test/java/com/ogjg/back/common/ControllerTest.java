package com.ogjg.back.common;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ogjg.back.container.controller.ContainerController;
import com.ogjg.back.container.service.ContainerService;
import com.ogjg.back.file.controller.FileController;
import com.ogjg.back.file.service.FileService;
import com.ogjg.back.s3.service.S3ProfileImageService;
import com.ogjg.back.user.controller.UserController;
import com.ogjg.back.user.service.EmailAuthService;
import com.ogjg.back.user.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.RegisterExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.restdocs.RestDocumentationContextProvider;
import org.springframework.restdocs.RestDocumentationExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.documentationConfiguration;

@AutoConfigureRestDocs
@WebMvcTest({
        UserController.class,
        ContainerController.class,
        FileController.class
})
public class ControllerTest {

    @RegisterExtension
    final RestDocumentationExtension restDocumentation = new RestDocumentationExtension();

    // providing an output directory when creating it
    @BeforeEach
    void setUp(WebApplicationContext webApplicationContext, RestDocumentationContextProvider restDocumentation) throws Exception {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext)
                .apply(documentationConfiguration(restDocumentation))
                .build();
    }

    @Autowired
    protected MockMvc mockMvc;

    @Autowired
    protected ObjectMapper objectMapper;

    @MockBean
    protected UserService userService;

    @MockBean
    protected ContainerService containerService;

    @MockBean
    protected EmailAuthService emailAuthService;

    @MockBean
    protected S3ProfileImageService s3ProfileImageService;

    @MockBean
    protected FileService fileService;
}
