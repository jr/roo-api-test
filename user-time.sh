#!/bin/bash

# Script to print current user and time
# Output format: User: <username>, Time: YYYY-MM-DD HH:MM:SS

USER_NAME=$(whoami)
CURRENT_TIME=$(date '+%Y-%m-%d %H:%M:%S')

echo "User: $USER_NAME, Time: $CURRENT_TIME"
