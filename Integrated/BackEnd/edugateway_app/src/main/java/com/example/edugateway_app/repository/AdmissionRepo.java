package com.example.edugateway_app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.edugateway_app.entity.Admission;

@Repository
public interface AdmissionRepo extends JpaRepository<Admission,Long>{

}