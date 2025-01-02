#!/bin/bash
LOCALHOST=true pm2 start /usr/src/app/julia/src/server/node/julia.js &
LOCALHOST=true pm2 start /usr/src/app/continuebee/src/server/node/continuebee.js &
LOCALHOST=true pm2 start /usr/src/app/joan/src/server/node/joan.js &
LOCALHOST=true pm2 start /usr/src/app/pref/src/server/node/pref.js &
LOCALHOST=true pm2 start /usr/src/app/bdo/src/server/node/bdo.js &
LOCALHOST=true pm2 start /usr/src/app/fount/src/server/node/fount.js &
LOCALHOST=true pm2 start /usr/src/app/addie/src/server/node/addie.js &
LOCALHOST=true pm2 start /usr/src/app/aretha/src/server/node/aretha.js &
LOCALHOST=true pm2 start /usr/src/app/sanora/src/server/node/sanora-club.js &

# Keep the script running
tail -f /dev/null
