import { MapPin } from 'lucide-react';
import { Screen } from '../../types';

interface AuthScreenProps {
  onNavigate: (screen: Screen) => void;
  onLogin: () => void;
}

export default function AuthScreen({ onNavigate, onLogin }: AuthScreenProps) {
  const handleLogin = () => {
    onLogin();
    onNavigate('onboarding');
  };

  return (
    <div className="min-h-screen bg-[#f9f8f6] flex flex-col items-center justify-center px-5 py-12">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-12">
          <div className="w-16 h-16 bg-gray-900 rounded-2xl flex items-center justify-center mb-4 shadow-sm">
            <MapPin size={26} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">NowBuddy</h1>
          <p className="text-gray-500 text-sm mt-1.5">Real plans with real people</p>
        </div>

        {/* Auth buttons */}
        <div className="space-y-3">
          <button
            onClick={handleLogin}
            className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 rounded-2xl px-5 py-4 text-sm font-semibold text-gray-800 hover:border-gray-300 hover:shadow-sm transition-all active:scale-[0.98]"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
              <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
              <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
              <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          <button
            onClick={handleLogin}
            className="w-full flex items-center justify-center gap-3 bg-gray-900 rounded-2xl px-5 py-4 text-sm font-semibold text-white hover:bg-gray-800 transition-all active:scale-[0.98]"
          >
            <svg width="17" height="20" viewBox="0 0 17 20" fill="white">
              <path d="M13.834 10.422c-.02-2.12 1.729-3.143 1.808-3.192-0.987-1.444-2.52-1.641-3.062-1.661-1.302-.133-2.55.775-3.213.775-.662 0-1.679-.757-2.765-.736-1.417.022-2.73.829-3.458 2.098-1.485 2.567-.378 6.36 1.065 8.442.706 1.02 1.546 2.16 2.644 2.12 1.064-.044 1.464-.681 2.75-.681 1.286 0 1.645.681 2.77.659 1.144-.021 1.865-1.035 2.566-2.058.811-1.174 1.143-2.313 1.161-2.373-.026-.01-2.224-.852-2.247-3.393zM11.573 3.782c.585-.708.982-1.69.874-2.67-.843.034-1.869.562-2.472 1.27-.543.627-1.016 1.632-.889 2.594.939.072 1.902-.476 2.487-1.194z"/>
            </svg>
            Continue with Apple
          </button>
        </div>

        <p className="text-xs text-gray-400 text-center mt-8 leading-relaxed">
          By continuing, you agree to our{' '}
          <span className="text-gray-600 underline underline-offset-2 cursor-pointer">Terms</span>{' '}
          and{' '}
          <span className="text-gray-600 underline underline-offset-2 cursor-pointer">Privacy Policy</span>.
        </p>

        <div className="mt-8 text-center">
          <button
            onClick={() => onNavigate('landing')}
            className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
          >
            Back to website
          </button>
        </div>
      </div>
    </div>
  );
}
