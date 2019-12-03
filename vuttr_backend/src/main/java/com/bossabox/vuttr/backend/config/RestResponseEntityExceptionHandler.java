package com.bossabox.vuttr.backend.config;

import java.security.InvalidParameterException;

import javax.persistence.EntityNotFoundException;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class RestResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {

	@ExceptionHandler({ AuthenticationCredentialsNotFoundException.class })
	public ResponseEntity<Object> handleAccessDeniedException(Exception ex, WebRequest request) {
		return new ResponseEntity<Object>("{'error': 'Access denied.'}", new HttpHeaders(), HttpStatus.FORBIDDEN);
	}

	@ExceptionHandler({ EntityNotFoundException.class })
	public ResponseEntity<Object> handleEntityNotFoundException(Exception ex, WebRequest request) {
		return new ResponseEntity<Object>("{'error': 'Entity not found.'}", new HttpHeaders(), HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler({ InvalidParameterException.class })
	public ResponseEntity<Object> handleInvalidParameterException(Exception ex, WebRequest request) {
		return new ResponseEntity<Object>("{'error': 'Absent or invalid request parameter.'}", new HttpHeaders(), HttpStatus.BAD_REQUEST);
	}

}
