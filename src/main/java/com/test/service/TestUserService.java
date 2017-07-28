package com.test.service;

import com.test.model.TestUser;

/**
 * test user service interface
 *
 * @author adam.luckey
 * @since 2017-05-19
 */

public interface TestUserService {

    TestUser findByName(String name);//NOPMD

    void save(TestUser TestUser);//NOPMD

    void delete(TestUser TestUser);//NOPMD

    void removeCommand(TestUser TestUser, String command);//NOPMD

    void addCommand(TestUser TestUser, String key, String value);//NOPMD

    void setCustomTileUrl(TestUser TestUser, String jiraUrl);

    void setCustomTileTitle(TestUser TestUser, String jiraTitle);

}
