package com.ogjg.back.s3.service;

import com.ogjg.back.container.dto.response.ContainerGetFileResponse;
import com.ogjg.back.container.dto.response.ContainerGetNodeResponse;
import com.ogjg.back.s3.exception.S3ContainerUploadException;
import com.ogjg.back.s3.repository.S3ContainerRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.ogjg.back.common.util.S3PathUtil.createEmailRemovedKey;

@Slf4j
@Service
@RequiredArgsConstructor
public class S3ContainerService {

    private final S3ContainerRepository s3ContainerRepository;

    @Transactional
    public String createContainer(String directory) {
        return s3ContainerRepository.uploadDirectory(directory)
                .orElseThrow(() -> new S3ContainerUploadException());
    }

    @Transactional(readOnly = true)
    public List<String> getAllKeysByPrefix(String prefix) {
        return s3ContainerRepository.getAllObjectsByPrefix(prefix).stream()
                .map((s3Object) -> s3Object.key())
                .toList();
    }

    /**
     * 컨테이너 모든 구조 가져오기 - treeData 생성
     * 이메일 경로를 제외한 구조를 응답값에 포함해야 하므로 절삭된 키 사용
     */
    @Transactional(readOnly = true)
    public ContainerGetNodeResponse buildTreeFromKeys(List<String> parsedKeys) {
        return ContainerGetNodeResponse.buildTreeFromKeys(parsedKeys);
    }

    /**
     * 컨테이너 모든 구조 가져오기 - fileData 생성
     * 전체 경로인 키로 조회해서 데이터를 가져와야해서 원래 키로 조회
     */
    @Transactional(readOnly = true)
    public List<ContainerGetFileResponse> getFileData(List<String> allKeys, String email) {
        // 전체 키에서 파일인 것만 추출
        List<String> fileKeys = allKeys.stream()
                .filter((key) -> isFile(key))
                .toList();

        // s3에서 키에 해당하는 모든 [파일이름-데이터] 받아오기
        List<ContainerGetFileResponse> fileData = createFileResponse(fileKeys, email);
        return fileData;
    }

    private static boolean isFile(String key) {
        return key.contains(".");
    }

    // todo: 병렬처리 등 요청수 줄일 방법 고려하기
    private List<ContainerGetFileResponse> createFileResponse(List<String> keys, String email) {
        return keys.stream()
                .map((key) -> toFileResponse(key, email))
                .toList();
    }

    private ContainerGetFileResponse toFileResponse(String key, String email) {
        return ContainerGetFileResponse.builder()
                .filePath(createEmailRemovedKey(key, email))
                .content(s3ContainerRepository.getFileContent(key))
                .build();
    }

    /**
     * 컨테이너 모든 구조 가져오기 - 디렉토리 데이터 생성
     * 이메일 경로를 제외한 구조를 응답값에 포함해야 하므로 절삭된 키 사용
     */
    public List<String> getDirectories(List<String> parsedKeys) {
        return parsedKeys.stream()
                .filter((key) -> !isFile(key))
                .toList();
    }
}
