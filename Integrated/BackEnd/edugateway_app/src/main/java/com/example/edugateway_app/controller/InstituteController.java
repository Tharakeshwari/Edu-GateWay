package com.example.edugateway_app.controller;

import com.example.edugateway_app.entity.Institute;
import com.example.edugateway_app.service.InstituteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:5173")
@RequestMapping("/institutes")
public class InstituteController {

   @Autowired
    private InstituteService instituteService;

    @GetMapping
    public ResponseEntity<List<Institute>> getAllInstitutes() {
        List<Institute> institutes = instituteService.getAllInstitutes();
        return ResponseEntity.ok(institutes);
    }

    @GetMapping("/{instituteId}")
    public ResponseEntity<Institute> getInstituteById(@PathVariable Long instituteId) {
        Institute institute = instituteService.getInstituteById(instituteId);
        return ResponseEntity.ok(institute);
    }

    @PostMapping
    public ResponseEntity<Institute> createInstitute(@RequestBody Institute institute) {
        Institute createdInstitute = instituteService.createInstitute(institute);
        return new ResponseEntity<>(createdInstitute, HttpStatus.CREATED);
    }

    @PutMapping("/{instituteId}")
    public ResponseEntity<Institute> updateInstitute(@PathVariable Long instituteId, @RequestBody Institute updatedInstitute) {
        Institute updated = instituteService.updateInstitute(instituteId, updatedInstitute);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{instituteId}")
    public ResponseEntity<Void> deleteInstitute(@PathVariable Long instituteId) {
        instituteService.deleteInstitute(instituteId);
        return ResponseEntity.noContent().build();
    }
}
