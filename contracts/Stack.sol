//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Stack {
    bytes[] public stack;
    uint public immutable maxStackLength;

    constructor(uint _maxStackLength) {
        maxStackLength = _maxStackLength;
    }

    function push(bytes memory data) public {
        require(stack.length < maxStackLength, "Stack overflow");
        stack.push(data);
    }

    function pop() public returns (bytes memory data) {
        require(stack.length > 0, "Empty stack");

        data = stack[stack.length - 1];
        stack.pop();
    }

    function length() public view returns (uint) {
        return stack.length;
    }
}