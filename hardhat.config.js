require("@nomiclabs/hardhat-waffle");
//require("@nomiclabs/hardhat-web3");

// This is a sample Hardhat task.
// To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();
  for (const account of accounts) {
    console.log(account.address);
  }
});

task("deploy", "Prints the list of accounts", async () => {

  const [
    owner,
    tenedor1,
    tenedor2,
    tenedor3
  ] = await ethers.getSigners();

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
  const AttributionSplitter = await ethers.getContractFactory(
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
});

task("balance", "Prints an account's balance")
  .addParam("account", "The account's address")
  .setAction(async taskArgs => {
    const provider = ethers.getDefaultProvider();
    //const account = web3.utils.toChecksumAddress(taskArgs.account);
    const balance = await provider.getBalance(taskArgs.account);

    //console.log(web3.utils.fromWei(balance, "ether"), "ETH");
    console.log(balance);
  });

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.6.2",
  networks: {
      ganache: {
        url: "http://127.0.0.1:7545"
      },
      rinkeby: {
        url: "https://rinkeby.infura.io/v3/123abc123abc123abc123abc123abcde",
        // accounts: [privateKey1, privateKey2 ]
      }
    }
};





