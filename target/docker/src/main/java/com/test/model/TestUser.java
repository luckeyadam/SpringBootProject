package com.test.model;

import org.hibernate.annotations.ColumnDefault;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.HashMap;
import java.util.Map;

/**
 * The user configuration model
 *
 * @author adam.luckey
 * @since 2017-05-18
 */

@Entity // entities automatically get a row in the database.
// Transient items are excluded.
public class TestUser {
    @Id // set this as the primary key, non transient fields will get marked as a column for free from this//NOPMD
    @GeneratedValue(strategy = GenerationType.IDENTITY) // make it a generated value that is unique //NOPMD
    private int userId;//NOPMD

    @NotNull // must be present
    @Size(min = 1)
    private String name;//NOPMD

    private String newRcas;//NOPMD
    private String pendingRcas;//NOPMD
    @ColumnDefault("false")
    private boolean useJira;
    private String jiraName;
    private String jiraUrl;
    @ColumnDefault("'New RCAs'")
    @Column(columnDefinition = "text")
    private String customTileTitle;
    @ColumnDefault("'test.com'")
    @Column(columnDefinition = "text")
    private String customTileUrl;

    @ElementCollection(fetch = FetchType.EAGER)
    @Column(columnDefinition = "text")
    private Map<String, String> commands = new HashMap<>();//NOPMD

    @Transient
    private static SecurityContext ctx;//NOPMD

    /**
     * default constructor for JPA
     */
    public TestUser() {//NOPMD
    }

    /**
     * get username
     *
     * @return
     */
    public String getName() {
        return name;
    }

    /**
     * set username
     *
     * @param username
     */
    public void setName(final String username) {
        // when user is created, give them a set of default one liner commands
        createDefaultCommands();
        this.name = username; // set the username which also puts this user into the db
    }

    /**
     * Creates a set of default commands for a user
     */
    public void createDefaultCommands() {
        commands.put("Top 10 Items in logs serving 404s sorted by count", "grep 'HTTP/1.1\\\" 404' httpd-access.log | cut -d ' ' -f 7 | sort | uniq -c | sort -nr | head");
        commands.put("Top 10 User agents", "cat httpd-access.log | cut -d '\\\"' -f 6 | sort | uniq -c | sort -nr | head");
        commands.put("Most requested URLs", "awk -F\\\" '{print $2}' httpd-access.log | awk '{print $2}' | sort | uniq -c | sort -nr | head");
        commands.put("Top 10 IP Addresses", "cat httpd-access.log | awk '{print $1}' | sort -n | uniq -c | sort -nr | head -10");
    }

    /**
     * get new rcas
     *
     * @return
     */
    public String getNewRcas() {
        return newRcas;
    }

    /**
     * set new rcas
     *
     * @param newRcas
     */
    public void setNewRcas(final String newRcas) {
        this.newRcas = newRcas;
    }

    /**
     * get pending rcas
     *
     * @return
     */
    public String getPendingRcas() {
        return pendingRcas;
    }

    /**
     * set pending rcas
     *
     * @param pendingRcas
     */
    public void setPendingRcas(final String pendingRcas) {
        this.pendingRcas = pendingRcas;
    }

    /**
     * get user id
     *
     * @return
     */
    public int getUserId() {
        return userId;
    }

    /**
     * set user id
     *
     * @param userId
     */
    public void setUserId(final int userId) {
        this.userId = userId;
    }

    /**
     * Set the security context for a user
     * so we can access information
     * for creating test user profiles
     */
    public void setSecurityContext() {
        ctx = SecurityContextHolder.getContext();
        SecurityContextHolder.getContext();
        final Authentication authentication = ctx.getAuthentication();
        setName(authentication.getName()); //NOPMD
    }

    /**
     * Get the map of commands associated with this user
     *
     * @return
     */
    public Map<String, String> getCommands() {
        return commands;
    }

    /**
     * Set the list of commands associated with this user
     *
     * @param commands
     */
    public void setCommands(final Map<String, String> commands) {
        this.commands = commands;
    }

    /**
     * Add a command to the users saved commands
     * using a key and value
     *
     * @param key
     * @param value
     */
    public void addCommand(final String key, final String value) {
        this.commands.put(key, value);
    }

    /**
     * Remove a command from a user
     *
     * @param command
     */
    public void removeCommand(final String command) {
        try {
            commands.remove(command);
        } catch (Exception e) {//NOPMD
            e.printStackTrace();//NOPMD
            e.getMessage();//NOPMD
        }
    }

    public boolean getUseJira() {
        return useJira;
    }

    public void setUseJira(boolean useJira) {
        this.useJira = useJira;
    }

    public String getJiraName() {
        return jiraName;
    }

    public void setJiraName(String jiraName) {
        this.jiraName = jiraName;
    }

    public String getJiraUrl() {
        return jiraUrl;
    }

    public void setJiraUrl(String jiraUrl) {
        this.jiraUrl = jiraUrl;
    }

    public String getCustomTileTitle() {
        return customTileTitle;
    }

    public void setCustomTileTitle(String customTileTitle) {
        this.customTileTitle = customTileTitle;
    }

    public String getCustomTileUrl() {
        return customTileUrl;
    }

    public void setCustomTileUrl(String customTileUrl) {
        this.customTileUrl = customTileUrl;
    }
}
