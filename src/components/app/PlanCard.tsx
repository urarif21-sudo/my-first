import { Star, MapPin, Clock, ArrowRight } from 'lucide-react';
import { Plan } from '../../data/mockData';

interface PlanCardProps {
  plan: Plan;
  onViewDetails: (planId: string) => void;
  onJoin: (planId: string) => void;
}

const statusConfig = {
  today: { label: 'Happening today', className: 'bg-emerald-50 text-emerald-700' },
  filling: { label: '2 people joined', className: 'bg-amber-50 text-amber-700' },
  upcoming: { label: 'Upcoming', className: 'bg-sky-50 text-sky-700' },
};

function ReliabilityDots({ score }: { score: number }) {
  const filled = Math.round(score);
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <div
          key={i}
          className={`w-1.5 h-1.5 rounded-full ${i <= filled ? 'bg-amber-400' : 'bg-gray-200'}`}
        />
      ))}
    </div>
  );
}

export default function PlanCard({ plan, onViewDetails, onJoin }: PlanCardProps) {
  const status = statusConfig[plan.status];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md hover:border-gray-200 transition-all group">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0 pr-3">
          <h3 className="font-semibold text-gray-900 text-base leading-tight">{plan.title}</h3>
        </div>
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full shrink-0 ${status.className}`}>
          {status.label}
        </span>
      </div>

      <div className="flex flex-col gap-1.5 mb-4">
        <div className="flex items-center gap-2 text-gray-500">
          <Clock size={13} className="shrink-0" />
          <span className="text-sm">{plan.time}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-500">
          <MapPin size={13} className="shrink-0" />
          <span className="text-sm truncate">{plan.location}</span>
        </div>
      </div>

      {/* Host trust row */}
      <div className="flex items-center gap-2.5 mb-3 py-2.5 px-3 bg-gray-50 rounded-xl">
        <div className="w-7 h-7 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 text-xs font-bold shrink-0">
          {plan.host.name[0]}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-semibold text-gray-800">{plan.host.name}, {plan.host.age}</span>
            {plan.spotsLeft === 1 && (
              <span className="text-xs text-rose-500 font-medium ml-auto shrink-0">1 spot left</span>
            )}
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <ReliabilityDots score={plan.host.reliability} />
            <span className="text-xs text-gray-400">{plan.host.reliability} reliability</span>
          </div>
        </div>
      </div>

      {/* Vibe tags */}
      <div className="flex gap-1.5 mb-4 flex-wrap">
        {plan.vibes.map(v => (
          <span key={v} className="text-xs bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full font-medium">{v}</span>
        ))}
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onViewDetails(plan.id)}
          className="flex-1 py-2.5 rounded-xl text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 transition-colors"
        >
          Details
        </button>
        <button
          onClick={() => onJoin(plan.id)}
          className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors flex items-center justify-center gap-1.5"
        >
          Join <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}
