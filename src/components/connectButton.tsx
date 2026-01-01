'use client';

import { useWallet } from '@lazorkit/wallet';
import { LogOut, Copy, Check, User } from 'lucide-react'; // Added Copy and Check icons
import { useState } from 'react';

export function ConnectButton() {
  const { connect, disconnect, isConnected, isConnecting, wallet } = useWallet();
  const [copied, setCopied] = useState(false);

  // The function that performs the copy
  const handleCopy = async () => {
    if (wallet?.smartWallet) {
      try {
        await navigator.clipboard.writeText(wallet.smartWallet);
        setCopied(true);
        // Reset the icon back to "Copy" after 2 seconds
        setTimeout(() => setCopied(false), 2000); 
      } catch (err) {
        console.error('Failed to copy!', err);
      }
    }
  };

  if (isConnected && wallet) {
    return (
      <div className="flex items-center gap-3 p-2 bg-white/5 rounded-2xl border border-white/10">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-widest text-indigo-400 font-bold">Smart Wallet</span>
          <div className="flex items-center gap-2">
            <span className="text-sm font-mono text-white">
              {wallet.smartWallet.slice(0, 4)}...{wallet.smartWallet.slice(-4)}
            </span>
            {/* The Copy Button */}
            <button 
              onClick={handleCopy}
              className="p-1 hover:bg-white/10 rounded-md transition-colors text-gray-400 hover:text-white"
              title="Copy Address"
            >
              {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
            </button>
          </div>
        </div>
        <button 
          onClick={() => disconnect()}
          className="p-2 hover:bg-red-500/20 text-red-400 rounded-xl transition-colors"
        >
          <LogOut size={18} />
        </button>
      </div>
    );
  }

  return (
    <button 
      onClick={() => connect()}
      className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl flex items-center gap-2"
    >
      <User size={18} />
      <span>{isConnecting ? 'Verifying...' : 'Connect Wallet'}</span>
    </button>
  );
}