package com.example.edugateway_app.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@Entity
@NoArgsConstructor
@Data
public class Institute {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long instituteId;

    private String instituteName;
    private String instituteDescription;
    private String instituteAddress;
    private String mobile;
    private String email;
    private Long noOfCoursesAvailable;

    @OneToMany(mappedBy = "institute",cascade = CascadeType.ALL,fetch=FetchType.LAZY)
    private List<Courses> courses; 
}
