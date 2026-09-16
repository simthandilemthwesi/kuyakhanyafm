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
  // Team — matches images in /public/images (team 1–11.png)
  managingDirector: {
    name: 'Mr Mzoxolo Panduva',
    role: 'Managing Director',
    bio: 'Leads overall strategy and community engagement for KUYAKHANYA FM, ensuring we shine brighter together in our mission to bring light to Thembalethu.',
    photo: '/images/team 1.png',
  },
  managementTeam: [
    {
      name: 'Mrs Daniswa Mthwesi',
      role: 'Station Manager',
      bio: 'Oversees programming content and ensures all broadcasts align with the station\'s mission and vision.',
      photo: '/images/team 2.png',
    },
    {
      name: 'Mr Simthandile Mthwesi',
      role: 'Media Manager',
      bio: 'Responsible for media content, marketing, and sponsorship coordination for KUYAKHANYA FM.',
      photo: '/images/team 3.png',
    },
  ],
  technician: {
    name: 'Mrs Someleze Panduva',
    role: 'Technical Assistance & Administrator',
    bio: 'Provides technical support and administrative coordination for smooth station operations.',
    photo: '/images/team 4.png',
  },
  presenters: [
    { name: 'Sbu Hamza', role: 'Youth Spotlight', photo: '/images/team 5.png' },
    { name: 'Franky', role: 'Love & Life', photo: '/images/team 6.png' },
    { name: 'Mrs Klaas', role: 'Inkwenkwezi Zethu', photo: '/images/team 7.png' },
    { name: 'Mrs Mati', role: 'Ithemba Lokulila', photo: '/images/team 8.png' },
    { name: 'Mrs Lolwana', role: 'Abafazi Bokholo', photo: '/images/team 9.png' },
    { name: 'Kay Cee', role: 'Friday Vibes', photo: '/images/team 10.png' },
    { name: 'DJ Toto', role: 'Ezakwa Ntu', photo: '/images/team 11.png' },
    { name: 'Mrs Ndziba', role: 'Yizani Sakhe', photo: '/images/team 12.png' },
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
    {
      title: 'Kuyakhanya FM Is Officially Launched — Thank You, George!',
      slug: 'launch-event',
      excerpt: 'Heartfelt gratitude to Tavcor VW, Virgin Active George, CPF, George Municipality and the George community for making our launch a testimony.',
      author: 'Kuyakhanya FM',
      date: '2025-11-14',
      coverImage: '/images/kuyakhanya_launch.jpg',
      content: 'On behalf of Kuyakhanya FM, heartfelt gratitude goes to everyone who made our launch a success. Special thanks to Tavcor VW, Virgin Active George, CPF, George Municipality, and the George community for believing in our vision.\n\nThis was more than an event — it was a testimony that Kukhanya ngokwenene eThembalethu.\n\n💜 Let\'s keep the light shining for our community.\n\n#RadioLaunch #CommunityUnity #CommunityRadio #FaithDrivenBroadcast #WeShineBrighterTogether',
    },
    {
      title: 'It\'s World Radio Day!',
      slug: 'world-radio-day',
      excerpt: '🇿🇦🎙️ Before TV. Before social media. Before trends… there was RADIO. Kuyakhanya FM celebrates the voice that informs, empowers and connects Mzansi every day.',
      author: 'Kuyakhanya FM',
      date: '2026-02-13',
      coverImage: '/images/kuyakhanya_radio_day.jpg',
      content: '🇿🇦🎙️ IT\'S WORLD RADIO DAY! 🎙️🇿🇦\n\nBefore TV. Before social media. Before trends… there was RADIO.\n\nKuyakhanya FM celebrates the powerful voice that informs, empowers, and connects Mzansi every day.\n\n💜 Your Voice | 💛 Your Music | 📻 Your Community',
    },
    {
      title: 'Garden Route Storm Update — Heavy Rain & Closures',
      slug: 'garden-route-storm-update',
      excerpt: 'Heavy rains continue to impact George and the Garden Route. Level 6 warning for 7 May; multiple road closures, power outages and facility closures confirmed.',
      author: 'Kuyakhanya FM',
      date: '2026-05-06',
      coverImage: '/images/kuyakhanya_news_floods.jpg',
      content: 'Heavy rains and strong winds continue to impact George and the Garden Route. Residents are urged not to park under trees due to the risk of falling branches.\n\nWeather: Warning downgraded to Level 6 for 7 May. Rainfall — Denneoord 101 mm, Uniondale 85 mm, Haarlem 80 mm.\n\nBeaches: Victoria Bay — high seas and foam, public warned to stay away.\n\nFacilities: Pacaltsdorp Thusong Centre closed 6–7 May.\n\nPower: Outages in Uniondale, Haarlem, Avontuur, Thembalethu Zones 6–9, and Herold\'s Bay.\n\nRoads: Flooding on York Street; multiple closures including Meiringspoort, Swartberg Pass, Uniondale Poort, R62, Hospital Road, and N9.\n\nTrees: Fallen trees cleared at Pacaltsdorp–Le Grand and Waboomskraal.\n\nResidents are encouraged to follow George Municipality\'s official channels for updates.',
    },
    {
      title: '🇿🇦🚀 SOUTH AFRICA ENTERS A NEW ERA',
      slug: 'sona-2026',
      excerpt: 'The #SONA event closed with bold promises and game-changing reforms that could transform how we live, work, and travel in South Africa.',
      author: 'Kuyakhanya FM',
      date: '2026-02-12',
      coverImage: '/images/Sona_2026.jpg',
      content: 'Tonight, the #SONA event closed with bold promises and game-changing reforms that could transform the way we live, work, and travel in South Africa.\n\n💻 Digital SA – Services at Your Fingertips\n• Digital ID rollout for safe access to services\n• Online police statements, driver\'s licenses, matric certificates & grants\n• Hundreds of government services available on the MyMzansi platform\n\n🛂 Smarter, Safer Borders\n• Key border posts redeveloped through public-private partnerships\n• Electronic travel authorizations expanded to all major airports & land ports\n• 10,000 new labor inspectors to enforce the law fairly\n• Zero tolerance for violence against foreign nationals\n\n🏛️ A Public Service You Can Trust\n• Public Service Amendment Bill shields key appointments from politics\n• 93% compliance in lifestyle audits for senior public servants\n• Central registry for disciplinary cases prevents corruption & mismanagement\n\n🏢 Reforming State-Owned Enterprises\n• Eskom, Transnet, PRASA & more under professional, qualified leadership\n• National State Enterprise Bill to improve governance & financial stability\n• Public-private partnerships to boost efficiency without losing public ownership\n\n🌍 Africa & Global Leadership\n• Promoting peace, prosperity, and integration across the continent\n• Leveraging G20, AU & SADC positions to strengthen exports & manufacturing\n• Building South Africa as a globally competitive, future-ready economy\n\n💬 The Big Question for Every South African:\nDo you believe these bold reforms will change your life for the better, or is it just another promise?\n👇 Drop your thoughts below! Tag your friends. Let\'s make this conversation go viral!\n\n#KuyakhanyaNewsUpdates #SONA2026 #DigitalSA #SouthAfricaRising #BorderSecurity #GovernanceReform #JobsForYouth #AfricaRising',
    },
    {
      title: "Abigail Kok — George's National Top Achiever",
      slug: 'abigail-kok-top-achiever',
      excerpt: 'George is celebrating one of its brightest stars — Abigail Kok, a learner from York High School, named National Top Achiever for Public Schools in the 2025 NSC results.',
      author: 'Kuyakhanya FM',
      date: '2026-01-12',
      coverImage: '/images/top_achiever.jpeg',
      content: "George is celebrating one of its brightest stars — Abigail Kok, a learner from York High School, who has been named the National Top Achiever for Public Schools in the 2025 NSC results.\n\nAbigail's achievement is historic: she secured seven distinctions, including perfect scores of 100% in Accounting and Life Orientation, and near-perfect marks of 99% in Physical Science and Mathematics. She also earned recognition as the top learner in Physical Sciences nationwide.\n\nThis remarkable accomplishment is a testament to her hard work, discipline, and passion for learning. Abigail's success has not only made George proud but has also inspired learners across South Africa.\n\n🌟 Reflections and Future Plans\nDespite her accolades, Abigail humbly admits she is still reflecting on what this achievement means for her future. Initially registered for actuarial science, she has chosen to pursue Data Science at Stellenbosch University, explaining:\n\n\"Data science still involves maths and statistics, but also computers, and I really enjoy working with data. It can be applied across many industries and still includes a strong maths component.\"\n\nHer decision highlights a forward-thinking approach, embracing technology and analytics as tools for shaping the future.\n\n📚 Journey Through Matric\nAbigail described her matric year as both demanding and rewarding. She studied English, Afrikaans, Mathematics, Physical Sciences, Life Sciences, Accounting, and Life Orientation — relying on early preparation, mind maps, and a strict study timetable.\n\nHer advice to the Class of 2026:\n• Start early\n• Don\'t procrastinate\n• Understand your work instead of memorising it like a parrot\n\nShe also acknowledged the importance of family support, with her parents encouraging balance through weekly hikes, and credited her teachers for motivating her to go beyond the curriculum.\n\n💡 Lessons Learned\nAbigail admitted that perfectionism was her biggest challenge, often overthinking during exams. She continues to remind herself that \"my best is good enough.\"\n\nReflecting on her matric year, she called it her \"nicest year,\" encouraging learners to embrace the experience:\n\n\"Matric is a lot of work. Enjoy the last chance you have to be a child — because after that, you\'re no longer a child.\"\n\n🏆 A Community Inspired\nAbigail Kok\'s achievement underscores the importance of recognising young achievers not only for their academic excellence but also for their ability to inspire others. Her journey is a beacon of hope for George, the Western Cape, and the nation.\n\n💜 Well done, Abigail! We Shine Brighter Together.\n#KuyakhanyaFM #WeShineBrighterTogether #ClassOf2025 #YorkHighSchool #TopAchiever #NSC2025 #GeorgeIsProudYou",
    },
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
