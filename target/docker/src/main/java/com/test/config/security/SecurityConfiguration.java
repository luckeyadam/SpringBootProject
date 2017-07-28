package com.test.config.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

/**
 * configures and enables web security and handles authentication
 * @author adam.luckey
 * @since 2017-05-18mvn
 */
@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {//NOPMD

    /**
     * Configure websecurity to allow access to resources
     * so resources for pages can be rendered
     *
     * @param webSecurity webSecurity
     * @throws Exception exception
     */
    @Override
    public void configure(final WebSecurity webSecurity) throws Exception {//NOPMD
        // @formatter:off
        webSecurity.ignoring()//NOPMD
                .antMatchers("/css/**")
                .antMatchers("/js/**")
                .antMatchers("/img/**")
                .antMatchers("/font/**");
        // @formatter:on
    }

    /**
     * redirect requests during authentication
     *
     * @param http http
     * @throws Exception exception
     */
    @Override
    protected void configure(final HttpSecurity http) throws Exception {//NOPMD
        // @formatter:off

        // if not on localhost require https (for testing in local Docker env)
        if(System.getenv("LOCALDEV") != null && !System.getenv("LOCALDEV").contains("dev")){
            http.requiresChannel().anyRequest().requiresSecure();
            }

        http
                .authorizeRequests()
                    //.antMatchers("/login").permitAll() //permit traffic to /login
                    .anyRequest().authenticated() // permit authenticated users
                    .and()
                .formLogin() // declare login to be via a form
                    .loginPage("/login") // when authentication is required, redirect the browser to /login
                    .defaultSuccessUrl("/home", true) // if success navigate to root
                    .permitAll() // permit anyone to access login page
                    .and()
                .logout().logoutRequestMatcher(new AntPathRequestMatcher("/logout")) // if user goes to /logout, logout
                    .logoutSuccessUrl("/login") // redirect to login after logoit
                    .invalidateHttpSession(true) // invalidate session
                    .deleteCookies("JSESSIONID")
                    .deleteCookies("cookie_adamtest")
                    .permitAll(); // let everyone to logout
        http
                .csrf().disable(); //NOPMD

        // @formatter:on

    }


    /**
     * Authenticate to ldap
     *
     * @param auth auth
     * @throws Exception exception
     */
    @Autowired
    @Override
    protected void configure(final AuthenticationManagerBuilder auth)
            throws Exception {//NOPMD
        // @formatter:off
        auth//NOPMD
                .ldapAuthentication()  // set authentication to be via ldap
                    .userDnPatterns("uid={0},ou=scientists,dc=example,dc=com") // set up username and ldap dn
                    .userSearchFilter("(&(uid={0})(objectclass=Person))") // apply a search filter based on username/uid
                .contextSource()
                    .url("ldap://ldap.forumsys.com/dc=example,dc=com"); // set url for ldap
        // @formatter:on
    }

}