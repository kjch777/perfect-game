package base.ball.common.config;

import javax.sql.DataSource;

import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;

@Configuration
@PropertySource("classpath:/config.properties")
public class DBConfig {
	
	@Autowired
	private ApplicationContext applicationContext;// 연결되는 주소 관리자 나중에 xml과 같은 경로를 보유하고 관리
	
	@Bean//객체생성 히카리 사용하겠다 선언
	@ConfigurationProperties(prefix="spring.datasource.hikari")
	public HikariConfig hikariConfig() {
		/*
		config.setJdbcUrl("jdbc:mysql://localhost:3306/KH_WORKBOOK");
		config.setUsername("root");
		config.setPassword("kh1234");
		config.setDriverClassName("com.mysql.cj.jdbc.Driver");
		*/
		return new HikariConfig();//hikari DataBase 연결을 도와주는 라이브러리
	}
	
	@Bean//객체생성 DataBase 연결을 해주겠다
	public DataSource dataSource(HikariConfig config) {
		DataSource dataSource = new HikariDataSource(config);
		return dataSource;
	}
	
	@Bean
	public SqlSessionFactory sessionFactory(DataSource dataSource) throws Exception {
		SqlSessionFactoryBean sfb = new SqlSessionFactoryBean();
		sfb.setDataSource(dataSource);//HikariConfig에서 받은 정보로 DataBase연결경로 가져와서 사용
		sfb.setMapperLocations(applicationContext.getResources("classpath:/mappers/**.xml"));
		sfb.setTypeAliasesPackage("base.ball.dto");//dto패키지명 database에 작성한 컬럼값과 dto에 작성한 변수명 대조
		
		//컬럼명을 dto에서 camelCase 등으로 작성했을 때 작성값 설정
		sfb.setConfigLocation(applicationContext.getResource("classpath:mybatis-config.xml"));
		return sfb.getObject();
		
	}
	
	@Bean//sql작성한 select insert delete update 이용한 database 작업 관리
	public SqlSessionTemplate sqlSessionTemplate(SqlSessionFactory sf) {
		return new SqlSessionTemplate(sf);
	}
	
	@Bean//commit rollback 같은 수정하거나 삭제하거나 추가했을 때 완전하게 DB에 저장하거나 롤백
	public DataSourceTransactionManager dataSourceTransactionManager(DataSource ds) {
		return new DataSourceTransactionManager(ds);
		//insert delete update commit 하지 않으면
	}
	
	



}
