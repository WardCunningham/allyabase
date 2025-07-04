var _gateway = require('magic-gateway-js');
var _fount = require('fount-js');
var _bdo = require('bdo-js');
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

  app.get('/plugin/allyabase/owner', async function(req, res) {
console.log('calling owner');
    const idFile = argv.id;
console.log('idFile', idFile);
    fs.readFile(idFile, (err, data) => {
      if(err) {
console.log('err', err);
        res.status(404);
        return res.send(err);
      }
      const owner = JSON.parse(data);
      res.send(owner);
    });
  });

//  app.get('/plugin/allyabase/user', async function(req, res) {
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

    let galacticNineum = allyabaseUser.nineum.filter(nineum => nineum.slice(14, 16) === 'ff');
    if(!galacticNineum || galacticNineum.length < 1) {
      try {
        allyabaseUser.fountUser = await fount.grantGalacticNineum(allyabaseUser.fountUser.uuid, '28880014');
      } catch(err) {
console.log('grave error getting galaxy bud', err);
      }
    } 

//    res.send(allyabaseUser);
//  });

  app.post('/plugin/allyabase/resolve', async function(req, res) {
    const payload = req.body;
    const message = JSON.stringify({
      timestamp: payload.timestamp,
      spell: payload.spell,
      casterUUID: payload.casterUUID,
      totalCost: payload.totalCost,
      mp: payload.mp,
      ordinal: payload.ordinal,
    });

    payload.casterSignature = await sessionless.sign(message);

    const resolution = await fount.resolve(payload);
    if(resolution.success) {
      const updatedUser = await fount.getUserByUUID(payload.casterUUID);
      return res.send(updatedUser);
    }
    res.send(resolution);
  });

  app.get('/plugin/allyabase/user/:pubKey', async function(req, res) {
    fountUser = await fount.getUserByPublicKey(req.params.pubKey);
console.log('getting the user on the server, it looks like: ', fountUser);
    fountUser.nineum = await fount.getNineum(fountUser.uuid);
    res.send(fountUser);
  });

  app.get('/plugin/allyabase/bdo', async function(req, res) {
    try {
     const bdoResp = await bdo.getBDO(allyabaseUser.bdoUser.uuid, HASH, req.query.pubKey);
     res.send(bdoResp);
   } catch(err) {
     res.status(404);
     res.send(err);
   }
  });

  app.put('/plugin/allyabase/bdo', async function(req, res) {
    try {
      allyabaseUser.bdoUser = await bdo.updateBDO(allyabaseUser.bdoUser.uuid, HASH, req.body.bdo);
      res.send({success: true});
    } catch(err) {
      res.status(404);
      res.send(err);
    }
  });

  app.post('/plugin/allyabase/grant-nineum', async function(req, res) {
    const toUUID = req.body.toUUID;
    const flavor = req.body.flavor;
console.log('granting nineum to', toUUID);
console.log('with flavor ', flavor);

    if(!allyabaseUser.fountUser) {
      allyabaseUser.fountUser = await fount.getUserByPublicKey(argv.pub_key);
    }

    const grantee = await fount.grantNineum(allyabaseUser.fountUser.uuid, toUUID, flavor);
console.log('the grantee now looks like: ', grantee);
    res.send(grantee);
  });

  app.post('/pugin/allyabase/grant-admin-nineum', async function(req, res) {
    const toUUID = req.body.toUUID;

    const grantee = await fount.grantAdminNineum(allyabaseUser.fountUser.uuid, toUUID);
    res.send(grantee);
  });

  app.post('/plugin/allyabase/transfer', async function(req, res) {
    const uuid = allyabaseUser.fountUser.uuid;
    const toUUID = req.body.toUUID;
    const nineum = req.body.nineum;
    const transferNineum = await fount.transferNineum(uuid, toUUID, nineum, 0, 'usd'); // priced transfers not supported yet
console.log('response on server for transfer', transferNineum);
    fountUser = await fount.getUserByPublicKey(req.params.pubKey);
console.log('getting the user on the server, it looks like: ', fountUser);
    fountUser.nineum = await fount.getNineum(fountUser.uuid);
    res.send(fountUser);
  });

  app.get('/plugin/allyabase/sign/:thing', function(req, res) {
    var _getKeys;
    _getKeys = sessionless.getKeys;
    signatureKeys = {
      privateKey: argv.private_key,
      pubKey: argv.pub_key
    };
    sessionless.getKeys = function() {
      console.log("this should be in sign, and returning", signatureKeys);
      return signatureKeys;
    };
    return sessionless.sign(req.params.thing).then(function(signature) {
      console.log('signature', signature);
      res.json({signature});
    }).catch(function(err) {
      console.error(err);
      return res.sendStatus(404);
    }).finally(function() {
      return sessionless.getKeys = _getKeys;
    });
  });

  app.get('/plugin/allyabase/verify', function(req, res) {
    var message, pubKey, signature, verified;
    console.log('query is: ', req.query);
    signature = req.query.signature;
    message = req.query.message;
    pubKey = argv.pub_key;
    verified = sessionless.verifySignature(signature, message, pubKey);
    return res.send({verified});
  });

  app.get('/plugin/allyabase/abelard', async function(req, res) {
    try {
console.log('req.query is', req.query);
      const transfereeUUID = req.query.uuid;
      const transfereeHost = req.query.host;

console.log('allyabaseUser here is', allyabaseUser);
      const userBDO = await bdo.getBDO(allyabaseUser.bdoUser.uuid, HASH);
console.log('this bdo is', userBDO);
      userBDO.bdo.transferees = userBDO.bdo.transferees || {};
      userBDO.bdo.transferees[transfereeUUID] = transfereeHost;

      const updatedBDO = await bdo.updateBDO(allyabaseUser.bdoUser.uuid, HASH, userBDO.bdo);
console.log('updatedBDO is', updatedBDO);

      res.send({success: true});
    } catch(err) {
console.log(err);
      res.status(404);
      res.send({err});
    }
  });

  const spellbook = {
    spellbookName: 'ReaLocalize',
    contract: {
      cost: 1,
      destinations: [
        {stopName: 'contract-wiki', stopURL: 'http://127.0.0.1:4444/plugin/magic/spell/'},
        {stopName: 'fount', stopURL: 'http://127.0.0.1:3006/resolve/'}
      ]
    }
  };

  const myStopName = 'contract-wiki';

  const extraForGateway = (spellName) => {
    if(spellName === 'contract') {
      return 'contractUUID';
    }    
  };

  const onSuccess = (req, res, result) => {
    const spell = req.body;
    const casterUUID = spell.casterUUID;
    const targetUUID = spell.gateways[0].uuid;
    const flavor = 'e1e1e1e1e1e1';

    fount.grantNineum(targetUUID, casterUUID, flavor);
    res.send(result);
  };

  gateway.expressApp(app, allyabaseUser.fountUser, spellbook, myStopName, sessionless, extraForGateway, onSuccess);
}

module.exports = {addRoutes};
