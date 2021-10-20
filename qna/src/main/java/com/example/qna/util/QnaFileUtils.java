//package com.example.qna.util;
//
//
//import org.springframework.stereotype.Component;
//import org.springframework.web.multipart.MultipartFile;
//import org.springframework.web.multipart.MultipartHttpServletRequest;
//
//import java.io.File;
//import java.util.*;
//
//@Component("fileUtils")
//public class QnaFileUtils {
//    private static final String filePath = "usr/downloads";
//
//    public List<Map<String, Object>> parseInsertFileInfo(QnaVO qnaVO,
//                                                         MultipartHttpServletRequest mpRequest) throws Exception {
//        Iterator<String> iterator = mpRequest.getFileNames();
//
//        MultipartFile multipartFile = null;
//        String originalFileName = null;
//        String originalFileExtension = null;
//        String storedFileName = null;
//
//        List<Map<String, Object>> list = new ArrayList<Map<String,Object>>();
//        Map<String, Object> listMap = null;
//
//        int bno = QnaVO.getBno();
//
//        File file = new File(filePath);
//        if(file.exists() == false) {
//            file.mkdirs();
//        }
//
//        While(iterator.hasNext()) {
//            multipartFile = mpRequest.getFile(iterator.next());
//            if(multipartFile.isEmpty() == false) {
//                originalFileName = multipartFile.getOriginalFilename();
//                originalFileExtension = originalFileName.substring(originalFileName.lastIndexOf("."));
//                storedFileName = getRandomString() + originalFileExtension;
//
//                file = new File(filePath + storedFileName);
//                multipartFile.transferTo(file);
//                listMap = new HashMap<String, Object>();
//                listMap.put("BNO", bno);
//                listMap.put("ORG_FILE_NAME", originalFileName);
//                listMap.put("STORED_FILE_NAME", storedFileName);
//                listMap.put("FILE_SIZE", multipartFile.getSize());
//                list.add(listMap);
//            }
//        }
//        return list;
//    }
//
//    public static String getRandomString() {
//        return UUID.randomUUID().toString().replaceAll("-", "");
//    }
//}
//


