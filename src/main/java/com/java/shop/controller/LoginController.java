package com.java.shop.controller;

import java.util.HashMap;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.java.shop.dto.Login;
import com.java.shop.service.LoginService;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
public class LoginController {
    private static final Logger logger = LoggerFactory.getLogger(LoginController.class);

    @Autowired
    LoginService lsv;

    //로그인
    @PostMapping("/login")
    public ResponseEntity<Login> login(@RequestBody HashMap<String,Object> map) {
            logger.info("Login request received: " + map.toString());
            Login login = lsv.login(map);
            if (login != null) {
                logger.info("Login successful: " + login.toString());
            } else {
                logger.info("Login failed for: " + map.get("uId"));
            }
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
    public Boolean idCheck(@RequestBody String uid) {
        logger.info("{{{}} " + uid + " {}}");
        int idCheck = lsv.idCheck(uid);
        if(idCheck != 0){
             return true;
         }
        return false;
    }

    //폰번호 중복확인
    @PostMapping("/phonecheck")
    public Boolean phoneCheck(@RequestBody String phone) {
        int phoneCheck = lsv.phoneCheck(phone);
        if(phoneCheck != 0){
             return true;
         }
        return false;
    }
}
