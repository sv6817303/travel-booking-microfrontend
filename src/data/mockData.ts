export const featuredDestinations = [
  {
    id: '1',
    name: 'Bali',
    description: 'Tropical paradise with stunning beaches',
    images: ['https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800'],
    rating: 4.8,
    estimatedBudget: { budget: 50 }
  },
  {
    id: '2', 
    name: 'Paris',
    description: 'City of Light with romantic atmosphere',
    images: ['https://images.unsplash.com/photo-1549144511-f099e773c147?w=800'],
    rating: 4.9,
    estimatedBudget: { budget: 120 }
  },
  {
    id: '3',
    name: 'Tokyo',
    description: 'Modern metropolis with rich culture',
    images: ['https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800'],
    rating: 4.7,
    estimatedBudget: { budget: 100 }
  }
];

export const features = [
  {
    icon: 'Search',
    title: 'Smart Search',
    description: 'Find destinations based on your preferences, budget, and travel dates',
    href: '/search',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  {
    icon: 'MapPin',
    title: 'Explore Destinations',
    description: 'Discover amazing places with detailed information and local insights',
    href: '/destinations',
    color: 'text-green-600',
    bgColor: 'bg-green-50'
  },
  {
    icon: 'Calendar',
    title: 'Plan Itinerary',
    description: 'Create personalized travel plans with AI-powered recommendations',
    href: '/itinerary',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50'
  },
  {
    icon: 'Cloud',
    title: 'Weather Insights',
    description: 'Get real-time weather data to plan your perfect trip',
    href: '/weather',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50'
  },
];

export const stats = [
  { value: '1M+', label: 'Happy Travelers' },
  { value: '500+', label: 'Destinations' },
  { value: '50K+', label: 'Trip Plans' },
  { value: '4.9', label: 'Average Rating' },
];
