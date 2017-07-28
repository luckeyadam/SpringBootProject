package com.test.service;

import com.test.dao.TestUserDao;
import com.test.model.TestUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * implementer for test user service
 *
 * @author adam.luckey
 * @since 2017-05-19
 */

@Service
public class TestUserImpl implements TestUserService {//NOPMD
    @Autowired
    private TestUserDao testUserDao;//NOPMD

    /**
     * find user by name via find by name dao
     *
     * @param name
     * @return
     */
    @Override
    public TestUser findByName(final String name) {
        return testUserDao.findByName(name);
    }

    /**
     * save user via via dao save method
     *
     * @param TestUser
     */
    @Override
    public void save(final TestUser TestUser) {
        testUserDao.save(TestUser);
    }

    /**
     * delete user via dao delete method
     *
     * @param TestUser
     */
    @Override
    public void delete(final TestUser TestUser) {
        //TODO delete user
    }

    /**
     * remove a command from a user via the dao method
     *
     * @param TestUser
     * @param command
     */
    @Override
    public void removeCommand(final TestUser TestUser, final String command) {
        testUserDao.removeCommand(TestUser, command);
    }

    /**
     * add a command to a user via the dao method
     *
     * @param TestUser
     * @param key
     * @param value
     */
    @Override
    public void addCommand(final TestUser TestUser, final String key, final String value) {
        testUserDao.addCommand(TestUser, key, value);
    }

    /**
     * set the url for the custom tile
     *
     * @param TestUser
     * @param jiraUrl
     */
    @Override
    public void setCustomTileUrl(final TestUser TestUser, final String jiraUrl) {
        testUserDao.setCustomTileUrl(TestUser, jiraUrl);
    }

    /**
     * set the title for the custom tile
     *
     * @param TestUser
     * @param jiraTitle
     */
    @Override
    public void setCustomTileTitle(final TestUser TestUser, final String jiraTitle) {
        testUserDao.setCustomTileTitle(TestUser, jiraTitle);
    }
}
