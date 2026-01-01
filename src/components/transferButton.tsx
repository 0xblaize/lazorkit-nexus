'use client';

import { useWallet } from '@lazorkit/wallet';
import { SystemProgram, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { Zap, Loader2 } from 'lucide-react';
import { useState } from 'react';

export function TransferButton() {
  const { signAndSendTransaction, smartWalletPubkey, isConnected } = useWallet();
  const [loading, setLoading] = useState(false);

  const handleGaslessTransfer = async () => {
    if (!smartWalletPubkey) return alert("Connect first!");
    setLoading(true);

    try {
      // 1. We send a tiny amount (0.0001 SOL) to avoid "Insufficient Funds"
      const destination = new PublicKey('7BeWr6tVa1pYgrEddekYTnQENU22bBw9H8HYJUkbrN71');
      const instruction = SystemProgram.transfer({
        fromPubkey: smartWalletPubkey,
        toPubkey: destination,
        lamports: 0.00001 * LAMPORTS_PER_SOL, 
      });

      // 2. Execute with Paymaster
      const signature = await signAndSendTransaction({
        instructions: [instruction],
        transactionOptions: {
          feeToken: 'USDC' 
        }
      });

      alert("Success! Check the console for the signature.");
      console.log("Tx Signature:", signature);

    } catch (error: any) {
      console.error("Tx Error:", error);
      // Explaining the 0x1 error to the user
      if (error.message.includes('0x1')) {
        alert(" Your Smart Wallet needs a tiny bit of SOL to send. Even though GAS is free, the actual SOL being sent must exist in the wallet.");
      } else {
        alert("Transaction Failed: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isConnected) return null;

  return (
    <button 
      onClick={handleGaslessTransfer} 
      disabled={loading}
      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-6 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-500/20 disabled:opacity-50"
    >
      {loading ? (
        <Loader2 className="animate-spin" />
      ) : (
        <Zap size={20} className="fill-white" />
      )}
      <span>{loading ? 'Processing...' : 'Send Gasless SOL'}</span>
    </button>
  );
}