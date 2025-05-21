import { should } from 'chai';
import sessionless from 'sessionless-node';
import superAgent from 'superagent';
should();

const get = async function(path) {
  console.info("Getting " + path);
  return await superAgent.get(path).set('Content-Type', 'application/json');
};

const put = async function(path, body) {
  console.info("Putting " + path);
  return await superAgent.put(path).send(body).set('Content-Type', 'application/json');
};

const post = async function(path, body) {
  console.info("Posting " + path);
console.log(body);
  return await superAgent.post(path).send(body).set('Content-Type', 'application/json');
};

const savedUser = {};
const savedUser2 = {};
let keys;
let keys2 = {};
let keysToReturn;
const hash = 'firstHash';
const anotherHash = 'secondHash';

it('should get a user by public key', async () => {
  const res = await get(`${baseURL}plugin/allyabase/user/${wikiPubKey}`);
  const fountUser = res.body;
  fountUser.pubKey.should.equal.(wikiPubKey);
});

it('should put a bdo for user', async () => {
  const objectToStore = {
    put: "whatever",
    you: "want",
    here: "."
  };

  const res = await put(`${baseURL}plugin/allyabase/bdo`, objectToStore);
  res.body.bdo.put.equals("whatever");
});

it('should get the bdo for user', async () => {
  const res = await get(`${baseURL}plugin/allyabase/bdo`);
  res.body.bdo.put.equals("whatever");
});

it('should grant nineum to a user', async () => {
  const payload = {
    toUUID: savedUser2.uuid,
    flavor: '24071209a3b3'
  };

  const res = await post(`${baseURL}plugin/allyabase/grant-nineum`, payload);
  res.body.uuid.equals(savedUser2.uuid);
});

it('should grant admin nineum to a user', async () => {
  const payload = {
    toUUID: savedUser2.uuid
  };

  const res = await post(`${baseURL}plugin/allyabase/grant-admin-nineum`, payload);
  res.body.uuid.equals(savedUser2.uuid);
});

it('should sign a message', async () => {
  const message = 'foo';

  const res = await get(`${baseURL}plugin/allyabase/sign/${message}`);
  res.body.signature.length.equals(128);
});

it('should verify a signature', async () => {
  const message = 'foo';

  const res = await get(`${baseURL}plugin/allyabase/sign/${message}`);
  const signature = res.body.signature;

  const resp = await get(`${baseURL}plugin/allyabase/verify?message=${message}&signature=${signature}`);
  resp.body.verified.equals(true);
});

