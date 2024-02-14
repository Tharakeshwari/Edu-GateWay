package com.example.edugateway_app.controller;

import com.example.edugateway_app.entity.Admission;
import com.example.edugateway_app.entity.Courses;
import com.example.edugateway_app.entity.Student;
import com.example.edugateway_app.service.AdmissionService;
import com.example.edugateway_app.service.CoursesService;
import com.example.edugateway_app.service.StudentService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:5173")
@RequestMapping("/admissions")
public class AdmissionController {

    @Autowired
    private AdmissionService admissionService;

    @Autowired
    private StudentService studentService;

    @Autowired
    private CoursesService coursesService;

    @GetMapping
    public List<Admission> getAllAdmissions() {
        return admissionService.getAllAdmissions();
    }

    @GetMapping("/{admissionId}")
    public Admission getAdmissionById(@PathVariable Long admissionId) {
        return admissionService.getAdmissionById(admissionId);
    }

    @PutMapping("/{admissionId}")
    public Admission updateAdmissionById(@PathVariable Long admissionId, @RequestBody Admission admission) {
        return admissionService.updateAdmissionById(admissionId, admission);
    }

    @DeleteMapping("/{admissionId}")
    public boolean deleteAdmissionById(@PathVariable Long admissionId) {
        return admissionService.deleteAdmissionById(admissionId);
    }
    
    @PostMapping
    public Admission createAdmission(@RequestParam(value = "studentId", required = false) Long studentId,
                                     @RequestParam(value = "courseId", required = false) Long courseId,
                                     @RequestBody Admission admission) {
        if (studentId != null) {
            Student student = studentService.getStudentById(studentId);
            if (student != null) {
                admission.setStudent(student);
            } else {
                // Handle case where studentId does not correspond to any student
                // You can throw an exception or return an appropriate response
            }
        }

        if (courseId != null) {
            Courses course = coursesService.getCourseById(courseId);
            if (course != null) {
                admission.setCourses(course);
            } else {
                // Handle case where courseId does not correspond to any course
                // You can throw an exception or return an appropriate response
            }
        }

        return admissionService.createAdmission(admission);
    }

    // Other methods remain the same
}
