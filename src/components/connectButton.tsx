'use client';

import { useWallet } from '@lazorkit/wallet';
import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { LogOut, Copy, Check, User, RefreshCcw } from 'lucide-react'; 
import { useState, useEffect, useCallback } from 'react';

export function ConnectButton() {
  const { connect, disconnect, isConnected, isConnecting, wallet } = useWallet();
  const [copied, setCopied] = useState(false);
  const [balance, setBalance] = useState<number | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // 1. Fetch Balance Function
  const fetchBalance = useCallback(async () => {
    if (!wallet?.smartWallet) return;
    setIsRefreshing(true);
    try {
      const connection = new Connection("https://api.devnet.solana.com");
      const pubkey = new PublicKey(wallet.smartWallet);
      const balanceInLamports = await connection.getBalance(pubkey);
      setBalance(balanceInLamports / LAMPORTS_PER_SOL);
    } catch (err) {
      console.error("Failed to fetch balance:", err);
    } finally {
      setIsRefreshing(false);
    }
  }, [wallet?.smartWallet]);

  // 2. Auto-fetch balance when wallet connects
  useEffect(() => {
    if (isConnected) {
      fetchBalance();
    } else {
      setBalance(null);
    }
  }, [isConnected, fetchBalance]);

  // 3. Copy Address Function
  const handleCopy = async () => {
    if (wallet?.smartWallet) {
      try {
        await navigator.clipboard.writeText(wallet.smartWallet);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); 
      } catch (err) {
        console.error('Failed to copy!', err);
      }
    }
  };

  // --- CONNECTED VIEW ---
  if (isConnected && wallet) {
    return (
      <div className="flex flex-col gap-2 p-3 bg-white/5 rounded-2xl border border-white/10 w-full max-w-xs">
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest text-indigo-400 font-bold">Smart Wallet</span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-mono text-white">
                {wallet.smartWallet.slice(0, 4)}...{wallet.smartWallet.slice(-4)}
              </span>
              <button onClick={handleCopy} className="p-1 hover:bg-white/10 rounded-md transition-colors text-gray-400">
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

        {/* Balance Display Section */}
        <div className="flex justify-between items-center pt-2 border-t border-white/5">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-500 uppercase font-bold">Devnet Balance</span>
            <span className="text-lg font-black text-white">
              {balance !== null ? `${balance.toFixed(4)} SOL` : '---'}
            </span>
          </div>
          <button 
            onClick={fetchBalance}
            disabled={isRefreshing}
            className={`p-2 rounded-full hover:bg-white/10 transition-all ${isRefreshing ? 'animate-spin' : ''}`}
          >
            <RefreshCcw size={16} className="text-indigo-400" />
          </button>
        </div>
      </div>
    );
  }

  // --- DISCONNECTED VIEW ---
  return (
    <button 
      onClick={() => connect()}
      disabled={isConnecting}
      className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl flex items-center gap-3 transition-all active:scale-95 disabled:opacity-70"
    >
      {isConnecting ? <RefreshCcw className="animate-spin" size={20} /> : <User size={20} />}
      <span>{isConnecting ? 'Opening Portal...' : 'Connect with Passkey'}</span>
    </button>
  );
}