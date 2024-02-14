package com.example.edugateway_app.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.edugateway_app.dto.request.AuthenticationRequest;
import com.example.edugateway_app.dto.request.RegisterRequest;
import com.example.edugateway_app.dto.response.AuthenticationResponse;
import com.example.edugateway_app.exceptions.InvalidCredentialsException;
import com.example.edugateway_app.exceptions.UserNotFoundException;
import com.example.edugateway_app.service.AuthenticationService;

import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin("http://localhost:5173")
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(@RequestBody RegisterRequest request) {
        authenticationService.register(request);
    
        Map<String, String> response = new HashMap<>();
        response.put("message", "Registration successful");
    
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/authenticate")
    public ResponseEntity<?> authenticate(@RequestBody AuthenticationRequest request) {
        try {
            // Authenticate user and get the JWT token
            String token = authenticationService.authenticate(request).getToken();
            
            // Return the token along with the "Login successful" message
            return ResponseEntity.ok()
                    .header("Authorization", "Bearer " + token) // Include the token in the response header
                    .body("Login successful");
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User does not exist");
        } catch (InvalidCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }
}
