import React from 'react';
import { MessageSquare, Mail, Phone, Users2, Radio, X } from 'lucide-react';

interface SupportScreenProps {
  onBack: () => void;
  onShowToast?: (msg: string) => void;
}

export const SupportScreen: React.FC<SupportScreenProps> = ({ onBack, onShowToast }) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/70 backdrop-blur-xs select-none">
      {/* Tap backdrop to dismiss */}
      <div className="flex-1" onClick={onBack} />

      {/* Bottom Sheet */}
      <div className="w-full max-w-[430px] mx-auto bg-[#070728] border-t border-white/[0.08] rounded-t-2xl shadow-2xl animate-slideUp overflow-hidden">
        <div className="px-5 py-3 border-b border-white/[0.04] flex items-center justify-between">
          <h3 className="text-sm font-bold text-white tracking-wide">MunoMovies Support & Community</h3>
          <button onClick={onBack} className="p-1 text-[#9292A5] hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-2 divide-y divide-white/[0.04]">
          {/* 1. Chat with us on WhatsApp */}
          <button
            onClick={() => {
              if (onShowToast) onShowToast('Connecting to WhatsApp support (+256)...');
              onBack();
            }}
            className="w-full px-5 py-3.5 flex items-center space-x-4 text-left hover:bg-white/[0.04] transition-colors focus:outline-none cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-500/15 flex items-center justify-center text-[#00D522]">
              <MessageSquare className="w-5 h-5 stroke-[2]" />
            </div>
            <div>
              <span className="text-white text-[14px] font-semibold block">
                Chat with us on WhatsApp
              </span>
              <span className="text-[#9292A5] text-[11px]">Instant support from our team</span>
            </div>
          </button>

          {/* 2. WhatsApp Group */}
          <button
            onClick={() => {
              if (onShowToast) onShowToast('Opening MunoMovies Official WhatsApp Group...');
              onBack();
            }}
            className="w-full px-5 py-3.5 flex items-center space-x-4 text-left hover:bg-white/[0.04] transition-colors focus:outline-none cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-500/15 flex items-center justify-center text-[#00D522]">
              <Users2 className="w-5 h-5 stroke-[2]" />
            </div>
            <div>
              <span className="text-white text-[14px] font-semibold block">
                WhatsApp Group
              </span>
              <span className="text-[#9292A5] text-[11px]">Join movie lovers community & discussions</span>
            </div>
          </button>

          {/* 3. WhatsApp Channel */}
          <button
            onClick={() => {
              if (onShowToast) onShowToast('Opening MunoMovies Official WhatsApp Channel...');
              onBack();
            }}
            className="w-full px-5 py-3.5 flex items-center space-x-4 text-left hover:bg-white/[0.04] transition-colors focus:outline-none cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-500/15 flex items-center justify-center text-[#00D522]">
              <Radio className="w-5 h-5 stroke-[2]" />
            </div>
            <div>
              <span className="text-white text-[14px] font-semibold block">
                WhatsApp Channel
              </span>
              <span className="text-[#9292A5] text-[11px]">Daily movie schedules & release announcements</span>
            </div>
          </button>

          {/* 4. Send us an email */}
          <button
            onClick={() => {
              if (onShowToast) onShowToast('Opening email support (support@munomovies.com)...');
              onBack();
            }}
            className="w-full px-5 py-3.5 flex items-center space-x-4 text-left hover:bg-white/[0.04] transition-colors focus:outline-none cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-blue-500/15 flex items-center justify-center text-blue-400">
              <Mail className="w-5 h-5 stroke-[2]" />
            </div>
            <div>
              <span className="text-white text-[14px] font-semibold block">
                Send us an email
              </span>
              <span className="text-[#9292A5] text-[11px]">support@munomovies.com</span>
            </div>
          </button>

          {/* 5. Call us */}
          <button
            onClick={() => {
              if (onShowToast) onShowToast('Calling MunoMovies helpline (+256)...');
              onBack();
            }}
            className="w-full px-5 py-3.5 flex items-center space-x-4 text-left hover:bg-white/[0.04] transition-colors focus:outline-none cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-purple-500/15 flex items-center justify-center text-purple-400">
              <Phone className="w-5 h-5 stroke-[2]" />
            </div>
            <div>
              <span className="text-white text-[14px] font-semibold block">
                Call us
              </span>
              <span className="text-[#9292A5] text-[11px]">Direct helpline for VIP issues</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
