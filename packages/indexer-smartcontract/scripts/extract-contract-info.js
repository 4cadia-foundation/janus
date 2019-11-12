#!/bin/node
const fs = require('fs').promises;
const path = require('path');

const root = path.dirname(__dirname);
const deployedContractsDir = path.join(root, 'build', 'contracts');
const outputFile = path.join(root, 'contracts.json');

(async () => {
  const contractFiles = await fs.readdir(deployedContractsDir);
  const contractFilePaths = contractFiles.map(contract =>
    path.join(deployedContractsDir, contract)
  );

  const parsedContracts = await Promise.all(
    contractFilePaths.map(async filePath =>
      JSON.parse(await fs.readFile(filePath, { encoding: 'utf8' }))
    )
  );

  const extractedInfo = parsedContracts.reduce((acc, contractInfo) => {
    return Object.assign(acc, {
      [contractInfo.contractName]: {
        abi: contractInfo.abi,
        addresses: Object.entries(contractInfo.networks).reduce(
          (addrAcc, [networkId, networkInfo]) =>
            Object.assign(addrAcc, {
              [networkId]: networkInfo.address,
            }),
          {}
        ),
      },
    });
  }, {});

  fs.writeFile(outputFile, JSON.stringify(extractedInfo, null, 2));
})();
