import { Menu, X, MapPin } from 'lucide-react';
import { useState } from 'react';
import { Screen } from '../../types';

interface PublicNavProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

export default function PublicNav({ currentScreen, onNavigate }: PublicNavProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks: { label: string; screen: Screen }[] = [
    { label: 'Home', screen: 'landing' },
    { label: 'How it works', screen: 'how-it-works' },
    { label: 'Safety', screen: 'safety' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        <button
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-2 font-bold text-xl text-indigo-600 tracking-tight"
        >
          <span className="w-8 h-8 bg-indigo-50 rounded-full flex items-center justify-center">
            <MapPin size={16} className="text-indigo-600" />
          </span>
          NowBuddy
        </button>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(({ label, screen }) => (
            <button
              key={screen}
              onClick={() => onNavigate(screen)}
              className={`text-sm font-medium transition-colors ${
                currentScreen === screen
                  ? 'text-indigo-600'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {label}
            </button>
          ))}
          <button
            onClick={() => onNavigate('auth')}
            className="bg-indigo-600 text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-indigo-700 transition-colors"
          >
            Open App
          </button>
        </div>

        <button
          className="md:hidden p-2 text-gray-600"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 px-5 py-4 flex flex-col gap-4">
          {navLinks.map(({ label, screen }) => (
            <button
              key={screen}
              onClick={() => { onNavigate(screen); setMenuOpen(false); }}
              className={`text-sm font-medium text-left transition-colors ${
                currentScreen === screen ? 'text-indigo-600' : 'text-gray-600'
              }`}
            >
              {label}
            </button>
          ))}
          <button
            onClick={() => { onNavigate('auth'); setMenuOpen(false); }}
            className="bg-indigo-600 text-white text-sm font-semibold px-5 py-2.5 rounded-full w-full hover:bg-indigo-700 transition-colors"
          >
            Open App
          </button>
        </div>
      )}
    </nav>
  );
}
