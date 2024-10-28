// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Inbox {
    uint256 public message;

    constructor(uint256 initialMessage) {
        message = initialMessage;
    }

    function setMessage(uint256 newMessage) external {
        message = newMessage;
    }
}