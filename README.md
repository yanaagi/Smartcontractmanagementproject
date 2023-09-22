# Assessment Smart Contract

## Features

- **Deposit**: The contract allows the owner to deposit tokens into the contract, increasing the contract's balance.

- **Withdraw**: The owner can withdraw tokens from the contract, provided they have a sufficient balance.

- **Burn**: The owner can burn (destroy) tokens from the contract, reducing the contract's balance.

- **Balance Inquiry**: Users can inquire about the current balance of the contract.

## Usage

### Prerequisites

- Ethereum Wallet (e.g., MetaMask)
- Knowledge of Ethereum and Solidity
- Access to an Ethereum development environment (e.g., Remix)

### Interaction with the Contract

1. Deploy the contract with an initial balance by specifying the `initBalance` parameter during deployment.

2. Use an Ethereum wallet (e.g., MetaMask) to interact with the contract.

3. To deposit tokens, call the `deposit` function with the desired amount. Only the contract owner can deposit tokens.

4. To withdraw tokens, call the `withdraw` function with the desired amount. Only the contract owner can withdraw tokens, and the balance must be sufficient.

5. To burn tokens, call the `burn` function with the desired amount. Only the contract owner can burn tokens, and the balance must be sufficient.

6. Use the `getBalance` function to check the current balance of the contract.

### Example

Here's an example of interacting with the contract using Solidity in Remix:

```solidity
// Deploy the contract with an initial balance of 1000 tokens
Assessment assessment = new Assessment(1000);

// Deposit 200 tokens into the contract
assessment.deposit{value: 200}(200);

// Check the current balance
uint256 currentBalance = assessment.getBalance();

// Withdraw 100 tokens from the contract
assessment.withdraw(100);

// Burn 50 tokens from the contract
assessment.burn(50);
