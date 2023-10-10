package com.ogjg.back.common.util;

public class PathUtil {
    public static final String DELIMITER = "/";
    public static final String S3_URL_DELIMITER = "-";
    public static final String EXTENSION_SEPARATOR = ".";
    public static final String PROFILE_IMAGE_FIXED_NAME = "image";

    public static String createImagePrefix(String email) {
        email = toS3Email(email);
        return DELIMITER + email + DELIMITER + PROFILE_IMAGE_FIXED_NAME + EXTENSION_SEPARATOR;
    }

    public static String pathToS3Key(String email, String filePath) {
        email = toS3Email(email);
        return (DELIMITER + email + filePath);
    }

    public static String createContainerPrefix(String email, String containerName) {
        email = toS3Email(email);
        return (DELIMITER + email + DELIMITER + containerName + DELIMITER);
    }

    private static String toS3Email(String email) {
        email = email
                .replace(".", S3_URL_DELIMITER)
                .replace("@", S3_URL_DELIMITER);
        return email;
    }

    /**
     * s3key에서 email 부분을 지운 경로를 반환한다.
     * - s3에 회원별로 자신의 이메일을 이름으로 하는 루트 디렉토리를 가지고, 그 내부에 컨테이너마다 디렉토리가 생성된다.
     * - 사용자는 주로 컨테이너 단위로 서비스를 이용해서 email을 제거한다.
     */
    public static String createEmailRemovedKey(String key, String email) {
        return key.substring(email.length() + 1); // "/이메일" 을 제외한 디렉토리
    }

    public static String createNewFilePath(String originPath, String newFilename) {
        int lastDelimiterIndex = originPath.lastIndexOf(DELIMITER);
        return originPath.substring(0, lastDelimiterIndex) + DELIMITER + newFilename;
    }

    public static String createNewDirectoryPath(String originPath, String newFilename) {
        int secondLastDelimiterIndex = findSecondLastDelimiterIndex(originPath);
        return originPath.substring(0, secondLastDelimiterIndex) + DELIMITER + newFilename + DELIMITER;
    }

    public static String createNewKey(String originKey, String originPrefix, String newS3Prefix) {
        return newS3Prefix + originKey.substring(originPrefix.length());
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
        int index = originalName.lastIndexOf(EXTENSION_SEPARATOR);
        return originalName.substring(index + 1); // .제외한 확장자만 추출한다.
    }

    public static boolean isFile(String path) {
        return path.contains(EXTENSION_SEPARATOR);
    }

    /**
     * 맨뒤 '/' 절삭 후 마지막 '/' 인덱스를 찾으면 뒤에서 두번째 '/'를 찾을 수 있다.
     */
    private static int findSecondLastDelimiterIndex(String directoryPath) {
        String temp = directoryPath.substring(0, directoryPath.length() - 1);
        return temp.lastIndexOf(DELIMITER);
    }
}
