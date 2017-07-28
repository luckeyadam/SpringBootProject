package com.test.controllers;

import com.test.config.utilities.AuthenticatedUserdetails;
import com.test.model.TestUser;
import com.test.service.TestUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * This controller tells spring/thymeleaf to
 * serve the home.html page for requests to "/"
 *
 * @author adam.luckey
 * @since 2017-05-19
 */

@Controller
public class HomePageController{
    @Autowired
    private TestUserService testUserService;//NOPMD

    /**
     * Constructor
     */
    public HomePageController() {//NOPMD
    }

    /**
     * set requests to root and home
     *
     * @param model model
     * @return home.html
     */
    @RequestMapping(value = {"/", "/home"})
    public String showHomePage(final ModelMap model) {

        // get the details of the authenticated user
        final AuthenticatedUserdetails userDetails = new AuthenticatedUserdetails();
        // check to see if our athenticated user exists in the db
        TestUser verifyUser = testUserService.findByName(userDetails.getName());

        if (verifyUser == null) { // if the user hasnt been created before, create one
            final TestUser TestUser = new TestUser();
            TestUser.setName(userDetails.getName());
            TestUser.setSecurityContext();
            testUserService.save(TestUser);
            verifyUser = TestUser;
            model.addAttribute("testUser", TestUser);
        } else {
            model.addAttribute("testUser", verifyUser);  // set our user to be one that exists
        }
        return "home";
    }

}
