// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

interface IFlashLoanProvider {
    function flashLoan(
        address receiver,
        address token,
        uint256 amount,
        bytes calldata params
    ) external;
}

contract FlashLoanProfit is ReentrancyGuard {
    address public owner;
    address public flashLoanProvider;

    event ProfitSent(address indexed to, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    constructor(address _flashLoanProvider) {
        owner = msg.sender;
        flashLoanProvider = _flashLoanProvider;
    }

    // This function will be called by the flash loan provider
    function executeOperation(
        address token,
        uint256 amount,
        uint256 fee,
        bytes calldata params
    ) external nonReentrant {
        require(msg.sender == flashLoanProvider, "Unauthorized");

        // TODO: Implement arbitrage, yield farming, or JIT liquidity logic here
        // For now, just repay the loan plus fee

        uint256 totalDebt = amount + fee;
        IERC20(token).approve(flashLoanProvider, totalDebt);

        // Send profit to owner wallet (if any)
        uint256 profit = IERC20(token).balanceOf(address(this)) - totalDebt;
        if (profit > 0) {
            IERC20(token).transfer(owner, profit);
            emit ProfitSent(owner, profit);
        }
    }

    // Initiate flash loan
    function startFlashLoan(address token, uint256 amount) external onlyOwner {
        IFlashLoanProvider(flashLoanProvider).flashLoan(
            address(this),
            token,
            amount,
            ""
        );
    }
}
