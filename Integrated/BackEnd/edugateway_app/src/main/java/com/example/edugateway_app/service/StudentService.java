package com.example.edugateway_app.service;

import com.example.edugateway_app.entity.Student;
import com.example.edugateway_app.repository.StudentRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {

    @Autowired
    private StudentRepo studentRepository;

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Student getStudentById(Long studentId) {
        Optional<Student> studentOptional = studentRepository.findById(studentId);
        return studentOptional.orElse(null);
    }

    public Student createStudent(Student student) {
        return studentRepository.save(student);
    }

    public Student updateStudentById(Long studentId, Student updatedStudent) {
        if (studentRepository.existsById(studentId)) {
            updatedStudent.setStudentId(studentId);
            return studentRepository.save(updatedStudent);
        }
        return null;
    }

    public boolean deleteStudentById(Long studentId) {
        studentRepository.deleteById(studentId);
        return true;
    }
}
