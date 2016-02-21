package com.spring.boot.config;

import org.apache.ibatis.session.SqlSessionFactory;

public class SampleMyBatisConfigurator extends MyBatisConfigurator {
	
	private SqlSessionFactory sessFactory;
	
	public void setFactory(SqlSessionFactory factory) {
		this.sessFactory = factory;
	}
	
	@Override
	public SqlSessionFactory getFactory() {
		return sessFactory;
	}

}
