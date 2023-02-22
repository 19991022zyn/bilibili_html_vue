package com.example.demo_chenlike.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.demo_chenlike.controller.dto.UserDTO;
import com.example.demo_chenlike.entity.User;
import com.example.demo_chenlike.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class UserService extends ServiceImpl<UserMapper,User> {
    public boolean saveUser(User user) {
        return  saveOrUpdate(user);//一句话解决，Mybatis-plus插件中的函数，表示插入数据
    }

    //登录
    public boolean login(UserDTO userDTO) {
//        mybatis-plus依赖里的
        QueryWrapper<User> queryWrapper=new QueryWrapper<>();
        queryWrapper.eq("username",userDTO.getUsername());
        queryWrapper.eq("password",userDTO.getPassword());
        List<User> list = list(queryWrapper);
        return list.size()!=0;
    }


    public boolean register(User user) {
        return  saveOrUpdate(user);
    }
}
