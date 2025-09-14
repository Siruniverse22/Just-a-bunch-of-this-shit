async function main() {
  const [owner] = await ethers.getSigners();

  // Replace with deployed contract address
  const contractAddress = "REPLACE_WITH_DEPLOYED_CONTRACT_ADDRESS";

  const FlashLoanProfit = await ethers.getContractFactory("FlashLoanProfit");
  const flashLoanProfit = FlashLoanProfit.attach(contractAddress);

  // Example: start a flash loan (replace token address and amount)
  const tokenAddress = "REPLACE_WITH_TOKEN_ADDRESS";
  const amount = ethers.utils.parseUnits("1000", 18); // example amount

  const tx = await flashLoanProfit.startFlashLoan(tokenAddress, amount);
  await tx.wait();

  console.log("Flash loan started");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
