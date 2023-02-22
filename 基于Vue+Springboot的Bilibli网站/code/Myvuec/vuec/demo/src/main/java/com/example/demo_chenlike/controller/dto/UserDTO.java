package com.example.demo_chenlike.controller.dto;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

//接受前端登录请求的参数
@Data
public class UserDTO {
    private String username;
    private String password;
}
