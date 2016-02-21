package com.spring.boot.config;

import java.io.IOException;
import java.io.Reader;
import java.util.Properties;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import static com.spring.boot.config.ECLConstants.*;

public class MyBatisConfigurator {
	
	private static final Logger logger = Logger.getLogger(MyBatisConfigurator.class.getName());
	
	private String sqlMapConfigFilePath;
	
	private String sqlMapPropertiesFilePath;
	
	private final String DFLT_ENV_STRING = "LOCAL";
	
	private final String ENV_PLACEHOLDER_STRING = "${env}";
	
	private SqlSessionFactory factory = null;
	
	public MyBatisConfigurator()
	{
		
	}

	public void setSqlMapConfigFilePath(String sqlMapConfigFilePath) {
		this.sqlMapConfigFilePath = sqlMapConfigFilePath;
	}

	public void setSqlMapPropertiesFilePath(String sqlMapPropertiesFilePath) {
		this.sqlMapPropertiesFilePath = sqlMapPropertiesFilePath;
	}
	
	public void initialize()
	{
		try
		{
			String envString = System.getProperty(DEFAULT_ENV);
			if(envString == null || envString.trim().equals(""))
			{
				envString = this.DFLT_ENV_STRING;
			}
			
			if(this.sqlMapConfigFilePath == null)
			{
				RuntimeException ex = new RuntimeException("SQLMapConfig File path is null");
				logger.logp(Level.SEVERE, "MyBatisConfigurator", "initialize()", "Error creating SQL Factory", ex);
			}
			
			if(this.sqlMapConfigFilePath != null)
			{
				buildSQLSessionFactory(envString);
				
				logger.logp(Level.INFO, "MyBatisConfigurator", "initialize()", "SQL Factory Created : envString="+envString
						+" \nSQLMapConfigFilePath="+sqlMapConfigFilePath+ " \nSQLMAPConfigProperties File path="+sqlMapPropertiesFilePath);
			}
		}
		catch(Throwable ex)
		{
			logger.logp(Level.SEVERE, "MyBatisConfigurator", "initialize()", "Error creating SQL Factory", ex);
			throw new RuntimeException("Error creating SQL Factory");
		}
	}

	private void buildSQLSessionFactory(String envString) throws IOException {

		Properties props = null;
		SqlSessionFactoryBuilder builder = new SqlSessionFactoryBuilder();
		
		if(this.sqlMapPropertiesFilePath != null && !this.sqlMapPropertiesFilePath.trim().equals(""))
		{
			this.sqlMapPropertiesFilePath = this.sqlMapPropertiesFilePath.replace(this.ENV_PLACEHOLDER_STRING, envString).trim();
			props = Resources.getResourceAsProperties(this.sqlMapPropertiesFilePath);
		}
		
		Reader reader = Resources.getResourceAsReader(this.sqlMapConfigFilePath);
		if(props != null)
		{
			factory = builder.build(reader, envString, props);
		}
		else
		{
			factory = builder.build(reader, envString);
		}
	}
	
	public SqlSessionFactory getFactory()
	{
		return factory;
	}

}
