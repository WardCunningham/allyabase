var _fount = require('fount-js');
var _bdo = require('bdo-js');
var _gateway = require('magic-gateway-js');
var sessionless = require('sessionless-node');
var fs = require('fs');

const gateway = _gateway.default;
const fount = _fount.default;
const bdo = _bdo.default;

fount.baseURL = 'http://localhost:3006/';
bdo.baseURL = 'http://localhost:3003/';

const HASH = 'contract';

let fountUser;

async function addRoutes(params) {
  const app = params.app;
  const argv = params.argv;

  if(!argv.private_key) {
    console.warn('You have included the allyabase plugin without providing a private key. allyabase will be unavailable.');
    return;
  }

  let allyabaseUser = {};
  
  const allyabaseKeys = {
    privateKey: argv.private_key,
    pubKey: argv.pub_key
  };

  const saveKeys = () => {};
  const getKeys = () => allyabaseKeys;

  await fount.createUser(saveKeys, getKeys);
  await bdo.createUser({}, HASH, saveKeys, getKeys);

  await sessionless.generateKeys(saveKeys, getKeys);

console.log('getting called here');
  let fountUser;
  let bdoUUID;

  if(!allyabaseUser || !fountUser) {
console.log('fount looks like', fount);
    fountUser = await fount.getUserByPublicKey(argv.pub_key);
    if(!fountUser || !fountUser.uuid) {
      fountUser = await fount.createUser(saveKeys, getKeys);   
    }
  }

  if(!allyabaseUser || !allyabaseUser.bdoUser) {
    bdoUUID = await bdo.createUser(HASH, {}, saveKeys, getKeys);
    allyabaseUser.bdoUser = {bdo: {}, uuid: bdoUUID};
  }
  
  allyabaseUser.bdoUser = await bdo.getBDO(allyabaseUser.bdoUser.uuid, HASH);
  allyabaseUser.fountUser = fountUser;
  allyabaseUser.nineum = await fount.getNineum(allyabaseUser.fountUser.uuid);
console.log('allyabaseUser is: ', allyabaseUser);

  app.get('/plugin/allyabase/fount-user', async function(req, res) {
console.log('getting called here');
    let user;

    if(!uuid) {
      user = await fount.getUserByPublicKey(fountKeys.pubKey);
console.log('user looks like', user);
      if(!user || !user.uuid) {
        user = await fount.createUser(saveKeys, getKeys);
      }
    } else {
      user = await fount.getUserByUUID(uuid);
    }
console.log('user is: ', user);
    user.nineum = await fount.getNineum(user.uuid);

    uuid = user.uuid;
    allyabase.fountUser = user;

    res.send(user);
  });

}

module.exports = {addRoutes};
