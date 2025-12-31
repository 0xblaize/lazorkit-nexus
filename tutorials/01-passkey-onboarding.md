# 🔐 Implementing Seedless Passkey Onboarding

This tutorial explains how to use the Lazorkit SDK to create a Solana wallet using hardware biometrics (Passkey) instead of traditional seed phrases.

### 1. The Concept
In June 2025, Solana validators added native support for the `secp256r1` elliptic curve. This allows standard device authenticators (FaceID, TouchID) to sign Solana transactions directly.

### 2. Implementation
Using the `useWallet` hook, we trigger the biometric prompt:

```typescript
const { connect } = useWallet();

const handleLogin = async () => {
  // This opens the Lazorkit Portal to verify biometrics
  await connect(); 
};