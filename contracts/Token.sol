// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
    constructor() ERC20("Test Token", "TST") {
      _mint(msg.sender, 1000000 * (10 ** uint256(decimals())));
  }
}