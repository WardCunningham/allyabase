#!/bin/bash

docker build -it allyabase .
docker run -p 2999:2999 -p 3000:3000 -p 3001:3001 -p 3002:3002 -p 3003:3003 -p 3004:3004 -p 3005:3005 -p 3006:3006 -p 3007:3007 -p 7423:7423 -p 7277:7277 allyabase
