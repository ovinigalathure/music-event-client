// Mock data for events
export const mockEvents = [
  {
    id: "1",
    name: "Summer Music Festival",
    description:
      "The biggest summer music festival featuring top artists from around the world. Join us for three days of non-stop music, food, and fun!",
    date: "2025-06-15T14:00:00",
    endDate: "2025-06-17T23:00:00",
    venue: "Central Park, New York",
    image: "/placeholder.svg?height=400&width=600",
    price: 149.99,
    category: "Festival",
    featured: true,
    artists: ["1", "3", "5", "8"],
    tickets: {
      total: 5000,
      sold: 3750,
    },
    gallery: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
  },
  {
    id: "2",
    name: "Jazz Night",
    description:
      "An intimate evening of smooth jazz with renowned jazz musicians. Enjoy a sophisticated night of music in a cozy atmosphere with drinks and appetizers.",
    date: "2025-05-20T19:30:00",
    endDate: "2025-05-20T23:00:00",
    venue: "Blue Note Jazz Club, Chicago",
    image: "/placeholder.svg?height=400&width=600",
    price: 75.0,
    category: "Jazz",
    featured: false,
    artists: ["2", "7"],
    tickets: {
      total: 200,
      sold: 150,
    },
    gallery: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
  },
  {
    id: "3",
    name: "Rock Concert",
    description:
      "Get ready to rock with the most energetic rock bands of the decade. This high-energy concert will feature pyrotechnics, light shows, and non-stop rock music.",
    date: "2025-07-10T18:00:00",
    endDate: "2025-07-10T23:00:00",
    venue: "Madison Square Garden, New York",
    image: "/placeholder.svg?height=400&width=600",
    price: 89.99,
    category: "Rock",
    featured: true,
    artists: ["4", "6"],
    tickets: {
      total: 15000,
      sold: 12000,
    },
    gallery: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
  },
  {
    id: "4",
    name: "Electronic Dance Music Festival",
    description:
      "The ultimate EDM experience with world-class DJs, incredible light shows, and state-of-the-art sound systems. Dance the night away under the stars.",
    date: "2025-08-05T16:00:00",
    endDate: "2025-08-07T02:00:00",
    venue: "Las Vegas Motor Speedway, Las Vegas",
    image: "/placeholder.svg?height=400&width=600",
    price: 199.99,
    category: "Electronic",
    featured: true,
    artists: ["9", "10"],
    tickets: {
      total: 30000,
      sold: 25000,
    },
    gallery: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
  },
  {
    id: "5",
    name: "Classical Symphony",
    description:
      "Experience the beauty of classical music performed by a world-renowned symphony orchestra. The program includes masterpieces by Mozart, Beethoven, and Tchaikovsky.",
    date: "2025-06-30T19:00:00",
    endDate: "2025-06-30T21:30:00",
    venue: "Symphony Hall, Boston",
    image: "/placeholder.svg?height=400&width=600",
    price: 120.0,
    category: "Classical",
    featured: false,
    artists: [],
    tickets: {
      total: 1800,
      sold: 1200,
    },
    gallery: ["/placeholder.svg?height=600&width=800", "/placeholder.svg?height=600&width=800"],
  },
  {
    id: "6",
    name: "Country Music Fest",
    description:
      "A celebration of country music featuring top country artists, line dancing, and southern hospitality. Bring your cowboy boots and get ready for a good time!",
    date: "2025-07-25T12:00:00",
    endDate: "2025-07-27T23:00:00",
    venue: "Riverfront Park, Nashville",
    image: "/placeholder.svg?height=400&width=600",
    price: 129.99,
    category: "Country",
    featured: false,
    artists: ["11", "12"],
    tickets: {
      total: 10000,
      sold: 7500,
    },
    gallery: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
  },
  {
    id: "7",
    name: "Hip Hop Summit",
    description:
      "The ultimate hip hop experience featuring legendary rappers and emerging artists. Celebrate the culture with music, dance battles, and graffiti art exhibitions.",
    date: "2025-09-15T15:00:00",
    endDate: "2025-09-15T23:00:00",
    venue: "Barclays Center, Brooklyn",
    image: "/placeholder.svg?height=400&width=600",
    price: 95.0,
    category: "Hip Hop",
    featured: true,
    artists: ["13", "14"],
    tickets: {
      total: 12000,
      sold: 9000,
    },
    gallery: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
  },
  {
    id: "8",
    name: "Indie Music Showcase",
    description:
      "Discover the best indie bands and solo artists in this intimate showcase. Support independent music and be the first to hear tomorrow's hits.",
    date: "2025-05-10T18:30:00",
    endDate: "2025-05-10T23:00:00",
    venue: "The Independent, San Francisco",
    image: "/placeholder.svg?height=400&width=600",
    price: 45.0,
    category: "Indie",
    featured: false,
    artists: ["15", "16", "17"],
    tickets: {
      total: 500,
      sold: 350,
    },
    gallery: ["/placeholder.svg?height=600&width=800", "/placeholder.svg?height=600&width=800"],
  },
  {
    id: "9",
    name: "Latin Music Fiesta",
    description:
      "A vibrant celebration of Latin music and culture with salsa, reggaeton, and Latin pop performances. Dance the night away to infectious rhythms!",
    date: "2025-08-20T17:00:00",
    endDate: "2025-08-20T23:30:00",
    venue: "Bayfront Park, Miami",
    image: "/placeholder.svg?height=400&width=600",
    price: 85.0,
    category: "Latin",
    featured: false,
    artists: ["18", "19"],
    tickets: {
      total: 8000,
      sold: 6000,
    },
    gallery: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
  },
  {
    id: "10",
    name: "Blues & Soul Night",
    description:
      "Feel the emotion and power of blues and soul music performed by talented vocalists and musicians. An unforgettable night of heartfelt music.",
    date: "2025-06-05T20:00:00",
    endDate: "2025-06-05T23:30:00",
    venue: "House of Blues, New Orleans",
    image: "/placeholder.svg?height=400&width=600",
    price: 65.0,
    category: "Blues",
    featured: false,
    artists: ["20", "21"],
    tickets: {
      total: 800,
      sold: 600,
    },
    gallery: ["/placeholder.svg?height=600&width=800", "/placeholder.svg?height=600&width=800"],
  },
]

