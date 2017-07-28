package com.test.dao;

import com.test.model.TestUser;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * test user implementer
 *
 * @author adam.luckey
 * @since 2017-05-19
 */

@Repository
public class TestUserDaoImpl implements TestUserDao {//NOPMD
    @Autowired
    private SessionFactory sessionFactory; //NOPMD

    /**
     * find test user by name
     *
     * @param name name
     * @return user
     */
    @Override
    public TestUser findByName(final String name) {//NOPMD
        // Open session
        Session session = sessionFactory.openSession();//NOPMD

        // Get all test users with hibernate criteria
        final Criteria criteria = session.createCriteria(TestUser.class);//NOPMD
        criteria.add(Restrictions.like("name", name));//NOPMD
        final List<TestUser> testUsers = criteria.list();//NOPMD
        // set the returned user to match the one sent
        TestUser founduser = null;//NOPMD
        for (final TestUser user : testUsers) {//NOPMD
            if (user.getName().equals(name)) {//NOPMD
                founduser = user;//NOPMD
            }
        }//NOPMD
        // Close session
        session.close();//NOPMD
        return founduser;
    }

    /**
     * save a test user to db
     *
     * @param TestUser user
     */
    @Override
    public void save(final TestUser TestUser) {
        // open a session
        final Session session = sessionFactory.openSession();
        // begin a transaction
        session.beginTransaction();
        // save the user
        session.save(TestUser);
        // commit the transaction
        session.getTransaction().commit();//NOPMD
        // close the session
        session.close();
    }

    /**
     * delete test user from db
     *
     * @param TestUser user
     */
    @Override
    public void delete(final TestUser TestUser) {
        //TODO delete user
    }

    /**
     * Remove a command from a user
     *
     * @param TestUser user
     * @param command    command
     */
    @Override
    public void removeCommand(final TestUser TestUser, final String command) {
        // open a session
        final Session session = sessionFactory.openSession();
        // begin a transaction
        session.beginTransaction();
        // declare the user to modify the commands of
        final TestUser user = (TestUser) session.get(TestUser.class, TestUser.getUserId());
        // remove the command
        user.removeCommand(command);//NOPMD
        // commit the transaction
        session.getTransaction().commit();//NOPMD
        // close the session
        session.close();
    }

    /**
     * Remove a command from a user
     *
     * @param TestUser user
     * @param key        key
     * @param value      value
     */
    @Override
    public void addCommand(final TestUser TestUser, final String key, final String value) {
        // open a session
        final Session session = sessionFactory.openSession();
        // begin a transaction
        session.beginTransaction();
        // declare the user to modify the commands of

        final TestUser user = (TestUser) session.get(TestUser.class, TestUser.getUserId());
        // remove the command
        user.addCommand(key, value);//NOPMD
        // commit the transaction
        session.getTransaction().commit();//NOPMD
        // close the session
        session.close();
    }

    /**
     * set the custom tile url
     *
     * @param TestUser
     * @param tileUrl
     */
    @Override
    public void setCustomTileUrl(final TestUser TestUser, final String tileUrl) {
        // open a session
        final Session session = sessionFactory.openSession();
        // begin a transaction
        session.beginTransaction();
        // declare the user to modify the commands of

        final TestUser user = (TestUser) session.get(TestUser.class, TestUser.getUserId());
        // remove the command
        user.setCustomTileUrl(tileUrl);//NOPMD
        // commit the transaction
        session.getTransaction().commit();//NOPMD
        // close the session
        session.close();
    }

    /**
     * set the custom tile title
     *
     * @param TestUser
     * @param tileTitle
     */
    @Override
    public void setCustomTileTitle(final TestUser TestUser, final String tileTitle) {
        // open a session
        final Session session = sessionFactory.openSession();
        // begin a transaction
        session.beginTransaction();
        // declare the user to modify the commands of
        final TestUser user = (TestUser) session.get(TestUser.class, TestUser.getUserId());
        // remove the command
        user.setCustomTileTitle(tileTitle);//NOPMD
        // commit the transaction
        session.getTransaction().commit();//NOPMD
        // close the session
        session.close();
    }
}
