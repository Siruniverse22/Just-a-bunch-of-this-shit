async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const FlashLoanProfit = await ethers.getContractFactory("FlashLoanProfit");
  // Replace with actual flash loan provider address when deploying
  const flashLoanProviderAddress = "0x0000000000000000000000000000000000000000";
  const flashLoanProfit = await FlashLoanProfit.deploy(flashLoanProviderAddress);

  await flashLoanProfit.deployed();

  console.log("FlashLoanProfit deployed to:", flashLoanProfit.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
