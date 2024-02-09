package com.example.edugateway_app.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.JoinColumn;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;

@Entity
@NoArgsConstructor
@Data
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long studentId;
    
    @OneToOne
    @JoinColumn(name = "user_id") // Assuming a relationship with the UserDetails entity
    private Details user;
    private String name;
    private Date dob;
    private String gender;
    private String motherName;
    private String fatherName;
    private String nationality;
    private Long age;
    private String address;
    private String mobile;
    private int marksSSLC;
    private int marksHSC;
    private int marksDiploma;
    private String eligibility;
}