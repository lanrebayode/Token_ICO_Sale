//SPDX-License-Identifier: MIT

pragma solidity 0.8.17;

contract Migrations {
    address public owner = 0x848989c4ae3839BDF220f4aABBbc2741C162Dbcc;
    uint256 public last_completed_migration;

    modifier restricted() {
        require(
            msg.sender == owner,
            "This function is restricted to the owner"
        );
        _;
    }

    function setCompleted(uint256 completed) public {
        last_completed_migration = completed;
    }

    function upgrade(address new_address) public {
        Migrations upgraded = Migrations(new_address);
        upgraded.setCompleted(last_completed_migration);
    }
}
