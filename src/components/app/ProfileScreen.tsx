import { Star, LogOut, ChevronRight } from 'lucide-react';
import { Screen } from '../../types';

interface ProfileScreenProps {
  currentUser: { name: string; age: number; vibes: string[] } | null;
  onNavigate: (screen: Screen) => void;
  onLogout: () => void;
}

export default function ProfileScreen({ currentUser, onNavigate, onLogout }: ProfileScreenProps) {
  const name = currentUser?.name ?? 'You';
  const age = currentUser?.age ?? 25;
  const vibes = currentUser?.vibes ?? [];

  const preferredAgeRange = [22, 35];

  return (
    <div className="min-h-screen bg-[#f9f8f6] pt-16 pb-24 md:pt-20">
      <div className="max-w-xl mx-auto px-5 py-6">
        {/* Profile header */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-5">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-700 text-2xl font-bold">
              {name[0]}
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{name}</h1>
              <p className="text-sm text-gray-500">Age {age}</p>
              <div className="flex items-center gap-1.5 mt-1">
                <Star size={13} className="text-amber-400 fill-amber-400" />
                <span className="text-sm text-gray-600 font-medium">5.0</span>
                <span className="text-xs text-gray-400">reliability</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="bg-white rounded-2xl border border-gray-100 p-5 text-center">
            <p className="text-2xl font-bold text-gray-900">0</p>
            <p className="text-xs text-gray-500 mt-1">Plans joined</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-5 text-center">
            <p className="text-2xl font-bold text-gray-900">0</p>
            <p className="text-xs text-gray-500 mt-1">Plans created</p>
          </div>
        </div>

        {/* Recent feedback */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Recent feedback</h2>
          <div className="text-center py-4">
            <p className="text-sm text-gray-400">No feedback yet.</p>
            <p className="text-xs text-gray-400 mt-1">Complete a meetup to get your first rating.</p>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Preferences</h2>
          <div className="space-y-4">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Preferred age range</p>
              <div className="flex items-center gap-2">
                <span className="bg-indigo-50 text-indigo-700 text-sm font-medium px-3 py-1.5 rounded-full">
                  {preferredAgeRange[0]} – {preferredAgeRange[1]}
                </span>
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Your vibes</p>
              {vibes.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {vibes.map(v => (
                    <span key={v} className="bg-indigo-50 text-indigo-700 text-sm font-medium px-3 py-1.5 rounded-full">
                      {v}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400">No vibes selected</p>
              )}
            </div>
          </div>
        </div>

        {/* Settings rows */}
        <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-50 mb-5">
          {[
            'Edit profile',
            'Notification settings',
            'Privacy & safety',
            'Help & support',
          ].map(item => (
            <button
              key={item}
              className="w-full flex items-center justify-between px-5 py-4 text-sm text-gray-700 hover:bg-gray-50 transition-colors first:rounded-t-2xl last:rounded-b-2xl"
            >
              {item}
              <ChevronRight size={16} className="text-gray-400" />
            </button>
          ))}
        </div>

        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 text-rose-500 text-sm font-semibold py-4 bg-white rounded-2xl border border-gray-100 hover:bg-rose-50 transition-colors"
        >
          <LogOut size={16} />
          Sign out
        </button>
      </div>
    </div>
  );
}
