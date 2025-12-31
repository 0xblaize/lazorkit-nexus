'use client';

import { useWallet } from '@lazorkit/wallet';
import { ConnectButton } from '@/components/connectButton';
import { TransferButton } from '@/components/transferButton';
import { ShieldCheck, Cpu, Globe } from 'lucide-react';

export default function Home() {
  const { isConnected, wallet } = useWallet();

  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white flex flex-col items-center p-8">
      {/* Header Area */}
      <nav className="w-full max-w-5xl flex justify-between items-center mb-20">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">L</div>
          LAZOR_NEXUS
        </div>
        <ConnectButton />
      </nav>

      {/* Hero Content */}
      <div className="max-w-2xl text-center space-y-6">
        <h1 className="text-6xl font-black tracking-tight leading-none">
          Solana UX, <span className="text-indigo-500">Solved.</span>
        </h1>
        <p className="text-gray-400 text-lg">
          No seed phrases. No gas fees. Just biometrics.
        </p>
      </div>

      {/* Logic Display */}
      <div className="mt-16 w-full max-w-xl">
        {!isConnected ? (
          <div className="grid grid-cols-3 gap-4 text-center">
            <FeatureCard icon={<ShieldCheck />} title="Passkey" desc="secp256r1" />
            <FeatureCard icon={<Cpu />} title="Smart Wallet" desc="Account Abstraction" />
            <FeatureCard icon={<Globe />} title="Gasless" desc="USDC Relayer" />
          </div>
        ) : (
          <div className="p-8 bg-indigo-600/5 border border-indigo-500/20 rounded-[32px] space-y-6">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Active Smart Account</label>
              <div className="text-xl font-mono truncate bg-black/40 p-3 rounded-xl border border-white/5">
                {wallet?.smartWallet}
              </div>
            </div>
            <TransferButton />
          </div>
        )}
      </div>
    </main>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex flex-col items-center gap-2">
      <div className="text-indigo-500">{icon}</div>
      <div className="font-bold text-sm">{title}</div>
      <div className="text-[10px] text-gray-500">{desc}</div>
    </div>
  );
}