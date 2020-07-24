#!/bin/bash
input="./logs/pid"

# while IFS= read -r line
# do
#   echo $(kill $line && echo "Killed $line" || echo "Server is down")
# done < "$input"

pid= pgrep node
if [ -z "$pid"]
then
  echo "Server is down."
else
  echo $(kill $pid)
fi
