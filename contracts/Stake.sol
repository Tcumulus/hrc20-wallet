// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./Token.sol";

contract Stake {
    Token public token;

    address public owner;
    address[] public stakers;
    
    uint256 public totalStaked;

    mapping(address => uint) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

    constructor(Token _token) payable {
        owner = msg.sender;
        token = _token;
    }

    function stakeTokens(uint _amount) public {
        require(_amount > 0, "amount cannot be 0");
        token.transferFrom(msg.sender, address(this), _amount);
        totalStaked = totalStaked + _amount;

        stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;
        if(!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }

        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }

    function unstakeTokens(uint _amount) public {
        uint balance = stakingBalance[msg.sender];
        require(balance > 0, "staking balance cannot be 0");
        require(_amount <= balance, "insufficient balance");

        token.transfer(msg.sender, _amount);
        totalStaked = totalStaked - _amount;

        stakingBalance[msg.sender] = stakingBalance[msg.sender] - _amount;
        isStaking[msg.sender] = false;
    }

    function getTotalStaked() public view returns(uint) {
        return totalStaked;
    }
}