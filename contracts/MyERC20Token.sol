// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyERC20Token is ERC20 {
    address public owner;

    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        owner = msg.sender;
        _mint(msg.sender, 540000000 * 10**uint256(decimals()));
    }

    function mint(uint256 amout) public returns (bool) {
        require(msg.sender == owner, "Invaid Permission");
        _mint(owner, amout);
        return true;
    }
}
