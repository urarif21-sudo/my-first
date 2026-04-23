import { useState } from 'react';
import { Clock, MapPin, MessageCircle, CheckCircle, Navigation2, Navigation } from 'lucide-react';
import { Plan, Coords } from '../../data/mockData';
import { Screen } from '../../types';

interface MeetupScreenProps {
  plan: Plan;
  onNavigate: (screen: Screen) => void;
  onFinish: () => void;
}

type ArrivalStatus = null | 'on-the-way' | 'arrived';

const FIND_ME_HINTS: Record<string, string> = {
  p1: "I'll be at a corner table near the window — look for the laptop bag on the table.",
  p2: "I'll be standing near the Bethesda Fountain with a green tote bag.",
  p3: "Waiting right by the front entrance wearing a grey hoodie.",
  p4: "Grabbed a table outside near the door. Come find me!",
};

function getMapsUrl(location: string, coords?: Coords): string {
  const isApple = /iPad|iPhone|iPod|Mac/.test(navigator.userAgent);
  if (coords) {
    const { lat, lng } = coords;
    return isApple
      ? `https://maps.apple.com/?ll=${lat},${lng}&q=${encodeURIComponent(location)}`
      : `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  }
  const q = encodeURIComponent(location);
  return isApple
    ? `https://maps.apple.com/?q=${q}`
    : `https://www.google.com/maps/search/?api=1&query=${q}`;
}

export default function MeetupScreen({ plan, onNavigate, onFinish }: MeetupScreenProps) {
  const [arrivalStatus, setArrivalStatus] = useState<ArrivalStatus>(null);

  const mapsUrl = getMapsUrl(plan.location, plan.coords);
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`Hey! On my way to "${plan.title}" at ${plan.location}. See you soon!`)}`;
  const findMeHint = FIND_ME_HINTS[plan.id] ?? plan.host.bio ?? "I'll be near the entrance — look out for me!";

  const handleArrival = (status: ArrivalStatus) => {
    setArrivalStatus(prev => prev === status ? null : status);
  };

  return (
    <div className="min-h-screen bg-[#f9f8f6] pt-14 pb-24 md:pt-16 md:pb-12">
      <div className="max-w-lg mx-auto px-4 py-6 md:py-10">

        {/* Page header */}
        <div className="mb-5">
          <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-xs font-semibold px-2.5 py-1 rounded-full mb-3">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            Live coordination
          </div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">Find each other</h1>
          <p className="text-sm text-gray-400 mt-0.5">Use the details below to meet up.</p>
        </div>

        {/* ── SECTION 1: When & Where ── */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-3">
          {/* Map visual */}
          <div className="relative h-40 bg-[#dde3ea] select-none overflow-hidden">
            {/* Subtle road layer */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 480 160" preserveAspectRatio="xMidYMid slice">
              {/* Main roads */}
              <rect x="0" y="70" width="480" height="20" fill="#c8d0da" />
              <rect x="220" y="0" width="20" height="160" fill="#c8d0da" />
              <rect x="0" y="120" width="480" height="10" fill="#d2d8e0" />
              <rect x="100" y="0" width="10" height="160" fill="#d2d8e0" />
              <rect x="360" y="0" width="10" height="160" fill="#d2d8e0" />
              {/* Block fills */}
              <rect x="12" y="8" width="82" height="56" rx="3" fill="#cdd4dc" />
              <rect x="112" y="8" width="100" height="56" rx="3" fill="#c9d1d9" />
              <rect x="242" y="8" width="110" height="56" rx="3" fill="#cdd4dc" />
              <rect x="372" y="8" width="96" height="56" rx="3" fill="#c9d1d9" />
              <rect x="12" y="96" width="82" height="56" rx="3" fill="#c9d1d9" />
              <rect x="112" y="96" width="100" height="56" rx="3" fill="#cdd4dc" />
              <rect x="242" y="96" width="110" height="56" rx="3" fill="#c9d1d9" />
              <rect x="372" y="96" width="96" height="56" rx="3" fill="#cdd4dc" />
              {/* Highlight one block as destination */}
              <rect x="242" y="8" width="110" height="56" rx="3" fill="#b8c3d0" />
            </svg>

            {/* Radial glow behind pin */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-indigo-500/10" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-indigo-500/15" />

            {/* Pin */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[calc(100%+2px)]">
              <div className="flex flex-col items-center drop-shadow-lg">
                <div className="w-11 h-11 bg-indigo-600 rounded-full flex items-center justify-center ring-[3px] ring-white shadow-indigo-600/30 shadow-lg">
                  <MapPin size={18} className="text-white fill-white/20" />
                </div>
                <div className="w-2.5 h-2.5 bg-indigo-600 rotate-45 -mt-1.5 shadow-sm" />
              </div>
            </div>

            {/* Location label overlay */}
            <div className="absolute bottom-3 left-3 right-3">
              <div className="bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 flex items-center justify-between gap-2 shadow-sm">
                <div className="flex items-center gap-2 min-w-0">
                  <MapPin size={13} className="text-indigo-600 shrink-0" />
                  <span className="text-xs font-semibold text-gray-800 truncate">{plan.location}</span>
                </div>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 flex items-center gap-1.5 bg-gray-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-gray-700 active:scale-95 transition-all"
                >
                  <Navigation size={11} />
                  Navigate
                </a>
              </div>
            </div>
          </div>

          {/* When row */}
          <div className="px-4 py-3.5 flex items-center gap-3 border-t border-gray-50">
            <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center shrink-0">
              <Clock size={14} className="text-indigo-600" />
            </div>
            <div>
              <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wider leading-none mb-0.5">When</p>
              <p className="text-sm font-semibold text-gray-900">{plan.time}</p>
            </div>
          </div>
        </div>

        {/* ── SECTION 2: How to find the host ── */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-3">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 bg-amber-50 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
              <Navigation2 size={15} className="text-amber-600" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1.5">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">How to find {plan.host.name}</p>
              </div>
              <p className="text-sm text-gray-800 leading-relaxed font-medium">"{findMeHint}"</p>
            </div>
          </div>
        </div>

        {/* ── SECTION 3: Arrival status ── */}
        <div className={`rounded-2xl border-2 p-4 mb-3 transition-all duration-300 ${
          arrivalStatus === 'arrived'
            ? 'bg-emerald-600 border-emerald-600'
            : arrivalStatus === 'on-the-way'
            ? 'bg-white border-indigo-200'
            : 'bg-white border-gray-100'
        }`}>
          {/* Section label */}
          <div className="flex items-center justify-between mb-3">
            <p className={`text-xs font-semibold uppercase tracking-wider ${
              arrivalStatus === 'arrived' ? 'text-white/70' : 'text-gray-500'
            }`}>Your status</p>
            <p className={`text-xs ${
              arrivalStatus === 'arrived' ? 'text-white/60' : 'text-gray-400'
            }`}>Your buddy will see this</p>
          </div>

          {/* Arrived: big celebration state replaces buttons */}
          {arrivalStatus === 'arrived' ? (
            <div className="text-center py-2">
              <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle size={28} className="text-white" strokeWidth={2.5} />
              </div>
              <p className="text-white font-bold text-lg leading-tight">You're here!</p>
              <p className="text-white/70 text-sm mt-1">{plan.host.name} can see you've arrived</p>
              <button
                onClick={() => handleArrival(null)}
                className="mt-4 text-white/60 text-xs underline underline-offset-2 hover:text-white/90 transition-colors"
              >
                Undo
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              {/* On my way button */}
              <button
                onClick={() => handleArrival('on-the-way')}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 text-sm font-semibold transition-all duration-200 active:scale-[0.985] ${
                  arrivalStatus === 'on-the-way'
                    ? 'border-indigo-600 bg-indigo-600 text-white'
                    : 'border-gray-100 bg-gray-50 text-gray-700 hover:border-indigo-200 hover:bg-indigo-50/60'
                }`}
              >
                <span className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                  arrivalStatus === 'on-the-way' ? 'bg-white/20' : 'bg-white'
                }`}>
                  {arrivalStatus === 'on-the-way' ? (
                    <span className="relative flex">
                      <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-white opacity-60" />
                      <span className="relative inline-flex h-3 w-3 rounded-full bg-white" />
                    </span>
                  ) : (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                    </svg>
                  )}
                </span>
                <span className="text-left flex-1">
                  <span className="block leading-tight">On my way</span>
                  <span className={`text-xs font-normal leading-tight ${
                    arrivalStatus === 'on-the-way' ? 'text-white/70' : 'text-gray-400'
                  }`}>
                    {arrivalStatus === 'on-the-way' ? `${plan.host.name} knows you’re coming` : 'Let them know you’re heading over'}
                  </span>
                </span>
                {arrivalStatus === 'on-the-way' && (
                  <CheckCircle size={15} className="text-white shrink-0" strokeWidth={2.5} />
                )}
              </button>

              {/* I'm here button */}
              <button
                onClick={() => handleArrival('arrived')}
                className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 border-gray-100 bg-gray-50 text-gray-700 text-sm font-semibold transition-all duration-200 active:scale-[0.985] hover:border-emerald-200 hover:bg-emerald-50/60"
              >
                <span className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shrink-0">
                  <MapPin size={15} className="text-gray-500" />
                </span>
                <span className="text-left flex-1">
                  <span className="block leading-tight">I'm here!</span>
                  <span className="text-xs font-normal text-gray-400 leading-tight">Tap when you've arrived at the spot</span>
                </span>
              </button>
            </div>
          )}
        </div>

        {/* ── SECTION 4: Finish CTA ── */}
        <button
          onClick={onFinish}
          className="w-full bg-gray-900 text-white font-semibold py-4 rounded-2xl hover:bg-gray-800 transition-all active:scale-[0.98] text-[15px] mb-3"
        >
          Finish meetup &amp; leave a review
        </button>

        {/* ── Optional: WhatsApp ── */}
        <div className="border-t border-gray-100 pt-4 mt-1">
          <p className="text-center text-xs text-gray-400 mb-2.5">Need to reach each other directly?</p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 text-gray-500 text-sm font-medium py-2.5 rounded-xl hover:text-gray-700 hover:bg-gray-100 transition-all"
          >
            <MessageCircle size={15} className="text-[#25D366]" />
            Open WhatsApp
          </a>
        </div>

        <button
          onClick={() => onNavigate('home')}
          className="w-full mt-1 py-2.5 text-xs text-gray-400 hover:text-gray-500 transition-colors text-center"
        >
          Back to feed
        </button>
      </div>
    </div>
  );
}
