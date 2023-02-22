package com.example.demo_chenlike.controller;

import cn.hutool.core.util.StrUtil;
import com.example.demo_chenlike.controller.dto.UserDTO;
import com.example.demo_chenlike.entity.User;
import com.example.demo_chenlike.service.UserService;
import com.example.demo_chenlike.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/user") //拼接url
public class UserController {

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private UserService userService;

    //新增和修改
    @PostMapping
    public boolean save(@RequestBody User user){
        return userService.saveUser(user);
    }


    //查询所有数据
    @GetMapping("/")
    public List<User> findAll(){
        List<User> all =userMapper.findAll();
        return all;
    }

    @DeleteMapping("/{id}")
    public Integer delete(@PathVariable Integer id){
        return userMapper.deleteById(id);
    }

    @PostMapping("/del/batch")
    public boolean deleteBatch(@RequestBody List<Integer> ids){
        return userService.removeByIds(ids);
    }

    @GetMapping("/page") //接口路径/user/page
    public Map<String, Object> findPage(@RequestParam Integer pageNum,
                                        @RequestParam Integer pageSize,
                                        @RequestParam String username){
        pageNum=(pageNum-1) * pageSize;
        username="%"+username+"%";
        List<User> data =userMapper.selectPage(pageNum,pageSize,username);
        Integer total=userMapper.selectTotal(username);
        Map<String,Object> res =new HashMap<>();
        res.put("data",data);
        res.put("total",total);
        return res;
    }

    @PostMapping("/login")
    public boolean login(@RequestBody UserDTO userDTO){
        String username = userDTO.getUsername();
        String password = userDTO.getPassword();
//        调用hutool依赖，tmd烦死了  简单来说就是对String类进行封装整合，isblank判断字符串是否为空白
        if(StrUtil.isBlank(username) || StrUtil.isBlank(password)){
            return false;
        }
        return userService.login(userDTO);
    }

    @PostMapping("/register")
    public boolean register(@RequestBody User user){
        return userService.register(user);
    }
}
