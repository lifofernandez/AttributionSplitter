require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-web3");
require('hardhat-deploy');


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

  const provider = ethers.getDefaultProvider(
   'http://localhost:7545'
  );
  console.log( "Provider URL:", provider.connection.url);
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
    "Contract name: AttributionSplitter",
     //attributionsplitter
  );
  console.log(
    "Contract address:",
     attributionsplitter.address
  );
  console.log(
    "Signer address:",
     attributionsplitter.signer.address
  );

  const totalShares = await attributionsplitter.totalShares();
  console.log("Total Shares:", totalShares.toString());

  for ( const [ i , t ] of tenedores.entries() )  {
    const p = await attributionsplitter.payee(i);
    const s = await attributionsplitter.shares(p);
    console.log("Payee", i,":",p,"Shares:", s.toString());
  };
});


task("network", "Prints an account's balance")
  //.addParam("account", "The account's address")
  .setAction(async taskArgs => {
     const provider = ethers.getDefaultProvider('http://localhost:7545');
     console.log(provider.connection.url);
     //const account = web3.utils.toChecksumAddress(taskArgs.account);
     //const network = ethers.providers.getNetwork('homestead');
    
     // When using a Web3 provider, the network will be automatically detected
     // e.g. HTTP provider
     //const currentProvider = new web3.providers.HttpProvider('http://localhost:7545');
     //console.log(currentProvider);

     //const web3Provider = new ethers.providers.Web3Provider(provider);
     //console.log(web3Provider);

     //const network = ethers.providers.getNetwork("rinkeby");
     //const network = provider.getNetwork();
     //const network = ethers.providers.getNetwork('homestead');
     //const networkName = network.name;
     //console.log(networkName);
     //const networkAddress = network.ensAddress;
     //console.log(networkAddress);
     //const netWorkId = network.chainId;
     //console.log(netWorkId);

});

task("balance", "Prints an account's balance")
  .addParam("account", "The account's address")
  .setAction(async taskArgs => {
      //const provider = ethers.getDefaultProvider();
      //const provider = ethers.getDefaultProvider("http://127.0.0.1:7545");
      //const balance = await provider.getBalance(taskArgs.account);
      //console.log(balance);

      const account = web3.utils.toChecksumAddress(taskArgs.account);
      const balance = await web3.eth.getBalance(account);

      console.log(web3.utils.fromWei(balance, "ether"), "ETH");
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.6.2",
  defaultNetwork: 'ganache',
  //defaultNetwork: 'development',
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













