import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { expect } from "chai";
import { ethers } from "hardhat";
import { Stack, Stack__factory } from "../typechain";

describe("Stack", function () {
  let stack: Stack;
  const MAX_STACK_LENGTH = 3;

  beforeEach(async () => {
    const Stack  = (await ethers.getContractFactory("Stack")) as unknown as Stack__factory;
    stack = await Stack.deploy(MAX_STACK_LENGTH);
    await stack.deployed();
  });

  it("Should set max stack length correctly", async () => {
    expect((await stack.maxStackLength()).toNumber()).to.equal(MAX_STACK_LENGTH);
  });

  it("Should push element to stack", async () => {
    const testValue = ethers.utils.hexlify(1);
    await stack.push(testValue);
    expect(await stack.stack(0)).to.equal(testValue);
  });
  
  it("Should pop element from the end of stack", async () => {
    const testValue1 = ethers.utils.hexlify(1);
    const testValue2 = ethers.utils.hexlify(2);

    await stack.push(testValue1);
    await stack.push(testValue2);
    await stack.pop();

    expect((await stack.length()).toNumber()).to.equal(1);
    expect(await stack.stack(0)).to.equal(testValue1);
  });
  
  it("Should revert when stack exceeds max length", async () => {
    const testValue = ethers.utils.hexlify(5);

    for (let i = 0; i < MAX_STACK_LENGTH; i++) {
      await stack.push(testValue)
    }

    expect((await stack.length()).toNumber()).to.equal(MAX_STACK_LENGTH);
    expect(stack.push(testValue)).to.be.revertedWith('Stack overflow');
  });
  
  it("Should revert when pop() empty stack", async () => {
    expect(stack.pop()).to.be.revertedWith('Empty stack');
  });
});
