package com.example.demo_chenlike.common;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


//接口同一返回包装类
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Result {

    private String code;
    private String msg;
    private Object data;//Object通用类型，所有类型都可以i返回

    public static Result success(){
        return new Result(Constants.CODE_200, "",null);
    }

    public static Result success(Object data){
        return new Result(Constants.CODE_200, "",data);
    }

    public static Result error(String code,String msg){
        return new Result(code, msg,null);
    }

    public static Result error(){
        return new Result(Constants.CODE_400, "系统错误",null);
    }
}
