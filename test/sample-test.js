// const { expect } = require("chai");
// 
// describe("Greeter", function() {
//   it("Should return the new greeting once it's changed", async function() {
//     const Greeter = await ethers.getContractFactory("Greeter");
//     const greeter = await Greeter.deploy("Hello, world!");
//     
//     await greeter.deployed();
//     expect(await greeter.greet()).to.equal("Hello, world!");
// 
//     await greeter.setGreeting("Hola, mundo!");
//     expect(await greeter.greet()).to.equal("Hola, mundo!");
//   });
// });

// We import Chai to use its asserting functions here.
const { expect } = require("chai");
describe("Token contract", function () {
  let Token;
  let hardhatToken;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    Token = await ethers.getContractFactory("Token");
    [ owner, addr1, addr2, ...addrs ] = await ethers.getSigners();

    hardhatToken = await Token.deploy();
  });

  describe("Deployment", function () {
    it(
      "Should set the right owner",
      async function () {
      expect(
       await hardhatToken.owner()).to.equal(owner.address);
    });

    it(
       "Should assign the total supply of tokens to the owner",
       async function () {
       const ownerBalance = await hardhatToken.balanceOf(
         owner.address
       );
      expect(
        await hardhatToken.totalSupply()).to.equal(ownerBalance
      );
    });
  });

  describe("Transactions", function () {
    it(
      "Should transfer tokens between accounts",
      async function () {
      // Transfer 50 tokens from owner to addr1
      await hardhatToken.transfer(addr1.address, 50);
      const addr1Balance = await hardhatToken.balanceOf(
       addr1.address
      );
      expect(addr1Balance).to.equal(50);

      await hardhatToken.connect(addr1).transfer(addr2.address, 50);
      const addr2Balance = await hardhatToken.balanceOf(
        addr2.address
      );
      expect(addr2Balance).to.equal(50);
    });

    it(
      "Should fail if sender doesn’t have enough tokens",
      async function () {
      const initialOwnerBalance = await hardhatToken.balanceOf(
       owner.address
      );

      await expect(
        hardhatToken.connect(addr1).transfer(owner.address, 1)
      ).to.be.revertedWith("Not enough tokens");

      // Owner balance shouldn't have changed.
      expect(await hardhatToken.balanceOf(owner.address)).to.equal(
        initialOwnerBalance
      );
    });

    it(
      "Should update balances after transfers",
      async function () {
      const initialOwnerBalance = await hardhatToken.balanceOf(
        owner.addressi
      );

      // Transfer 100 tokens from owner to addr1.
      await hardhatToken.transfer(addr1.address, 100);

      // Transfer another 50 tokens from owner to addr2.
      await hardhatToken.transfer(addr2.address, 50);

      // Check balances.
      const finalOwnerBalance = await hardhatToken.balanceOf(
       owner.address
      );
      expect(finalOwnerBalance).to.equal(
        initialOwnerBalance - 150
      );

      const addr1Balance = await hardhatToken.balanceOf(
       addr1.address
      );
      expect(addr1Balance).to.equal(100);

      const addr2Balance = await hardhatToken.balanceOf(
       addr2.address
      );
      expect(addr2Balance).to.equal(50);
    });
  });
});

//web3.sendTransaction(
  //{to:receiver, from:sender, value:web3.toWei("0.5", "ether")}
//)

// to send tokens you need to call

//contract_data.transfer(receiver,amount{from:web3.eth.accounts[0]});
// or something among those lines. You don't need to use web3.eth.sendTransaction
// https://docs.ethers.io/v5/api/providers/provider/#Provider-sendTransaction

https://ethereum.stackexchange.com/questions/42995/how-to-send-ether-to-a-contract-in-truffle-test/43006