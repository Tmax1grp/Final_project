package com.example.discussservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@EnableEurekaClient
@SpringBootApplication
public class DiscussServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(DiscussServiceApplication.class, args);
    }

}
