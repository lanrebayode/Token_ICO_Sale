const RexTokenSale = artifacts.require("./RexToken.sol");

contract('RexTokenSale', function(accounts) {
    

    it('initialize contract with correct values', function() {
        return RexTokenSale.deployed().then(function(instance) {
            tokenSaleInstance = instance;
            return tokenSaleInstance.address
        }).then(function(address) {
            assert.notEqual(address, 0x0, 'does not have a zero address');
            return tokenSaleInstance.rextoken();
        }).then(function(address) {
            assert.notEqual( address, 0x0, 'has resxtoken address');
        })
    })
})