package com.spring.boot.config;

import java.util.Properties;

import javax.annotation.PostConstruct;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.transaction.managed.ManagedTransactionFactory;
import org.apache.tomcat.jdbc.pool.DataSource;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.context.embedded.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.annotation.PropertySources;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.core.env.Environment;
import org.springframework.core.io.ClassPathResource;

@Configuration
@ComponentScan(basePackages = "com.spring.boot")
@EnableAutoConfiguration
@PropertySources({ @PropertySource(value = "${properties.path}/database.properties"),
		@PropertySource(value = "${properties.path}/sample-ui.properties") })
public class AppConfig {

	private static final Logger logger = LoggerFactory.getLogger(AppConfig.class);

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

	/*@Bean
	public FilterRegistrationBean xssSanitizerFilter() {
		FilterRegistrationBean registration = new FilterRegistrationBean();
		registration.setFilter(new RequestFilter());
		registration.addUrlPatterns("/*");
		registration.setName("XssFilter");
		return registration;
	}
*/
	@Bean
	public DataSource dataSource() {
		DataSource pool = new DataSource();
		pool.setDriverClassName("");
		pool.setUrl("");
		pool.setUsername(this.getProperty("oracle.username"));
		pool.setPassword(this.getProperty("oracle.password"));
		pool.setInitialSize(1);
		pool.setMaxActive(5); // need to get from properties
		pool.setMaxIdle(5);
		pool.setMinIdle(1);
		return pool;
	}

	@Bean
	public SqlSessionFactory sqlSessionFactoryBean() throws Exception {
		String envString = System.getProperty("sample.active.profile");
		SqlSessionFactoryBean factory = new SqlSessionFactoryBean();
		String propertiesFile = "com/spring/boot/common/config/SQLMapConfig-" + envString + ".properties";
		Properties props = Resources.getResourceAsProperties(propertiesFile);
		Properties p = new Properties();
		p.put("commitRequired", "false");
		ManagedTransactionFactory m = new ManagedTransactionFactory();
		m.setProperties(p);
		factory.setTransactionFactory(m);
		factory.setConfigLocation(new ClassPathResource("com/spring/boot/common/config/SQLMapConfig.xml"));
		factory.setConfigurationProperties(props);
		factory.setDataSource(this.dataSource());
		return factory.getObject();
	}

	@Bean(name = "MyBatisConfigurator")
	public SampleMyBatisConfigurator myBatisConfigurator() throws Exception {
		System.setProperty("env", System.getProperty("sample.active.profile"));
		SampleMyBatisConfigurator t = new SampleMyBatisConfigurator();
		t.setFactory(sqlSessionFactoryBean());
		return t;
	}

	@Bean(name = "MyBatisTemplate")
	public SampleMyBatisTemplateImpl sampleMybatisTemplateImpl() throws Exception {
		SampleMyBatisTemplateImpl t = new SampleMyBatisTemplateImpl();
		MyBatisConfigurator t1 = new MyBatisConfigurator();
		t.setMyBatisConfigurator(t1);
		t.initialize();
		logger.info("Initialization completed for myBatis");
		return t;
	}

	/*@Bean(name = "sitemeshFilterRegistration")
	public FilterRegistrationBean siteMeshFilterRegistration() {
		FilterRegistrationBean registration = new FilterRegistrationBean();
		registration.setFilter(new SiteMeshFilter());
		registration.addUrlPatterns("/*");
		registration.setName("sitemeshFilter");
		return registration;
	}*/

}
