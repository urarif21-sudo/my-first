import { ArrowLeft, MapPin, Clock, Star, CheckCircle, Users } from 'lucide-react';
import { Plan } from '../../data/mockData';
import { Screen } from '../../types';

interface PlanDetailsScreenProps {
  plan: Plan;
  onNavigate: (screen: Screen) => void;
  onJoin: () => void;
}

function ReliabilityBar({ score }: { score: number }) {
  const pct = (score / 5) * 100;
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-amber-400 rounded-full transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-sm font-semibold text-gray-800 tabular-nums">{score}</span>
      <span className="text-xs text-gray-400">/ 5</span>
    </div>
  );
}

export default function PlanDetailsScreen({ plan, onNavigate, onJoin }: PlanDetailsScreenProps) {
  const totalPlans = plan.host.plansJoined + plan.host.plansCreated;

  return (
    <div className="min-h-screen bg-[#f9f8f6] pt-16 pb-24 md:pt-20">
      <div className="max-w-xl mx-auto px-5 py-6">
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 mb-6 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to plans
        </button>

        {/* Plan header */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-4">
          <div className="flex items-start justify-between mb-4">
            <h1 className="text-xl font-bold text-gray-900">{plan.title}</h1>
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full shrink-0 ml-3 ${
              plan.status === 'today' ? 'bg-emerald-50 text-emerald-700' :
              plan.status === 'filling' ? 'bg-amber-50 text-amber-700' :
              'bg-sky-50 text-sky-700'
            }`}>
              {plan.status === 'today' ? 'Today' : plan.status === 'filling' ? 'Filling up' : 'Upcoming'}
            </span>
          </div>
          <div className="flex flex-col gap-2 mb-4">
            <div className="flex items-center gap-2.5 text-gray-600">
              <Clock size={15} className="text-indigo-400 shrink-0" />
              <span className="text-sm">{plan.time}</span>
            </div>
            <div className="flex items-center gap-2.5 text-gray-600">
              <MapPin size={15} className="text-indigo-400 shrink-0" />
              <span className="text-sm">{plan.location}</span>
            </div>
          </div>
          <p className="text-sm text-gray-500 leading-relaxed">{plan.description}</p>
        </div>

        {/* Host trust card */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-4">
          {/* Header row */}
          <div className="flex items-center gap-3 mb-5">
            <div className="w-11 h-11 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-700 text-lg font-bold shrink-0">
              {plan.host.name[0]}
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900">{plan.host.name}, {plan.host.age}</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Users size={11} className="text-gray-400" />
                <span className="text-xs text-gray-400">{totalPlans} meetups on NowBuddy</span>
              </div>
            </div>
          </div>

          {/* Reliability */}
          <div className="mb-4">
            <div className="flex items-center gap-1.5 mb-2">
              <Star size={12} className="text-amber-400 fill-amber-400" />
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Reliability</span>
            </div>
            <ReliabilityBar score={plan.host.reliability} />
          </div>

          {/* Vibe tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {plan.host.vibes.map(v => (
              <span key={v} className="text-xs bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full font-medium">{v}</span>
            ))}
          </div>

          {/* Bio */}
          {plan.host.bio && (
            <p className="text-sm text-gray-500 leading-relaxed mb-4 italic">"{plan.host.bio}"</p>
          )}

          {/* Trust signals */}
          {plan.host.trustSignals && plan.host.trustSignals.length > 0 && (
            <div className="border-t border-gray-50 pt-4 space-y-2">
              {plan.host.trustSignals.map(signal => (
                <div key={signal} className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle size={14} className="text-emerald-500 shrink-0" />
                  {signal}
                </div>
              ))}
            </div>
          )}

          {/* Community feedback snippet */}
          {plan.host.feedback && plan.host.feedback.length > 0 && (
            <div className="mt-4 bg-gray-50 rounded-xl px-4 py-3">
              <p className="text-xs text-gray-400 font-medium mb-1">What others say</p>
              <p className="text-sm text-gray-600 leading-relaxed">"{plan.host.feedback[0]}"</p>
            </div>
          )}
        </div>

        {/* Spots / social proof */}
        {plan.spotsLeft === 1 && (
          <div className="bg-rose-50 border border-rose-100 rounded-xl px-4 py-3 mb-4">
            <p className="text-sm text-rose-600 font-medium">Only 1 spot left</p>
          </div>
        )}
        {plan.joined > 0 && (
          <div className="bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 mb-4">
            <p className="text-sm text-amber-700">{plan.joined} {plan.joined === 1 ? 'person' : 'people'} already joined</p>
          </div>
        )}

        {/* CTA */}
        <button
          onClick={onJoin}
          className="w-full bg-indigo-600 text-white font-semibold py-4 rounded-2xl hover:bg-indigo-700 transition-all active:scale-[0.98] text-base"
        >
          Request to join
        </button>
        <p className="text-xs text-gray-400 text-center mt-3">
          The host will confirm your request before the plan is finalized.
        </p>
      </div>
    </div>
  );
}
