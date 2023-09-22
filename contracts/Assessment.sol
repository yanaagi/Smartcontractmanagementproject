// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Assessment {
    address payable public owner;
    uint256 public balance;

    event Deposit(address indexed account, uint256 amount);
    event Withdraw(address indexed account, uint256 amount);

    constructor(uint256 initBalance) payable {
        owner = payable(msg.sender);
        balance = initBalance;
    }

    function getBalance() public view returns (uint256) {
        return balance;
    }

    function deposit(uint256 _amount) public payable {
        require(msg.sender == owner, "You are not the owner of this account");
        require(_amount > 0, "Deposit amount must be greater than 0");
        uint256 _previousBalance = balance;

        // Perform transaction
        balance += _amount;

        // Emit the event
        emit Deposit(msg.sender, _amount);

        assert(balance == _previousBalance + _amount);
    }

    function withdraw(uint256 _amount) public {
        require(msg.sender == owner, "You are not the owner of this account");
        require(_amount > 0, "Withdrawal amount must be greater than 0");
        require(balance >= _amount, "Insufficient balance");

        uint256 _previousBalance = balance;

        // Withdraw the given amount
        balance -= _amount;

        // Emit the event
        emit Withdraw(msg.sender, _amount);

        assert(balance == _previousBalance - _amount);
    }

    function burn(uint256 _amount) public {
        require(msg.sender == owner, "You are not the owner of this account");
        require(_amount > 0, "Burn amount must be greater than 0");
        require(balance >= _amount, "Insufficient balance");

        uint256 _previousBalance = balance;

        // Burn the specified amount
        balance -= _amount;

        // Emit the event for burning
        emit Withdraw(msg.sender, _amount);

        assert(balance == _previousBalance - _amount);
    }
}
