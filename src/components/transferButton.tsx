'use client';

import { useWallet } from '@lazorkit/wallet';
import { SystemProgram, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { Zap, Loader2, ExternalLink } from 'lucide-react';
import { useState } from 'react';

export function TransferButton() {
  const { signAndSendTransaction, smartWalletPubkey, isConnected } = useWallet();
  const [loading, setLoading] = useState(false);
  const [lastSignature, setLastSignature] = useState<string | null>(null);

  const handleGaslessTransfer = async () => {
    if (!smartWalletPubkey) return alert("Connect first!");
    setLoading(true);
    setLastSignature(null); // Reset previous signature

    try {
      const destination = new PublicKey('7BeWr6tVa1pYgrEddekYTnQENU22bBw9H8HYJUkbrN71');
      const instruction = SystemProgram.transfer({
        fromPubkey: smartWalletPubkey,
        toPubkey: destination,
        lamports: 0.0000 * LAMPORTS_PER_SOL, 
      });

      // signAndSendTransaction returns the transaction signature string
      const signature = await signAndSendTransaction({
        instructions: [instruction],
        transactionOptions: {
          feeToken: 'USDC' 
        }
      });

      setLastSignature(signature);
      console.log("Tx Signature:", signature);

    } catch (error: any) {
      console.error("Tx Error:", error);
      alert("Transaction Failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isConnected) return null;

  return (
    <div className="space-y-4">
      <button 
        onClick={handleGaslessTransfer} 
        disabled={loading}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-6 rounded-2xl flex items-center justify-center gap-2 transition-all disabled:opacity-50"
      >
        {loading ? <Loader2 className="animate-spin" /> : <Zap size={20} />}
        <span>{loading ? 'Processing...' : 'Send Gasless SOL'}</span>
      </button>

      {/* Show this link only after a successful transaction */}
      {lastSignature && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl animate-in fade-in slide-in-from-top-2">
          <p className="text-xs text-emerald-400 font-medium mb-2">Transaction Sent Successfully!</p>
          <a 
            href={`https://explorer.solana.com/tx/${lastSignature}?cluster=devnet`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between text-sm text-white hover:text-emerald-300 transition-colors group"
          >
            <span className="font-mono">{lastSignature.slice(0, 12)}...{lastSignature.slice(-12)}</span>
            <ExternalLink size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      )}
    </div>
  );
}