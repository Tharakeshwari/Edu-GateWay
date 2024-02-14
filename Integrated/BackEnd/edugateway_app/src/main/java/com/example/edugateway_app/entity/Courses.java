package com.example.edugateway_app.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@Data
public class Courses {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long courseId;
    // private Long instituteId;
    private String courseName;
    private String courseDescription;
    private String courseDuration;
    private Double fees;
    private int noOfSeats;

    @ManyToOne
    @JoinColumn(name="institute_id")
    @JsonBackReference
    private Institute institute;
}
