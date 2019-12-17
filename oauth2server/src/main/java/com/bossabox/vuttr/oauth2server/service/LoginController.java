package com.bossabox.vuttr.oauth2server.service;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class LoginController {
	
	@Autowired
	private UserDetailsServiceImpl userService;

	//@Autowired
	//private OauthService oauthService;
	
	@GetMapping("/login")
	public String loginPage() {
		return "login";
	}
	
	/*
	@RequestMapping(value = "/doLogin", method = RequestMethod.POST)
	public String doLogin(@RequestParam("username") String username, @RequestParam("password") String password,	HttpServletRequest request) {
		System.out.println("username: " + username);
		System.out.println("password: " + password);
		return "";
	}
	*/
	
}
