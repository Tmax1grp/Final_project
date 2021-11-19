package com.example.classroomservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@EnableEurekaClient
@SpringBootApplication
public class ClassroomServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(ClassroomServiceApplication.class, args);
    }

}
