import { useState, useRef, useEffect } from 'react';
import { Plus, X, ArrowRight } from 'lucide-react';
import { Screen } from '../../types';
import { PRESET_VIBES } from '../../data/mockData';

interface OnboardingScreenProps {
  onComplete: (age: number, vibes: string[]) => void;
  onNavigate: (screen: Screen) => void;
}

export default function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [age, setAge] = useState('');
  const [selectedVibes, setSelectedVibes] = useState<string[]>([]);
  const [customVibe, setCustomVibe] = useState('');
  const ageInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (step === 1) ageInputRef.current?.focus();
  }, [step]);

  const ageNum = parseInt(age);
  const ageValid = age !== '' && ageNum >= 18 && ageNum <= 99;

  const toggleVibe = (vibe: string) => {
    setSelectedVibes(prev =>
      prev.includes(vibe) ? prev.filter(v => v !== vibe) : [...prev, vibe]
    );
  };

  const addCustomVibe = () => {
    const trimmed = customVibe.trim();
    if (trimmed && !selectedVibes.includes(trimmed)) {
      setSelectedVibes(prev => [...prev, trimmed]);
    }
    setCustomVibe('');
  };

  const handleStep1Continue = () => {
    if (ageValid) setStep(2);
  };

  const handleFinish = () => {
    onComplete(ageNum, selectedVibes);
  };

  return (
    <div className="min-h-screen bg-[#f9f8f6] flex flex-col items-center justify-center px-5 py-12">
      <div className="w-full max-w-sm">

        {/* Progress */}
        <div className="flex items-center gap-2 mb-10">
          <div className={`h-1 flex-1 rounded-full transition-all duration-300 ${step >= 1 ? 'bg-gray-900' : 'bg-gray-200'}`} />
          <div className={`h-1 flex-1 rounded-full transition-all duration-300 ${step >= 2 ? 'bg-gray-900' : 'bg-gray-200'}`} />
        </div>

        {/* Step 1: Age */}
        {step === 1 && (
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Step 1 of 2</p>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight mb-1">How old are you?</h1>
            <p className="text-sm text-gray-500 mb-8">Helps people find plans that feel age-appropriate.</p>

            <input
              ref={ageInputRef}
              type="number"
              value={age}
              onChange={e => setAge(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleStep1Continue()}
              placeholder="Your age"
              min={18}
              max={99}
              className="w-full px-4 py-4 rounded-2xl border border-gray-200 text-gray-900 text-xl font-semibold text-center focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-white placeholder-gray-300 mb-2 tabular-nums"
            />
            {age && !ageValid && (
              <p className="text-xs text-rose-500 text-center mb-4">Must be between 18 and 99</p>
            )}

            <button
              onClick={handleStep1Continue}
              disabled={!ageValid}
              className="w-full mt-6 bg-gray-900 text-white font-semibold py-4 rounded-2xl hover:bg-gray-800 transition-all disabled:opacity-30 disabled:cursor-not-allowed active:scale-[0.98] flex items-center justify-center gap-2 text-base"
            >
              Continue <ArrowRight size={16} />
            </button>
          </div>
        )}

        {/* Step 2: Vibe */}
        {step === 2 && (
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Step 2 of 2</p>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight mb-1">What's your vibe?</h1>
            <p className="text-sm text-gray-500 mb-6">Pick any that fit. You can skip this too.</p>

            {/* Preset tags */}
            <div className="flex flex-wrap gap-2 mb-5">
              {PRESET_VIBES.map(vibe => (
                <button
                  key={vibe}
                  onClick={() => toggleVibe(vibe)}
                  className={`px-3.5 py-2 rounded-full text-sm font-medium transition-all border ${
                    selectedVibes.includes(vibe)
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
                  }`}
                >
                  {vibe}
                </button>
              ))}
            </div>

            {/* Custom vibe row */}
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={customVibe}
                onChange={e => setCustomVibe(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addCustomVibe()}
                placeholder="Add your own..."
                className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-white placeholder-gray-400"
              />
              <button
                onClick={addCustomVibe}
                disabled={!customVibe.trim()}
                className="w-10 h-10 bg-gray-900 text-white rounded-xl flex items-center justify-center hover:bg-gray-800 transition-colors disabled:opacity-30 disabled:cursor-not-allowed shrink-0"
              >
                <Plus size={17} />
              </button>
            </div>

            {/* Custom vibe chips */}
            {selectedVibes.filter(v => !PRESET_VIBES.includes(v)).length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedVibes.filter(v => !PRESET_VIBES.includes(v)).map(vibe => (
                  <span key={vibe} className="flex items-center gap-1.5 bg-gray-900 text-white px-3 py-1.5 rounded-full text-sm font-medium">
                    {vibe}
                    <button onClick={() => toggleVibe(vibe)} className="hover:text-gray-300 transition-colors">
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            )}

            <button
              onClick={handleFinish}
              className="w-full mt-6 bg-gray-900 text-white font-semibold py-4 rounded-2xl hover:bg-gray-800 transition-all active:scale-[0.98] text-base"
            >
              {selectedVibes.length > 0 ? "Let's go" : 'Skip for now'}
            </button>

            <button
              onClick={() => setStep(1)}
              className="w-full mt-3 py-3 text-sm text-gray-400 hover:text-gray-600 transition-colors"
            >
              Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
