import { Coffee, Footprints, UtensilsCrossed, Star, UserCheck, CalendarCheck, MessageSquareOff, Heart } from 'lucide-react';
import { Screen } from '../../types';

interface HowItWorksPageProps {
  onNavigate: (screen: Screen) => void;
}

export default function HowItWorksPage({ onNavigate }: HowItWorksPageProps) {
  return (
    <div className="bg-[#f9f8f6] min-h-screen">
      <div className="pt-28 pb-20 px-5">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-3 text-center">How it works</p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-5 tracking-tight">
            Simple, by design.
          </h1>
          <p className="text-lg text-gray-500 text-center mb-16 leading-relaxed">
            NowBuddy is built to be the lowest-friction way to make a simple plan with someone nearby.
          </p>

          {/* Steps */}
          <div className="space-y-6 mb-20">
            {[
              {
                step: '01',
                icon: <Coffee size={24} />,
                title: 'Create a simple plan',
                desc: 'Decide what you want to do — grab coffee, go for a walk, have dinner. Pick a time and a spot. Write one short sentence about yourself. That\'s your plan.',
              },
              {
                step: '02',
                icon: <UserCheck size={24} />,
                title: 'Browse nearby plans',
                desc: 'You can also browse plans that others have created. You\'ll see their name, age, reliability score, and vibe tags. No photos. No profiles. Just enough to know it\'s a good fit.',
              },
              {
                step: '03',
                icon: <Footprints size={24} />,
                title: 'Request to join',
                desc: 'Found a plan that sounds good? Request to join with one tap. The host confirms, and you both get the plan details.',
              },
              {
                step: '04',
                icon: <UtensilsCrossed size={24} />,
                title: 'Go do the thing',
                desc: 'Show up, do the activity, enjoy the company. That\'s it. No pressure to keep chatting after. No awkward follow-ups.',
              },
              {
                step: '05',
                icon: <Star size={24} />,
                title: 'Leave a short rating',
                desc: 'After the meetup, answer two questions. Did it happen? Would you meet again? This keeps the community reliable and trustworthy.',
              },
            ].map(item => (
              <div key={item.step} className="bg-white rounded-2xl p-6 border border-gray-100 flex gap-5 items-start">
                <div className="w-11 h-11 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 shrink-0">
                  {item.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-indigo-400 tracking-widest">{item.step}</span>
                    <h3 className="font-semibold text-gray-900">{item.title}</h3>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* What NowBuddy is not */}
          <div className="bg-gray-900 rounded-3xl p-8 mb-12">
            <h2 className="text-xl font-bold text-white mb-6">What NowBuddy is not</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: <MessageSquareOff size={18} />, title: 'Not a chat app', desc: 'No endless messaging before you meet' },
                { icon: <Heart size={18} />, title: 'Not a dating app', desc: 'No romantic intent, no swiping' },
                { icon: <CalendarCheck size={18} />, title: 'Not a scheduling tool', desc: 'Plans are spontaneous and today-focused' },
                { icon: <UserCheck size={18} />, title: 'Not a network', desc: 'No follower counts, no social feed' },
              ].map(item => (
                <div key={item.title} className="flex gap-3 items-start p-4 bg-white/10 rounded-xl">
                  <div className="text-indigo-400 shrink-0 mt-0.5">{item.icon}</div>
                  <div>
                    <p className="text-white font-medium text-sm">{item.title}</p>
                    <p className="text-white/60 text-xs mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => onNavigate('auth')}
              className="bg-indigo-600 text-white font-semibold px-8 py-3.5 rounded-full hover:bg-indigo-700 transition-all hover:shadow-lg hover:shadow-indigo-200 active:scale-95"
            >
              Open the app
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
