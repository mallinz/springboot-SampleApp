package com.spring.boot.config;

public interface SampleMyBatisTemplate {
	
	public Object queryForObject(String sqlMapStatementId, Object parameterObject);
	
	public Object queryForList(String sqlMapStatementId, Object parameterObject);
	
	public Object insert(String sqlMapStatementId, Object parameterObject);
	
	public Object update(String sqlMapStatementId, Object parameterObject);
	
	public Object delete(String sqlMapStatementId, Object parameterObject);

}
