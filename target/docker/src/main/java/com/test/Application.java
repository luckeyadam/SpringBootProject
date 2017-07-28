package com.test;

import org.springframework.boot.Banner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.scheduling.annotation.AsyncConfigurerSupport;

/**
 * Main class
 *
 * @author adam.luckey
 * @since 2017-05-18
 */

@EnableAutoConfiguration // Attempt to guess and configure beans you are likely to need
@ComponentScan // Configures component scanning directives
@SpringBootApplication
public class Application extends AsyncConfigurerSupport {

    /**
     * Run the application
     *
     * @param args standard svm args
     */
    public static void main(final String args[]) {
        final SpringApplication app = new SpringApplication(Application.class);
        app.setBannerMode(Banner.Mode.OFF); // turn off spring banner in logs
        app.run(args); // run the app
    }
}