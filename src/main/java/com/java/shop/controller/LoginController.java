package com.java.shop.controller;


import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.env.RandomValuePropertySourceEnvironmentPostProcessor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.java.shop.dto.Login;
import com.java.shop.service.LoginService;


@CrossOrigin(origins = "http://localhost:3000/")
@RestController
public class LoginController {
    @Autowired
    LoginService lsv;

    //로그인
    @PostMapping("/login")
    public ResponseEntity<Login> login(@RequestBody HashMap<String,Object> map) {
            Login login = lsv.login(map);
            return ResponseEntity.ok(login);
    }

    //회원가입
    @PostMapping("/register")
    public ResponseEntity<Login> register(@RequestBody HashMap<String,Object> map) {
            Login register = lsv.register(map);
            return ResponseEntity.ok(register);
    }

    //아이디 중복확인
    @PostMapping("/idcheck")
    public Boolean login(@RequestBody String uId) {
        String idCheck = lsv.idCheck(uId);
        if(idCheck!=null){
                return true;
        }
        return false;
}
}

