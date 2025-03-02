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

cp ./placeholder-nginx /etc/nginx/sites-available/default

echo "restart nginx with sudo systemctl restart nginx, add A records to your server from your domain, and then run certbot"

# sudo certbot --nginx -d <subdomain>.addie.<domain>.com -d <subdomain>.aretha.<domain>.com -d <subdomain>.bdo.<domain>.com -d <subdomain>.continuebee.<domain>.com -d <subdomain>.fount.<domain>.com -d <subdomain>.joan.<domain>.com -d <subdomain>.julia.<domain>.com -d <subdomain>.pref.<domain>.com -d <subdomain>.sanora.<domain>.com 
