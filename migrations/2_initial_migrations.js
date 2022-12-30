const RexToken = artifacts.require("./RexToken");
const RexTokenSale = artifacts.require("./RexTokenSale");

module.exports = function(deployer) {
  deployer.deploy(RexToken, 1000000).then(function() {
    const tokenPrice = 1000000000000000;
    return  deployer.deploy(RexTokenSale, RexToken.address, tokenPrice);
  })
};