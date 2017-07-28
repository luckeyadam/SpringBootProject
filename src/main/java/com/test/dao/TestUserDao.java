package com.test.dao;

import com.test.model.TestUser;

/**
 * dao interface for test users
 *
 * @author adam.luckey
 * @since 2017-05-19
 */

public interface TestUserDao {

    TestUser findByName(String name);//NOPMD

    void save(TestUser TestUser);//NOPMD

    void delete(TestUser TestUser);//NOPMD

    void removeCommand(TestUser TestUser, String command);//NOPMD

    void addCommand(TestUser TestUser, String key, String value);//NOPMD

    void setCustomTileUrl(TestUser user, String jiraUrl);

    void setCustomTileTitle(TestUser user, String jiraTitle);

}
