import React from 'react';
import { MessageSquare, Mail, Phone, X } from 'lucide-react';

interface SupportScreenProps {
  onBack: () => void;
  onShowToast?: (msg: string) => void;
}

export const SupportScreen: React.FC<SupportScreenProps> = ({ onBack, onShowToast }) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-xs select-none">
      {/* Tap backdrop to dismiss */}
      <div className="flex-1" onClick={onBack} />

      {/* Bottom Sheet matching Screenshot 8 */}
      <div className="w-full max-w-[430px] mx-auto bg-[#070728] border-t border-white/[0.08] shadow-2xl animate-slideUp">
        <div className="py-2 divide-y divide-white/[0.04]">
          {/* 1. Chat with us on WhatsApp */}
          <button
            onClick={() => {
              if (onShowToast) onShowToast('Opening WhatsApp support (+256)...');
              onBack();
            }}
            className="w-full px-5 py-4 flex items-center space-x-4 text-left hover:bg-white/[0.04] transition-colors focus:outline-none"
          >
            <MessageSquare className="w-5 h-5 text-white stroke-[2]" />
            <span className="text-white text-[15px] font-medium">
              Chat with us on WhatsApp
            </span>
          </button>

          {/* 2. Send us an email */}
          <button
            onClick={() => {
              if (onShowToast) onShowToast('Opening email support...');
              onBack();
            }}
            className="w-full px-5 py-4 flex items-center space-x-4 text-left hover:bg-white/[0.04] transition-colors focus:outline-none"
          >
            <Mail className="w-5 h-5 text-white stroke-[2]" />
            <span className="text-white text-[15px] font-medium">
              Send us an email
            </span>
          </button>

          {/* 3. Call us */}
          <button
            onClick={() => {
              if (onShowToast) onShowToast('Calling MunoWatch hotline...');
              onBack();
            }}
            className="w-full px-5 py-4 flex items-center space-x-4 text-left hover:bg-white/[0.04] transition-colors focus:outline-none"
          >
            <Phone className="w-5 h-5 text-white stroke-[2]" />
            <span className="text-white text-[15px] font-medium">
              Call us
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
