//SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "./RexToken.sol";

contract RexTokenSale {
    event Sell(address indexed buyer, uint256 numberOfTokens);

    address payable public admin;
    RexToken public rextoken;
    uint256 public tokenPrice;
    uint256 public tokenSold;

    constructor(address _rextoken, uint256 _tokenPrice) {
        admin = payable(msg.sender);
        rextoken = RexToken(_rextoken);
        tokenPrice = _tokenPrice;
    }

    function multiply(uint256 x, uint256 y) internal pure returns (uint256 z) {
        require(y == 0 || (z = x * y) / y == x);
    }

    function buyToken(uint256 _numberOfTokens) public payable {
        require(msg.value == multiply(_numberOfTokens, tokenPrice));
        require(rextoken.balanceOf(address(this)) >= _numberOfTokens);
        require(rextoken.transfer(msg.sender, _numberOfTokens));

        tokenSold += _numberOfTokens;
        emit Sell(msg.sender, _numberOfTokens);
    }

    function endSale() public {
        require(msg.sender == admin, "admin only");
        require(rextoken.transfer(admin, rextoken.balanceOf(address(this))));

        selfdestruct(admin);
    }
}
