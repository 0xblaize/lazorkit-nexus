'use client';

import { LazorkitProvider } from '@lazorkit/wallet';

export function LazorProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazorkitProvider
      // 1. Standard Devnet RPC
      rpcUrl="https://api.devnet.solana.com"
      
      // 2. The 2025 Portal (Essential for Passkeys)
      portalUrl="https://portal.lazor.sh"
      
      // 3. Updated Paymaster Object
      paymasterConfig={{ 
        paymasterUrl: "https://kora.devnet.lazorkit.com" 
      }}
    >
      {children}
    </LazorkitProvider>
  );
}