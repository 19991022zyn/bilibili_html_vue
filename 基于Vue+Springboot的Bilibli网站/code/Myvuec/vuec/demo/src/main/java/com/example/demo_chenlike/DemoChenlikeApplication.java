package com.example.demo_chenlike;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RestController;

@RestController //标识Demo... 是一个接口
@SpringBootApplication
public class DemoChenlikeApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoChenlikeApplication.class, args);
    }

}
