import { Clock, CheckCircle } from 'lucide-react';
import { Plan } from '../../data/mockData';
import { Screen } from '../../types';

interface RequestSentScreenProps {
  plan: Plan;
  onNavigate: (screen: Screen) => void;
  onSimulateAccept: () => void;
}

export default function RequestSentScreen({ plan, onNavigate, onSimulateAccept }: RequestSentScreenProps) {
  return (
    <div className="min-h-screen bg-[#f9f8f6] flex flex-col items-center justify-center px-5 py-12">
      <div className="w-full max-w-sm text-center">
        {/* Icon */}
        <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <Clock size={32} className="text-indigo-600" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2 tracking-tight">Request sent!</h1>
        <p className="text-gray-500 text-sm leading-relaxed mb-8">
          Your request to join <span className="font-semibold text-gray-700">"{plan.title}"</span> with <span className="font-semibold text-gray-700">{plan.host.name}</span> is waiting for confirmation.
        </p>

        {/* Plan summary */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 text-left mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-700 font-bold">
              {plan.host.name[0]}
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm">{plan.host.name}, {plan.host.age}</p>
              <p className="text-xs text-gray-500">{plan.title}</p>
            </div>
          </div>
          <div className="text-sm text-gray-500 space-y-1">
            <p>{plan.time}</p>
            <p>{plan.location}</p>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={onSimulateAccept}
            className="w-full bg-indigo-600 text-white font-semibold py-4 rounded-2xl hover:bg-indigo-700 transition-all active:scale-[0.98]"
          >
            Simulate: host accepts
          </button>
          <button
            onClick={() => onNavigate('home')}
            className="w-full bg-gray-50 text-gray-600 font-medium py-3.5 rounded-2xl hover:bg-gray-100 transition-colors"
          >
            Back to feed
          </button>
        </div>
      </div>
    </div>
  );
}