// Mock data for artists
export const mockArtists = [
  {
    id: "1",
    name: "Melody Masters",
    genre: "Pop/Rock",
    image: "/placeholder.svg?height=300&width=300",
    bio: "A chart-topping band known for their catchy hooks and energetic performances.",
    social: {
      spotify: "https://spotify.com",
      instagram: "https://instagram.com",
      youtube: "https://youtube.com",
    },
  },
  {
    id: "2",
    name: "Jazz Ensemble",
    genre: "Jazz",
    image: "/placeholder.svg?height=300&width=300",
    bio: "A collective of talented jazz musicians bringing smooth sounds to audiences worldwide.",
    social: {
      spotify: "https://spotify.com",
      instagram: "https://instagram.com",
      youtube: "https://youtube.com",
    },
  },
  {
    id: "3",
    name: "Electric Dreams",
    genre: "Electronic",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Pioneering electronic music producers known for their innovative sounds and immersive performances.",
    social: {
      spotify: "https://spotify.com",
      instagram: "https://instagram.com",
      youtube: "https://youtube.com",
    },
  },
  {
    id: "4",
    name: "Rock Legends",
    genre: "Rock",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Hard-hitting rock band with powerful vocals and guitar-driven anthems.",
    social: {
      spotify: "https://spotify.com",
      instagram: "https://instagram.com",
      youtube: "https://youtube.com",
    },
  },
  {
    id: "5",
    name: "Sarah Johnson",
    genre: "Pop",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Award-winning pop vocalist with a powerful range and emotional performances.",
    social: {
      spotify: "https://spotify.com",
      instagram: "https://instagram.com",
      youtube: "https://youtube.com",
    },
  },
  {
    id: "6",
    name: "Metal Mayhem",
    genre: "Metal",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Intense metal band known for their technical prowess and high-energy shows.",
    social: {
      spotify: "https://spotify.com",
      instagram: "https://instagram.com",
      youtube: "https://youtube.com",
    },
  },
  {
    id: "7",
    name: "Michael Davis Trio",
    genre: "Jazz",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Acclaimed jazz trio led by pianist Michael Davis, known for their improvisational skills.",
    social: {
      spotify: "https://spotify.com",
      instagram: "https://instagram.com",
      youtube: "https://youtube.com",
    },
  },
  {
    id: "8",
    name: "Indie Waves",
    genre: "Indie",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Independent band with a unique sound blending folk, rock, and electronic elements.",
    social: {
      spotify: "https://spotify.com",
      instagram: "https://instagram.com",
      youtube: "https://youtube.com",
    },
  },
  {
    id: "9",
    name: "DJ Pulse",
    genre: "Electronic",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Internationally renowned DJ known for epic sets that keep the dance floor moving all night.",
    social: {
      spotify: "https://spotify.com",
      instagram: "https://instagram.com",
      youtube: "https://youtube.com",
    },
  },
  {
    id: "10",
    name: "Bass Droppers",
    genre: "EDM",
    image: "/placeholder.svg?height=300&width=300",
    bio: "EDM duo creating massive bass drops and unforgettable festival moments.",
    social: {
      spotify: "https://spotify.com",
      instagram: "https://instagram.com",
      youtube: "https://youtube.com",
    },
  },
]

