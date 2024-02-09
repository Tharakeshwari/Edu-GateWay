package com.example.edugateway_app.service;

import com.example.edugateway_app.entity.Details;
import com.example.edugateway_app.repository.DetailsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DetailsService {

    @Autowired
    private DetailsRepo userRepository;

    public List<Details> getAllUsers() {
        return userRepository.findAll();
    }

    public Details getUserById(long userId) {
        Optional<Details> userOptional = userRepository.findById(userId);
        return userOptional.orElse(null);
    }

    public Details createUser(Details userDetails) {
        return userRepository.save(userDetails);
    }

    public Details updateUserById(long userId, Details userDetails) {
        if (userRepository.existsById(userId)) {
            userDetails.setUserId(userId);
            return userRepository.save(userDetails);
        }
        return null;
    }

    public boolean deleteUserById(long userId) {
        userRepository.deleteById(userId);
        return true;
    }
}
