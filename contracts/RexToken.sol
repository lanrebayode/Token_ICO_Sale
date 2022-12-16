//SPDX-License-Identifier:MIT
pragma solidity ^0.8.17;

contract RexToken {
    string public name = "Rex Token";
    string public symbol = "REX";
    string public standard = "Rex Token v1.0";

    event Transfer(address indexed _from, address indexed _to, uint256 value);
    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );
    //constructor
    //set the total number od tokens
    //read total number of tokens
    uint256 public totalSupply; //
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    constructor(uint256 _initialSupply) {
        balanceOf[msg.sender] = _initialSupply;
        totalSupply = _initialSupply;
        //allocate the initialSupply
    }

    function transfer(address _to, uint256 _value) public returns (bool) {
        require(balanceOf[msg.sender] >= _value, "Balance is les than value");
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    //approve function
    function approve(address _spender, uint256 _amount)
        public
        returns (bool success)
    {
        allowance[msg.sender][_spender] = 100;
        emit Approval(msg.sender, _spender, _amount);
        return true;
    }
}
