package com.bossabox.vuttr.oauth2server.service;

import java.util.HashMap;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.servlet.ModelAndView;

@Controller
@SessionAttributes("authorizationRequest")
public class LoginController {
	
	@GetMapping("/login")
	public String loginPage() {
		return "login";
	}
	
	@RequestMapping("/oauth/custom_confirm_access")
	public ModelAndView authorizePage() {
		return new ModelAndView("oauth_authorize", new HashMap<String, Object>());
	}
	
}
