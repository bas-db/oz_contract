// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

// Import Ownable from the OpenZeppelin Contracts library
import "@openzeppelin/contracts/access/Ownable.sol";


contract Box is Ownable {
  uint256 private value;

  // emitted when the store value changes
  event ValueChanged(uint256 newValue);

  // The onlyOwner modifier restricts who can call the store function
  function store(uint256 newValue) public onlyOwner {
    value = newValue;
    emit ValueChanged(newValue);
  }

  function retrieve() public view returns (uint256) {
    return value;
  }
}