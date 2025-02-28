#!/bin/bash

sudo apt update
sudo apt install apt-transport-https ca-certificates curl software-properties-common

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt update

apt-cache policy docker-ce
sudo apt install docker-ce
sudo systemctl status docker

git clone git@github.com:planet-nine-app/<your domain>git

apt install nginx
sudo apt install certbot python3-certbot-nginx

cp placeholder-nginx /etc/nginx/sites-available/default

echo "run certbot"

# sudo certbot --nginx -d <subdomain.continuebee.<your domain>com -d <subdomain.julia.<your domain>com -d <subdomain.pref.<your domain>com -d <subdomain.bdo.<your domain>com -d <subdomain.joan.<your domain>com -d <subdomain.addie.<your domain>com -d <subdomain.fount.<your domain>com
