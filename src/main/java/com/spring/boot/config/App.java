package com.spring.boot.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
public class App extends WebSecurityConfigurerAdapter {
	
	private static Logger logger = LoggerFactory.getLogger(App.class);
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.authorizeRequests().anyRequest().permitAll();
	}
	
	public static void main(String[] args) {
		final ConfigurableApplicationContext ctx = SpringApplication.run(AppConfig.class, args);
		
		Runtime.getRuntime().addShutdownHook(new Thread() {
			@Override
			public void run() {
				logger.info("Shutting down Application instance");
				ctx.close();
				logger.info("Application shutdown completed!!");
			}
		});
	}
	
}
