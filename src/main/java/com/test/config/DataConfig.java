package com.test.config;

import org.apache.tomcat.dbcp.dbcp2.BasicDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;

import javax.sql.DataSource;

/**
 * Creates session factory for hibernate ORM and
 * provides setup for connecting to database/datasource
 *
 * @author adam.luckey
 * @since 2017-05-18
 */
@Configuration
@PropertySource("app.properties")
public class DataConfig {

    @Autowired
    private Environment environment; // get settings declared in app.properties

    /**
     * Set up the hibernate ORM, and return a sessionfactory
     * to access objects via dependency injection.
     *
     * @return a seesion factory
     */
    @Bean
    public LocalSessionFactoryBean sessionFactory() {
        final Resource config = new ClassPathResource("hibernate.cfg.xml"); // load resources from the xml
        final LocalSessionFactoryBean sessionFactory = new LocalSessionFactoryBean(); // create a new factory
        sessionFactory.setConfigLocation(config); // set factory to use config
        sessionFactory.setPackagesToScan(environment.getProperty("MultithreadSpringTest.entity.package")); // point the factory to models
        sessionFactory.setDataSource(dataSource()); // set the datasource to be the database
        return sessionFactory;
    }

    /**
     * Set up the datasource to be an postgres database
     * it lives in AWS and is configured in the app.properties
     * and hibernate.cfg.xml
     *
     * Url, username, and password are set based on environment variables
     * for better secret handling
     * @return datasource
     */
    @Bean
    public DataSource dataSource() {
        final BasicDataSource datasource = new BasicDataSource();
        datasource.setDriverClassName("org.postgresql.Driver"); // driver class name
        datasource.setUrl(System.getenv("TEST_DB_URL")); // set url using environment variable

        // set username and password
        datasource.setUsername(System.getenv("TEST_DB_USERNAME"));// set username using env variable
        datasource.setPassword(System.getenv("TEST_DB_PASSWORD"));// set password using env variable


        return datasource;
    }
}
