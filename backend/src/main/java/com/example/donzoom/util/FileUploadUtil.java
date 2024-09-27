package com.example.donzoom.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import java.util.UUID;

@Component
public class FileUploadUtil {

  @Value("${file.upload-dir}")
  private String uploadDir;

  public String saveFile(MultipartFile file) throws IOException {
    // 원래 파일 이름 가져오기
    String originalFileName = file.getOriginalFilename();
    String fileExtension = getFileExtension(originalFileName);

    // UUID를 사용하여 고유한 파일 이름 생성
    String uniqueFileName = UUID.randomUUID().toString() + "." + fileExtension;

    // 파일 경로 설정
    Path filePath = Paths.get(uploadDir, uniqueFileName);

    // 디렉터리 생성 및 파일 저장
    Files.createDirectories(filePath.getParent());
    Files.copy(file.getInputStream(), filePath);

    return uniqueFileName;  // 저장된 파일 이름 리턴
  }

  // 파일 확장자 가져오기
  private String getFileExtension(String fileName) {
    if (fileName != null && fileName.contains(".")) {
      return fileName.substring(fileName.lastIndexOf(".") + 1);
    } else {
      return "";  // 확장자가 없는 경우
    }
  }
}