// Mock data for venues
export const mockVenues = [
  {
    id: "1",
    name: "Madison Square Garden",
    location: "New York, NY",
    capacity: 20000,
    description: "One of the most famous arenas in the world, hosting major concerts and events.",
    image: "/placeholder.svg?height=500&width=800",
    amenities: ["Parking", "Food & Beverages", "VIP Sections", "Accessibility"],
    upcoming_events: ["3"],
    gallery: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
  },
  {
    id: "2",
    name: "Central Park",
    location: "New York, NY",
    capacity: 50000,
    description: "Beautiful outdoor venue in the heart of Manhattan, perfect for summer festivals.",
    image: "/placeholder.svg?height=500&width=800",
    amenities: ["Open Air", "Food Vendors", "Public Transportation"],
    upcoming_events: ["1"],
    gallery: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
  },
  {
    id: "3",
    name: "Blue Note Jazz Club",
    location: "Chicago, IL",
    capacity: 200,
    description: "Intimate jazz club with excellent acoustics and a sophisticated atmosphere.",
    image: "/placeholder.svg?height=500&width=800",
    amenities: ["Full Bar", "Dinner Service", "VIP Seating"],
    upcoming_events: ["2"],
    gallery: ["/placeholder.svg?height=600&width=800", "/placeholder.svg?height=600&width=800"],
  },
  {
    id: "4",
    name: "Las Vegas Motor Speedway",
    location: "Las Vegas, NV",
    capacity: 100000,
    description: "Massive outdoor venue that transforms into an electronic music paradise.",
    image: "/placeholder.svg?height=500&width=800",
    amenities: ["Camping", "Multiple Stages", "Food & Beverage", "VIP Areas"],
    upcoming_events: ["4"],
    gallery: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
  },
  {
    id: "5",
    name: "Symphony Hall",
    location: "Boston, MA",
    capacity: 2000,
    description: "Renowned for its perfect acoustics and elegant design, ideal for classical performances.",
    image: "/placeholder.svg?height=500&width=800",
    amenities: ["Premium Seating", "Coat Check", "Bar Service"],
    upcoming_events: ["5"],
    gallery: ["/placeholder.svg?height=600&width=800", "/placeholder.svg?height=600&width=800"],
  },
  {
    id: "6",
    name: "Riverfront Park",
    location: "Nashville, TN",
    capacity: 15000,
    description: "Beautiful outdoor venue along the Cumberland River, perfect for country music festivals.",
    image: "/placeholder.svg?height=500&width=800",
    amenities: ["River Views", "Food Vendors", "Family Areas"],
    upcoming_events: ["6"],
    gallery: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
  },
]

