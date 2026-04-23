import { useState } from 'react';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { Screen } from '../../types';
import { Plan, SAMPLE_USERS, ACTIVITIES } from '../../data/mockData';

interface CreatePlanScreenProps {
  onNavigate: (screen: Screen) => void;
  onPlanCreated: (plan: Plan) => void;
  currentUser: { name: string; age: number; vibes: string[] } | null;
}

export default function CreatePlanScreen({ onNavigate, onPlanCreated, currentUser }: CreatePlanScreenProps) {
  const [activity, setActivity] = useState('');
  const [customActivity, setCustomActivity] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const finalActivity = activity === 'custom' ? customActivity : activity;
  const isValid = finalActivity.trim() && time.trim() && location.trim();

  const handleSubmit = () => {
    if (!isValid) return;

    const newPlan: Plan = {
      id: `p-${Date.now()}`,
      title: finalActivity,
      time,
      location,
      description: description || 'Come join me for a simple, low-key meetup.',
      host: {
        id: 'me',
        name: currentUser?.name ?? 'You',
        age: currentUser?.age ?? 25,
        reliability: 5.0,
        vibes: currentUser?.vibes ?? [],
        plansJoined: 0,
        plansCreated: 1,
        feedback: [],
        bio: description || undefined,
        trustSignals: ['New to NowBuddy'],
      },
      vibes: currentUser?.vibes?.slice(0, 2) ?? [],
      spotsLeft: 1,
      totalSpots: 1,
      status: 'today',
      joined: 0,
    };

    onPlanCreated(newPlan);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#f9f8f6] flex flex-col items-center justify-center px-5 py-12">
        <div className="w-full max-w-sm text-center">
          <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={32} className="text-emerald-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Plan created!</h1>
          <p className="text-gray-500 text-sm mb-8">
            Your plan is now live. Others can find it and request to join.
          </p>
          <button
            onClick={() => onNavigate('home')}
            className="w-full bg-indigo-600 text-white font-semibold py-4 rounded-2xl hover:bg-indigo-700 transition-all"
          >
            View in feed
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9f8f6] pt-16 pb-24 md:pt-20">
      <div className="max-w-xl mx-auto px-5 py-6">
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 mb-6 transition-colors md:hidden"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <h1 className="text-2xl font-bold text-gray-900 mb-1 tracking-tight">Create a plan</h1>
        <p className="text-gray-500 text-sm mb-8">Keep it simple. Others will find you.</p>

        <div className="space-y-5">
          {/* Activity */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Activity</label>
            <div className="flex flex-wrap gap-2 mb-3">
              {ACTIVITIES.slice(0, 6).map(act => (
                <button
                  key={act}
                  onClick={() => setActivity(act)}
                  className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all border ${
                    activity === act
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-indigo-300'
                  }`}
                >
                  {act}
                </button>
              ))}
              <button
                onClick={() => setActivity('custom')}
                className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all border ${
                  activity === 'custom'
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-indigo-300'
                }`}
              >
                Other
              </button>
            </div>
            {activity === 'custom' && (
              <input
                type="text"
                value={customActivity}
                onChange={e => setCustomActivity(e.target.value)}
                placeholder="e.g. Visit a bookstore"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white placeholder-gray-400"
              />
            )}
          </div>

          {/* Time */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">When</label>
            <input
              type="text"
              value={time}
              onChange={e => setTime(e.target.value)}
              placeholder="e.g. Today, 3:00 PM"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white placeholder-gray-400"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Where</label>
            <input
              type="text"
              value={location}
              onChange={e => setLocation(e.target.value)}
              placeholder="e.g. Blue Bottle Coffee, SoHo"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white placeholder-gray-400"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Short note <span className="text-gray-400 font-normal">(optional)</span></label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="e.g. Just looking for a coffee and easy chat. No agenda."
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white placeholder-gray-400 resize-none"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={!isValid}
            className="w-full bg-indigo-600 text-white font-semibold py-4 rounded-2xl hover:bg-indigo-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98]"
          >
            Post plan
          </button>
        </div>
      </div>
    </div>
  );
}
