const Indexer = artifacts.require("Indexer");

module.exports = function(deployer) {
  deployer.deploy(Indexer);
};