// Mock data for team members
export const mockTeamMembers = [
  {
    id: "1",
    name: "Emily Johnson",
    position: "Event Director",
    image: "/placeholder.svg?height=300&width=300",
    bio: "With over 10 years of experience in event planning, Emily leads our team with creativity and precision.",
    specialties: ["Festival Planning", "Artist Relations", "Strategic Planning"],
    contact: "emily@rhythmevents.com",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
  },
  {
    id: "2",
    name: "David Chen",
    position: "Technical Director",
    image: "/placeholder.svg?height=300&width=300",
    bio: "David ensures all our events have flawless sound, lighting, and technical production.",
    specialties: ["Sound Engineering", "Lighting Design", "Stage Management"],
    contact: "david@rhythmevents.com",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
  },
  {
    id: "3",
    name: "Sarah Williams",
    position: "Marketing Manager",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Sarah creates compelling marketing campaigns that build excitement for our events.",
    specialties: ["Digital Marketing", "Social Media", "Brand Partnerships"],
    contact: "sarah@rhythmevents.com",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
  },
  {
    id: "4",
    name: "Michael Rodriguez",
    position: "Venue Coordinator",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Michael works with venues to ensure each space is perfectly suited for our events.",
    specialties: ["Venue Relations", "Space Planning", "Logistics"],
    contact: "michael@rhythmevents.com",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
  },
  {
    id: "5",
    name: "Jessica Kim",
    position: "Artist Relations",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Jessica manages our relationships with artists and ensures they have everything they need.",
    specialties: ["Talent Booking", "Contract Negotiation", "Hospitality"],
    contact: "jessica@rhythmevents.com",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
  },
  {
    id: "6",
    name: "Robert Taylor",
    position: "Production Manager",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Robert oversees all aspects of event production, from setup to teardown.",
    specialties: ["Event Production", "Team Management", "Budget Planning"],
    contact: "robert@rhythmevents.com",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
  },
]

// Mock data for FAQs
export const mockFAQs = [
  {
    id: "1",
    question: "How do I purchase tickets for an event?",
    answer:
      "You can purchase tickets directly through our website. Navigate to the event page, select the number of tickets you want, and proceed to checkout. We accept all major credit cards and PayPal.",
  },
  {
    id: "2",
    question: "What is your refund policy?",
    answer:
      "Tickets are generally non-refundable. However, if an event is canceled, you will receive a full refund. If an event is postponed, your tickets will be valid for the new date.",
  },
  {
    id: "3",
    question: "Can I transfer my tickets to someone else?",
    answer:
      "Yes, tickets are transferable. You can transfer your tickets to another person through your account dashboard.",
  },
  {
    id: "4",
    question: "How do I get to the venue?",
    answer:
      "Each event page includes detailed directions to the venue. We also provide information about parking and public transportation options.",
  },
  {
    id: "5",
    question: "Are there age restrictions for events?",
    answer:
      "Age restrictions vary by event. This information is clearly stated on each event page. Some events are all-ages, while others may be 18+ or 21+.",
  },
  {
    id: "6",
    question: "What should I bring to an event?",
    answer:
      "You should bring your ticket (printed or digital), a valid ID, and any items specified for the particular event. Prohibited items are listed on the event page.",
  },
  {
    id: "7",
    question: "How can I become a vendor at your events?",
    answer:
      "We welcome vendor applications for our festivals and larger events. Please contact us through the form on our website with details about your business.",
  },
  {
    id: "8",
    question: "Do you offer VIP packages?",
    answer:
      "Yes, many of our events offer VIP packages that include premium seating, exclusive access areas, merchandise, and more. Check the specific event page for VIP options.",
  },
  {
    id: "9",
    question: "How can I contact customer support?",
    answer:
      "You can reach our customer support team through the contact form on our website, by email at support@rhythmevents.com, or by phone at (555) 123-4567 during business hours.",
  },
  {
    id: "10",
    question: "Can I request special accommodations for accessibility?",
    answer:
      "Absolutely. We strive to make our events accessible to everyone. Please contact us at least 2 weeks before the event to arrange any special accommodations you may need.",
  },
]

