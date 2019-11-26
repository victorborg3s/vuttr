package com.bossabox.vuttr.oauth2server.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

/**
 * Código obtido deste tutorial: 
 * https://medium.com/@supunbhagya/spring-oauth2-authorization-server-jwt-jpa-data-model-1e458dcdac04
 * 
 * @author coderSinol@github.com
 *
 */
@Entity
@Table(name="oauth_refresh_token")
public class OauthRefreshToken {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Integer id;
	
	@Column(name="token_id")
	private String tokenId;
	
	@Lob
	@Column(name="token")
	private byte[] token;
	
	@Lob
	@Column(name="authentication")
	private byte[] authentication;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getTokenId() {
		return tokenId;
	}

	public void setTokenId(String tokenId) {
		this.tokenId = tokenId;
	}

	public byte[] getToken() {
		return token;
	}

	public void setToken(byte[] token) {
		this.token = token;
	}

	public byte[] getAuthentication() {
		return authentication;
	}

	public void setAuthentication(byte[] authentication) {
		this.authentication = authentication;
	}
}
