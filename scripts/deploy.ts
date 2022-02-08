import { ethers } from "hardhat";

async function main() {
  const Stack = await ethers.getContractFactory("Stack");
  const stack = await Stack.deploy();

  await stack.deployed();

  console.log("Stack deployed to:", stack.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
