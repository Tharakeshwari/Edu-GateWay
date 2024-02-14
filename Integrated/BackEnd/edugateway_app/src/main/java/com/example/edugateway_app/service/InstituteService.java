package com.example.edugateway_app.service;

import com.example.edugateway_app.entity.Institute;
import com.example.edugateway_app.repository.InstituteRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InstituteService{

    @Autowired
    private InstituteRepo instituteRepository;

    public List<Institute> getAllInstitutes() {
        return instituteRepository.findAll();
    }

    public Institute getInstituteById(Long instituteId) {
        return instituteRepository.findById(instituteId).orElse(null);
    }

    public Institute createInstitute(Institute institute) {
        return instituteRepository.save(institute);
    }

    public Institute updateInstitute(Long instituteId, Institute updatedInstitute) {
        Optional<Institute> optionalInstitute = instituteRepository.findById(instituteId);
        if (optionalInstitute.isPresent()) {
            Institute existingInstitute = optionalInstitute.get();
            existingInstitute.setInstituteName(updatedInstitute.getInstituteName());
            existingInstitute.setInstituteDescription(updatedInstitute.getInstituteDescription());
            existingInstitute.setInstituteAddress(updatedInstitute.getInstituteAddress());
            existingInstitute.setInstituteMobile(updatedInstitute.getInstituteMobile());
            existingInstitute.setInstituteEmail(updatedInstitute.getInstituteEmail());
            existingInstitute.setInstituteNoOfCoursesAvailable(updatedInstitute.getInstituteNoOfCoursesAvailable());
            // Update other fields as needed
    
            return instituteRepository.save(existingInstitute);
        }
        return null; // Or throw an exception indicating that the institute with the given ID was not found
    }
    

    public void deleteInstitute(Long instituteId) {
        instituteRepository.deleteById(instituteId);
    }
}
