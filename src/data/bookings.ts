export interface Booking {
  id: string;
  eventId: string;
  eventTitle: string;
  eventDate: Date;
  eventTime: string;
  venue: string;
  location: string;
  quantity: number;
  totalPrice: number;
  bookingDate: Date;
  status: 'confirmed' | 'pending' | 'cancelled';
  customerInfo: {
    name: string;
    email: string;
    phone: string;
  };
  ticketNumbers: string[];
}

export const bookings: Booking[] = [
  {
    id: 'B001',
    eventId: '1',
    eventTitle: 'Summer Music Festival 2025',
    eventDate: new Date('2025-07-15'),
    eventTime: '18:00',
    venue: 'LA Convention Center',
    location: 'Los Angeles, CA',
    quantity: 2,
    totalPrice: 259.98,
    bookingDate: new Date('2025-05-15'),
    status: 'confirmed',
    customerInfo: {
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '(555) 123-4567'
    },
    ticketNumbers: ['SMF2025-001234', 'SMF2025-001235']
  },
  {
    id: 'B002',
    eventId: '4',
    eventTitle: 'NBA Finals Game 4',
    eventDate: new Date('2025-06-14'),
    eventTime: '21:00',
    venue: 'United Center',
    location: 'Chicago, IL',
    quantity: 4,
    totalPrice: 1800.00,
    bookingDate: new Date('2025-04-20'),
    status: 'confirmed',
    customerInfo: {
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '(555) 987-6543'
    },
    ticketNumbers: ['NBA2025-789012', 'NBA2025-789013', 'NBA2025-789014', 'NBA2025-789015']
  },
  {
    id: 'B003',
    eventId: '2',
    eventTitle: 'Tech Innovation Summit',
    eventDate: new Date('2025-09-22'),
    eventTime: '09:00',
    venue: 'Moscone Center',
    location: 'San Francisco, CA',
    quantity: 1,
    totalPrice: 299.99,
    bookingDate: new Date('2025-07-10'),
    status: 'pending',
    customerInfo: {
      name: 'Mike Chen',
      email: 'mike.chen@techcorp.com',
      phone: '(555) 456-7890'
    },
    ticketNumbers: ['TECH2025-567890']
  },
  {
    id: 'B004',
    eventId: '6',
    eventTitle: 'Food & Wine Festival',
    eventDate: new Date('2025-09-30'),
    eventTime: '16:00',
    venue: 'Phoenix Convention Center',
    location: 'Phoenix, AZ',
    quantity: 2,
    totalPrice: 179.98,
    bookingDate: new Date('2025-08-05'),
    status: 'confirmed',
    customerInfo: {
      name: 'Emily Davis',
      email: 'emily.davis@gmail.com',
      phone: '(555) 234-5678'
    },
    ticketNumbers: ['FOOD2025-345678', 'FOOD2025-345679']
  },
  {
    id: 'B005',
    eventId: '3',
    eventTitle: 'Broadway Night: Hamilton',
    eventDate: new Date('2025-10-05'),
    eventTime: '20:00',
    venue: 'Richard Rodgers Theatre',
    location: 'New York, NY',
    quantity: 2,
    totalPrice: 370.00,
    bookingDate: new Date('2025-08-15'),
    status: 'cancelled',
    customerInfo: {
      name: 'Robert Wilson',
      email: 'r.wilson@email.com',
      phone: '(555) 345-6789'
    },
    ticketNumbers: ['BWAY2025-456789', 'BWAY2025-456790']
  }
];
