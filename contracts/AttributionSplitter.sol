//SPDX-License-Identifier: Unlicense
pragma solidity ^0.6.0;

import "hardhat/console.sol";

// Import PaymentSplitter from the OpenZeppelin Contracts library
import "@openzeppelin/contracts/payment/PaymentSplitter.sol";

/*
@title PaymentSplitter

@dev This contract allows to split Ether payments among a group of
accounts. The sender does not need to be aware that the Ether will be
split in this way, since it is handled transparently by the contract.

The split can be in equal parts or in any other arbitrary proportion.
The way this is specified is by assigning each account to a number of
shares.
Of all the Ether that this contract receives, each account
will then be able to claim an amount proportional to the percentage
of total shares they were assigned.

`PaymentSplitter` follows a _pull payment_ model. This means that
payments are not automatically forwarded to the accounts but kept in
this contract, and the actual transfer is triggered as a separate
step by calling the {release} function.
*/

// Make AttributionSplitter inherit from
// the PaymentSplitter contract
contract AttributionSplitter is PaymentSplitter{


    constructor(
      address[] memory payees,
      uint256[] memory shares  
      // AGREGAR RERENCIA AL ATTRIBUTABLE
    ) PaymentSplitter(payees, shares) public payable{

      //require(
      // payees.length == shares.length,
      // "PaymentSplitter: payees and shares length mismatch"
      //);
      //require( 
      //  payees.length > 0,
      //  "PaymentSplitter: no payees"
      //);

      //for (uint256 i = 0; i < payees.length; i++) {
      //     _addPayee(payees[i], shares[i]);
      //}
    }

}

