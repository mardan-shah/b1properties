import { IPropertyData, iTeamMember } from "@/types/types";


 // eslint-disable-next-line @typescript-eslint/no-unused-vars
 interface icarousalData {
  image:string;
  subtitle?:string;
  title?:string;
  price?:string;
  link?:string;
 }
export const carouselData = [
    {
      image: "/exclusive/bvlgari/1.webp",
      subtitle: "Bvlgari Resorts & Hotel",
      title: "Bvlgari Mansion",
      price: "AED 495,000,000",
      link: "exclusive/Bvlgari.html",
    },
    {
      image: "/exclusive/j20/images/home.webp",
      subtitle: "Palm Jumeirah",
      title: "Custom-built Signature Villa",
      price: "AED 250,000,000",
      link: "exclusive/Villa Frond J.html",
    },
    {
      image: "/exclusive/Ocean Mansion/images/EXTERIOR_3-2.webp",
      subtitle: "Bvlgari Resorts & Hotel",
      title: "Bvlgari Ocean Mansion",
      price: "AED 180,000,000",
      link: "exclusive/ocean mansion.html",
    },
    {
      image: "/exclusive/g11/images/home.png",
      subtitle: "Palm Jumeirah",
      title: "Billionaires’ Row Signature Villa",
      price: "AED 165,000,000",
      link: "exclusive/La Solaro.html",
    },
    {
      image: "/exclusive/Villa Palm/images/home.webp",
      subtitle: "Palm Jumeirah",
      title: "Modern Garden Villa",
      price: "Price Upon Request",
      link: "exclusive/Villa Palm.html",
    },
    {
      image: "/exclusive/Villa Frond A/images/1.webp",
      subtitle: "Palm Jumeirah",
      title: "Signature Villa",
      price: "AED 135,000,000",
      link: "exclusive/Villa Frond A.html",
    },
    {
      image: "/exclusive/Villa Frond L/images/36-2.webp",
      subtitle: "Palm Jumeirah",
      title: "Villa Frond L",
      price: "AED 65,000,000",
      link: "exclusive/Villa Frond L.html",
    },
    {
      image: "/exclusive/Mansion Al Barari/images/0.png",
      subtitle: "Al Barari",
      title: "Mansion Al Barari",
      price: "AED 75,000,000",
      link: "exclusive/mansion al barari.html",
    }
  ];


  
