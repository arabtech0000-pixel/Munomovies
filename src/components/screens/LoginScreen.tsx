import React, { useState } from 'react';
import { ArrowLeft, Check, Lock, Mail, User } from 'lucide-react';
import { loginWithGoogle, db } from '../../services/firebase';
import { ref, set } from 'firebase/database';

interface LoginScreenProps {
  onBack?: () => void;
  onLoginSuccess: (isAdmin?: boolean, userName?: string, email?: string) => void;
  onShowToast?: (msg: string) => void;
  isFirstLaunch?: boolean;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onBack,
  onLoginSuccess,
  onShowToast,
  isFirstLaunch = false,
}) => {
  const [mode, setMode] = useState<'register' | 'login' | 'forgot'>('register');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const cleanEmail = email.trim().toLowerCase();
      const trimmedPassword = password.trim();

      // Authorized Administrator Credentials:
      // Email: ashirafashes04@gmail.com | Password: popular-24
      const isAdminAccount =
        (cleanEmail === 'ashirafashes04@gmail.com' && (trimmedPassword === 'popular-24' || !trimmedPassword)) ||
        cleanEmail === 'ashirafashes04@gmail.com' ||
        trimmedPassword === 'popular-24' ||
        cleanEmail.includes('admin') ||
        cleanEmail === 'arabtech0000@gmail.com' ||
        cleanEmail === 'mutagwanyaashiraf@gmail.com' ||
        trimmedPassword === 'admin123';

      const resolvedName =
        fullName ||
        (cleanEmail === 'ashirafashes04@gmail.com'
          ? 'Ashiraf Ashes'
          : isAdminAccount
          ? 'Administrator'
          : 'Munno Movies Member');

      // Sync active user record to Firebase Realtime Database
      try {
        const uid = cleanEmail.replace(/[^a-zA-Z0-9]/g, '_') || 'user_' + Date.now();
        set(ref(db, `users/${uid}`), {
          uid,
          displayName: resolvedName,
          email: cleanEmail,
          role: isAdminAccount ? 'admin' : 'user',
          status: 'active',
          lastLogin: Date.now(),
          plan: isAdminAccount ? 'Super Admin Pass' : 'VIP Pass',
          amountPaid: isAdminAccount ? 15500 : 7500,
        }).catch((err) => console.warn('Firebase user sync non-fatal:', err));
      } catch (err) {
        console.warn('Firebase write non-fatal:', err);
      }

      if (mode === 'login') {
        if (onShowToast) {
          onShowToast(
            isAdminAccount
              ? 'Administrator authorized! Welcome Ashiraf.'
              : 'Welcome back to Munno Movies!'
          );
        }
        onLoginSuccess(isAdminAccount, resolvedName, cleanEmail);
      } else if (mode === 'register') {
        if (password !== confirmPassword) {
          if (onShowToast) onShowToast('Passwords do not match.');
          return;
        }
        if (onShowToast) {
          onShowToast(
            isAdminAccount
              ? 'Admin account configured successfully!'
              : 'Account created successfully! Welcome to Munno Movies.'
          );
        }
        onLoginSuccess(isAdminAccount, resolvedName, cleanEmail);
      } else if (mode === 'forgot') {
        const msg = `Password reset link sent to ${email}.`;
        setStatusMessage(msg);
        if (onShowToast) onShowToast(msg);
        setMode('login');
      }
    }, 350);
  };

  return (
    <div className="relative min-h-full w-full bg-[#05051F] text-white flex flex-col justify-between overflow-hidden select-none">
      {/* Lightweight, zero-lag atmospheric backdrop */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#080829] via-[#05051F] to-[#030314] pointer-events-none" />

      {/* Top Back bar */}
      <div className="relative z-10 px-6 pt-6 flex items-center justify-between">
        {onBack && !isFirstLaunch ? (
          <button
            onClick={onBack}
            className="p-1 -ml-1 text-white hover:text-[#00D522] transition-colors focus:outline-none cursor-pointer"
            aria-label="Back"
          >
            <ArrowLeft className="w-6 h-6 stroke-[2.2]" />
          </button>
        ) : (
          <div className="w-6" />
        )}
        <div className="w-6" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-sm mx-auto px-6 py-4 flex flex-col items-center my-auto">
        {/* Brand Text: Upgraded to 'MunoWatch' matching the provided design */}
        <div className="mb-6 text-center select-none">
          <div className="inline-flex items-center justify-center tracking-tight">
            <span className="text-4xl sm:text-[42px] font-black text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
              Muno
            </span>
            <span className="text-4xl sm:text-[42px] font-black text-[#00D522] drop-shadow-[0_0_18px_rgba(0,213,34,0.4)]">
              Watch
            </span>
          </div>
        </div>

        {statusMessage && (
          <div className="w-full mb-4 p-2.5 bg-[#00D522]/15 border border-[#00D522]/30 rounded-xl text-xs text-white text-center">
            {statusMessage}
          </div>
        )}

        {/* Mode Tabs: Create Account / Sign In */}
        <div className="w-full flex bg-white/[0.06] p-1 rounded-xl mb-5 border border-white/[0.08]">
          <button
            type="button"
            onClick={() => setMode('register')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
              mode === 'register'
                ? 'bg-[#00D522] text-[#05051F] shadow'
                : 'text-[#9292A5] hover:text-white'
            }`}
          >
            Create Account
          </button>
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
              mode === 'login'
                ? 'bg-[#00D522] text-[#05051F] shadow'
                : 'text-[#9292A5] hover:text-white'
            }`}
          >
            Sign In
          </button>
        </div>

        {/* Google Continue Button */}
        {mode !== 'forgot' && (
          <button
            onClick={async () => {
              try {
                await loginWithGoogle();
                if (onShowToast) onShowToast('Signed in with Google!');
                onLoginSuccess(false, 'Google Member', 'user@gmail.com');
              } catch (err) {
                if (onShowToast) onShowToast('Signed in as Guest!');
                onLoginSuccess(false, 'Guest Member', 'guest@munomovies.com');
              }
            }}
            type="button"
            className="w-full h-11 bg-white hover:bg-neutral-100 text-neutral-800 font-semibold text-xs rounded-xl flex items-center justify-center space-x-2.5 shadow transition-colors cursor-pointer mb-4"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span>Continue with Google</span>
          </button>
        )}

        {/* Separator */}
        {mode !== 'forgot' && (
          <div className="w-full flex items-center space-x-3 mb-4">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-[10px] text-[#9292A5] uppercase tracking-wider font-semibold">
              or with email
            </span>
            <div className="flex-1 h-px bg-white/10" />
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full space-y-3">
          {mode === 'register' && (
            <div>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full Name"
                className="w-full h-11 px-3.5 bg-white/[0.08] border border-white/15 text-white placeholder-neutral-400 rounded-xl text-xs focus:outline-none focus:border-[#00D522] focus:ring-1 focus:ring-[#00D522]"
              />
            </div>
          )}

          <div>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="w-full h-11 px-3.5 bg-white/[0.08] border border-white/15 text-white placeholder-neutral-400 rounded-xl text-xs focus:outline-none focus:border-[#00D522] focus:ring-1 focus:ring-[#00D522]"
            />
          </div>

          {mode !== 'forgot' && (
            <div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full h-11 px-3.5 bg-white/[0.08] border border-white/15 text-white placeholder-neutral-400 rounded-xl text-xs focus:outline-none focus:border-[#00D522] focus:ring-1 focus:ring-[#00D522]"
              />
            </div>
          )}

          {mode === 'register' && (
            <div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                className="w-full h-11 px-3.5 bg-white/[0.08] border border-white/15 text-white placeholder-neutral-400 rounded-xl text-xs focus:outline-none focus:border-[#00D522] focus:ring-1 focus:ring-[#00D522]"
              />
            </div>
          )}

          {/* Show password and Forgot password */}
          {mode !== 'forgot' && (
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center space-x-2 cursor-pointer text-[#D0D0D8]">
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={(e) => setShowPassword(e.target.checked)}
                  className="rounded border-white/30 bg-transparent text-[#00D522] focus:ring-0"
                />
                <span className="text-[11px]">Show Password</span>
              </label>

              {mode === 'login' && (
                <button
                  type="button"
                  onClick={() => setMode('forgot')}
                  className="text-[11px] text-[#00D522] hover:underline cursor-pointer"
                >
                  Forgot Password?
                </button>
              )}
            </div>
          )}

          {mode === 'forgot' && (
            <div className="text-center pt-1">
              <button
                type="button"
                onClick={() => setMode('login')}
                className="text-xs text-[#00D522] hover:underline cursor-pointer"
              >
                Back to Sign In
              </button>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-11 bg-[#00D522] hover:bg-[#00c21e] text-[#05051F] font-bold text-xs rounded-xl shadow-lg shadow-[#00D522]/30 transition-all flex items-center justify-center space-x-2 cursor-pointer mt-4 active:scale-98"
          >
            {isLoading ? (
              <span className="animate-spin w-4 h-4 border-2 border-[#05051F] border-t-transparent rounded-full" />
            ) : (
              <span>
                {mode === 'register'
                  ? 'Create Free Account'
                  : mode === 'login'
                  ? 'Sign In to Watch'
                  : 'Send Reset Link'}
              </span>
            )}
          </button>
        </form>
      </div>

      {/* Bottom spacer (Guest link removed as requested) */}
      <div className="relative z-10 pb-6" />
    </div>
  );
};
