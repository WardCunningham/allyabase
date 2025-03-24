import express from 'express';
import fs from 'fs';
import cors from 'cors';
import fount from 'fount-js';
import bdo from 'bdo-js';

fount.baseURL = 'http://localhost:3006/';
bdo.baseURL = 'http://localhost:3003/';

const app = express();
app.use(cors());
app.use(express.json());

const hash = 'tiddly-proxy';

let keys;
let allyabaseUser;

/*const stateJSON = fs.readFileSync('./store', {encoding: 'utf-8'});
if(stateJSON) {
  const state = JSON.parse(stateJSON);
  keys = state.keys;
  allyabaseUser = state.allyabaseUser;
}*/

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
    allyabaseUser.fountUser = fountUser;

    const state = {keys, allyabaseUser};
//    fs.writeFileSync('./store', JSON.stringify(state));
  } else {
    allyabaseUser.fountUser = await fount.getUserByUUID(allyabaseUser.fountUser.uuid);
    allyabaseUser.fountUser.nineum = await fount.getNineum(allyabaseUser.fountUser.uuid);
console.log('allyabaseUser.fountUser with nineum', allyabaseUser.fountUser);
  }
console.log('sending back', allyabaseUser);

  res.send(allyabaseUser);
}); 

app.get('/register-for-class', async (req, res) => {
console.log('registerin');
  if(!allyabaseUser) {
    res.status(404);
    return res.send({error: 'no allyabase user'});
  }

  const success = fetch(`http://localhost:4444/plugin/ftt/abelard?uuid=${allyabaseUser.fountUUID}&host=${encodeURIComponent('http://localhost:8081/create-allyabase-user')}`);
  if(!success.success) {
console.log('success!');
    return res.send(success);
  }

console.log('no dice');
  res.status(404);
  return res.send({error: 'not found'});
});

app.get('/grab-fed-wiki-user', async (req, res) => {
  
});

app.listen('8081');



