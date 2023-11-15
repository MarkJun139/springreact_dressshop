package com.java.shop.controller;


import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
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

    @PostMapping("/login")
    public ResponseEntity<Login> login(@RequestBody HashMap<String,Object> map) {
            Login login = lsv.login(map);
            return ResponseEntity.ok(login);
    }

    @PostMapping("/register")
    public ResponseEntity<Login> register(@RequestBody HashMap<String,Object> map) {
            Login register = lsv.register(map);
            return ResponseEntity.ok(register);
    }
}

