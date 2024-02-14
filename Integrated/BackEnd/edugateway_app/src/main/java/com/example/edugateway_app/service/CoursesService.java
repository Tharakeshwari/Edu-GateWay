package com.example.edugateway_app.service;

import com.example.edugateway_app.entity.Courses;
import com.example.edugateway_app.entity.Institute;
import com.example.edugateway_app.repository.CoursesRepo;
import com.example.edugateway_app.repository.InstituteRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CoursesService {

    @Autowired
    private CoursesRepo coursesRepository;
    @Autowired
    private InstituteRepo instituteRepository;

    public List<Courses> getAllCourses() {
        return coursesRepository.findAll();
    }
  public Courses createCourse(Long instituteId, Courses course) {
        Institute institute = instituteRepository.findById(instituteId).orElse(null);
        if (institute != null) {
            course.setInstitute(institute);
            return coursesRepository.save(course);
        }
        return null;
    }

    public Courses getCourseById(Long courseId) {
        Optional<Courses> courseOptional = coursesRepository.findById(courseId);
        return courseOptional.orElse(null);
    }

    public Courses createCourse(Courses course) {
        return coursesRepository.save(course);
    }

    public Courses updateCourseById(Long courseId, Courses updatedCourse) {
        if (coursesRepository.existsById(courseId)) {
            updatedCourse.setCourseId(courseId);
            return coursesRepository.save(updatedCourse);
        }
        return null;
    }

    public boolean deleteCourseById(Long courseId) {
        coursesRepository.deleteById(courseId);
        return true;
    }
}
