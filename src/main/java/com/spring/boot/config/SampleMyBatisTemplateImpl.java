package com.spring.boot.config;

import java.util.logging.Level;
import java.util.logging.Logger;

import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;

public class SampleMyBatisTemplateImpl implements SampleMyBatisTemplate {

	private static final Logger logger = Logger
			.getLogger(SampleMyBatisTemplateImpl.class.getName());

	private MyBatisConfigurator myBatisConfigurator;

	private SqlSessionFactory factory;

	public void setMyBatisConfigurator(MyBatisConfigurator myBatisConfigurator) {
		this.myBatisConfigurator = myBatisConfigurator;
	}

	public void initialize() {
		if (myBatisConfigurator == null) {
			RuntimeException ex = new RuntimeException(
					"MybatisConfigurator is null");
			logger.logp(Level.SEVERE, "MyBatisTemplateImpl", "initialize()",
					"MybatisConfigurator is null", ex);
			throw ex;
		}
		this.factory = this.myBatisConfigurator.getFactory();
	}

	public Object queryForObject(String sqlMapStatementId,
			Object parameterObject) {

		SqlSession session = null;
		try {
			session = this.factory.openSession();
			return session.selectOne(sqlMapStatementId, parameterObject);
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		} finally {
			session.close();
		}
	}

	public Object queryForList(String sqlMapStatementId, Object parameterObject) {

		SqlSession session = null;
		try {
			session = this.factory.openSession();
			return session.selectList(sqlMapStatementId, parameterObject);
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
	}

	public Object insert(String sqlMapStatementId, Object parameterObject) {

		SqlSession session = null;
		try {
			session = this.factory.openSession();
			return session.insert(sqlMapStatementId, parameterObject);
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
	}

	public Object update(String sqlMapStatementId, Object parameterObject) {

		SqlSession session = null;
		try {
			session = this.factory.openSession();
			return session.update(sqlMapStatementId, parameterObject);
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
	}

	public Object delete(String sqlMapStatementId, Object parameterObject) {

		SqlSession session = null;
		try {
			session = this.factory.openSession();
			return session.delete(sqlMapStatementId, parameterObject);
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
	}

}
