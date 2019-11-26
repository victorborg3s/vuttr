package com.bossabox.vuttr.oauth2server.model.dto;

import java.io.Serializable;

import org.springframework.security.core.GrantedAuthority;

public class CustomGrantedAuthority implements GrantedAuthority, Serializable {

	private static final long serialVersionUID = 3398992452518221249L;
	private String name;

	public CustomGrantedAuthority(String name) {
		this.name = name;
	}

	@Override
	public String getAuthority() {
		return name;
	}

}