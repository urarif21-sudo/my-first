import { MapPin, Users, Brain, Flag, BookOpen } from 'lucide-react';
import { Screen } from '../../types';

interface SafetyPageProps {
  onNavigate: (screen: Screen) => void;
}

export default function SafetyPage({ onNavigate }: SafetyPageProps) {
  return (
    <div className="bg-[#f9f8f6] min-h-screen">
      <div className="pt-28 pb-20 px-5">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-3 text-center">Your safety matters</p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-5 tracking-tight">
            Safety first, always.
          </h1>
          <p className="text-lg text-gray-500 text-center mb-16 leading-relaxed">
            NowBuddy is built on trust. These guidelines exist to protect you and every person on the platform.
          </p>

          <div className="space-y-5 mb-16">
            {[
              {
                icon: <MapPin size={22} />,
                title: 'Meet in public',
                color: 'bg-emerald-50 text-emerald-600',
                rules: [
                  'Always choose a public location for your first meetup — a coffee shop, a park, a restaurant.',
                  'Avoid private homes, secluded areas, or locations you are unfamiliar with.',
                  'Stick to busy, well-lit places especially for evening plans.',
                ],
              },
              {
                icon: <Users size={22} />,
                title: 'Tell a friend',
                color: 'bg-blue-50 text-blue-600',
                rules: [
                  'Let someone you trust know where you are going, who you are meeting, and when you expect to be back.',
                  'Share the plan details with a friend before you leave.',
                  'Check in with them after the meetup.',
                ],
              },
              {
                icon: <Brain size={22} />,
                title: 'Trust your instincts',
                color: 'bg-amber-50 text-amber-600',
                rules: [
                  'If something feels off, it is okay to cancel or leave at any time. You do not owe anyone an explanation.',
                  'Pay attention to how someone communicates before meeting. Red flags include pressure, urgency, or overly personal questions.',
                  'Your comfort is the priority. Always.',
                ],
              },
              {
                icon: <Flag size={22} />,
                title: 'Report inappropriate behavior',
                color: 'bg-rose-50 text-rose-600',
                rules: [
                  'If someone makes you uncomfortable — on or off the app — please report them.',
                  'You can report any plan, profile, or behavior directly from the app.',
                  'Reports are reviewed quickly. Accounts that violate our guidelines are suspended.',
                ],
              },
              {
                icon: <BookOpen size={22} />,
                title: 'Community rules',
                color: 'bg-indigo-50 text-indigo-600',
                rules: [
                  'NowBuddy is a platonic social platform. Romantic or sexual solicitation is strictly prohibited.',
                  'Treat every person with respect. No harassment, no discrimination, no hate.',
                  'Show up when you commit to a plan. Repeated no-shows will lower your reliability score.',
                  'Provide honest feedback after meetups. The rating system only works if people are truthful.',
                ],
              },
            ].map(section => (
              <div key={section.title} className="bg-white rounded-2xl p-6 border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${section.color}`}>
                    {section.icon}
                  </div>
                  <h2 className="font-semibold text-gray-900 text-lg">{section.title}</h2>
                </div>
                <ul className="space-y-2.5">
                  {section.rules.map((rule, i) => (
                    <li key={i} className="flex gap-3 text-sm text-gray-500 leading-relaxed">
                      <span className="text-indigo-400 font-bold mt-0.5 shrink-0">—</span>
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="bg-indigo-600 rounded-3xl p-8 text-center">
            <h2 className="text-xl font-bold text-white mb-3">Questions or concerns?</h2>
            <p className="text-indigo-200 text-sm mb-6">
              Our trust and safety team reviews every report. We take all concerns seriously and respond within 24 hours.
            </p>
            <button
              onClick={() => onNavigate('auth')}
              className="bg-white text-indigo-700 font-semibold px-7 py-3 rounded-full hover:bg-indigo-50 transition-colors"
            >
              Join NowBuddy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
