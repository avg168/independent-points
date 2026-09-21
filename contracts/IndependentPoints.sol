// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC20Capped} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import {ERC20Pausable} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Ownable2Step} from "@openzeppelin/contracts/access/Ownable2Step.sol";

/// @title Independent Points (IPT) — testnet demonstration, NOT money/stablecoin.
/// @notice Only owner may issue points; every transfer is signed by sender's wallet.
/// @dev ERC20 Transfer events cover mint (from zero), send, and burn (to zero).
contract IndependentPoints is ERC20, ERC20Capped, ERC20Pausable, Ownable2Step {
    uint256 public constant MAX_POINTS = 1_000_000_000;

    constructor(address initialOwner)
        ERC20("Independent Points", "IPT")
        ERC20Capped(MAX_POINTS * 10 ** 2)
        Ownable(initialOwner)
    {}

    /// @notice Two decimal places: 150 => 1.50 IPT.
    function decimals() public pure override returns (uint8) {
        return 2;
    }

    /// @notice Issue points to the designated address. Not a fiat deposit.
    function mint(address to, uint256 units) external onlyOwner whenNotPaused {
        require(to != address(0), "Invalid recipient");
        require(units > 0, "Amount must be positive");
        _mint(to, units);
    }

    /// @notice Holder may destroy only their own points. Burn is irreversible.
    function burn(uint256 units) external whenNotPaused {
        require(units > 0, "Amount must be positive");
        _burn(msg.sender, units);
    }

    function pause() external onlyOwner { _pause(); }
    function unpause() external onlyOwner { _unpause(); }

    function _update(address from, address to, uint256 value)
        internal
        override(ERC20, ERC20Capped, ERC20Pausable)
    {
        super._update(from, to, value);
    }
}
