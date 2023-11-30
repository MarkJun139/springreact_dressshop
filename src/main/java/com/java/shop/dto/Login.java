package com.java.shop.dto;

import java.util.Date;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
@Entity
@Getter
@NoArgsConstructor
public class Login {
    private int uCode;
    @Id
    private String uId;
    private String uPw;
    private String uNick;
    private String uEMail;
    private int uEmailCheck;
    private String uPhone;
    private String uGrade;
    private Date uRegiDate;
    private Date uLastDate;
    private int uDrop;

    @Enumerated(EnumType.STRING)
    private Role uAccess;
    
    @Builder
    public Login(String Uid){
        
    }
    
}
