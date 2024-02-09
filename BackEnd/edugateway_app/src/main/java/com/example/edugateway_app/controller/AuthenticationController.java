package com.example.edugateway_app.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.edugateway_app.dto.request.AuthenticationRequest;
import com.example.edugateway_app.dto.request.RegisterRequest;
import com.example.edugateway_app.dto.response.AuthenticationResponse;
import com.example.edugateway_app.service.AuthenticationService;

import lombok.RequiredArgsConstructor;

@RestController
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
public ResponseEntity<Map<String, Object>> authenticate(@RequestBody AuthenticationRequest request) {
    AuthenticationResponse authenticationResponse = authenticationService.authenticate(request);

    Map<String, Object> response = new HashMap<>();
    response.put("message", "Login successful");
    response.put("authenticationResponse", authenticationResponse);

    return ResponseEntity.ok(response);
}
}
