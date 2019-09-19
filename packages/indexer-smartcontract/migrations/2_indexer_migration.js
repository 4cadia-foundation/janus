const Indexer = artifacts.require('Indexer');
const StringUtils = artifacts.require('StringUtils');

module.exports = async function(deployer) {
  await deployer.deploy(StringUtils);
  await deployer.link(StringUtils, Indexer);
  await deployer.deploy(Indexer);
};