export const exampleProperty: IPropertyData[] = [
  {
    id: "signature-villa-j20",
    heading: 'Where Timeless Elegance Meets Modern Luxury: The Bvlgari Mansion Of Bvlgari Resorts & Hotel',
    title: "Custom-Built Signature Villa",
    subtitle: "Bvlgari Resort & Residences",
    district: "Jumeirah Bay Island",
    location: "Jumeirah Bay Island, Dubai",
    developedBy: "Developed By Meraas",
    bua: "12,837",
    price: 250_000_000,
    currency: "AED",
    bedrooms: 5,
    bathrooms: 7,
    parking: "8 Car Parking",
    plotSize: 15190.3,
    plotSizeUnit: "Sq.Ft",
    heroImage:"/exclusive/j20/images/0.png",
    handover: "Q4 2025",
    images: [
      "/exclusive/j20/images/0.png",
      "/exclusive/j20/images/bath1.webp",
      "/exclusive/j20/images/bed 1.webp",
      "/exclusive/j20/images/cinema.webp",
      "/exclusive/j20/images/dining formal.webp",
      "/exclusive/j20/images/gym.webp"
    ],
    featured: true,
    tag: "private-listings",
    href: `/private-listings/signature-villa-j20`,
    paymentPlan:"80/20",
    downPayment: "20%",
    duringConstructionPayment: "60%",
    handoverPayment: "20%",
    description: [
       "<strong>Step into a world of unparalleled sophistication with this bespoke ultra-luxury mansion, one of the most exclusive properties on the market today.</strong>",
      "Meticulously crafted to perfection, it seamlessly blends elegance, innovation, and world-class design to redefine luxury living in Dubai.",
      "This house is set within the ultra-luxurious <strong>Bvlgari Resort & Residences</strong> and forms part of a limited collection—just 15 exclusive mansions set on 1.8 million square meters of Jumeirah Bay. With breathtaking sea views across the glittering Dubai skyline, this iconic <strong>Burj Khalifa</strong> makes every vista a masterpiece.",
      "Glass doors from floor to ceiling blur the boundary between indoor and outdoor living, framing breathtaking views inside your residence overlooking your private garden and infinity pool. The generous skylight gives an overflow of natural light in the interiors, creating an interior effortlessly harmonious with architecture and nature.",
      "<strong>This is far more than just a house; this is a statement of luxury within one of the world's most exclusive destinations.</strong>"
    ],
    highlight: [
      { title: "Burj Al Arab", subtitle: "Distance: 15 Mins" },
      { title: "Citywalk", subtitle: "Distance: 10 Mins" },
      { title: "Dubai Airport", subtitle: "Distance: 15 Mins" }
    ],
    qrImg: "/images/code.png",
    youTubeLink: "https://www.youtube.com/embed/goFsqVqQ8H8?si=wQKXGMLtwpQcEmve",
    designer: [
      { title: "Furniture", subtitle: "Visionnaire" },
      { title: "Showpieces", subtitle: "Hermès, Baccarat" },
      { title: "Kitchen Appliances", subtitle: "Miele" },
      { title: "Speakers", subtitle: "Bang & Olufsen" }
    ],
    features: [
      {
        category: "Interior Details",
        items: ["Indoor Cinema", "Walk-In Wardrobes", "Gym"]
      },
      {
        category: "Outdoor Details",
        items: ["Beach Front", "Private Pool"]
      },
      {
        category: "Other Features",
        items: ["Car Parking", "Spa"]
      },
      {
        category: "Utilities",
        items: ["Central A/C"]
      }
    ],
    assignedAgent: "Adelina"
  },
  {
    id: "ultra-lux-villa-g11",
    title: "Ultra-Modern Marina Villa",
    heading: 'Where Timeless Elegance Meets Modern Luxury: The Bvlgari Mansion Of Bvlgari Resorts & Hotel',
    district: "Dubai Marina",
    subtitle: "Bespoke Luxury Living",
    location: "Dubai Marina, Dubai",
    developedBy: "Developed By DAMAC",
    bua: "11,000",
    price: 185_000_000,
    currency: "AED",
    bedrooms: 6,
    bathrooms: 8,
    parking: "6 Car Parking",
    handover: "Q4 2025",
    plotSize: 11800,
    plotSizeUnit: "Sq.Ft",
    heroImage:"/exclusive/g11/images/home.png",
    images: [
      "/exclusive/g11/images/home.png",
      "/exclusive/g11/images/1.webp",
      "/exclusive/g11/images/2.webp",
      "/exclusive/g11/images/3.webp",
      "/exclusive/g11/images/4.webp",
      "/exclusive/g11/images/5.webp"
    ],
    featured: false,
    href: "/private-listings/ultra-lux-villa-g11",
    tag: "private-listings",
    paymentPlan:"80/20",
    downPayment:"20%",
    duringConstructionPayment:"60%",
    handoverPayment:"20%",
    description: [
       "<strong>Step into a world of unparalleled sophistication with this bespoke ultra-luxury mansion, one of the most exclusive properties on the market today.</strong>",
      "Meticulously crafted to perfection, it seamlessly blends elegance, innovation, and world-class design to redefine luxury living in Dubai.",
      "This house is set within the ultra-luxurious <strong>Bvlgari Resort & Residences</strong> and forms part of a limited collection—just 15 exclusive mansions set on 1.8 million square meters of Jumeirah Bay. With breathtaking sea views across the glittering Dubai skyline, this iconic <strong>Burj Khalifa</strong> makes every vista a masterpiece.",
      "Glass doors from floor to ceiling blur the boundary between indoor and outdoor living, framing breathtaking views inside your residence overlooking your private garden and infinity pool. The generous skylight gives an overflow of natural light in the interiors, creating an interior effortlessly harmonious with architecture and nature.",
      "<strong>This is far more than just a house; this is a statement of luxury within one of the world's most exclusive destinations.</strong>"
    ],
    highlight: [
      { title: "Dubai Marina Mall", subtitle: "Distance: 5 Mins" },
      { title: "JBR Beach", subtitle: "Distance: 8 Mins" },
      { title: "Palm Jumeirah", subtitle: "Distance: 10 Mins" }
    ],
    qrImg: "/images/code.png",
    youTubeLink: "https://www.youtube.com/embed/goFsqVqQ8H8?si=wQKXGMLtwpQcEmve",
    designer: [
      { title: "Furniture", subtitle: "Minotti" },
      { title: "Kitchen", subtitle: "Poggenpohl" },
      { title: "Lighting", subtitle: "Tom Dixon" }
    ],
    features: [
      {
        category: "Interior Details",
        items: ["Private Elevator", "Formal Dining", "Home Office"]
      },
      {
        category: "Outdoor Details",
        items: ["Infinity Pool", "Sky Terrace"]
      }
    ],
    assignedAgent: "Adelina"
  },
  {
    id: "zen-retreat-a9",
    title: "Zen Retreat Villa",
    heading: 'Where Timeless Elegance Meets Modern Luxury: The Bvlgari Mansion Of Bvlgari Resorts & Hotel',
    district: "Al Barari",
    subtitle: "Tranquility in Design",
    location: "Al Barari, Dubai",
    developedBy: "Developed By Zaya",
    bua: "9,850",
    price: 95_000_000,
    currency: "AED",
    bedrooms: 5,
    bathrooms: 6,
    parking: "5 Car Parking",
    handover: "Q4 2025",

    plotSize: 13500,
    plotSizeUnit: "Sq.Ft",
    heroImage:"/exclusive/g11/images/home.png",
    images: [
      "/exclusive/g11/images/home.png",
      "/exclusive/g11/images/1.webp",
      "/exclusive/g11/images/2.webp",
      "/exclusive/g11/images/3.webp",
      "/exclusive/g11/images/4.webp",
      "/exclusive/g11/images/5.webp",
    ],
    featured: false,
    href: "/private-listings/zen-retreat-a9",
    tag: "private-listings",
    paymentPlan:"80/20",
    downPayment:"20%",
    duringConstructionPayment:"60%",
    handoverPayment:"20%",
    description: [
      `<p><strong>Nature meets luxury in this serene Al Barari villa designed for balance and beauty.</strong></p>`,
      `<p>Featuring flowing water features, indoor-outdoor transitions, and soft natural materials. This is Dubai’s answer to barefoot luxury.</p>`
    ],
    highlight: [
      { title: "Downtown Dubai", subtitle: "Distance: 20 Mins" },
      { title: "Dubai Hills Mall", subtitle: "Distance: 15 Mins" }
    ],
    qrImg: "/images/code.png",
    youTubeLink: "https://www.youtube.com/embed/goFsqVqQ8H8?si=wQKXGMLtwpQcEmve",
    designer: [
      { title: "Lighting", subtitle: "Flos" },
      { title: "Furniture", subtitle: "Poliform" },
      { title: "Appliances", subtitle: "Gaggenau" }
    ],
    features: [
      {
        category: "Interior Details",
        items: ["Courtyard Garden", "Open Living Areas", "Home Spa"]
      },
      {
        category: "Outdoor Details",
        items: ["Zen Garden", "Natural Pool"]
      }
    ],
    assignedAgent: "Adelina"
  },

   {
    id: "signature-villa-j20",
    heading: 'Where Timeless Elegance Meets Modern Luxury: The Bvlgari Mansion Of Bvlgari Resorts & Hotel',
    district: "Jumeirah Bay Island",
    title: "Custom-Built Signature Villa",
    subtitle: "Bvlgari Resort & Residences",
    location: "Jumeirah Bay Island, Dubai",
    developedBy: "Developed By Meraas",
    bua: "12,837",
    price: 250_000_000,
    currency: "AED",
    bedrooms: 5,
    bathrooms: 7,
    parking: "8 Car Parking",
    plotSize: 15190.3,
    plotSizeUnit: "Sq.Ft",
    heroImage:"/exclusive/j20/images/0.png",
    images: [
      "/exclusive/j20/images/0.png",
      "/exclusive/j20/images/bath1.webp",
      "/exclusive/j20/images/bed 1.webp",
      "/exclusive/j20/images/cinema.webp",
      "/exclusive/j20/images/dining formal.webp",
      "/exclusive/j20/images/gym.webp",
      "/exclusive/j20/images/0.png",
      "/exclusive/j20/images/bath1.webp",
      "/exclusive/j20/images/bed 1.webp",
      "/exclusive/j20/images/cinema.webp",
      "/exclusive/j20/images/dining formal.webp",
      "/exclusive/j20/images/gym.webp"
    ],
    featured: true,
    tag: "new-opportunities",
    href: `/new-opportunities/signature-villa-j20`,
    handover: "Q4 2025",
    paymentPlan:"80/20",
    downPayment: "20%",
    duringConstructionPayment: "60%",
    handoverPayment: "20%",
    description: [
       "<strong>Step into a world of unparalleled sophistication with this bespoke ultra-luxury mansion, one of the most exclusive properties on the market today.</strong>",
      "Meticulously crafted to perfection, it seamlessly blends elegance, innovation, and world-class design to redefine luxury living in Dubai.",
      "This house is set within the ultra-luxurious <strong>Bvlgari Resort & Residences</strong> and forms part of a limited collection—just 15 exclusive mansions set on 1.8 million square meters of Jumeirah Bay. With breathtaking sea views across the glittering Dubai skyline, this iconic <strong>Burj Khalifa</strong> makes every vista a masterpiece.",
      "Glass doors from floor to ceiling blur the boundary between indoor and outdoor living, framing breathtaking views inside your residence overlooking your private garden and infinity pool. The generous skylight gives an overflow of natural light in the interiors, creating an interior effortlessly harmonious with architecture and nature.",
      "<strong>This is far more than just a house; this is a statement of luxury within one of the world's most exclusive destinations.</strong>"
    ],
    highlight: [
      { title: "Burj Al Arab", subtitle: "Distance: 15 Mins" },
      { title: "Citywalk", subtitle: "Distance: 10 Mins" },
      { title: "Dubai Airport", subtitle: "Distance: 15 Mins" }
    ],
    qrImg: "/images/code.png",
    youTubeLink: "https://www.youtube.com/embed/goFsqVqQ8H8?si=wQKXGMLtwpQcEmve",
    designer: [
      { title: "Furniture", subtitle: "Visionnaire" },
      { title: "Showpieces", subtitle: "Hermès, Baccarat" },
      { title: "Kitchen Appliances", subtitle: "Miele" },
      { title: "Speakers", subtitle: "Bang & Olufsen" }
    ],
    features: [
      {
        category: "Interior Details",
        items: ["Indoor Cinema", "Walk-In Wardrobes", "Gym"]
      },
      {
        category: "Outdoor Details",
        items: ["Beach Front", "Private Pool"]
      },
      {
        category: "Other Features",
        items: ["Car Parking", "Spa"]
      },
      {
        category: "Utilities",
        items: ["Central A/C"]
      }
    ],
    assignedAgent: "Adelina"
  },
  {
    id: "ultra-lux-villa-g11",
    title: "Ultra-Modern Marina Villa",
    heading: 'Where Timeless Elegance Meets Modern Luxury: The Bvlgari Mansion Of Bvlgari Resorts & Hotel',
    district: "Dubai Marina",
    subtitle: "Bespoke Luxury Living",
    location: "Dubai Marina, Dubai",
    developedBy: "Developed By DAMAC",
    bua: "11,000",
    price: 185_000_000,
    currency: "AED",
    bedrooms: 6,
    bathrooms: 8,
    parking: "6 Car Parking",
    plotSize: 11800,
    plotSizeUnit: "Sq.Ft",
    heroImage:"/exclusive/g11/images/home.png",
    images: [
      "/exclusive/g11/images/home.png",
      "/exclusive/g11/images/1.webp",
      "/exclusive/g11/images/2.webp",
      "/exclusive/g11/images/3.webp",
      "/exclusive/g11/images/4.webp",
      "/exclusive/g11/images/5.webp"
    ],
    featured: false,
    href: "/new-opportunities/ultra-lux-villa-g11",
    tag: "new-opportunities",
    handover: "Q4 2025",
    paymentPlan:"80/20",
    downPayment:"20%",
    duringConstructionPayment:"60%",
    handoverPayment:"20%",
    description: [
       "<strong>Step into a world of unparalleled sophistication with this bespoke ultra-luxury mansion, one of the most exclusive properties on the market today.</strong>",
      "Meticulously crafted to perfection, it seamlessly blends elegance, innovation, and world-class design to redefine luxury living in Dubai.",
      "This house is set within the ultra-luxurious <strong>Bvlgari Resort & Residences</strong> and forms part of a limited collection—just 15 exclusive mansions set on 1.8 million square meters of Jumeirah Bay. With breathtaking sea views across the glittering Dubai skyline, this iconic <strong>Burj Khalifa</strong> makes every vista a masterpiece.",
      "Glass doors from floor to ceiling blur the boundary between indoor and outdoor living, framing breathtaking views inside your residence overlooking your private garden and infinity pool. The generous skylight gives an overflow of natural light in the interiors, creating an interior effortlessly harmonious with architecture and nature.",
      "<strong>This is far more than just a house; this is a statement of luxury within one of the world's most exclusive destinations.</strong>"
    ],
    highlight: [
      { title: "Dubai Marina Mall", subtitle: "Distance: 5 Mins" },
      { title: "JBR Beach", subtitle: "Distance: 8 Mins" },
      { title: "Palm Jumeirah", subtitle: "Distance: 10 Mins" }
    ],
    qrImg: "/images/code.png",
    youTubeLink: "https://www.youtube.com/embed/goFsqVqQ8H8?si=wQKXGMLtwpQcEmve",
    designer: [
      { title: "Furniture", subtitle: "Minotti" },
      { title: "Kitchen", subtitle: "Poggenpohl" },
      { title: "Lighting", subtitle: "Tom Dixon" }
    ],
    features: [
      {
        category: "Interior Details",
        items: ["Private Elevator", "Formal Dining", "Home Office"]
      },
      {
        category: "Outdoor Details",
        items: ["Infinity Pool", "Sky Terrace"]
      }
    ],
    assignedAgent: "Adelina"
  },
  {
    id: "zen-retreat-a9",
    title: "Zen Retreat Villa",
    heading: 'Where Timeless Elegance Meets Modern Luxury: The Bvlgari Mansion Of Bvlgari Resorts & Hotel',
    district: "Al Barari",
    subtitle: "Tranquility in Design",
    location: "Al Barari, Dubai",
    developedBy: "Developed By Zaya",
    bua: "9,850",
    price: 95_000_000,
    currency: "AED",
    bedrooms: 5,
    bathrooms: 6,
    parking: "5 Car Parking",
    plotSize: 13500,
    plotSizeUnit: "Sq.Ft",
    heroImage:"/exclusive/g11/images/home.png",
    images: [
      "/exclusive/g11/images/home.png",
      "/exclusive/g11/images/1.webp",
      "/exclusive/g11/images/2.webp",
      "/exclusive/g11/images/3.webp",
      "/exclusive/g11/images/4.webp",
      "/exclusive/g11/images/5.webp",
    ],
    featured: false,
    href: "/new-opportunities/zen-retreat-a9",
    tag: "new-opportunities",
    handover: "Q4 2025",
    paymentPlan:"80/20",
    downPayment:"20%",
    duringConstructionPayment:"60%",
    handoverPayment:"20%",
    description: [
      `<p><strong>Nature meets luxury in this serene Al Barari villa designed for balance and beauty.</strong></p>`,
      `<p>Featuring flowing water features, indoor-outdoor transitions, and soft natural materials. This is Dubai’s answer to barefoot luxury.</p>`
    ],
    highlight: [
      { title: "Downtown Dubai", subtitle: "Distance: 20 Mins" },
      { title: "Dubai Hills Mall", subtitle: "Distance: 15 Mins" }
    ],
    qrImg: "/images/code.png",
    youTubeLink: "https://www.youtube.com/embed/goFsqVqQ8H8?si=wQKXGMLtwpQcEmve",
    designer: [
      { title: "Lighting", subtitle: "Flos" },
      { title: "Furniture", subtitle: "Poliform" },
      { title: "Appliances", subtitle: "Gaggenau" }
    ],
    features: [
      {
        category: "Interior Details",
        items: ["Courtyard Garden", "Open Living Areas", "Home Spa"]
      },
      {
        category: "Outdoor Details",
        items: ["Zen Garden", "Natural Pool"]
      }
    ],
    assignedAgent: "Adelina"
  }
];



  
export const teamMembers: iTeamMember[] = [
  {
    name: 'Adelina',
    photo: '/Adelina.webp',
    languages: ['English', 'Italian', 'Romania','Russian'],
    focusArea: ['District One', 'Tilal Al Ghaf'],
    cell: '+971 56 433 8399',
    whatsapp: '+971 56 433 8399',
    email:'adelina@b1properties.ae',
    description : [
      'Adelina brings six years of distinguished real estate experience, including tenure with one of Dubai’s most exclusive boutique developers, where she curated luxury properties for discerning local and international clientele. Her unique background combines hands-on industry expertise with formal training in Civil Engineering, giving her unparalleled insight into authentic quality craftsmanship.',
      'With a professional engineer’s eye for detail, Adelina possesses exceptional discernment for genuine luxury finishes and architectural integrity. Her technical knowledge enables her to expertly guide clients through every aspect of premium property investment, distinguishing between superficial glamour and truly exceptional design.',
      'Adelina’s unique value proposition lies in this rare combination of technical expertise and luxury market experience, allowing her to provide clients with authoritative advice on Dubai’s most exclusive properties. Her approach transforms property selection into an educated pursuit of perfection.'
    ],
    properties : [
      'Lagoon Views',
      'Bluewater Bay',
      'Beach Gate',
      'Sunrise Bay',
      'Tower B Damac Bay',
    ]

  },
  {
    name: 'Kamol',
    photo: '/kamol.webp',
    languages: ['Uzbek', 'English', 'Russian'],
    focusArea: ['District One', 'District One West'],
    cell: '+971 56 433 8399',
    whatsapp: '+971 56 433 8399',
    email:'kamol@b1properties.ae',
    description : [
      'Kamol embodies professionalism, integrity, and market expertise - qualities that have established him as one of Dubai’s most trusted real estate advisors. With extensive experience in Dubai’s luxury property sector, he consistently delivers exceptional service and strategic guidance to his discerning clientele.',
      'Specializing in Dubai’s most exclusive neighborhoods including Bluewaters Island and Palm Jumeirah, Kamol combines deep local knowledge with a client-first philosophy. His commitment to excellence ensures every transaction achieves outstanding results for both buyers and sellers in these premium markets.'
    ],
    properties : [
      'D1 West Villa'
    ]
  },
  {
    name: 'Laura',
    photo: '/laura.webp',
    languages: ['English', 'French'],
    focusArea: ['Palm Jumeirah'],
    cell: '0316016069',
    whatsapp: '02313051312',
  },
  {
    name: 'Ozan',
    photo: '/ozan.webp',
    languages: ['Hindi', 'English'],
    focusArea: ['Palm Jumeirah'],
    cell: '0316016069',
    whatsapp: '02313051312',
  },
  {
    name: 'Zilla',
    photo: '/zilla.webp',
    languages: ['Russian', 'Dutch'],
    focusArea: ['Palm Jumeirah', 'Waterfront Villas'],
    cell: '0316016069',
    whatsapp: '02313051312',
  },
]