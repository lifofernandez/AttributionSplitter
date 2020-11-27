
// We require the Hardhat Runtime Environment explicitly here.
// This is optional but useful for running the script in a
// standalone fashion through `node <script>`.

const hre = require("hardhat");
//console.log(hre.network);
console.log(hre.network.config.url);
console.log(hre.network.config);


// When running the script with `hardhat run <script>`
// you'll find the Hardhat Runtime Environment's
// members available in the global scope.

async function main() {
  const [
    owner,
    tenedor1,
    tenedor2,
    tenedor3
  ] = await hre.ethers.getSigners();

  const tenedores = [
   tenedor1.address,
   tenedor2.address,
   tenedor3.address
  ] 

  const partes =  [ 4, 3, 5 ]
  
  // Hardhat always runs the compile task when
  // running scripts with its command line interface.
  
  // If this script is run directly using `node`
  // you may want to call compile manually
  // to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const AttributionSplitter = await hre.ethers.getContractFactory(
    "AttributionSplitter"
  );
  const attributionsplitter = await AttributionSplitter.deploy(
    tenedores,
    partes
  );

  await attributionsplitter.deployed();
  console.log(
    "AttributionSplitter deployed to:\n",
     attributionsplitter.address
  );

  const totalShares = await attributionsplitter.totalShares();
  console.log("Total Shares:", totalShares.toString());

  for ( const [ i , t ] of tenedores.entries() )  {
    const p = await attributionsplitter.payee(i);
    const s = await attributionsplitter.shares(p);
    console.log("Payee:", p,"Shares:", s.toString());
  };
}

// We recommend this pattern to be able to use async/await
// everywhere and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
