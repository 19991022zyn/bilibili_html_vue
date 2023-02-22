package com.example.demo_chenlike.utils;

import com.baomidou.mybatisplus.generator.FastAutoGenerator;
import com.baomidou.mybatisplus.generator.config.OutputFile;

import java.util.Collections;

//psvm构造自动生成
//mp代码生成器
//by chen
//@since 2022-6-11
public class CodeGenerator {
    public static void main(String[] args) {
        generate();
}
    private static void generate(){
        FastAutoGenerator.create("jdbc:mysql://localhost:3306/chen?serverTimezone=GMT%2b8", "root", "chenfor3")
                .globalConfig(builder -> {
                    builder.author("chenlike") // 设置作者
                            .enableSwagger() // 开启 swagger 模式
                            .fileOverride() // 覆盖已生成文件
                            .outputDir("D:\\vuec"); // 指定输出目录
                })
                .packageConfig(builder -> {
                    builder.parent("com.example.demo_chenlike") // 设置父包名
                            .moduleName("") // 设置父包模块名
                            .pathInfo(Collections.singletonMap(OutputFile.mapperXml, "D:\\vuec\\demo_chenlike\\src\\main\\java\\com\\example\\demo_chenlike\\mapper")); // 设置mapperXml生成路径
                })
                .strategyConfig(builder -> {
                    builder.addInclude("user") // 设置需要生成的表名
                            .addTablePrefix("t_", "c_"); // 设置过滤表前缀
                })
                // .templateEngine(new FreemarkerTemplateEngine()) // 使用Freemarker引擎模板，默认的是Velocity引擎模板
                .execute();

    }
}
