import { Plus, ArrowRight } from 'lucide-react';
import { Plan } from '../../data/mockData';
import { Screen } from '../../types';
import PlanCard from './PlanCard';

interface HomeScreenProps {
  plans: Plan[];
  currentUser: { name: string; age: number; vibes: string[] } | null;
  onNavigate: (screen: Screen) => void;
  onSelectPlan: (planId: string) => void;
  onJoinPlan: (planId: string) => void;
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

export default function HomeScreen({ plans, currentUser, onNavigate, onSelectPlan, onJoinPlan }: HomeScreenProps) {
  const firstName = currentUser?.name?.split(' ')[0] ?? 'there';

  return (
    <div className="min-h-screen bg-[#f9f8f6] pt-16 pb-24 md:pt-20 md:pb-10">
      <div className="max-w-5xl mx-auto px-5">

        {/* Hero action section */}
        <div className="py-8 md:py-10">
          <p className="text-sm text-gray-400 font-medium mb-1">{getGreeting()}, {firstName}</p>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight leading-snug mb-6">
            What do you want to do today?
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Create plan CTA */}
            <button
              onClick={() => onNavigate('create-plan')}
              className="group relative bg-gray-900 text-white rounded-2xl p-5 text-left hover:bg-gray-800 transition-all active:scale-[0.98]"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center">
                  <Plus size={18} className="text-white" />
                </div>
                <ArrowRight size={16} className="text-white/40 group-hover:text-white/80 group-hover:translate-x-0.5 transition-all" />
              </div>
              <p className="font-semibold text-base">Create a plan</p>
              <p className="text-sm text-white/50 mt-0.5">Pick an activity, time, and spot</p>
            </button>

            {/* Browse plans CTA */}
            <button
              onClick={() => window.scrollTo({ top: 400, behavior: 'smooth' })}
              className="group relative bg-white text-gray-900 rounded-2xl p-5 text-left border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all active:scale-[0.98]"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 bg-indigo-50 rounded-xl flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600">
                    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                  </svg>
                </div>
                <ArrowRight size={16} className="text-gray-300 group-hover:text-gray-500 group-hover:translate-x-0.5 transition-all" />
              </div>
              <p className="font-semibold text-base">Join a plan</p>
              <p className="text-sm text-gray-400 mt-0.5">{plans.length} plans near you right now</p>
            </button>
          </div>
        </div>

        {/* Divider + section label */}
        <div className="flex items-center gap-3 mb-5">
          <h2 className="text-sm font-semibold text-gray-900 shrink-0">Plans near you</h2>
          <div className="flex-1 h-px bg-gray-100" />
          <span className="text-xs text-gray-400 shrink-0">{plans.length} available</span>
        </div>

        {/* Plan grid */}
        {plans.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {plans.map(plan => (
              <PlanCard
                key={plan.id}
                plan={plan}
                onViewDetails={(id) => onSelectPlan(id)}
                onJoin={(id) => onJoinPlan(id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-400 text-sm mb-4">No plans yet in your area.</p>
            <button
              onClick={() => onNavigate('create-plan')}
              className="bg-indigo-600 text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-indigo-700 transition-colors"
            >
              Be the first to create one
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
