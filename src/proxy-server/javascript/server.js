import express from 'express';
import fs from 'fs';
import cors from 'cors';
import fount from 'fount-js';
import bdo from 'bdo-js';

const app = express();
app.use(cors());
app.use(express.json());

const hash = 'tiddly-proxy';

let keys;
let allyabaseUser;

const stateJSON = fs.readFileSync('./store', {encoding: 'utf-8'});
if(stateJSON) {
  const state = JSON.parse(stateJSON);
  keys = state.keys;
  allyabaseUser = state.allyabaseUser;
}

// Here we proxy some stuff.

app.get('/create-allyabase-user', async (req, res) => {
console.log('req received');
  if(!allyabaseUser) {
    allyabaseUser = {};

    const newBDO = {};
    const bdoUUID = await bdo.createUser(hash, newBDO, (k) => { keys = k; }, () => { return keys; });
    const fountUser = await fount.createUser((_) => {}, () => { return keys; });

  console.log('bdoUUID', bdoUUID, 'fountUser', fountUser);

    allyabaseUser.bdoUUID = bdoUUID;
    allyabaseUser.fountUUID = fountUser.uuid;

    const state = {keys, allyabaseUser};
    fs.writeFileSync('./store', JSON.stringify(state));
  }
console.log('sending back', allyabaseUser);

  res.send(allyabaseUser);
}); 

app.get('/grab-fed-wiki-user', async (req, res) => {
  
});

app.listen('8081');



