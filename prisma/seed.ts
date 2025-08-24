import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Clean existing data in correct order (reverse of foreign key dependencies)
  await prisma.notification.deleteMany();
  await prisma.userFavorite.deleteMany();
  await prisma.review.deleteMany();
  await prisma.ticket.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.eventAttendee.deleteMany();
  await prisma.ticketTier.deleteMany();
  await prisma.event.deleteMany();
  await prisma.venue.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  console.log('🗑️ Cleaned existing data');

  // Hash passwords
  const hashedPassword = await bcrypt.hash('password123', 10);

  // Create Users
  const users = await prisma.user.createMany({
    data: [
      {
        id: 'admin-001',
        email: 'admin@eventa.com',
        username: 'admin',
        firstName: 'Admin',
        lastName: 'User',
        password: hashedPassword,
        role: 'ADMIN',
        isVerified: true,
        phone: '+6281234567890',
        location: 'Jakarta, Indonesia',
        latitude: -6.2088,
        longitude: 106.8456,
      },
      {
        id: 'organizer-001',
        email: 'john.organizer@eventa.com',
        username: 'johnorganizer',
        firstName: 'John',
        lastName: 'Organizer',
        password: hashedPassword,
        role: 'ORGANIZER',
        isVerified: true,
        phone: '+6281234567891',
        bio: 'Professional event organizer with 10+ years experience',
        location: 'Jakarta, Indonesia',
        latitude: -6.2088,
        longitude: 106.8456,
      },
      {
        id: 'organizer-002',
        email: 'sarah.events@eventa.com',
        username: 'sarahevents',
        firstName: 'Sarah',
        lastName: 'Johnson',
        password: hashedPassword,
        role: 'ORGANIZER',
        isVerified: true,
        phone: '+6281234567892',
        bio: 'Tech conference organizer and community builder',
        location: 'Bandung, Indonesia',
        latitude: -6.9175,
        longitude: 107.6191,
      },
      {
        id: 'venue-owner-001',
        email: 'venue.owner@eventa.com',
        username: 'venueowner1',
        firstName: 'Michael',
        lastName: 'Venue',
        password: hashedPassword,
        role: 'VENUE_OWNER',
        isVerified: true,
        phone: '+6281234567893',
        bio: 'Owner of premium event venues in Jakarta',
        location: 'Jakarta, Indonesia',
        latitude: -6.2088,
        longitude: 106.8456,
      },
      {
        id: 'attendee-001',
        email: 'alice.attendee@eventa.com',
        username: 'aliceattendee',
        firstName: 'Alice',
        lastName: 'Smith',
        password: hashedPassword,
        role: 'ATTENDEE',
        isVerified: true,
        phone: '+6281234567894',
        location: 'Jakarta, Indonesia',
        latitude: -6.2088,
        longitude: 106.8456,
      },
      {
        id: 'attendee-002',
        email: 'bob.attendee@eventa.com',
        username: 'bobattendee',
        firstName: 'Bob',
        lastName: 'Wilson',
        password: hashedPassword,
        role: 'ATTENDEE',
        isVerified: true,
        phone: '+6281234567895',
        location: 'Surabaya, Indonesia',
        latitude: -7.2575,
        longitude: 112.7521,
      },
    ],
  });

  console.log('👥 Created users');

  // Create Categories
  const categories = await prisma.category.createMany({
    data: [
      {
        id: 'cat-tech',
        name: 'Technology',
        description: 'Tech conferences, workshops, and meetups',
        icon: 'tech-icon',
        color: '#3B82F6',
      },
      {
        id: 'cat-business',
        name: 'Business',
        description: 'Business conferences, networking events, and seminars',
        icon: 'business-icon',
        color: '#10B981',
      },
      {
        id: 'cat-music',
        name: 'Music',
        description: 'Concerts, music festivals, and live performances',
        icon: 'music-icon',
        color: '#F59E0B',
      },
      {
        id: 'cat-sports',
        name: 'Sports',
        description: 'Sports events, tournaments, and fitness activities',
        icon: 'sports-icon',
        color: '#EF4444',
      },
      {
        id: 'cat-food',
        name: 'Food & Drink',
        description: 'Food festivals, cooking classes, and tastings',
        icon: 'food-icon',
        color: '#8B5CF6',
      },
      {
        id: 'cat-art',
        name: 'Arts & Culture',
        description: 'Art exhibitions, cultural events, and workshops',
        icon: 'art-icon',
        color: '#EC4899',
      },
      {
        id: 'cat-education',
        name: 'Education',
        description: 'Workshops, seminars, and educational events',
        icon: 'education-icon',
        color: '#06B6D4',
      },
    ],
  });

  console.log('📂 Created categories');

  // Create Venues
  const venues = await prisma.venue.createMany({
    data: [
      {
        id: 'venue-001',
        name: 'Grand Ballroom Jakarta',
        description: 'Premium event venue in central Jakarta with state-of-the-art facilities',
        address: 'Jl. MH Thamrin No. 1',
        city: 'Jakarta',
        state: 'DKI Jakarta',
        country: 'Indonesia',
        postalCode: '10310',
        latitude: -6.1944,
        longitude: 106.8229,
        capacity: 500,
        facilities: ['WiFi', 'AC', 'Sound System', 'Projector', 'Parking', 'Catering'],
        images: ['/venues/grand-ballroom-1.jpg', '/venues/grand-ballroom-2.jpg'],
        contactEmail: 'booking@grandballroom.com',
        contactPhone: '+6212345678901',
        website: 'https://grandballroom.com',
        ownerId: 'venue-owner-001',
      },
      {
        id: 'venue-002',
        name: 'Tech Hub Bandung',
        description: 'Modern tech-focused venue perfect for conferences and meetups',
        address: 'Jl. Dago No. 123',
        city: 'Bandung',
        state: 'West Java',
        country: 'Indonesia',
        postalCode: '40135',
        latitude: -6.8951,
        longitude: 107.6081,
        capacity: 200,
        facilities: ['High-speed WiFi', 'Smart Boards', 'Video Conferencing', 'Coffee Bar'],
        images: ['/venues/tech-hub-1.jpg', '/venues/tech-hub-2.jpg'],
        contactEmail: 'events@techhub-bdg.com',
        contactPhone: '+6222345678902',
        website: 'https://techhub-bandung.com',
        ownerId: 'venue-owner-001',
      },
      {
        id: 'venue-003',
        name: 'Surabaya Convention Center',
        description: 'Large convention center suitable for major conferences and exhibitions',
        address: 'Jl. Basuki Rahmat No. 456',
        city: 'Surabaya',
        state: 'East Java',
        country: 'Indonesia',
        postalCode: '60271',
        latitude: -7.2504,
        longitude: 112.7688,
        capacity: 1000,
        facilities: ['Multiple Halls', 'Exhibition Space', 'Food Court', 'VIP Rooms'],
        images: ['/venues/convention-center-1.jpg'],
        contactEmail: 'info@surabayacc.com',
        contactPhone: '+6231345678903',
      },
      {
        id: 'venue-004',
        name: 'Rooftop Garden Jakarta',
        description: 'Beautiful outdoor venue with city skyline views',
        address: 'Jl. Sudirman No. 789',
        city: 'Jakarta',
        state: 'DKI Jakarta',
        country: 'Indonesia',
        postalCode: '12190',
        latitude: -6.2088,
        longitude: 106.8456,
        capacity: 150,
        facilities: ['Outdoor Setting', 'City View', 'Garden Area', 'Bar'],
        images: ['/venues/rooftop-garden-1.jpg'],
        contactEmail: 'events@rooftopgarden.com',
        contactPhone: '+6212345678904',
      },
    ],
  });

  console.log('🏢 Created venues');

  // Create Events
  const events = await prisma.event.createMany({
    data: [
      {
        id: 'event-001',
        title: 'Indonesia Tech Summit 2024',
        description: 'The biggest technology conference in Indonesia featuring international speakers, startup showcases, and networking opportunities.',
        summary: 'A premier tech conference bringing together industry leaders, developers, and innovators.',
        startDate: new Date('2024-09-15T09:00:00Z'),
        endDate: new Date('2024-09-15T17:00:00Z'),
        timezone: 'Asia/Jakarta',
        maxAttendees: 500,
        minAge: 18,
        tags: ['technology', 'conference', 'networking', 'startup'],
        images: ['/events/tech-summit-1.jpg', '/events/tech-summit-2.jpg'],
        status: 'PUBLISHED',
        visibility: 'PUBLIC',
        organizerId: 'organizer-001',
        categoryId: 'cat-tech',
        venueId: 'venue-001',
      },
      {
        id: 'event-002',
        title: 'Digital Marketing Masterclass',
        description: 'Learn advanced digital marketing strategies from industry experts. Topics include SEO, social media marketing, content strategy, and analytics.',
        summary: 'Comprehensive workshop on digital marketing best practices.',
        startDate: new Date('2024-09-20T10:00:00Z'),
        endDate: new Date('2024-09-20T16:00:00Z'),
        timezone: 'Asia/Jakarta',
        maxAttendees: 100,
        tags: ['marketing', 'workshop', 'business', 'digital'],
        images: ['/events/marketing-masterclass-1.jpg'],
        status: 'PUBLISHED',
        visibility: 'PUBLIC',
        organizerId: 'organizer-002',
        categoryId: 'cat-business',
        venueId: 'venue-002',
      },
      {
        id: 'event-003',
        title: 'Jakarta Music Festival',
        description: 'Three-day music festival featuring local and international artists across multiple genres.',
        summary: 'The biggest music festival in Jakarta with 50+ artists.',
        startDate: new Date('2024-10-01T16:00:00Z'),
        endDate: new Date('2024-10-03T23:00:00Z'),
        timezone: 'Asia/Jakarta',
        maxAttendees: 10000,
        minAge: 16,
        tags: ['music', 'festival', 'entertainment', 'outdoor'],
        images: ['/events/music-festival-1.jpg', '/events/music-festival-2.jpg'],
        status: 'PUBLISHED',
        visibility: 'PUBLIC',
        organizerId: 'organizer-001',
        categoryId: 'cat-music',
        venueId: 'venue-004',
      },
      {
        id: 'event-004',
        title: 'Startup Networking Night',
        description: 'Monthly networking event for startup founders, investors, and entrepreneurs.',
        summary: 'Connect with the startup ecosystem in Jakarta.',
        startDate: new Date('2024-09-25T18:00:00Z'),
        endDate: new Date('2024-09-25T21:00:00Z'),
        timezone: 'Asia/Jakarta',
        maxAttendees: 80,
        tags: ['startup', 'networking', 'business', 'entrepreneurs'],
        images: ['/events/startup-networking-1.jpg'],
        status: 'PUBLISHED',
        visibility: 'PUBLIC',
        requiresApproval: true,
        organizerId: 'organizer-002',
        categoryId: 'cat-business',
        venueId: 'venue-002',
      },
      {
        id: 'event-005',
        title: 'Indonesian Food Festival',
        description: 'Celebrate Indonesian cuisine with food stalls, cooking demonstrations, and cultural performances.',
        summary: 'A culinary journey through Indonesian flavors.',
        startDate: new Date('2024-10-15T11:00:00Z'),
        endDate: new Date('2024-10-15T22:00:00Z'),
        timezone: 'Asia/Jakarta',
        maxAttendees: 2000,
        tags: ['food', 'festival', 'culture', 'family'],
        images: ['/events/food-festival-1.jpg'],
        status: 'PUBLISHED',
        visibility: 'PUBLIC',
        organizerId: 'organizer-001',
        categoryId: 'cat-food',
        venueId: 'venue-003',
      },
    ],
  });

  console.log('🎪 Created events');

  // Create Ticket Tiers
  const ticketTiers = await prisma.ticketTier.createMany({
    data: [
      // Tech Summit tickets
      {
        id: 'tier-001',
        name: 'Early Bird',
        description: 'Limited early bird pricing with all conference access',
        price: 250000,
        totalQuantity: 100,
        remainingQuantity: 85,
        salesStartDate: new Date('2024-08-01T00:00:00Z'),
        salesEndDate: new Date('2024-09-01T23:59:59Z'),
        maxPerUser: 2,
        eventId: 'event-001',
      },
      {
        id: 'tier-002',
        name: 'Regular',
        description: 'Standard conference ticket with full access',
        price: 350000,
        totalQuantity: 300,
        remainingQuantity: 280,
        salesStartDate: new Date('2024-09-01T00:00:00Z'),
        salesEndDate: new Date('2024-09-14T23:59:59Z'),
        maxPerUser: 3,
        eventId: 'event-001',
      },
      {
        id: 'tier-003',
        name: 'VIP',
        description: 'VIP access with networking dinner and premium seating',
        price: 500000,
        totalQuantity: 100,
        remainingQuantity: 95,
        salesStartDate: new Date('2024-08-01T00:00:00Z'),
        salesEndDate: new Date('2024-09-14T23:59:59Z'),
        maxPerUser: 1,
        eventId: 'event-001',
      },
      // Digital Marketing tickets
      {
        id: 'tier-004',
        name: 'Workshop Ticket',
        description: 'Full day workshop with materials and lunch included',
        price: 150000,
        totalQuantity: 100,
        remainingQuantity: 90,
        salesStartDate: new Date('2024-08-15T00:00:00Z'),
        salesEndDate: new Date('2024-09-19T23:59:59Z'),
        maxPerUser: 1,
        eventId: 'event-002',
      },
      // Music Festival tickets
      {
        id: 'tier-005',
        name: 'General Admission',
        description: '3-day festival pass with access to all stages',
        price: 400000,
        totalQuantity: 8000,
        remainingQuantity: 7500,
        salesStartDate: new Date('2024-07-01T00:00:00Z'),
        salesEndDate: new Date('2024-09-30T23:59:59Z'),
        maxPerUser: 4,
        eventId: 'event-003',
      },
      {
        id: 'tier-006',
        name: 'VIP Festival Pass',
        description: 'VIP area access, priority entry, and exclusive merchandise',
        price: 750000,
        totalQuantity: 500,
        remainingQuantity: 450,
        salesStartDate: new Date('2024-07-01T00:00:00Z'),
        salesEndDate: new Date('2024-09-30T23:59:59Z'),
        maxPerUser: 2,
        eventId: 'event-003',
      },
      // Startup Networking tickets
      {
        id: 'tier-007',
        name: 'Networking Pass',
        description: 'Access to networking event with food and drinks',
        price: 100000,
        totalQuantity: 80,
        remainingQuantity: 70,
        salesStartDate: new Date('2024-09-01T00:00:00Z'),
        salesEndDate: new Date('2024-09-24T23:59:59Z'),
        maxPerUser: 1,
        eventId: 'event-004',
      },
      // Food Festival tickets
      {
        id: 'tier-008',
        name: 'Food Festival Entry',
        description: 'Entry to food festival (food sold separately)',
        price: 50000,
        totalQuantity: 1500,
        remainingQuantity: 1400,
        salesStartDate: new Date('2024-09-01T00:00:00Z'),
        salesEndDate: new Date('2024-10-14T23:59:59Z'),
        maxPerUser: 5,
        eventId: 'event-005',
      },
      {
        id: 'tier-009',
        name: 'Food Festival + Tasting',
        description: 'Entry plus 5 food tasting vouchers',
        price: 125000,
        totalQuantity: 500,
        remainingQuantity: 480,
        salesStartDate: new Date('2024-09-01T00:00:00Z'),
        salesEndDate: new Date('2024-10-14T23:59:59Z'),
        maxPerUser: 3,
        eventId: 'event-005',
      },
    ],
  });

  console.log('🎫 Created ticket tiers');

  // Create some sample payments and tickets
  const payments = await prisma.payment.createMany({
    data: [
      {
        id: 'payment-001',
        amount: 250000,
        status: 'PAID',
        midtransOrderId: 'ORDER-001-2024',
        midtransTransactionId: 'TXN-001-2024',
        paymentMethod: 'credit_card',
        paymentChannel: 'visa',
        paidAt: new Date('2024-08-15T10:30:00Z'),
        userId: 'attendee-001',
      },
      {
        id: 'payment-002',
        amount: 350000,
        status: 'PAID',
        midtransOrderId: 'ORDER-002-2024',
        midtransTransactionId: 'TXN-002-2024',
        paymentMethod: 'bank_transfer',
        paymentChannel: 'bca',
        paidAt: new Date('2024-08-20T14:15:00Z'),
        userId: 'attendee-002',
      },
      {
        id: 'payment-003',
        amount: 150000,
        status: 'PAID',
        midtransOrderId: 'ORDER-003-2024',
        midtransTransactionId: 'TXN-003-2024',
        paymentMethod: 'e_wallet',
        paymentChannel: 'gopay',
        paidAt: new Date('2024-08-22T09:45:00Z'),
        userId: 'attendee-001',
      },
    ],
  });

  console.log('💳 Created payments');

  // Create tickets
  const tickets = await prisma.ticket.createMany({
    data: [
      {
        id: 'ticket-001',
        ticketNumber: 'TIK-001-2024-001',
        qrCode: 'QR-001-2024-001',
        status: 'ACTIVE',
        userId: 'attendee-001',
        eventId: 'event-001',
        ticketTierId: 'tier-001',
        paymentId: 'payment-001',
      },
      {
        id: 'ticket-002',
        ticketNumber: 'TIK-001-2024-002',
        qrCode: 'QR-001-2024-002',
        status: 'ACTIVE',
        userId: 'attendee-002',
        eventId: 'event-001',
        ticketTierId: 'tier-002',
        paymentId: 'payment-002',
      },
      {
        id: 'ticket-003',
        ticketNumber: 'TIK-002-2024-001',
        qrCode: 'QR-002-2024-001',
        status: 'ACTIVE',
        userId: 'attendee-001',
        eventId: 'event-002',
        ticketTierId: 'tier-004',
        paymentId: 'payment-003',
      },
    ],
  });

  console.log('🎟️ Created tickets');

  // Create event attendees
  const eventAttendees = await prisma.eventAttendee.createMany({
    data: [
      {
        id: 'attendee-reg-001',
        status: 'CONFIRMED',
        userId: 'attendee-001',
        eventId: 'event-001',
      },
      {
        id: 'attendee-reg-002',
        status: 'CONFIRMED',
        userId: 'attendee-002',
        eventId: 'event-001',
      },
      {
        id: 'attendee-reg-003',
        status: 'CONFIRMED',
        userId: 'attendee-001',
        eventId: 'event-002',
      },
      {
        id: 'attendee-reg-004',
        status: 'REGISTERED',
        userId: 'attendee-002',
        eventId: 'event-003',
      },
    ],
  });

  console.log('👥 Created event attendees');

  // Create user favorites
  const userFavorites = await prisma.userFavorite.createMany({
    data: [
      {
        id: 'fav-001',
        userId: 'attendee-001',
        eventId: 'event-001',
      },
      {
        id: 'fav-002',
        userId: 'attendee-001',
        eventId: 'event-003',
      },
      {
        id: 'fav-003',
        userId: 'attendee-002',
        eventId: 'event-002',
      },
      {
        id: 'fav-004',
        userId: 'attendee-002',
        eventId: 'event-005',
      },
    ],
  });

  console.log('❤️ Created user favorites');

  // Create sample reviews
  const reviews = await prisma.review.createMany({
    data: [
      {
        id: 'review-001',
        rating: 5,
        comment: 'Excellent conference! Great speakers and well-organized event.',
        userId: 'attendee-001',
        eventId: 'event-001',
      },
      {
        id: 'review-002',
        rating: 4,
        comment: 'Very informative workshop. Would recommend to others.',
        userId: 'attendee-001',
        eventId: 'event-002',
      },
    ],
  });

  console.log('⭐ Created reviews');

  // Create sample notifications
  const notifications = await prisma.notification.createMany({
    data: [
      {
        id: 'notif-001',
        title: 'Event Reminder',
        message: 'Indonesia Tech Summit 2024 starts tomorrow!',
        type: 'EVENT_REMINDER',
        isRead: false,
        userId: 'attendee-001',
        eventId: 'event-001',
      },
      {
        id: 'notif-002',
        title: 'Payment Successful',
        message: 'Your payment for Digital Marketing Masterclass has been processed.',
        type: 'PAYMENT_SUCCESS',
        isRead: true,
        userId: 'attendee-001',
        eventId: 'event-002',
      },
      {
        id: 'notif-003',
        title: 'Ticket Purchased',
        message: 'Your ticket for Indonesia Tech Summit 2024 is ready!',
        type: 'TICKET_PURCHASED',
        isRead: true,
        userId: 'attendee-002',
        eventId: 'event-001',
      },
    ],
  });

  console.log('🔔 Created notifications');

  console.log('✅ Database seeding completed successfully!');
  
  // Log summary
  const summary = {
    users: await prisma.user.count(),
    categories: await prisma.category.count(),
    venues: await prisma.venue.count(),
    events: await prisma.event.count(),
    ticketTiers: await prisma.ticketTier.count(),
    tickets: await prisma.ticket.count(),
    payments: await prisma.payment.count(),
    eventAttendees: await prisma.eventAttendee.count(),
    reviews: await prisma.review.count(),
    notifications: await prisma.notification.count(),
  };
  
  console.log('📊 Seeding Summary:', summary);
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });