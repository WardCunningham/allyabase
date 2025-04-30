const contract = require('./contract.js');
const feeds = require('./feeds.js');
const inventory = require('./inventory.js');
(function() {
  async function startServer(params) {
    contract.addRoutes(params);
    feeds.addRoutes(params);
    inventory.addRoutes(params);
  };
}

module.exports = {startServer};
}).call(this);
