package com.example.iga.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PagesController {

    @GetMapping(value="/")
    public  String homepage(){
  //      return "phpmyadmin/phpindex";
        return "main.html";
    }

    @GetMapping(value="/test")
    public String test(){
        return "phpmyadmin/phpindex";
    }


    @GetMapping(value="/test/view")
    public String view(){
        return "phpmyadmin/view";
    }


    @GetMapping(value="/test/sql")
    public String sql(){
        return "phpmyadmin/sql";
    }


    @GetMapping(value="/test/search_delete")
    public String search(){
        return "phpmyadmin/search_delete";
    }

    @GetMapping(value="/test/put")
    public String put(){
        return "phpmyadmin/put";
    }


    @GetMapping(value="/index")
    public String index(){
        return "phpmyadmin/index";
    }


    @GetMapping(value="/mainLabs")
    public String mainLabs(){
        return "phpmyadmin/mainLabs";
    }


    @GetMapping(value="/lab5")
    public String lab5(){
        return "phpmyadmin/lab5";
    }


    @GetMapping(value="/lab6")
    public String lab6(){
        return "phpmyadmin/lab6";
    }


    @GetMapping(value="/lab7")
    public String lab7(){
        return "phpmyadmin/lab7";
    }


}
