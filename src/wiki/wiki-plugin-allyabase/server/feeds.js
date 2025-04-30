var { dolores } = require('allyabase-js');
var sessionless = require('sessionless-node');
var fs = require('fs');

async function addRoutes(params) {
  const app = params.app;
  const argv = params.argv;

  const allyabaseKeys = {
    privateKey: argv.allyabase_private_key,
    pubKey: argv.allyabase_pub_key
  };

  let doloresUser;

  doloresUser = await dolores.getUser(allyabaseKeys.pubKey);
  if(!doloresUser) {
    doloresUser = await dolores.createUser(saveKeys, getKeys);
  }

  app.get('/plugin/allyabase/feeds', async function(req, res) {
    const updatedUser = await dolores.getUser(doloresUser.uuid);
    res.send(updatedUser.feeds);
  });
};

module.exports = {addRoutes};
