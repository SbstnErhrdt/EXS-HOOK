#!/bin/bash

cd /home/production/io

git fetch --all
git reset --hard origin/master

if [ ! -d log ]; then
  mkdir log
fi

npm install

forever restart server.js
