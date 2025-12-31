'use client';

import { useWallet } from '@lazorkit/wallet';
import { User, LogOut, Loader2 } from 'lucide-react'; // For a 2025 premium look

export function ConnectButton() {
  const { connect, disconnect, isConnected, isConnecting, wallet } = useWallet();

  if (isConnected && wallet) {
    return (
      <div className="flex items-center gap-4 p-2 bg-white/5 rounded-2xl border border-white/10">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-widest text-indigo-400 font-bold">Smart Wallet</span>
          <span className="text-sm font-mono text-white">
            {wallet.smartWallet.slice(0, 4)}...{wallet.smartWallet.slice(-4)}
          </span>
        </div>
        <button 
          onClick={() => disconnect()}
          className="p-2 hover:bg-red-500/20 text-red-400 rounded-xl transition-colors"
          title="Disconnect"
        >
          <LogOut size={18} />
        </button>
      </div>
    );
  }

  return (
    <button 
      onClick={() => connect()}
      disabled={isConnecting}
      className="relative group px-8 py-4 bg-indigo-600 rounded-2xl font-bold text-white overflow-hidden transition-all hover:scale-105 active:scale-95 disabled:opacity-70"
    >
      <div className="flex items-center gap-2 relative z-10">
        {isConnecting ? (
          <Loader2 className="animate-spin" size={20} />
        ) : (
          <User size={20} />
        )}
        <span>{isConnecting ? 'Opening Portal...' : 'Connect with Passkey'}</span>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
    </button>
  );
}