# Federated Wiki - allyabase plugin

allyabase is a Backend as a Service (BaaS) similar to Firebase and Supabase except it is open, and interoperable with other systems that utilize the [Sessionless] protocol. 
allyabase has many features, but the few that are exposed at this time in wiki are enable the signing of smart contracts, and the subsequent creation and/or transfer of nineum tokens upon completed parameters from the contracts. 
To facilitate this, the plugin exposes the following routes to the client:

<details>
 <summary><code>GET</code> <code><b>/plugin/allyabase/user/:pubKey</b></code> <code>Gets an existing user by public key</code></summary>

##### Parameters

> | name         |  required     | data type               | description                                                           |
> |--------------|-----------|-------------------------|-----------------------------------------------------------------------|
> | pubKey       |  true     | string (hex)            | the publicKey of the user's keypair  |


##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | `USER`   |
> | `400`         | `application/json`                | `{"code":"400","message":"Bad Request"}`                            |

<details>
 <summary><code>GET</code> <code><b>/plugin/allyabase/bdo</b></code> <code>Gets the user's BDO</code></summary>

##### Parameters

> | name         |  required     | data type               | description                                                           |
> |--------------|-----------|-------------------------|-----------------------------------------------------------------------|
> | pubKey       |  true     | string (hex)            | the publicKey of the user's keypair  |


##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | `USER`   |
> | `400`         | `application/json`                | `{"code":"400","message":"Bad Request"}`                            |


<details>
 <summary><code>PUT</code> <code><b>/plugin/allyabase/bdo</b></code> <code>Puts a new bdo or updates the bdo for the user</code></summary>

##### Parameters

> | name         |  required     | data type               | description                                                           |
> |--------------|-----------|-------------------------|-----------------------------------------------------------------------|
> | pubKey       |  true     | string (hex)            | the publicKey of the user's keypair  |
> | bdo          |  true     | object                  | the signature from sessionless for the message  |


##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | `USER`   |
> | `400`         | `application/json`                | `{"code":"400","message":"Bad Request"}`                            |


## License

MIT

[Sessionless]: https://github.com/planet-nine-app/sessionless

