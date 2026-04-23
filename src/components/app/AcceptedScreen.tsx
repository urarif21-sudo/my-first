import { MapPin, Clock, ArrowRight } from 'lucide-react';
import { Plan } from '../../data/mockData';
import { Screen } from '../../types';

interface AcceptedScreenProps {
  plan: Plan;
  onNavigate: (screen: Screen) => void;
  onGoToMeetup: () => void;
}

export default function AcceptedScreen({ plan, onGoToMeetup, onNavigate }: AcceptedScreenProps) {
  return (
    <div className="min-h-screen bg-[#f9f8f6] flex flex-col items-center justify-center px-5 py-12">
      <div className="w-full max-w-sm text-center">
        <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl select-none">
          🎉
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2 tracking-tight">You're in!</h1>
        <p className="text-gray-500 text-sm leading-relaxed mb-8">
          <span className="font-semibold text-gray-700">{plan.host.name}</span> confirmed your request.
        </p>

        <div className="bg-white rounded-2xl border border-gray-100 p-5 text-left mb-8 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center shrink-0">
              <Clock size={14} className="text-indigo-600" />
            </div>
            <span className="text-sm font-medium text-gray-800">{plan.time}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center shrink-0">
              <MapPin size={14} className="text-indigo-600" />
            </div>
            <span className="text-sm font-medium text-gray-800">{plan.location}</span>
          </div>
        </div>

        <button
          onClick={onGoToMeetup}
          className="w-full bg-gray-900 text-white font-semibold py-4 rounded-2xl hover:bg-gray-800 transition-all active:scale-[0.98] flex items-center justify-center gap-2 text-base mb-3"
        >
          Go to meetup details
          <ArrowRight size={16} />
        </button>

        <button
          onClick={() => onNavigate('home')}
          className="w-full bg-gray-50 text-gray-500 font-medium py-3.5 rounded-2xl hover:bg-gray-100 transition-colors text-sm"
        >
          Back to feed
        </button>
      </div>
    </div>
  );
}
