/**
 * Kuyakhanya FM — Static fallback data (mirrors Strapi seed)
 * Used when API is offline so UI still renders fully.
 */

export const siteData = {
  hero: {
    title: 'Bringing Light to Thembalethu',
    subtitle: 'Uplifting, inspiring, and transforming lives through the light of Christ',
    cta: 'Listen Live Now',
    ctaHref: '#listen-live',
  },
  introduction:
    'Kuyakhanya FM is an online radio station birthed from a God-given vision. Through a dream, the call came to bring light to the people of Thembalethu. The station exists to uplift, inspire, and transform lives by spreading the light of Christ, especially to those walking in spiritual darkness. Kuyakhanya FM is more than just radio; it is a movement of hope, unity, and empowerment for the community.',
  about:
    'Kuyakhanya FM is established to be a beacon of hope, faith, and transformation in Thembalethu and beyond. Our goal is to use the power of broadcasting to bring people together, spread the love of God, and empower individuals through uplifting music, inspirational messages, and community-driven programs. We believe that by shining brighter together, we can light the way for generations to come.',
  vision:
    'To be the light of hope and transformation in Thembalethu and beyond, shining the love of God through radio broadcasting, inspiring positive change, and uniting the community to walk in truth, purpose, and spiritual growth.',
  mission: [
    'To spread the light of Christ to those living in spiritual darkness, bringing encouragement, faith, and restoration.',
    'To provide uplifting music, inspiring messages, and community-driven programs that empower individuals and families.',
    'To be a voice of unity, hope, and transformation, helping people discover their God-given potential.',
    'To create a platform that promotes local talent, culture, and testimonies of God\'s goodness.',
  ],
  aims: [
    'To serve as a platform of spiritual empowerment for the Thembalethu community.',
    'To promote local talent, creativity, and culture through radio programming.',
    'To create opportunities for dialogue, education, and positive social change.',
    'To encourage youth development through skills training, mentorship, and exposure.',
    'To build strong partnerships with churches, organizations, and the wider community to shine brighter together.',
  ],
  contact: {
    phone: '0639780839',
    whatsapp: '0639780839',
    email: 'info.kuyakhanyafm@gmail.com',
    facebook: 'https://www.facebook.com/profile.php?id=61580413033664',
    instagram: 'https://www.instagram.com/kuyakhanyafm/',
    youtube: 'https://www.youtube.com/@KuyakhanyaFM',
    tiktok: 'https://www.tiktok.com/@kuyakhanyafm',
    whatsappLink: 'https://wa.me/27639780839',
    googleFormUrl:
      'https://docs.google.com/forms/d/e/1FAIpQLScFijWKgFqrUr-etsbtSrym6_u1N13CTSPnoH9kwibxtNYyjw/viewform?embedded=true',
  },
  // Team — matches images in /public/images
  managingDirector: {
    name: 'Mr Mzoxolo Panduva',
    role: 'Managing Director',
    bio: 'Leads overall strategy and community engagement for KUYAKHANYA FM, ensuring we shine brighter together in our mission to bring light to Thembalethu.',
    photo: '/images/team 1.png',
  },
  managementTeam: [
    {
      name: 'Mrs Mthwesi',
      role: 'Station Manager',
      bio: 'Oversight of programming content and ensuring all broadcasts align with our mission and vision.',
      photo: '/images/team 2.png',
    },
    {
      name: 'Mr Simthandile Mthwesi',
      role: 'Media Manager',
      bio: 'Oversight of Media content. Marketing & sponsorship coordination for KUYAKHANYA FM.',
      photo: '/images/team 3.png',
    },
  ],
  technician: {
    name: 'Mrs Panduva',
    role: 'Technician',
    bio: 'Ensuring all technical aspects of our broadcasts run smoothly and maintaining our broadcasting equipment during live broadcasts and recordings.',
    photo: '/images/team 4.png',
  },
  presenters: [
    { name: 'Franky', role: 'Love & Life', photo: '/images/5.png' },
    { name: 'Mrs. Lolwana', role: 'Abafazi Bokholo', photo: '/images/6.png' },
    { name: 'Mrs. Klass', role: 'Inkwenkwezi Zethu', photo: '/images/team 7.png' },
    { name: 'Mrs. Mati', role: 'Ithemba Lokulila', photo: '/images/7.png' },
    { name: 'Mrs. Panduva', role: 'Ithemba Lokulila', photo: '/images/team 10.png' },
    { name: 'Kay Cee Taurus', role: 'Friday Vibes', photo: '/images/team 8.png' },
    { name: 'DJ Toto', role: 'Ezakwa Ntu', photo: '/images/8.png' },
    { name: 'Mrs. Mthwesi', role: 'Yizani Sakhe', photo: '/images/9.png' },
    { name: 'Mrs. Ndziba', role: 'Yizani Sakhe', photo: '/images/10.png' },
  ],
  // v2 additions — fallback for DatoCMS models
  services: [
    { title: 'Live Radio Streaming', slug: 'live-streaming', description: '24/7 online streaming of uplifting gospel music and inspirational programmes.', image: '/images/team 1.png', order: 1 },
    { title: 'Community Outreach', slug: 'community-outreach', description: 'On-the-ground programmes in Thembalethu supporting youth, families and churches.', image: '/images/team 9.png', order: 2 },
    { title: 'Event Coverage', slug: 'event-coverage', description: 'Live coverage of church events, crusades and community gatherings.', image: '/images/team 5.png', order: 3 },
    { title: 'Youth Development', slug: 'youth-development', description: 'Training, mentorship and exposure for young presenters and technicians.', image: '/images/team 6.png', order: 4 },
    { title: 'Audio Production', slug: 'audio-production', description: 'Professional recording, editing and podcast production for local talent.', image: '/images/team 4.png', order: 5 },
    { title: 'Marketing & Sponsorship', slug: 'marketing', description: 'Brand partnerships and sponsorship packages that shine brighter together.', image: '/images/team 3.png', order: 6 },
  ],
  news: [
    { title: 'Kuyakhanya FM Launches New Morning Devotion Slot', slug: 'morning-devotion', excerpt: 'Start your day with prayer and praise — new 05:00–06:00 devotion every weekday.', author: 'Station Manager', date: '2025-08-15', coverImage: '/images/team 1.png' },
    { title: 'Community Youth Workshop a Success', slug: 'youth-workshop', excerpt: 'Over 60 youth attended our skills workshop on radio presenting and audio editing.', author: 'Media Team', date: '2025-07-20', coverImage: '/images/team 6.png' },
    { title: 'Partner with Us — Shine Brighter Together', slug: 'partner-with-us', excerpt: 'Churches and businesses invited to partner for upcoming outreach events.', author: 'Management', date: '2025-06-28', coverImage: '/images/team 1.png' },
  ],
  aboutUs: {
    history: 'Kuyakhanya FM began as a dream — a call to bring light to Thembalethu during a time of spiritual darkness. What started as a small online stream has grown into a community movement.',
    vision: 'To be the light of hope and transformation in Thembalethu and beyond.',
    mission: 'To spread Christ’s light, uplift families and promote local talent through radio.',
    values: ['Faith', 'Community', 'Excellence', 'Integrity', 'Service'],
    impactMetrics: [
      { label: 'Listeners', value: '5000', suffix: '+' },
      { label: 'Presenters', value: '15', suffix: '+' },
      { label: 'Programmes', value: '8', suffix: '' },
      { label: 'Years Serving', value: '2', suffix: '+' },
    ],
    futurePlans: 'Expand to FM broadcast, build a youth training studio, and launch a mobile app for offline listening.',
    heroImage: '/images/team 1.png',
  },
};
