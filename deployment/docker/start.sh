#!/bin/bash

cat > ecosystem.config.js << EOL
module.exports = {
  apps: [
    {
      name: 'julia',
      script: '/usr/src/app/julia/src/server/node/julia.js',
      env: { LOCALHOST: 'true' }
    },
    {
      name: 'continuebee',
      script: '/usr/src/app/continuebee/src/server/node/continuebee.js',
      env: { LOCALHOST: 'true' }
    },
    {
      name: 'joan',
      script: '/usr/src/app/joan/src/server/node/joan.js',
      env: { LOCALHOST: 'true' }
    },
    {
      name: 'pref',
      script: '/usr/src/app/pref/src/server/node/pref.js',
      env: { LOCALHOST: 'true' }
    },
    {
      name: 'bdo',
      script: '/usr/src/app/bdo/src/server/node/bdo.js',
      env: { LOCALHOST: 'true' }
    },
    {
      name: 'fount',
      script: '/usr/src/app/fount/src/server/node/fount.js',
      env: { LOCALHOST: 'true' }
    },
    {
      name: 'addie',
      script: '/usr/src/app/addie/src/server/node/addie.js',
      env: { 
        LOCALHOST: 'true', 
        STRIPE_KEY: '<api key here>', 
        STRIPE_PUBLISHING_KEY: '<publishing key here>',
        SQUARE_KEY: '<api key here>'
      }
    },
    {
      name: 'aretha',
      script: '/usr/src/app/aretha/src/server/node/aretha.js',
      env: { LOCALHOST: 'true' }
    },
    {
      name: 'sanora',
      script: '/usr/src/app/sanora/src/server/node/sanora.js',
      env: { LOCALHOST: 'true' }
    },
    {
      name: 'dolores',
      script: '/usr/src/app/dolores/src/server/node/dolores.js',
      env: { LOCALHOST: 'true' }
    },
    {
      name: 'minnie',
      script: '/usr/src/app/minnie/src/server/node/minnie.js',
      env: { LOCALHOST: 'true' }
    }
  ]
}
EOL

pm2-runtime start ecosystem.config.js

