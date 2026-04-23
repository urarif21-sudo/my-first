export interface User {
  id: string;
  name: string;
  age: number;
  reliability: number;
  vibes: string[];
  plansJoined: number;
  plansCreated: number;
  feedback: string[];
  bio?: string;
  trustSignals?: string[];
}

export interface Coords {
  lat: number;
  lng: number;
}

export interface Plan {
  id: string;
  title: string;
  time: string;
  location: string;
  coords?: Coords;
  host: User;
  description: string;
  vibes: string[];
  spotsLeft: number;
  totalSpots: number;
  status: 'today' | 'upcoming' | 'filling';
  joined: number;
}

export const SAMPLE_USERS: User[] = [
  {
    id: 'u1',
    name: 'Alex',
    age: 27,
    reliability: 4.6,
    vibes: ['Relaxed', 'Talkative'],
    plansJoined: 12,
    plansCreated: 5,
    feedback: ['Really easy to hang out with', 'Great conversation, showed up on time'],
    bio: 'Just looking for a simple coffee and chat',
    trustSignals: ['Shows up on time', 'Friendly & relaxed'],
  },
  {
    id: 'u2',
    name: 'Mina',
    age: 29,
    reliability: 4.8,
    vibes: ['Friendly', 'New in city'],
    plansJoined: 8,
    plansCreated: 3,
    feedback: ['Super warm and welcoming', 'Made me feel at ease immediately'],
    bio: 'New to the city, love exploring coffee shops and local spots',
    trustSignals: ['Highly reliable', 'Great conversationalist'],
  },
  {
    id: 'u3',
    name: 'Jonas',
    age: 31,
    reliability: 4.5,
    vibes: ['Calm', 'Easygoing'],
    plansJoined: 15,
    plansCreated: 7,
    feedback: ['Very chill and easy to be around', 'Picked a great spot'],
    bio: 'Weekend walks and good food are my thing',
    trustSignals: ['Calm energy', 'Always picks great spots'],
  },
  {
    id: 'u4',
    name: 'Priya',
    age: 25,
    reliability: 4.9,
    vibes: ['Talkative', 'Casual hangout'],
    plansJoined: 6,
    plansCreated: 2,
    feedback: ['Incredible host, so thoughtful', 'Would definitely meet again'],
    bio: 'Love trying new brunch spots and long evening walks',
    trustSignals: ['Exceptionally punctual', 'Warm and thoughtful'],
  },
];

export const SAMPLE_PLANS: Plan[] = [
  {
    id: 'p1',
    title: 'Grab a coffee',
    time: 'Today, 3:00 PM',
    location: 'Blue Bottle Coffee, SoHo',
    coords: { lat: 40.7233, lng: -74.0030 },
    host: SAMPLE_USERS[0],
    description: 'Looking for someone to grab a flat white and have a good chat. No agenda, just good conversation.',
    vibes: ['Relaxed', 'Talkative'],
    spotsLeft: 1,
    totalSpots: 1,
    status: 'today',
    joined: 0,
  },
  {
    id: 'p2',
    title: 'Evening walk in the park',
    time: 'Today, 6:30 PM',
    location: 'Central Park, Bethesda Fountain',
    coords: { lat: 40.7739, lng: -73.9718 },
    host: SAMPLE_USERS[1],
    description: 'New to the city and want to explore. Would love a walking partner for a casual evening stroll.',
    vibes: ['Friendly', 'New in city'],
    spotsLeft: 2,
    totalSpots: 2,
    status: 'filling',
    joined: 2,
  },
  {
    id: 'p3',
    title: 'Dinner at a ramen spot',
    time: 'Tonight, 7:30 PM',
    location: 'Ippudo Ramen, East Village',
    coords: { lat: 40.7267, lng: -73.9849 },
    host: SAMPLE_USERS[2],
    description: 'Going to grab ramen solo feels sad. Anyone want to join for a bowl and easy conversation?',
    vibes: ['Calm', 'Easygoing'],
    spotsLeft: 1,
    totalSpots: 2,
    status: 'today',
    joined: 1,
  },
  {
    id: 'p4',
    title: 'Sunday brunch',
    time: 'Sunday, 11:00 AM',
    location: 'Egg Shop, Nolita',
    coords: { lat: 40.7224, lng: -73.9946 },
    host: SAMPLE_USERS[3],
    description: 'Looking for a brunch buddy. Love chatty Sunday mornings with good food.',
    vibes: ['Talkative', 'Casual hangout'],
    spotsLeft: 2,
    totalSpots: 3,
    status: 'upcoming',
    joined: 1,
  },
];

export const PRESET_VIBES = [
  'Relaxed',
  'Talkative',
  'New in city',
  'Casual hangout',
  'Adventurous',
  'Quiet & chill',
  'Foodie',
  'Outdoorsy',
];

export const ACTIVITIES = [
  'Grab coffee',
  'Go for a walk',
  'Have dinner',
  'Brunch',
  'Explore the neighborhood',
  'Visit a museum',
  'Watch a movie',
  'Hit the gym',
];
