package com.example.chatservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@EnableEurekaClient
@SpringBootApplication
public class ChatServiceApplication {
//    public static final String APPLICATION_LOCATIONS = "spring.config.location="
//            + "classpath:application.yml,"
//            + "classpath:aws.yml";

//    public static void main(String[] args) {
//        new SpringApplicationBuilder(ChatServiceApplication.class)
//                .properties(APPLICATION_LOCATIONS)
//                .run(args);
//    }


        public static void main(String[] args) {
            SpringApplication.run(ChatServiceApplication.class, args);
        }

//    @Bean
//    public WebMvcConfigurer corsConfigurer() {
//        return new WebMvcConfigurer() {
//            @Override
//            public void addCorsMappings(CorsRegistry registry) {
//                registry.addMapping("/*").allowedOrigins("").allowedMethods("GET", "POST", "PUT", "DELETE");
//                ;
//            }
//        };
//    }



}
