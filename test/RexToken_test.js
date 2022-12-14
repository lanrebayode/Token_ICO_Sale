const RexToken = artifacts.require("./RexToken");

contract('RexToken', function(accounts) {

    it('sets the totalupply upon deployment', function() {
        return RexToken.deployed().then(function(instance) {
            tokenInstance = instance;
            return tokenInstance.totalSupply();
        }).then(function(totalSupply) {
            assert.equal(totalSupply.toNumber(), 1000000, 'set the totl supply to 1,000,000');
        }) 
    }) 
})