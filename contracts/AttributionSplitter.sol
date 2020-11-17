//SPDX-License-Identifier: Unlicense
pragma solidity ^0.6.0;

import "hardhat/console.sol";

// Import PaymentSplitter from the OpenZeppelin Contracts library
import "@openzeppelin/contracts/payment/PaymentSplitter.sol";

// Make AttributionSplitter inherit from
// the PaymentSplitter contract
contract AttributionSplitter is PaymentSplitter{

    constructor(
      address[] memory payees,
      uint256[] memory shares  
      // AGREGAR RERENCIA AL ATTRIBUTABLE
    ) PaymentSplitter(payees, shares) public payable{

    }

}

