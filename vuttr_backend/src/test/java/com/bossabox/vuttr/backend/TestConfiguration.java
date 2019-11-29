package com.bossabox.vuttr.backend;

import org.springframework.security.oauth2.config.annotation.web.configurers.ResourceServerSecurityConfigurer;

import com.bossabox.vuttr.backend.config.ResourceServerConfiguration;

public class TestConfiguration extends ResourceServerConfiguration {
    @Override
    public void configure(ResourceServerSecurityConfigurer res) throws Exception {
      res.stateless(false);
      super.configure(res);
    }
  }
