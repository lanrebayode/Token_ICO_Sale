const RexToken = artifacts.require("./RexToken");

module.exports = function(deployer) {
  deployer.deploy(RexToken, 1000000);
};