import React, { useState } from 'react';
import { ArrowLeft, User, Crown, Smartphone, CreditCard, LogOut, CheckCircle2, ChevronRight, ShieldCheck } from 'lucide-react';

interface AccountScreenProps {
  onBack: () => void;
  onLogout: () => void;
  onShowToast: (msg: string) => void;
}

export const AccountScreen: React.FC<AccountScreenProps> = ({ onBack, onLogout, onShowToast }) => {
  const [isRenewing, setIsRenewing] = useState(false);

  const handleRenew = (provider: string) => {
    setIsRenewing(true);
    setTimeout(() => {
      setIsRenewing(false);
      onShowToast(`Prompt sent to phone for ${provider} payment (UGX 15,000 / month VIP)`);
    }, 1000);
  };

  return (
    <div className="min-h-full bg-[#05051F] text-white flex flex-col pb-20 select-none animate-fadeIn">
      {/* Top Header */}
      <div className="h-14 px-4 flex items-center justify-between border-b border-white/[0.04] sticky top-0 bg-[#05051F]/95 backdrop-blur-md z-30">
        <div className="flex items-center space-x-3">
          <button
            onClick={onBack}
            className="p-1 -ml-1 text-white hover:text-[#00D522] transition-colors focus:outline-none"
            aria-label="Go back"
          >
            <ArrowLeft className="w-6 h-6 stroke-[2.2]" />
          </button>
          <h1 className="text-white text-[18px] font-bold tracking-tight">
            My Account
          </h1>
        </div>
      </div>

      <div className="px-4 py-4 space-y-5">
        {/* Profile Card */}
        <div className="p-4 bg-gradient-to-r from-[#0C0C38] to-[#080829] border border-white/[0.06] rounded-2xl flex items-center space-x-4">
          <div className="relative">
            <div className="w-14 h-14 rounded-full bg-[#00D522]/20 border-2 border-[#00D522] flex items-center justify-center text-[#00D522] font-black text-xl">
              AM
            </div>
            <div className="absolute -bottom-1 -right-1 bg-[#00D522] p-0.5 rounded-full">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#05051F]" />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <h2 className="text-white font-bold text-base truncate">Ashiraf Mutagwanya</h2>
            </div>
            <p className="text-[#9292A5] text-xs truncate">mutagwanyaashiraf@gmail.com</p>
            <div className="mt-1 flex items-center space-x-1.5">
              <span className="px-2 py-0.5 rounded-full bg-[#00D522]/20 text-[#00D522] text-[10px] font-bold uppercase tracking-wider flex items-center space-x-1">
                <Crown className="w-3 h-3" />
                <span>VIP Active</span>
              </span>
              <span className="text-[#9292A5] text-[11px]">• 28 Days Left</span>
            </div>
          </div>
        </div>

        {/* VIP Subscription Details */}
        <div className="p-4 bg-white/[0.03] border border-white/[0.05] rounded-xl space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Crown className="w-4 h-4 text-[#00D522]" />
              <span className="text-white font-bold text-xs uppercase tracking-wider">MunoWatch VIP Pass</span>
            </div>
            <span className="text-[#00D522] text-xs font-semibold">Active</span>
          </div>

          <p className="text-[#D0D0D8] text-xs leading-relaxed">
            Unlimited access to all English-to-Luganda translated movies, TV series, early releases by VJ Junior, VJ Ice P, and VJ Emmy, plus Full HD offline downloads.
          </p>

          <div className="pt-2 border-t border-white/[0.04] flex items-center justify-between text-xs text-[#9292A5]">
            <span>Next Billing Date</span>
            <span className="text-white font-semibold">18 November 2026</span>
          </div>

          {/* Quick Renew Buttons */}
          <div className="pt-2">
            <p className="text-[#9292A5] text-[11px] font-semibold mb-2">Instant Mobile Money Renewal (UGX 15,000 / mo):</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                disabled={isRenewing}
                onClick={() => handleRenew('MTN Mobile Money')}
                className="py-2.5 px-3 bg-[#FFCC00]/15 hover:bg-[#FFCC00]/25 border border-[#FFCC00]/30 rounded-xl flex items-center justify-center space-x-2 transition-colors text-white text-xs font-bold"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#FFCC00]" />
                <span>MTN MoMo</span>
              </button>
              <button
                disabled={isRenewing}
                onClick={() => handleRenew('Airtel Money')}
                className="py-2.5 px-3 bg-[#FF0000]/15 hover:bg-[#FF0000]/25 border border-[#FF0000]/30 rounded-xl flex items-center justify-center space-x-2 transition-colors text-white text-xs font-bold"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF0000]" />
                <span>Airtel Money</span>
              </button>
            </div>
          </div>
        </div>

        {/* Registered Devices */}
        <div className="bg-white/[0.03] border border-white/[0.05] rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-[#9292A5]">
              <Smartphone className="w-4 h-4 text-[#00D522]" />
              <span className="text-white font-bold text-xs uppercase tracking-wider">Registered Devices</span>
            </div>
            <span className="text-[#00D522] text-xs font-bold">2 of 3 used</span>
          </div>

          <div className="divide-y divide-white/[0.04]">
            <div className="py-2 flex items-center justify-between">
              <div>
                <p className="text-white text-xs font-semibold">Samsung Galaxy S24 (This Device)</p>
                <p className="text-[#9292A5] text-[10px]">Kampala, Uganda • Active Now</p>
              </div>
              <span className="px-2 py-0.5 rounded bg-[#00D522]/20 text-[#00D522] text-[10px] font-bold">Current</span>
            </div>
            <div className="py-2 flex items-center justify-between">
              <div>
                <p className="text-white text-xs font-semibold">Tecno Camon 30</p>
                <p className="text-[#9292A5] text-[10px]">Entebbe, Uganda • Last active 2h ago</p>
              </div>
              <button
                onClick={() => onShowToast('Disconnected Tecno Camon 30')}
                className="text-[11px] text-red-400 hover:text-red-300"
              >
                Remove
              </button>
            </div>
          </div>
        </div>

        {/* Security & Logout */}
        <div className="bg-white/[0.03] border border-white/[0.05] rounded-xl overflow-hidden divide-y divide-white/[0.04]">
          <button
            onClick={() => onShowToast('Password reset link sent to mutagwanyaashiraf@gmail.com')}
            className="w-full px-4 py-3 flex items-center justify-between hover:bg-white/[0.04] transition-colors text-left"
          >
            <div className="flex items-center space-x-3">
              <ShieldCheck className="w-4 h-4 text-[#00D522]" />
              <span className="text-white text-xs font-semibold">Security & Password</span>
            </div>
            <ChevronRight className="w-4 h-4 text-[#9292A5]" />
          </button>

          <button
            onClick={onLogout}
            className="w-full px-4 py-3 flex items-center space-x-3 hover:bg-red-500/10 transition-colors text-left text-red-400"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-xs font-bold">Sign Out of MunoWatch</span>
          </button>
        </div>
      </div>
    </div>
  );
};
