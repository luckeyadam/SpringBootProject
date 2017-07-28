package com.test.controllers;

import org.springframework.core.Ordered;
import org.springframework.stereotype.Controller;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/**
 * The controller for requests and actions for /login page
 * @author adam.luckey
 * @since 5/18/17
 */

// extends WebMvcConfigurerAdapter to allow view control to be used for
// the login page
@Controller
public class LoginPageController extends WebMvcConfigurerAdapter {

    /**
     * Set up custom login page
     *
     * @param registry registry
     */
    @Override
    public void addViewControllers(final ViewControllerRegistry registry) {
        registry.addViewController("/login").setViewName("login");//NOPMD
        registry.setOrder(Ordered.HIGHEST_PRECEDENCE);//NOPMD
    }

}
