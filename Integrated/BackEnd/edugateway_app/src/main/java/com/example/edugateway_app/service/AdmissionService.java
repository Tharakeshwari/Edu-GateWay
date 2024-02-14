package com.example.edugateway_app.service;

import com.example.edugateway_app.entity.Admission;
import com.example.edugateway_app.repository.AdmissionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdmissionService {

    @Autowired
    private AdmissionRepo admissionRepository;

    public List<Admission> getAllAdmissions() {
        return admissionRepository.findAll();
    }

    public Admission getAdmissionById(Long admissionId) {
        Optional<Admission> admissionOptional = admissionRepository.findById(admissionId);
        return admissionOptional.orElse(null);
    }

    public Admission createAdmission(Admission admission) {
        return admissionRepository.save(admission);
    }

    public Admission updateAdmissionById(Long admissionId, Admission updatedAdmission) {
        if (admissionRepository.existsById(admissionId)) {
            updatedAdmission.setAdmissionId(admissionId);
            return admissionRepository.save(updatedAdmission);
        }
        return null;
    }

    public boolean deleteAdmissionById(Long admissionId) {
        admissionRepository.deleteById(admissionId);
        return true;
    }
}
