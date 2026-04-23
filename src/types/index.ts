export type Screen =
  | 'landing'
  | 'how-it-works'
  | 'safety'
  | 'auth'
  | 'onboarding'
  | 'home'
  | 'plan-details'
  | 'request-sent'
  | 'accepted'
  | 'meetup'
  | 'review'
  | 'create-plan'
  | 'profile';

export interface AppState {
  screen: Screen;
  selectedPlanId: string | null;
  isLoggedIn: boolean;
  currentUser: {
    name: string;
    age: number;
    vibes: string[];
  } | null;
}
