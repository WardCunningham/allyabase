FROM node:22.2.0

WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y git

RUN git clone https://www.github.com/planet-nine-app/julia.git julia
RUN git clone https://www.github.com/planet-nine-app/continuebee.git continuebee
RUN git clone https://www.github.com/planet-nine-app/joan.git joan
RUN git clone https://www.github.com/planet-nine-app/pref.git pref
RUN git clone https://www.github.com/planet-nine-app/bdo.git bdo
RUN git clone https://www.github.com/planet-nine-app/fount.git fount
RUN git clone https://www.github.com/planet-nine-app/addie.git addie
RUN git clone https://www.github.com/planet-nine-app/aretha.git aretha
RUN git clone https://www.github.com/planet-nine-app/sanora-dot-club.git sanora

EXPOSE 2999
EXPOSE 3000
EXPOSE 3001
EXPOSE 3002
EXPOSE 3003
EXPOSE 3004
EXPOSE 3005
EXPOSE 7243
EXPOSE 7277

RUN npm install -g pm2

WORKDIR /usr/src/app/julia/src/server/node
RUN npm install

WORKDIR /usr/src/app/continuebee/src/server/node
RUN npm install

WORKDIR /usr/src/app/joan/src/server/node
RUN npm install

WORKDIR /usr/src/app/pref/src/server/node
RUN npm install

WORKDIR /usr/src/app/bdo/src/server/node
RUN npm install

WORKDIR /usr/src/app/fount/src/server/node
RUN npm install

WORKDIR /usr/src/app/addie/src/server/node
RUN npm install

WORKDIR /usr/src/app/aretha/src/server/node
RUN npm install

WORKDIR /usr/src/app/sanora/src/server/node
RUN npm install

WORKDIR /usr/src/app

COPY start.sh /usr/src/app/
RUN chmod +x /usr/src/app/start.sh
CMD ["./start.sh"]


