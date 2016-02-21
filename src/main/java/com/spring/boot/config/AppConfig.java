package com.spring.boot.config;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.context.embedded.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.core.env.Environment;

@Configuration
@ComponentScan(basePackages = "com.spring")
@EnableAutoConfiguration
public class AppConfig {
	
	private static Environment staticEnv;
	
	@Autowired
	private Environment env;
	
	@PostConstruct
	public void registerInstance() {
		staticEnv = env;
	}
	
	private String getProperty(String key) {
		return staticEnv.getProperty(key);
	}
	
	@Bean
	public ResourceBundleMessageSource getMessageSource() {
		ResourceBundleMessageSource resource = new ResourceBundleMessageSource();
		resource.setBasenames("com.spring.boot.common.applicationMessageResource");
		return resource;
	}
	
	@Bean
	public FilterRegistrationBean xssSanitizerFilter() {
		FilterRegistrationBean registration = new FilterRegistrationBean();
		registration.setFilter(new RequestFilter());
		registration.addUrlPatterns("*.do");
		registration.setName("XssFilter");
		return registration;
	}

}
