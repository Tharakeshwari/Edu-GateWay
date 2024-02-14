package com.example.edugateway_app.controller;

import com.example.edugateway_app.entity.Courses;
import com.example.edugateway_app.service.CoursesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:5173")
@RequestMapping("/courses")
public class CoursesController {

    @Autowired
    private CoursesService coursesService;

    @GetMapping
    public List<Courses> getAllCourses() {
        return coursesService.getAllCourses();
    }

    @GetMapping("/{courseId}")
    public Courses getCourseById(@PathVariable Long courseId) {
        return coursesService.getCourseById(courseId);
    }

    @PostMapping("/{instituteId}")
    public ResponseEntity<Courses> createCourse(@PathVariable Long instituteId, @RequestBody Courses course) {
        Courses createdCourse = coursesService.createCourse(instituteId, course);
        return ResponseEntity.ok(createdCourse);
    }
    
    @PostMapping
    public Courses createCourse(@RequestBody Courses course) {
        return coursesService.createCourse(course);
    }

    @PutMapping("/{courseId}")
    public Courses updateCourseById(@PathVariable Long courseId, @RequestBody Courses course) {
        return coursesService.updateCourseById(courseId, course);
    }

    @DeleteMapping("/{courseId}")
    public boolean deleteCourseById(@PathVariable Long courseId) {
        return coursesService.deleteCourseById(courseId);
    }
}
