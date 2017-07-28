# use jdk8
FROM openjdk

# expose 80 as a port for the application
EXPOSE 8080

# declare myself as the maintainer
MAINTAINER Adam Luckey

# give it a timestamp
ENV REFRESHED_AT 2017-05-18

# where a Spring Boot application creates working directories for Tomcat by default
VOLUME /tmp

COPY entrypoint.sh /multithread/
#COPY /secrets/test-db/password /secrets/test-db/
#COPY /secrets/test-db/username /secrets/test-db/
RUN chmod +x /multithread/entrypoint.sh

# add the jar
ADD target/multithread-snapshot.jar app.jar

# create the jar and add a modification date
RUN /bin/bash -c 'touch /app.jar'

# set any opts you may need
ENV JAVA_OPTS=""


# identify the executable to be run
ENTRYPOINT [ "/multithread/entrypoint.sh" ]