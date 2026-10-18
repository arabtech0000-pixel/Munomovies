import React, { useRef } from 'react';

interface PhoneSimulatorProps {
  children: React.ReactNode;
}

export const PhoneSimulator: React.FC<PhoneSimulatorProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Allow scrolling the mouse wheel anywhere (even outside or on headers) to scroll the active content container
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const scrollable = containerRef.current?.querySelector<HTMLElement>('.scroll-container');
    if (!scrollable) return;

    const target = e.target as HTMLElement;
    // If the event didn't originate from inside the scrollable container, forward it!
    if (!scrollable.contains(target)) {
      scrollable.scrollTop += e.deltaY;
    }
  };

  return (
    <div
      onWheel={handleWheel}
      className="w-full h-full min-h-[100dvh] h-[100dvh] bg-[#02020e] flex items-center justify-center font-sans antialiased overflow-hidden select-none"
    >
      {/* 
        Phone Container:
        - Full width & height on mobile screens (100%)
        - Max width 430px on desktop
        - Fixed bottom navigation bar
        - Smooth vertical scrolling with touch and drag support
      */}
      <div
        ref={containerRef}
        className="w-full sm:max-w-[430px] h-full sm:h-[100dvh] sm:max-h-[920px] bg-[#05051F] sm:border-x sm:border-white/5 sm:shadow-2xl flex flex-col relative overflow-hidden"
      >
        {children}
      </div>
    </div>
  );
};
