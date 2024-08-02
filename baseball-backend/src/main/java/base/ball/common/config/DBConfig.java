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

//classpath = src/main/resources 의 줄임말
@Configuration
@PropertySource("classpath:/config.properties")
public class DBConfig {
	
	@Autowired
	private ApplicationContext applicationContext; //연결되는 주소 관리자, 나중에 xml 과 같은 경로를 보유하고 관리

	@Bean // 객체 생성, 히카리 사용하겠다 선언!
	@ConfigurationProperties(prefix = "spring.datasource.hikari")
	public HikariConfig hikariConfig() {
		return new HikariConfig(); //hikari DataBase 연결을 도와주는 라이브러리
	}
	
	@Bean //객체 생성, DataBase 연결을 해주겠다!
	public DataSource dataSource(HikariConfig config) {
		DataSource dataSource = new HikariDataSource(config);
		return dataSource;
	}
	
	@Bean
	public SqlSessionFactory sessionFatory(DataSource dataSource) throws Exception {
		SqlSessionFactoryBean sfb = new SqlSessionFactoryBean();
		sfb.setDataSource(dataSource); //HikariConfig에서 받은 정보로 연결한 DataBase 연결 경로를 가져와서 사용
		sfb.setMapperLocations(applicationContext.getResources("classpath:/mappers/**.xml"));
		sfb.setTypeAliasesPackage("base.ball.dto"); //나중에 본인의 dto 패키지명으로 변경해야함, dataBase에 작성한 컬럼값과 dto에 작성한 변수명을 대조
		
		//우리가 나중에 컬럼명을 dto에서 카멜메이스나 dto 용법으로 작성했을 때 작성값 설정
		sfb.setConfigLocation(applicationContext.getResource("classpath:mybatis-config.xml"));
		return sfb.getObject();
	}
	
	@Bean //sql에 작성한 select insert delete update 를 이용한 DataBase 작업을 관리
	public SqlSessionTemplate sqlSessionTemplate(SqlSessionFactory sf) {
		return new SqlSessionTemplate(sf);
	}
	
	@Bean //commit rollback 과 같은 수정하거나 삭제하거나 추가했을 대 완전하게 DB에 저장하거나 되돌릴 수 있도록 도와줌
	public DataSourceTransactionManager dataSourceTransactionManager(DataSource ds) {
		return new DataSourceTransactionManager(ds);
		//insert delete update 는 commit을 하지 않으면 완벽하게 저장이 안된 상태에서 select를 진행하기 때문에
		//저장을 안해서 안버이는 상황이라 여기지 않고 코드상이나 흐름에 문제가 있다고 생각할 수 있기 때문에 commit 진행 매니저를 생성해준것
		
	}
}












