const Migrations = artifacts.require("Ads");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};
