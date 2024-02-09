package com.example.edugateway_app.controller;

import com.example.edugateway_app.entity.Student;
import com.example.edugateway_app.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/students")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @GetMapping
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }

    @GetMapping("/{studentId}")
    public Student getStudentById(@PathVariable Long studentId) {
        return studentService.getStudentById(studentId);
    }

    @PostMapping
    public Student createStudent(@RequestBody Student student) {
        return studentService.createStudent(student);
    }

    @PutMapping("/{studentId}")
    public Student updateStudentById(@PathVariable Long studentId, @RequestBody Student student) {
        return studentService.updateStudentById(studentId, student);
    }

    @DeleteMapping("/{studentId}")
    public boolean deleteStudentById(@PathVariable Long studentId) {
        return studentService.deleteStudentById(studentId);
    }
}
