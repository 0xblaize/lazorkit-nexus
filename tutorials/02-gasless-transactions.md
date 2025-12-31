# ⚡ How to Trigger a Gasless Transaction

This guide shows how to let users send transactions with **0 SOL** using Lazorkit.

### 1. The Setup
Ensure your `LazorkitProvider` has the `paymasterConfig` pointing to:
`https://kora.devnet.lazorkit.com`

### 2. The Code
Use the `signAndSendTransaction` function with the `sponsored: true` flag or `feeToken: 'USDC'`.

```typescript
const { signAndSendTransaction } = useWallet();

const handleAction = async () => {
  await signAndSendTransaction({
    instructions: [yourInstructions],
    transactionOptions: {
      feeToken: 'USDC' // This uses the Smart Wallet's gas abstraction
    }
  });
};

### 3. Why it works
Lazorkit uses **Account Abstraction**. When you set `sponsored: true`, your transaction is sent to a **Relayer**. 
1. The Relayer verifies your signature.
2. The Relayer pays the SOL fee for you.
3. The transaction is executed on Solana, even if you have 0 SOL.