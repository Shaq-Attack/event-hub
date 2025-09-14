export interface Event {
  id: string;
  title: string;
  description: string;
  category: string;
  date: Date;
  time: string;
  location: string;
  venue: string;
  price: number;
  availableTickets: number;
  totalTickets: number;
  image: string;
  featured: boolean;
  organizer: string;
  lineup?: string[];
  venueInfo?: {
    address: string;
    capacity: number;
    amenities: string[];
  };
}

export const categories = [
  'Music',
  'Sports',
  'Theater',
  'Comedy',
  'Technology',
  'Business',
  'Food & Drink',
  'Art & Culture'
];

export const locations = [
  'New York, NY',
  'Los Angeles, CA',
  'Chicago, IL',
  'Houston, TX',
  'Phoenix, AZ',
  'Philadelphia, PA',
  'San Antonio, TX',
  'San Diego, CA',
  'Dallas, TX',
  'San Jose, CA'
];

export const events: Event[] = [
  {
    id: '1',
    title: 'Summer Music Festival 2025',
    description: 'The biggest summer music festival featuring top artists from around the world. Experience three days of non-stop music, food, and entertainment.',
    category: 'Music',
    date: new Date('2025-07-15'),
    time: '18:00',
    location: 'Los Angeles, CA',
    venue: 'LA Convention Center',
    price: 129.99,
    availableTickets: 850,
    totalTickets: 1000,
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400',
    featured: true,
    organizer: 'EventPro Productions',
    lineup: ['The Electric Dreams', 'Sonic Waves', 'Midnight Echo', 'Digital Sound'],
    venueInfo: {
      address: '1201 S Figueroa St, Los Angeles, CA 90015',
      capacity: 1000,
      amenities: ['Parking', 'Food Court', 'VIP Area', 'Merchandise Store']
    }
  },
  {
    id: '2',
    title: 'Tech Innovation Summit',
    description: 'Join industry leaders and innovators for a day of cutting-edge technology discussions, networking, and product launches.',
    category: 'Technology',
    date: new Date('2025-09-22'),
    time: '09:00',
    location: 'San Francisco, CA',
    venue: 'Moscone Center',
    price: 299.99,
    availableTickets: 1200,
    totalTickets: 1500,
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400',
    featured: true,
    organizer: 'TechCorp Events',
    lineup: ['Dr. Sarah Johnson', 'Mark Thompson', 'Lisa Chen', 'Alex Rodriguez'],
    venueInfo: {
      address: '747 Howard St, San Francisco, CA 94103',
      capacity: 1500,
      amenities: ['WiFi', 'Charging Stations', 'Exhibition Hall', 'Networking Lounge']
    }
  },
  {
    id: '3',
    title: 'Broadway Night: Hamilton',
    description: 'Experience the revolutionary musical that tells the story of Alexander Hamilton through hip-hop, jazz, and R&B.',
    category: 'Theater',
    date: new Date('2025-10-05'),
    time: '20:00',
    location: 'New York, NY',
    venue: 'Richard Rodgers Theatre',
    price: 185.00,
    availableTickets: 45,
    totalTickets: 300,
    image: 'https://images.unsplash.com/photo-1503095396549-807759245b35?w=400',
    featured: false,
    organizer: 'Broadway Productions',
    venueInfo: {
      address: '226 W 46th St, New York, NY 10036',
      capacity: 300,
      amenities: ['Coat Check', 'Bar', 'Gift Shop', 'Accessibility Features']
    }
  },
  {
    id: '4',
    title: 'NBA Finals Game 4',
    description: 'Witness basketball history in the making at the NBA Finals. Premium seats available for this thrilling matchup.',
    category: 'Sports',
    date: new Date('2025-06-14'),
    time: '21:00',
    location: 'Chicago, IL',
    venue: 'United Center',
    price: 450.00,
    availableTickets: 125,
    totalTickets: 500,
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400',
    featured: true,
    organizer: 'NBA Events',
    venueInfo: {
      address: '1901 W Madison St, Chicago, IL 60612',
      capacity: 20000,
      amenities: ['Concessions', 'Team Store', 'Premium Lounges', 'Parking']
    }
  },
  {
    id: '5',
    title: 'Comedy Central Live',
    description: 'An evening of stand-up comedy featuring rising stars and established comedians. Prepare for non-stop laughter!',
    category: 'Comedy',
    date: new Date('2025-08-18'),
    time: '19:30',
    location: 'Houston, TX',
    venue: 'Toyota Center',
    price: 55.00,
    availableTickets: 750,
    totalTickets: 900,
    image: 'https://images.unsplash.com/photo-1576267423048-15c0040fec78?w=400',
    featured: false,
    organizer: 'Laugh Track Entertainment',
    lineup: ['Mike Rodriguez', 'Sarah Williams', 'Tony Chen', 'Amanda Davis'],
    venueInfo: {
      address: '1510 Polk St, Houston, TX 77002',
      capacity: 900,
      amenities: ['Bar', 'Snack Bar', 'VIP Seating', 'Parking']
    }
  },
  {
    id: '6',
    title: 'Food & Wine Festival',
    description: 'Taste exceptional dishes from renowned chefs and sample wines from premium vineyards around the world.',
    category: 'Food & Drink',
    date: new Date('2025-09-30'),
    time: '16:00',
    location: 'Phoenix, AZ',
    venue: 'Phoenix Convention Center',
    price: 89.99,
    availableTickets: 300,
    totalTickets: 400,
    image: 'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=400',
    featured: true,
    organizer: 'Culinary Events Inc',
    venueInfo: {
      address: '100 N 3rd St, Phoenix, AZ 85004',
      capacity: 400,
      amenities: ['Tasting Stations', 'Wine Bar', 'Chef Demonstrations', 'Live Music']
    }
  },
  {
    id: '7',
    title: 'Art Gallery Opening: Modern Visions',
    description: 'Explore contemporary art from emerging artists in this exclusive gallery opening with wine reception.',
    category: 'Art & Culture',
    date: new Date('2025-11-12'),
    time: '18:00',
    location: 'Philadelphia, PA',
    venue: 'Philadelphia Museum of Art',
    price: 35.00,
    availableTickets: 150,
    totalTickets: 200,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
    featured: false,
    organizer: 'Philadelphia Arts Council',
    venueInfo: {
      address: '2600 Benjamin Franklin Pkwy, Philadelphia, PA 19130',
      capacity: 200,
      amenities: ['Wine Reception', 'Artist Meet & Greet', 'Catalog', 'Parking']
    }
  },
  {
    id: '8',
    title: 'Business Leadership Conference',
    description: 'Connect with business leaders and learn strategies for growth, innovation, and leadership in the modern workplace.',
    category: 'Business',
    date: new Date('2025-10-28'),
    time: '08:00',
    location: 'San Diego, CA',
    venue: 'San Diego Convention Center',
    price: 199.99,
    availableTickets: 600,
    totalTickets: 800,
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400',
    featured: false,
    organizer: 'Business Leaders Network',
    lineup: ['CEO Panel', 'Innovation Workshop', 'Networking Session', 'Keynote Address'],
    venueInfo: {
      address: '111 W Harbor Dr, San Diego, CA 92101',
      capacity: 800,
      amenities: ['Exhibition Hall', 'Business Center', 'Catering', 'WiFi']
    }
  },
  {
    id: '9',
    title: 'Jazz Under the Stars',
    description: 'Enjoy a magical evening of live jazz performances in an open-air setting.',
    category: 'Music',
    date: new Date('2025-08-05'),
    time: '20:00',
    location: 'Dallas, TX',
    venue: 'Dallas Arboretum',
    price: 60.00,
    availableTickets: 200,
    totalTickets: 250,
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?w=400',
    featured: false,
    organizer: 'Dallas Jazz Society',
    lineup: ['Blue Note Quartet', 'Jazz Collective'],
    venueInfo: {
      address: '8525 Garland Rd, Dallas, TX 75218',
      capacity: 250,
      amenities: ['Outdoor Seating', 'Food Trucks', 'Parking']
    }
  },
  {
    id: '10',
    title: 'Startup Pitch Night',
    description: 'Watch innovative startups pitch their ideas to investors and industry experts.',
    category: 'Business',
    date: new Date('2025-09-10'),
    time: '18:30',
    location: 'San Jose, CA',
    venue: 'Tech Hub',
    price: 25.00,
    availableTickets: 100,
    totalTickets: 120,
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=400',
    featured: false,
    organizer: 'Silicon Valley Startups',
    lineup: ['Startup Panel', 'Investor Q&A'],
    venueInfo: {
      address: '123 Innovation Dr, San Jose, CA 95110',
      capacity: 120,
      amenities: ['Networking Area', 'Refreshments', 'WiFi']
    }
  },
  {
    id: '11',
    title: 'City Marathon 2025',
    description: 'Run through the heart of the city in this annual marathon event for all ages and skill levels.',
    category: 'Sports',
    date: new Date('2025-10-19'),
    time: '07:00',
    location: 'Chicago, IL',
    venue: 'Grant Park',
    price: 75.00,
    availableTickets: 5000,
    totalTickets: 6000,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400',
    featured: true,
    organizer: 'Chicago Marathon Committee',
    venueInfo: {
      address: '337 E Randolph St, Chicago, IL 60601',
      capacity: 6000,
      amenities: ['Water Stations', 'Medical Support', 'Medal Ceremony']
    }
  },
  {
    id: '12',
    title: 'Improv Night',
    description: 'A hilarious night of unscripted comedy and audience participation.',
    category: 'Comedy',
    date: new Date('2025-07-25'),
    time: '21:00',
    location: 'New York, NY',
    venue: 'Upright Citizens Brigade Theatre',
    price: 40.00,
    availableTickets: 80,
    totalTickets: 100,
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400',
    featured: false,
    organizer: 'NYC Comedy Collective',
    lineup: ['UCB Improv Team'],
    venueInfo: {
      address: '555 W 42nd St, New York, NY 10036',
      capacity: 100,
      amenities: ['Bar', 'Snack Bar', 'Accessibility Features']
    }
  }
];
