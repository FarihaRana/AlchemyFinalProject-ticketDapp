// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract EventFaucetToken is ERC20, Ownable {
    constructor() ERC20("EventFaucetToken", "EFCT") {}

    function mint(uint256 amount) external {
        _mint(msg.sender, amount);
    }

    function burn(address account, uint256 amount) external onlyOwner {
        _burn(account, amount);
    }
}    