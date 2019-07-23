#!/usr/bin/env bash

#eval `ssh-agent -s`
#ssh-add ~/.ssh/rsa_key


echo "Uploading latest version..."
# Clear target folder
ssh root@130.193.10.82 "cd /home/ && rm -rf hash-messages-server && mkdir 'hash-messages-server'"

# Copy all files
scp ./package.json root@130.193.10.82:/home/hash-messages-server
scp ./tsconfig.json root@130.193.10.82:/home/hash-messages-server
scp -r ./lib root@130.193.10.82:/home/hash-messages-server/
scp -r ./config/ root@130.193.10.82:/home/hash-messages-server/
echo

# Install all packages
echo "Installing npm packages..."
ssh root@130.193.10.82 "cd /home/hash-messages-server && npm install"
echo

echo "Building & Killing process on port 3000 & Running server..."
# Run app
ssh root@130.193.10.82 "fuser -k 3000/tcp"
ssh root@130.193.10.82 "cd /home/hash-messages-server && tsc && nodemon ./dist/server.js"
echo

echo "------------"
echo "--- DONE ---"
echo "------------"
