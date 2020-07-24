#!/bin/bash

pid= pgrep node
if [ -z "$pid"]
then
  echo "Server is down."
else
  echo "Server is running"
fi
