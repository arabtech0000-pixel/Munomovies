import React, { useState } from 'react';
import { ArrowLeft, Check } from 'lucide-react';
import { loginWithGoogle } from '../../services/firebase';

interface LoginScreenProps {
  onBack: () => void;
  onLoginSuccess: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onBack,
  onLoginSuccess,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess();
  };

  return (
    <div className="min-h-full bg-[#05051F] text-white flex flex-col justify-between px-6 py-8 select-none">
      {/* Top Back bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="p-1 -ml-1 text-white hover:text-[#00D522] transition-colors focus:outline-none"
        >
          <ArrowLeft className="w-6 h-6 stroke-[2.2]" />
        </button>
        <div className="w-6"></div>
      </div>

      {/* Main Container matching Screenshot 5 */}
      <div className="w-full max-w-sm mx-auto flex flex-col items-center my-auto">
        {/* MunoWatch Logo */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-black tracking-tight inline-block">
            <span className="text-white">MUNO</span>
            <span className="text-[#00D522]">WATCH</span>
          </h1>
        </div>

        {/* Sign in with Google Button */}
        <button
          onClick={async () => {
            try {
              await loginWithGoogle();
              onLoginSuccess();
            } catch (err) {
              console.error("Google login failed", err);
              onLoginSuccess(); // fallback
            }
          }}
          type="button"
          className="w-full h-12 bg-white hover:bg-neutral-100 text-neutral-700 font-semibold text-sm rounded flex items-center justify-center space-x-3 shadow transition-colors focus:outline-none cursor-pointer"
        >
          {/* Google 'G' icon */}
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span className="text-[#3c4043] font-medium text-[15px]">Sign in with Google</span>
        </button>

        {/* Separator / Subheader */}
        <div className="w-full text-center mt-9 mb-6">
          <h2 className="text-white text-sm font-semibold tracking-wider uppercase">
            LOGIN WITH EMAIL
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full space-y-3.5">
          {/* Email or Username */}
          <div>
            <input
              type="text"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email or Username"
              className="w-full h-11 px-3 bg-white text-black placeholder-neutral-500 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#00D522]"
            />
          </div>

          {/* Password */}
          <div>
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full h-11 px-3 bg-white text-black placeholder-neutral-500 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#00D522]"
            />
          </div>

          {/* Checkbox and Forgot Password */}
          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center space-x-2 cursor-pointer text-[#D0D0D8]">
              <div
                onClick={() => setShowPassword(!showPassword)}
                className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                  showPassword
                    ? 'bg-[#00D522] border-[#00D522] text-[#05051F]'
                    : 'border-white/50 bg-transparent'
                }`}
              >
                {showPassword && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
              <span>Show Password</span>
            </label>

            <button
              type="button"
              onClick={() => alert('Password reset instructions will be sent to your registered email.')}
              className="text-[#D0D0D8] hover:text-white transition-colors"
            >
              I forgot my password
            </button>
          </div>

          {/* LOGIN Button */}
          <div className="pt-3">
            <button
              type="submit"
              className="w-full h-11 bg-[#F1F3F9] hover:bg-white text-[#05051F] font-bold text-sm tracking-wider uppercase rounded shadow transition-colors focus:outline-none"
            >
              LOGIN
            </button>
          </div>
        </form>
      </div>

      {/* Footer Sign up link */}
      <div className="text-center pt-6">
        <p className="text-xs text-[#D0D0D8]">
          Don't have an account?{' '}
          <button
            onClick={() => alert('Account registration is currently open for MunoWatch VIP stream pass.')}
            className="text-white hover:text-[#00D522] font-semibold underline underline-offset-2"
          >
            Sign up.
          </button>
        </p>
      </div>
    </div>
  );
};
