import { Home, PlusSquare, User, MapPin } from 'lucide-react';
import { Screen } from '../../types';

interface AppNavProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

export default function AppNav({ currentScreen, onNavigate }: AppNavProps) {
  return (
    <>
      {/* Desktop top nav */}
      <nav className="hidden md:flex fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 h-16 items-center px-6">
        <div className="max-w-5xl mx-auto w-full flex items-center justify-between">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 font-bold text-lg text-indigo-600 tracking-tight"
          >
            <span className="w-8 h-8 bg-indigo-50 rounded-full flex items-center justify-center">
              <MapPin size={16} className="text-indigo-600" />
            </span>
            NowBuddy
          </button>
          <span className="hidden sm:inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs font-semibold px-2.5 py-1 rounded-full">
            <MapPin size={10} />
            Mannheim
          </span>
          <div className="flex items-center gap-2">
            <NavButton active={currentScreen === 'home'} onClick={() => onNavigate('home')} label="Browse plans" />
            <NavButton active={currentScreen === 'create-plan'} onClick={() => onNavigate('create-plan')} label="Create plan" />
            <NavButton active={currentScreen === 'profile'} onClick={() => onNavigate('profile')} label="Profile" />
          </div>
        </div>
      </nav>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 h-14 flex items-center justify-between px-4">
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 font-bold text-base text-gray-900 tracking-tight"
        >
          <span className="w-7 h-7 bg-emerald-50 rounded-full flex items-center justify-center">
            <MapPin size={14} className="text-emerald-600" />
          </span>
          NowBuddy
        </button>
        <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs font-semibold px-2.5 py-1 rounded-full">
          <MapPin size={10} />
          Mannheim
        </span>
      </div>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 h-16 flex items-center justify-around px-4 safe-area-inset-bottom">
        <MobileNavButton
          icon={<Home size={22} />}
          label="Home"
          active={currentScreen === 'home'}
          onClick={() => onNavigate('home')}
        />
        <MobileNavButton
          icon={<PlusSquare size={22} />}
          label="Create"
          active={currentScreen === 'create-plan'}
          onClick={() => onNavigate('create-plan')}
        />
        <MobileNavButton
          icon={<User size={22} />}
          label="Profile"
          active={currentScreen === 'profile'}
          onClick={() => onNavigate('profile')}
        />
      </nav>
    </>
  );
}

function NavButton({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
        active
          ? 'bg-indigo-600 text-white'
          : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
      }`}
    >
      {label}
    </button>
  );
}

function MobileNavButton({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1 px-5 py-1 transition-colors ${
        active ? 'text-indigo-600' : 'text-gray-400'
      }`}
    >
      {icon}
      <span className="text-[10px] font-medium">{label}</span>
    </button>
  );
}
