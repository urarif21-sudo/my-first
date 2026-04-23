import { ArrowRight, Coffee, Footprints, UtensilsCrossed, Star, CheckCircle, MapPin, Search, Bell, ThumbsUp, UserPlus, CalendarPlus } from 'lucide-react';
import { Screen } from '../../types';
import { SAMPLE_PLANS } from '../../data/mockData';
import { useState } from 'react';

interface LandingPageProps {
  onNavigate: (screen: Screen) => void;
}

function PlanPreviewCard({ plan }: { plan: (typeof SAMPLE_PLANS)[0] }) {
  const statusLabels: Record<string, string> = {
    today: 'Happening today',
    filling: '2 people already joined',
    upcoming: 'Upcoming',
  };
  const statusColors: Record<string, string> = {
    today: 'bg-emerald-50 text-emerald-700',
    filling: 'bg-amber-50 text-amber-700',
    upcoming: 'bg-indigo-50 text-indigo-700',
  };

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 min-w-[280px]">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-gray-900">{plan.title}</h3>
          <p className="text-sm text-gray-500 mt-0.5">{plan.time}</p>
        </div>
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[plan.status]}`}>
          {statusLabels[plan.status]}
        </span>
      </div>
      <p className="text-sm text-gray-500 mb-3">{plan.location}</p>
      <div className="flex items-center gap-2 mb-3">
        <div className="w-7 h-7 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 text-xs font-semibold">
          {plan.host.name[0]}
        </div>
        <span className="text-sm text-gray-600">{plan.host.name}, {plan.host.age}</span>
        <span className="text-xs text-gray-400">·</span>
        <Star size={12} className="text-amber-400 fill-amber-400" />
        <span className="text-xs text-gray-500">{plan.host.reliability}</span>
      </div>
      <div className="flex gap-1.5">
        {plan.vibes.map(v => (
          <span key={v} className="text-xs bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full font-medium">{v}</span>
        ))}
      </div>
    </div>
  );
}

function PhoneMockCard({ plan, delay = 0 }: { plan: (typeof SAMPLE_PLANS)[0]; delay?: number }) {
  const statusColors: Record<string, string> = {
    today: 'bg-emerald-50 text-emerald-600',
    filling: 'bg-amber-50 text-amber-600',
    upcoming: 'bg-sky-50 text-sky-600',
  };
  const statusLabels: Record<string, string> = {
    today: 'Today',
    filling: 'Filling up',
    upcoming: 'Upcoming',
  };
  return (
    <div
      className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between mb-1.5">
        <div>
          <p className="text-[11px] font-semibold text-gray-900 leading-tight">{plan.title}</p>
          <p className="text-[10px] text-gray-400 mt-0.5">{plan.time}</p>
        </div>
        <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full ${statusColors[plan.status]}`}>
          {statusLabels[plan.status]}
        </span>
      </div>
      <p className="text-[10px] text-gray-400 mb-1.5 flex items-center gap-0.5">
        <MapPin size={8} className="shrink-0" />{plan.location.split(',')[0]}
      </p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-indigo-100 rounded-full flex items-center justify-center text-[7px] font-bold text-indigo-600">
            {plan.host.name[0]}
          </div>
          <span className="text-[9px] text-gray-500">{plan.host.name}, {plan.host.age}</span>
        </div>
        <div className="flex items-center gap-0.5">
          <Star size={8} className="text-amber-400 fill-amber-400" />
          <span className="text-[9px] text-gray-400">{plan.host.reliability}</span>
        </div>
      </div>
    </div>
  );
}

