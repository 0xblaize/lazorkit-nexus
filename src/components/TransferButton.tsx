'use client';

import { useWallet } from '@lazorkit/wallet';
import { SystemProgram, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';

export function TransferButton() {
  const { signAndSendTransaction, smartWalletPubkey, isConnected } = useWallet();

  const handleGaslessTransfer = async () => {
    if (!smartWalletPubkey) return alert("Connect first!");

    try {
      const destination = new PublicKey('7BeWr6tVa1pYgrEddekYTnQENU22bBw9H8HYJUkbrN71');
      const instruction = SystemProgram.transfer({
        fromPubkey: smartWalletPubkey,
        toPubkey: destination,
        lamports: 0.001 * LAMPORTS_PER_SOL,
      });

      // FIX: Add a console log to track the fetch start
      console.log("Fetching signature from Portal...");

      const signature = await signAndSendTransaction({
        instructions: [instruction],
        transactionOptions: {
          feeToken: 'USDC' 
        }
      });

      alert("Success! Signature: " + signature.slice(0, 8));

    } catch (error: any) {
      // 🚨 THIS IS WHERE WE CATCH THE 'FAILED TO FETCH'
      if (error.name === 'TypeError' || error.message.includes('fetch')) {
        console.error("CORS or Network Blocked the Request:", error);
        alert("Network Error: The Lazorkit Paymaster is blocking the request from localhost. Try using a different browser (Chrome) or disabling Brave Shields.");
      } else {
        alert("Transaction failed: " + error.message);
      }
    }
  };

  if (!isConnected) return null;

  return (
    <button onClick={handleGaslessTransfer} className="...">
      Send Gasless SOL
    </button>
  );
}