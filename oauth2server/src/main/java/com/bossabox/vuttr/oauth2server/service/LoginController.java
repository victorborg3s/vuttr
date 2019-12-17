package com.bossabox.vuttr.oauth2server.service;

import java.util.Map;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;

import org.springframework.security.oauth2.provider.AuthorizationRequest;
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
	public ModelAndView authorizePage(Map<String, Object> model, HttpServletRequest request) {
		AuthorizationRequest authorizationRequest = (AuthorizationRequest) model.get("authorizationRequest");
		model.put("clientId", authorizationRequest.getClientId());
		model.put("resources", authorizationRequest.getResourceIds()
				.stream().map((String resourceId) -> resourceId)
				.collect(Collectors.joining(", ")));
		model.put("scope", authorizationRequest.getScope()
				.stream().map((String scope) -> scope)
				.collect(Collectors.joining(", ")));
		return new ModelAndView("oauth_authorize", model);
	}
	
}
