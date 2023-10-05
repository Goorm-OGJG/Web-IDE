package com.ogjg.back.common;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ogjg.back.config.security.jwt.JwtUserDetails;
import com.ogjg.back.container.controller.ContainerController;
import com.ogjg.back.container.controller.MainController;
import com.ogjg.back.container.service.ContainerService;
import com.ogjg.back.directory.controller.DirectoryController;
import com.ogjg.back.directory.service.DirectoryService;
import com.ogjg.back.file.controller.FileController;
import com.ogjg.back.file.service.FileService;
import com.ogjg.back.s3.service.S3DirectoryService;
import com.ogjg.back.s3.service.S3ProfileImageService;
import com.ogjg.back.user.controller.UserController;
import com.ogjg.back.user.dto.request.JwtUserClaimsDto;
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
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.documentationConfiguration;

@AutoConfigureRestDocs
@WebMvcTest({
        UserController.class,
        ContainerController.class,
        FileController.class,
        DirectoryController.class,
        MainController.class
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

    // JwtUserDetails 객체 생성
    JwtUserDetails userDetails = new JwtUserDetails(
            new JwtUserClaimsDto("ogjg1234@naver.com")
    );

    // SecurityContext에 JwtUserDetails 설정
    SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
        securityContext.setAuthentication(new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities()));
        SecurityContextHolder.setContext(securityContext);
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

    @MockBean
    protected DirectoryService directoryService;

    @MockBean
    protected S3DirectoryService s3DirectoryService;
}
