package com.ogjg.back.common.util;

public class S3PathUtil {

    public static final String DELIMITER = "/";
    public static final char S3_DELIMETER = '-';

    /**
     * email을 s3 prefix로 사용하기 위해 특수문자를 '-'로 대체한다.
     */
    public static String createS3Directory(String loginEmail, String containerName) {
        return (DELIMITER + loginEmail + DELIMITER + containerName + DELIMITER)
                .replace('.', S3_DELIMETER)
                .replace('@', S3_DELIMETER);
    }

    /**
     * s3 key에서 email 부분을 지운 경로를 반환한다.
     * - s3에 회원별로 자신의 이메일을 이름으로 하는 루트 디렉토리를 가지고, 그 내부에 컨테이너마다 디렉토리가 생성된다.
     * - 사용자는 주로 컨테이너 단위로 서비스를 이용해서 email을 제거한다.
     */
    public static String createEmailRemovedKey(String key, String email) {
        return key.substring(email.length() + 1); // "/이메일" 을 제외한 디렉토리
    }

    public static boolean isFile(String path) {
        return path.contains(".");
    }
}
