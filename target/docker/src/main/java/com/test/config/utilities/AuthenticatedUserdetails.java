package com.test.config.utilities;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import javax.persistence.Transient;

/**
 * Gets authenticated user details for creating test users in the db
 *
 * @author adam.luckey
 * @since 01-19-2017
 */
public class AuthenticatedUserdetails {
    @Transient
    private static SecurityContext ctx;//NOPMD
    private String name;//NOPMD

    /**
     * Constructor
     */
    public AuthenticatedUserdetails() {
        ctx = SecurityContextHolder.getContext();
        SecurityContextHolder.getContext();
        final Authentication authentication = ctx.getAuthentication();
        setName(authentication.getName()); //NOPMD
    }

    /**
     * Get authenticated user name
     *
     * @return
     */
    public String getName() {
        return name;
    }

    /**
     * Set authenticated user name
     *
     * @param name
     */
    public void setName(final String name) {
        this.name = name;
    }
}
