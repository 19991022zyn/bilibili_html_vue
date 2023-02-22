package com.example.demo_chenlike.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

@Data //数据注解,取代get set构造 简化
@TableName(value="user")//指定表名
public class User {
    private Integer id;
    private String username;
    @JsonIgnore
    private String password;
    private String sex;
    private String tele;
    private String email;
    private String address;
}