function PhoneMock() {
  return (
    <div className="relative flex justify-center items-start select-none">
      {/* Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-64 h-80 bg-indigo-200 rounded-full blur-3xl opacity-30" />
      </div>

      {/* Phone shell */}
      <div className="relative w-[260px] rounded-[40px] bg-gray-900 shadow-2xl shadow-gray-900/40 p-[3px]">
        {/* Frame inner */}
        <div className="rounded-[38px] bg-[#f9f8f6] overflow-hidden">
          {/* Status bar */}
          <div className="bg-white px-5 pt-3 pb-1 flex items-center justify-between">
            <span className="text-[9px] font-semibold text-gray-700">9:41</span>
            {/* Notch */}
            <div className="absolute top-[3px] left-1/2 -translate-x-1/2 w-20 h-[14px] bg-gray-900 rounded-b-xl" />
            <div className="flex items-center gap-1">
              <div className="flex gap-0.5 items-end h-2.5">
                {[2, 3, 4, 4].map((h, i) => (
                  <div key={i} className="w-0.5 bg-gray-700 rounded-sm" style={{ height: `${h * 2}px` }} />
                ))}
              </div>
              <div className="w-3.5 h-2 border border-gray-700 rounded-[2px] flex items-center justify-end pr-[1px]">
                <div className="w-1.5 h-1 bg-gray-700 rounded-[1px]" />
              </div>
            </div>
          </div>

          {/* App header */}
          <div className="bg-white px-4 pt-2 pb-3 border-b border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 bg-indigo-50 rounded-full flex items-center justify-center">
                  <MapPin size={9} className="text-indigo-600" />
                </div>
                <span className="text-[11px] font-bold text-gray-900">NowBuddy</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-6 h-6 bg-gray-50 rounded-full flex items-center justify-center">
                  <Bell size={10} className="text-gray-500" />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.5 bg-gray-50 rounded-lg px-2.5 py-1.5">
              <Search size={9} className="text-gray-400" />
              <span className="text-[9px] text-gray-400">Plans near Mannheim…</span>
            </div>
          </div>

          {/* Plan cards */}
          <div className="px-3 py-3 flex flex-col gap-2.5 bg-[#f9f8f6]">
            <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-widest px-0.5">4 plans near you</p>
            {SAMPLE_PLANS.map((plan, i) => (
              <PhoneMockCard key={plan.id} plan={plan} delay={i * 80} />
            ))}
          </div>

          {/* Bottom nav */}
          <div className="bg-white border-t border-gray-100 px-6 py-2 flex items-center justify-around">
            {['Home', 'Create', 'Profile'].map((label, i) => (
              <div key={label} className={`flex flex-col items-center gap-0.5 ${i === 0 ? 'text-indigo-600' : 'text-gray-300'}`}>
                <div className={`w-1 h-1 rounded-full ${i === 0 ? 'bg-indigo-600' : 'bg-transparent'}`} />
                <span className="text-[8px] font-medium">{label}</span>
              </div>
            ))}
          </div>

          {/* Home indicator */}
          <div className="bg-white pb-2 flex justify-center">
            <div className="w-16 h-0.5 bg-gray-300 rounded-full" />
          </div>
        </div>
      </div>

      {/* Floating notification bubble */}
      <div className="absolute -right-4 top-24 bg-white rounded-2xl shadow-lg border border-gray-100 px-3 py-2 w-40 animate-float">
        <p className="text-[9px] font-semibold text-gray-900">Alex joined your plan!</p>
        <p className="text-[8px] text-gray-400 mt-0.5">Coffee · Today 3:00 PM</p>
        <div className="flex items-center gap-1 mt-1.5">
          <div className="w-3 h-3 bg-indigo-100 rounded-full flex items-center justify-center text-[6px] font-bold text-indigo-600">A</div>
          <div className="flex gap-0.5">
            {[1,1,1,1,0.5].map((f, i) => (
              <Star key={i} size={6} className="text-amber-400 fill-amber-400" style={{ opacity: f }} />
            ))}
          </div>
        </div>
      </div>

      {/* Floating plan count */}
      <div className="absolute -left-6 bottom-32 bg-indigo-600 rounded-2xl shadow-lg px-3 py-2 text-white animate-float-slow">
        <p className="text-[10px] font-bold">23 plans</p>
        <p className="text-[8px] text-indigo-200">this week</p>
      </div>
    </div>
  );
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="bg-[#f9f8f6]">
      {/* Hero */}
      <section className="pt-28 pb-16 px-5">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Left: copy */}
            <div className="flex-1 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-6 flex-wrap">
                <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 text-xs font-semibold px-3.5 py-1.5 rounded-full">
                  <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse"></span>
                  Real plans. Real people. No pressure.
                </div>
                <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-xs font-semibold px-3.5 py-1.5 rounded-full">
                  <MapPin size={11} />
                  Launching first in Mannheim
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.08] tracking-tight mb-5">
                Don't do life alone<br />today.
              </h1>
              <p className="text-lg text-gray-500 leading-relaxed mb-8 max-w-md mx-auto lg:mx-0">
                Find someone nearby for coffee, a walk, or dinner. No swiping. No pressure. Just a real plan with a real person.
              </p>
              <form
                onSubmit={(e) => { e.preventDefault(); if (email) setSubmitted(true); }}
                className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-3"
              >
                {submitted ? (
                  <div className="bg-indigo-50 text-indigo-700 font-medium px-6 py-3.5 rounded-full text-sm">
                    You're on the list! We'll reach out soon.
                  </div>
                ) : (
                  <>
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="flex-1 max-w-xs px-5 py-3.5 rounded-full bg-white border border-gray-200 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 shadow-sm"
                    />
                    <button
                      type="submit"
                      className="bg-indigo-600 text-white font-semibold px-7 py-3.5 rounded-full hover:bg-indigo-700 transition-all hover:shadow-lg hover:shadow-indigo-200 active:scale-95 whitespace-nowrap"
                    >
                      Get early access
                    </button>
                  </>
                )}
              </form>
              <p className="text-xs text-gray-400 mb-6">First users in Mannheim — limited spots. No spam.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <button
                  onClick={() => onNavigate('auth')}
                  className="bg-white text-gray-700 font-semibold px-7 py-3.5 rounded-full border border-gray-200 hover:border-gray-300 transition-all hover:shadow-sm active:scale-95 flex items-center justify-center gap-2"
                >
                  Preview app <ArrowRight size={16} />
                </button>
                <button
                  onClick={() => onNavigate('how-it-works')}
                  className="text-gray-500 font-medium px-7 py-3.5 rounded-full hover:text-gray-700 transition-colors active:scale-95"
                >
                  How it works
                </button>
              </div>
            </div>

            {/* Right: phone mockup */}
            <div className="hidden lg:flex flex-shrink-0 justify-center pt-6">
              <PhoneMock />
            </div>
          </div>
        </div>
      </section>

      {/* Trust signals */}
      <section className="pb-4 px-5">
        <div className="max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 bg-white border border-gray-100 rounded-full px-4 py-2 shadow-sm text-sm text-gray-600">
              <span className="font-semibold text-gray-900">127 people</span> in Mannheim already interested
            </div>
            <div className="flex items-center gap-2 bg-white border border-gray-100 rounded-full px-4 py-2 shadow-sm text-sm text-gray-600">
              <span className="font-semibold text-gray-900">23 plans</span> created this week
            </div>
            <div className="flex items-center gap-2 bg-white border border-gray-100 rounded-full px-4 py-2 shadow-sm text-sm text-gray-600">
              <MapPin size={13} className="text-emerald-500" />
              Launching locally first
            </div>
          </div>
        </div>
      </section>

      {/* Live plans preview */}
      <section className="pb-20 px-5 pt-10">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-xs font-semibold text-gray-400 uppercase tracking-widest mb-6">Live plans near you</p>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide md:grid md:grid-cols-2 lg:grid-cols-4">
            {SAMPLE_PLANS.map(plan => (
              <PlanPreviewCard key={plan.id} plan={plan} />
            ))}
          </div>
        </div>
      </section>

      {/* Not a dating app */}
      <section className="py-20 px-5 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-rose-50 text-rose-600 text-xs font-semibold px-3.5 py-1.5 rounded-full mb-6">
            Not a dating app
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5 tracking-tight">
            Seriously. It's just plans.
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed mb-10">
            NowBuddy is built for people who want to get out of the house and do something simple with another human. No romantic intent, no swiping, no chatting forever. Just a plan, a time, and a place.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <CheckCircle size={20} />, title: 'No swiping', desc: 'Browse real plans, not profiles' },
              { icon: <CheckCircle size={20} />, title: 'No endless chats', desc: 'Plan first, then meet' },
              { icon: <CheckCircle size={20} />, title: 'Purely platonic', desc: 'Built for connection, not dating' },
            ].map(item => (
              <div key={item.title} className="flex flex-col items-center gap-2 p-5">
                <div className="text-indigo-600">{item.icon}</div>
                <h3 className="font-semibold text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 px-5 bg-gray-900">
        <div className="max-w-3xl mx-auto">
          <p className="text-center text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Simple by design</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12 tracking-tight">How it works</h2>

          {/* Steps 1–3 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                step: '01',
                icon: <CalendarPlus size={28} />,
                title: 'Create a plan',
                desc: 'Pick an activity, set a time and place. Coffee, a walk, dinner — keep it simple.',
              },
              {
                step: '02',
                icon: <UserPlus size={28} />,
                title: 'Someone joins',
                desc: 'A nearby person finds your plan and requests to join. You confirm with one tap.',
              },
              {
                step: '03',
                icon: <UtensilsCrossed size={28} />,
                title: 'You meet',
                desc: 'Show up, enjoy the activity, enjoy the company. No pressure to keep chatting after.',
              },
            ].map(item => (
              <div key={item.step} className="flex flex-col items-center text-center gap-4">
                <div className="w-14 h-14 bg-emerald-500/20 rounded-2xl flex items-center justify-center text-emerald-400">
                  {item.icon}
                </div>
                <span className="text-xs font-bold text-emerald-400 tracking-widest">{item.step}</span>
                <h3 className="font-semibold text-white text-lg">{item.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* After the meetup */}
          <div className="rounded-2xl bg-gray-800 p-6 md:p-8">
            <p className="text-center text-xs font-semibold text-gray-400 uppercase tracking-widest mb-6">After the meetup</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  step: '04',
                  icon: <Star size={22} />,
                  title: 'Leave a quick rating',
                  desc: 'Did it happen? Would you meet again? Two questions. Keeps the community reliable.',
                },
                {
                  step: '05',
                  icon: <ThumbsUp size={22} />,
                  title: 'Build your reliability score',
                  desc: 'Every meetup that goes well lifts your score. High scores get more joins, faster.',
                },
              ].map(item => (
                <div key={item.step} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center text-amber-400 shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-amber-400 tracking-widest block mb-1">{item.step}</span>
                    <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-10">
            <button
              onClick={() => onNavigate('auth')}
              className="bg-indigo-600 text-white font-semibold px-7 py-3 rounded-full hover:bg-indigo-700 transition-all duration-150 hover:shadow-lg hover:shadow-indigo-900/40 active:scale-[0.97] text-sm"
            >
              Open App
            </button>
          </div>
        </div>
      </section>

      {/* Early access */}
      <section className="py-20 px-5 bg-indigo-600">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">Get early access</h2>
          <p className="text-indigo-200 mb-8">Be among the first people on NowBuddy in your city.</p>
          {submitted ? (
            <div className="bg-white/20 rounded-2xl px-6 py-4 text-white font-medium">
              You're on the list! We'll reach out soon.
            </div>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); if (email) setSubmitted(true); }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 px-5 py-3.5 rounded-full bg-white text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button
                type="submit"
                className="bg-white text-indigo-700 font-semibold px-6 py-3.5 rounded-full hover:bg-indigo-50 transition-colors whitespace-nowrap"
              >
                Get early access
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-5 border-t border-gray-100">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-bold text-gray-900">
            <span className="w-7 h-7 bg-indigo-50 rounded-full flex items-center justify-center">
              <MapPin size={14} className="text-indigo-600" />
            </span>
            NowBuddy
          </div>
          <p className="text-sm text-gray-400">© 2026 NowBuddy. All rights reserved.</p>
          <div className="flex gap-6">
            <button onClick={() => onNavigate('how-it-works')} className="text-sm text-gray-400 hover:text-gray-600 transition-colors">How it works</button>
            <button onClick={() => onNavigate('safety')} className="text-sm text-gray-400 hover:text-gray-600 transition-colors">Safety</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
