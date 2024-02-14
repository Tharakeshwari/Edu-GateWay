package com.example.edugateway_app.controller;

import com.example.edugateway_app.entity.Details;
import com.example.edugateway_app.service.DetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class DetailsController {

    @Autowired
    private DetailsService userService;

    @GetMapping
    public List<Details> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{userId}")
    public Details getUserById(@PathVariable long userId) {
        return userService.getUserById(userId);
    }

    @PostMapping
    public Details createUser(@RequestBody Details userDetails) {
        return userService.createUser(userDetails);
    }

    @PutMapping("/{userId}")
    public Details updateUserById(@PathVariable long userId, @RequestBody Details userDetails) {
        return userService.updateUserById(userId, userDetails);
    }

    @DeleteMapping("/{userId}")
    public boolean deleteUserById(@PathVariable long userId) {
        return userService.deleteUserById(userId);
    }
}
