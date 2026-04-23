import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { Plan } from '../../data/mockData';
import { Screen } from '../../types';

interface ReviewScreenProps {
  plan: Plan;
  onNavigate: (screen: Screen) => void;
}

export default function ReviewScreen({ plan, onNavigate }: ReviewScreenProps) {
  const [happened, setHappened] = useState<boolean | null>(null);
  const [meetAgain, setMeetAgain] = useState<boolean | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (happened !== null) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#f9f8f6] flex flex-col items-center justify-center px-5 py-12">
        <div className="w-full max-w-sm text-center">
          <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={32} className="text-emerald-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Thanks for the feedback!</h1>
          <p className="text-gray-500 text-sm mb-8">
            Your rating helps keep NowBuddy trustworthy for everyone.
          </p>
          <button
            onClick={() => onNavigate('home')}
            className="w-full bg-indigo-600 text-white font-semibold py-4 rounded-2xl hover:bg-indigo-700 transition-all"
          >
            Back to feed
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9f8f6] flex flex-col items-center justify-center px-5 py-12">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 text-indigo-700 text-2xl font-bold">
            {plan.host.name[0]}
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">How was it?</h1>
          <p className="text-gray-500 text-sm">Quick feedback on your meetup with {plan.host.name}.</p>
        </div>

        {/* Q1 */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-4">
          <p className="font-semibold text-gray-900 mb-4">Did the meetup happen?</p>
          <div className="flex gap-3">
            <button
              onClick={() => setHappened(true)}
              className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all border ${
                happened === true
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-gray-50 text-gray-600 border-gray-100 hover:border-gray-200'
              }`}
            >
              Yes, it happened
            </button>
            <button
              onClick={() => setHappened(false)}
              className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all border ${
                happened === false
                  ? 'bg-rose-500 text-white border-rose-500'
                  : 'bg-gray-50 text-gray-600 border-gray-100 hover:border-gray-200'
              }`}
            >
              No, it didn't
            </button>
          </div>
        </div>

        {/* Q2 - only show if happened */}
        {happened === true && (
          <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-4">
            <p className="font-semibold text-gray-900 mb-4">Would you meet {plan.host.name} again?</p>
            <div className="flex gap-3">
              <button
                onClick={() => setMeetAgain(true)}
                className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all border ${
                  meetAgain === true
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-gray-50 text-gray-600 border-gray-100 hover:border-gray-200'
                }`}
              >
                Yes, definitely
              </button>
              <button
                onClick={() => setMeetAgain(false)}
                className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all border ${
                  meetAgain === false
                    ? 'bg-gray-700 text-white border-gray-700'
                    : 'bg-gray-50 text-gray-600 border-gray-100 hover:border-gray-200'
                }`}
              >
                Not really
              </button>
            </div>
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={happened === null}
          className="w-full bg-indigo-600 text-white font-semibold py-4 rounded-2xl hover:bg-indigo-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98]"
        >
          Submit feedback
        </button>
      </div>
    </div>
  );
}
