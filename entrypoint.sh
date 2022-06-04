#!/bin/sh

# Abort on any error (including if wait-for-it fails).
set -e

# Wait for the backend to be up, if we know where it is.
/wait-for-it.sh -t 60 db:3306

# Run the main container command.
nodemon /app/src/server.js