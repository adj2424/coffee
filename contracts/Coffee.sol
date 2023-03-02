// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

// deployed at 0xfCeC1d6789591396751fFA4653fca4213Bd26d73

contract Coffee {
    struct Message {
        address sender;
        string name;
        string message;
        uint256 timestamp;
    }
    // owner of the contract
    address payable immutable deployer;

    Message[] messages;

    constructor() {
        deployer = payable(msg.sender);
    }

    //  transfer the ETH to the contract when function is called must be more than 0
    function buyCoffee(
        string calldata name,
        string calldata _message
    ) public payable {
        require(msg.value > 0 ether, "You need to send some ETH");
        Message memory message = Message(
            msg.sender,
            name,
            _message,
            block.timestamp
        );
        messages.push(message);
    }

    function withdrawAll() public {
        require(deployer == msg.sender, "You are not the owner");
        //transfer funds from contract to deployer
        deployer.transfer(address(this).balance);
    }

    function getMemos() public view returns (Message[] memory) {
        return messages;
    }
}
