#!/bin/bash

function assert_var() {
    local VARNAME=$1
    if [ -z ${!VARNAME} ]; then
        echo "ERROR: $VARNAME not defined."
        EXIT=1
        return 1
    fi
}

function create_file_var() {
    local VARNAME=$1
    local FILENAME=$2
    local FILTER=$3 # optional
    if [ ! -e "$FILENAME" ]; then
        echo "ERROR: file $FILENAME not found."
        EXIT=1
        return 1
    fi

    if [ -z "${3}" ]; then
        export $VARNAME="$(cat ${FILENAME})"
    else
        export $VARNAME="$(cat ${FILENAME} | ${3})"
    fi

    assert_var $VARNAME
    return $?
}

#create_file_var TEST_DB_PASSWORD "/secrets/test-db/password"
#create_file_var TEST_DB_USERNAME "/secrets/test-db/username"

EXEC_JAR="java $JAVA_OPTS -Djava.security.egd=file:/dev/./urandom -Xmx800m -jar /app.jar"

case "${1}" in
    bash)
        shift
        exec /bin/bash "${@}"
        ;;
    *)
        exec ${EXEC_JAR} "${@}"
        ;;
esac