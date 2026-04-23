import { useState } from 'react';
import { Screen } from './types';
import { Plan, SAMPLE_PLANS } from './data/mockData';

import PublicNav from './components/public/PublicNav';
import LandingPage from './components/public/LandingPage';
import HowItWorksPage from './components/public/HowItWorksPage';
import SafetyPage from './components/public/SafetyPage';

import AuthScreen from './components/app/AuthScreen';
import OnboardingScreen from './components/app/OnboardingScreen';
import AppNav from './components/app/AppNav';
import HomeScreen from './components/app/HomeScreen';
import PlanDetailsScreen from './components/app/PlanDetailsScreen';
import RequestSentScreen from './components/app/RequestSentScreen';
import AcceptedScreen from './components/app/AcceptedScreen';
import MeetupScreen from './components/app/MeetupScreen';
import ReviewScreen from './components/app/ReviewScreen';
import CreatePlanScreen from './components/app/CreatePlanScreen';
import ProfileScreen from './components/app/ProfileScreen';

const PUBLIC_SCREENS: Screen[] = ['landing', 'how-it-works', 'safety'];
const AUTH_SCREENS: Screen[] = ['auth', 'onboarding'];

export default function App() {
  const [screen, setScreen] = useState<Screen>('landing');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ name: string; age: number; vibes: string[] } | null>(null);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [plans, setPlans] = useState<Plan[]>(SAMPLE_PLANS);

  const navigate = (s: Screen) => {
    setScreen(s);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleOnboardingComplete = (age: number, vibes: string[]) => {
    setCurrentUser({ name: 'Jamie', age, vibes });
    navigate('home');
  };

  const handleSelectPlan = (planId: string) => {
    setSelectedPlanId(planId);
    navigate('plan-details');
  };

  const handleJoinPlan = (planId: string) => {
    setSelectedPlanId(planId);
    navigate('request-sent');
  };

  const handlePlanCreated = (plan: Plan) => {
    setPlans(prev => [plan, ...prev]);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate('landing');
  };

  const selectedPlan = plans.find(p => p.id === selectedPlanId) ?? plans[0];

  const isPublic = PUBLIC_SCREENS.includes(screen);
  const isAuth = AUTH_SCREENS.includes(screen);
  const isApp = !isPublic && !isAuth;

  return (
    <div className="min-h-screen bg-[#f9f8f6]">
      {isPublic && (
        <PublicNav currentScreen={screen} onNavigate={navigate} />
      )}

      {isApp && isLoggedIn && (
        <AppNav currentScreen={screen} onNavigate={navigate} />
      )}

      {screen === 'landing' && <LandingPage onNavigate={navigate} />}
      {screen === 'how-it-works' && <HowItWorksPage onNavigate={navigate} />}
      {screen === 'safety' && <SafetyPage onNavigate={navigate} />}

      {screen === 'auth' && (
        <AuthScreen onNavigate={navigate} onLogin={handleLogin} />
      )}

      {screen === 'onboarding' && (
        <OnboardingScreen onComplete={handleOnboardingComplete} onNavigate={navigate} />
      )}

      {screen === 'home' && (
        <HomeScreen
          plans={plans}
          currentUser={currentUser}
          onNavigate={navigate}
          onSelectPlan={handleSelectPlan}
          onJoinPlan={handleJoinPlan}
        />
      )}

      {screen === 'plan-details' && selectedPlan && (
        <PlanDetailsScreen
          plan={selectedPlan}
          onNavigate={navigate}
          onJoin={() => navigate('request-sent')}
        />
      )}

      {screen === 'request-sent' && selectedPlan && (
        <RequestSentScreen
          plan={selectedPlan}
          onNavigate={navigate}
          onSimulateAccept={() => navigate('accepted')}
        />
      )}

      {screen === 'accepted' && selectedPlan && (
        <AcceptedScreen
          plan={selectedPlan}
          onNavigate={navigate}
          onGoToMeetup={() => navigate('meetup')}
        />
      )}

      {screen === 'meetup' && selectedPlan && (
        <MeetupScreen
          plan={selectedPlan}
          onNavigate={navigate}
          onFinish={() => navigate('review')}
        />
      )}

      {screen === 'review' && selectedPlan && (
        <ReviewScreen
          plan={selectedPlan}
          onNavigate={navigate}
        />
      )}

      {screen === 'create-plan' && (
        <CreatePlanScreen
          onNavigate={navigate}
          onPlanCreated={handlePlanCreated}
          currentUser={currentUser}
        />
      )}

      {screen === 'profile' && (
        <ProfileScreen
          currentUser={currentUser}
          onNavigate={navigate}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
}
