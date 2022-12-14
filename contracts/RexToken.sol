//SPDX-License-Identifier:MIT
pragma solidity ^0.8.17;

contract RexToken {
    //constructor
    //set the total number od tokens
    //read total number of tokens
    uint256 public totalSupply; //

    constructor(uint256 _initialSupply) {
        totalSupply = _initialSupply;
    }
}
