const RexToken = artifacts.require("./RexToken");

contract('RexToken', function(accounts) {

    it('It verifies contract Info', function() {
        return RexToken.deployed().then(function(instance) {
            tokenInstance = instance;
            return tokenInstance.name();
        }).then(function(name) {
            assert.equal(name, 'Rex Token', 'This has a correct name')
            return tokenInstance.symbol();
        }).then(function(symbol) {
            assert.equal(symbol, 'REX', 'has the correct symbol');
            return tokenInstance.standard()
        }).then(function(standard) {
            assert.equal(standard, 'Rex Token v1.0', 'has the correct standard');
        }) 

    })
    it('allocate initial supply to creator address', function() {
        return RexToken.deployed().then(function(instance) {
            tokenInstance = instance;
            return tokenInstance.totalSupply();
        }).then(function(totalSupply) {
            assert.equal(totalSupply.toNumber(), 1000000, 'set the totl supply to 1,000,000');
           return tokenInstance.balanceOf(accounts[0]);
        }).then(function(adminBalance) {
            assert.equal(adminBalance.toNumber(), 1000000, 'it is equal to 1000000');
        }) 
    });
    
    it('Transfer token from sender to receiver', function() {
        RexToken.deployed().then(function(instance) {
            tokenInstance = instance;
            return tokenInstance.transfer.call(accounts[1], 10000000);
        }).then(assert.fail).catch(function(error) {
            assert(error.message.indexOf('revert') >= 0, 'error message must contain revert');
            return tokenInstance.transfer(accounts[1], 250000, {from: accounts[0]});
        }).then(function(receipt) {
            assert.equal(receipt.logs.length, 1, 'ttriggers only one event');
            assert.equal(receipt.logs[0].event, 'Transfer', 'event should be Transfer');
            assert.equal(receipt.logs[0].args._from, accounts[0], 'Logs the account the token was transferred from');
            assert.equal(receipt.logs[0].args._to, accounts[1], 'Logs the account the token was transferred to');
         //   assert.equal(receipt.logs[0].args._value, 250000, 'Logs the ammount of token that was transferred');
            return tokenInstance.balanceOf(accounts[1]);
        }).then(function(balance) {
            assert.equal(balance, 250000, 'has the right balance');
            return tokenInstance.balanceOf(accounts[0]);
        }).then(function(balance) {
            assert.equal(balance.toNumber(), 750000, 'owner has the right balance after the transfer');
            return tokenInstance.transfer.call(accounts[0], 250000, {from: accounts[1]});
        }).then(function(success) {
            assert.equal(success, true, 'it returns true');
        })
    })

    it('approves token for delegated tansfer', function() {
        RexToken.deployed().then(function(instance) {
            tokenInstance = instance;
            return tokenInstance.approve(accounts[1], 100, { from: accounts[0]});
        }).then(function(receipt) {
            assert.equal(receipt.logs.length, 1, 'triggers only one event');
            assert.equal(receipt.logs[0].event, 'Approval', 'event should be Approve');
            assert.equal(receipt.logs[0].args._owner, accounts[0], 'Logs the account the authorization came  from');
            assert.equal(receipt.logs[0].args._spender, accounts[1], 'Logs the account the token was authorized to');
            assert.equal(receipt.logs[0].args._value, 100, 'Logs the ammount of token that was transferred');
            return tokenInstance.allowance(accounts[0], accounts[1]);
        }).then(function(allowance) {
            assert.equal(allowance.toNumber(), 100, 'stores the allowance for delegated transfer');
        })
    })

   it('Handles delegate transfer', function() {
        return RexToken.deployed().then(function(instance) {
            tokenInstance = instance;
            fromAccount = accounts[2];
            toAccount = accounts[3];
            spendingAccount = accounts[4];
            //transfer some tokens
            return tokenInstance.transfer(fromAccount, 100, { from: accounts[0] });
        }).then(function(receipt) {
            //Approve spendingAccount to sspend 10 tokens fromAccount
            return tokenInstance.approve(spendingAccount, 10, { from: fromAccount });
        }).then(function(receipt) {
            //Try transfering tokens larger than sender's balance
            return tokenInstance.transferFrom(fromAccount, toAccount, 99999, { from: accounts[4] });
        }).then(assert.fail).catch(function(error) {
            assert(error.message.indexOf('revert')>= 0, 'cannot transfer value larger than balance');
            //try transferring amount larger than approved amount
            return tokenInstance.transferFrom(fromAccount, toAccount, 200, { from: spendingAccount});
        }).then(assert.fail).catch(function(error) {
            assert(error.message.indexOf('revert') >= 0, 'cannot transfer amount larger than approved amount');
            return tokenInstance.transferFrom.call(fromAccount, toAccount, 5, { from: spendingAccount});
        }).then(function(success) {
            assert.equal(success, true, 'transaction is succes');
            //create  a transferFrom transaction
            return tokenInstance.transferFrom(fromAccount, toAccount, 5, {from: spendingAccount});
        }).then(function(receipt) {
           
            //check balance after transfer
            return tokenInstance.balanceOf(fromAccount);
        }).then(function(balance) {
            assert.equal(balance.toNumber(), 95, 'has correct balance after tansfer');
            //check the receiver balance
            return tokenInstance.balanceOf(toAccount);
        }).then(function(bal) {
            assert.equal(bal.toNumber(), 5, 'update receiver account balance');
            //check updated allowance
            return tokenInstance.allowance(fromAccount, spendingAccount);
        }).then(function(allowance) {
            assert.equal(allowance.toNumber(), 5, 'update allowance');
        })
    });
});

