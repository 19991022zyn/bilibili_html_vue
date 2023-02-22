package com.example.demo_chenlike.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.demo_chenlike.entity.User;
import org.apache.ibatis.annotations.*;

import java.util.List;

//每个mapper或者单一个文件整合MapperScan
@Mapper
public interface UserMapper extends BaseMapper<User> {

    @Select("SELECT * FROM user")
    List<User> findAll();

    @Insert("insert into user(username,password,sex,tele,email,address) VALUES (#{username},#{password},#{sex},#{tele},#{email},#{address})")
    int insert(User user);

    @Insert("insert into user(username,password) VALUES (#{username},#{password})")
    int insert1(User user);

    int update(User user);

    @Delete("delete from user where id= #{id}")
    Integer deleteById(@Param("id") Integer id);

    @Select("select * from user where username like #{username} limit #{pageNum},#{pageSize}")
    List<User> selectPage(Integer pageNum, Integer pageSize ,String username);

    @Select("select count(*) from user where username like concat('%',#{username},'%')")
    Integer selectTotal(String username);

}
