package com.ogjg.back.common.util;

import software.amazon.awssdk.services.s3.model.S3Object;

public class S3PathUtil {

    public static final String DELIMITER = "/";
    public static final char S3_EMAIL_DELIMITER = '-';
    public static final String EXTENSION_DOT = ".";

    public static String createContainerPrefix(String loginEmail, String containerName) {
        return (DELIMITER + toS3Email(loginEmail) + DELIMITER + containerName + DELIMITER);

    }

    public static String givenPathToS3Path(String loginEmail, String filePath) {
        return (DELIMITER + toS3Email(loginEmail) + filePath);
    }

    public static String createImagePrefix(String email) {
        return DELIMITER + toS3Email(email) + DELIMITER + "image.";
    }

    /**
     * email을 s3 prefix로 사용하기 위해 특수문자를 '-'로 대체한다.
     */
    private static String toS3Email(String email) {
        String S3Email = email
                .replace('.', S3_EMAIL_DELIMITER)
                .replace('@', S3_EMAIL_DELIMITER);
        return S3Email;
    }

    /**
     * s3 key에서 email 부분을 지운 경로를 반환한다.
     * - s3에 회원별로 자신의 이메일을 이름으로 하는 루트 디렉토리를 가지고, 그 내부에 컨테이너마다 디렉토리가 생성된다.
     * - 사용자는 주로 컨테이너 단위로 서비스를 이용해서 email을 제거한다.
     */
    public static String createEmailRemovedKey(String key, String email) {
        return key.substring(email.length() + 1); // "/이메일" 을 제외한 디렉토리
    }

    public static String extractContainerName(String filePath) {
        return filePath.split(DELIMITER)[1]; // 경로 시작이 / 이므로 배열 첫 요소는 비어있다.
    }

    public static boolean isFile(String path) {
        return path.contains(EXTENSION_DOT);
    }

    public static String createNewFilePath(String originPath, String newFilename) {
        int lastDelimiterIndex = originPath.lastIndexOf(DELIMITER);
        return originPath.substring(0, lastDelimiterIndex) + DELIMITER + newFilename;
    }

    public static String createNewDirectoryPath(String originPath, String newFilename) {
        int secondLastDelimiterIndex = findSecondLastDelimiterIndex(originPath);
        return originPath.substring(0, secondLastDelimiterIndex) + DELIMITER + newFilename + DELIMITER;
    }

    public static String createNewKey(String originPrefix, String newS3Path, S3Object s3Object) {
        return newS3Path + s3Object.key().substring(originPrefix.length());
    }

    public static String extractFilename(String filePath) {
        int lastIndex = filePath.lastIndexOf(DELIMITER);
        return filePath.substring(lastIndex + 1);
    }

    public static String extractFilePrefix(String filePath) {
        int lastIndex = filePath.lastIndexOf(DELIMITER);
        return filePath.substring(0, lastIndex + 1);
    }

    public static String extractDirectoryPrefix(String directoryPath) {
        int secondLastDelimiterIndex = findSecondLastDelimiterIndex(directoryPath);
        return directoryPath.substring(0, secondLastDelimiterIndex + 1);
    }

    public static String extractDirectoryName(String directoryPath) {
        int secondLastDelimiterIndex = findSecondLastDelimiterIndex(directoryPath);
        return directoryPath.substring(secondLastDelimiterIndex + 1);
    }

    public static String extractExtension(String originalName) {
        int index = originalName.lastIndexOf(EXTENSION_DOT);
        return originalName.substring(index + 1); // .제외한 확장자만 추출한다.
    }

    private static int findSecondLastDelimiterIndex(String directoryPath) {
        String temp = directoryPath.substring(0, directoryPath.length() - 1);
        return temp.lastIndexOf(DELIMITER);
    }
}
