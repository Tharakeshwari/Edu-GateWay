package com.example.edugateway_app.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)

public class RegistrationException extends RuntimeException{
    public RegistrationException(String message) {
        super(message);
}

}