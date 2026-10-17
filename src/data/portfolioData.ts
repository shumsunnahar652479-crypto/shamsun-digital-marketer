export interface Project {
  id: string;
  number: string;
  title: string;
  category: 'marketplace' | 'ads' | 'ai-video' | 'google' | 'leads';
  categoryLabel: string;
  summary: string;
  image: string;
  metrics: { label: string; value: string }[];
  deliverables: string[];
  tools: string[];
  clientIndustry: string;
}

export interface ServiceItem {
  number: string;
  title: string;
  description: string;
  details: string[];
  icon: string;
}

export const SHAMSUN_DATA = {
  personal: {
    name: "Mst. Shamsun Akter Shahida",
    firstName: "Shamsun",
    lastName: "Shahida",
    displayTitle: "Creative Digital Marketer",
    tagline: "I drive revenue & scalable business growth through Meta Ads, Marketplace Listings, AI Video Ads, Google Ads & Lead Generation.",
    codeSlogan: "</ STRATEGY. ADS. CONVERSIONS />",
    phone: "01326-821781",
    intlPhone: "+880 1326-821781",
    email: "pro.shumsunahar@gmail.com",
    altEmail: "shumsunnahar652479@gmail.com",
    location: "Village Ulukhula, Kaligonj, Gazipur, Bangladesh",
    permanentLocation: "Village Chackkauria Taliya Para, Post Office Chackkauria Taliya Para-2110, Sreebardi, Sherpur, Bangladesh",
    fatherName: "Md. Abdul Basad",
    motherName: "Mst. Maya Begum",
    dob: "15 July 2003",
    nationality: "Bangladeshi",
    experienceYears: "4+",
    projectsDelivered: "150+",
    happyClients: "80+",
    technologiesCount: "12+",
    portraitImage: "/src/assets/images/shamsun_purple_portrait_1792125845025.jpg",
    corporateImage: "/src/assets/images/shamsun_portrait_pro_1792121184000.jpg",
    objectiveEn: "Creative and result-oriented digital marketer specializing in social media marketing, Facebook Marketplace product listing, Facebook Ads & boosting, Google Ads, GA4 analytics, lead generation, data entry, and AI promotional video commercials.",
    objectiveBn: "ফেসবুক মার্কেটপ্লেস প্রোডাক্ট লিস্টিং, ফেসবুক অ্যাডস রান ও বুস্টিং, গ্রুপ মার্কেটিং, গুগল অ্যাডস ও অ্যানালিটিক্স, ইমেইল মার্কেটিং ও লিড জেনারেশন, ডাটা এন্ট্রি এবং এআই প্রমোশন ভিডিও অ্যাডসে দক্ষ ডিজিটাল মার্কেটার।",
  },
  stats: [
    { value: "4+", label: "YEARS PRACTICAL TRAINING & EXP" },
    { value: "150+", label: "CAMPAIGNS & LISTINGS DELIVERED" },
    { value: "80+", label: "HAPPY CLIENTS SERVED" },
    { value: "12+", label: "MARKETING PLATFORMS & TOOLS" },
  ],
  services: [
    {
      number: "01",
      title: "FACEBOOK ADS & BOOSTING",
      description: "High-ROAS campaign architecture, pixel setup, targeted audience retargeting, and viral post boosting.",
      details: [
        "Full funnel ad setup (Awareness, Traffic, Leads, Conversions)",
        "Custom & Lookalike audience targeting",
        "Meta Pixel & CAPI event tracking",
        "Post boosting & engagement scaling"
      ],
      icon: "Megaphone"
    },
    {
      number: "02",
      title: "FB MARKETPLACE & GROUP MARKETING",
      description: "High-ranking product listings with optimized keywords, active buyer outreach, and targeted group promotion.",
      details: [
        "SEO-optimized marketplace title & tag listings",
        "High-conversion image formatting & descriptions",
        "Targeted niche Facebook group marketing & discussions",
        "Fast buyer message conversion to confirmed orders"
      ],
      icon: "ShoppingBag"
    },
    {
      number: "03",
      title: "GOOGLE ADS & GA4 ANALYTICS",
      description: "Capture high-intent buyers searching on Google with precision PPC campaigns and Google Analytics 4 dashboards.",
      details: [
        "Google Search, Display & Performance Max ads",
        "Negative keyword optimization to prevent wasted budget",
        "GA4 conversion events & e-commerce revenue tracking",
        "Quality Score improvement to lower CPC"
      ],
      icon: "Search"
    },
    {
      number: "04",
      title: "LEAD GENERATION & EMAIL MARKETING",
      description: "Predictable B2B & B2C customer acquisition funnels, targeted email sequences, and high-value lead capture.",
      details: [
        "Meta Instant Lead Forms & landing opt-ins",
        "Automated email welcome sequences & newsletters",
        "Verified prospect contact list building",
        "Cold outreach workflows on LinkedIn"
      ],
      icon: "MailCheck"
    },
    {
      number: "05",
      title: "DATA ENTRY & CRM MANAGEMENT",
      description: "Meticulous data entry, spreadsheet modeling in Excel/Google Sheets, customer record hygiene, and database entry.",
      details: [
        "E-commerce product catalog data entry & categorization",
        "Lead database cleaning & validation",
        "Google Sheets & Excel automated formulas",
        "CRM contact synchronization & weekly reporting"
      ],
      icon: "Database"
    },
    {
      number: "06",
      title: "AI PROMOTIONAL VIDEO ADS",
      description: "Viral AI-generated commercial video ads engineered for Facebook Reels, Instagram, TikTok, and YouTube.",
      details: [
        "Prompt-engineered cinematic product commercials",
        "Attention-grabbing 3-second hook scripts",
        "AI voiceovers, sound design, and animated subtitles",
        "Vertical 9:16 reels for maximum social reach"
      ],
      icon: "Video"
    }
  ],
  projects: [
    {
      id: "brandix-marketplace",
      number: "01",
      title: "FB Marketplace & Meta Ads Scaling",
      category: "marketplace",
      categoryLabel: "Marketplace & Meta Ads",
      summary: "Scaled e-commerce product listings across Facebook Marketplace and paired them with dynamic carousel ads, generating over $143,150 in verified purchases at 6.4x ROAS.",
      image: "/src/assets/images/project_meta_purple_1792125845645.jpg",
      metrics: [
        { label: "Total Revenue", value: "$143,157" },
        { label: "ROAS Achieved", value: "6.4x" },
        { label: "Avg CPA", value: "$8.50" },
        { label: "Listings Ranked", value: "120+ Products" }
      ],
      deliverables: ["Marketplace SEO titles & tags", "Meta Ads Manager campaign", "Custom buyer retargeting", "Daily lead handling"],
      tools: ["Facebook Marketplace", "Meta Ads Manager", "Meta Pixel", "Canva Pro", "Google Sheets"],
      clientIndustry: "Electronics & Lifestyle Retail"
    },
    {
      id: "ai-promo-commercials",
      number: "02",
      title: "AI Promotional Video Commercials",
      category: "ai-video",
      categoryLabel: "AI Video & Content",
      summary: "Created 18 cinematic AI-generated promotional video spots for consumer tech brand, achieving 85,000+ targeted views and reducing cost per 3s view to $0.008.",
      image: "/src/assets/images/project_ai_promo_purple_1792125846263.jpg",
      metrics: [
        { label: "Targeted Views", value: "85,000+" },
        { label: "ROAS Boost", value: "8.2x" },
        { label: "Watch Time", value: "78%" },
        { label: "Creative Variations", value: "18 Reels" }
      ],
      deliverables: ["AI prompt scripts", "Commercial voiceover sync", "9:16 vertical reels", "Thumbnail testing"],
      tools: ["Generative AI Video", "CapCut Pro", "Meta Business Suite", "Audacity"],
      clientIndustry: "Consumer Tech & Gadgets"
    },
    {
      id: "google-ads-analytics",
      number: "03",
      title: "Google Ads & GA4 Lead Generation",
      category: "google",
      categoryLabel: "Google PPC & Analytics",
      summary: "Restructured Google Search ad campaigns and GA4 conversion tracking, lowering cost-per-lead by 38% while driving 340+ verified inbound customer inquiries.",
      image: "/src/assets/images/analytics_ad_campaign_1792121185807.jpg",
      metrics: [
        { label: "Verified Leads", value: "340+ Inquiries" },
        { label: "CPA Reduction", value: "-38%" },
        { label: "Click-Through Rate", value: "5.8%" },
        { label: "Google Rank", value: "Top 3 Bidding" }
      ],
      deliverables: ["Negative keyword filter", "GA4 custom conversion events", "High-CTR ad copy", "Weekly KPI dashboards"],
      tools: ["Google Ads", "Google Analytics 4", "Google Tag Manager", "Excel"],
      clientIndustry: "Professional Services & Real Estate"
    }
  ] as Project[],
  toolkit: [
    { name: "Meta Ads", icon: "Share2", category: "Ads" },
    { name: "FB Marketplace", icon: "ShoppingBag", category: "Commerce" },
    { name: "Google Ads", icon: "Search", category: "PPC" },
    { name: "GA4 Analytics", icon: "BarChart3", category: "Data" },
    { name: "AI Video", icon: "Video", category: "Creative" },
    { name: "Lead Gen", icon: "Target", category: "Growth" },
    { name: "Email Marketing", icon: "Mail", category: "Outreach" },
    { name: "Data Entry", icon: "Database", category: "Operations" },
    { name: "Excel / Sheets", icon: "FileSpreadsheet", category: "Analytics" },
    { name: "Local SEO & GBP", icon: "MapPin", category: "SEO" },
    { name: "Canva Pro", icon: "Palette", category: "Design" },
    { name: "CapCut Pro", icon: "Film", category: "Video" },
  ],
  workProcess: [
    {
      step: "01",
      title: "DISCOVER",
      desc: "Understanding your products, target buyers, competitive landscape, and growth goals."
    },
    {
      step: "02",
      title: "STRATEGY & ASSETS",
      desc: "Optimizing marketplace listings, crafting AI promo video scripts, and setting up ad funnels."
    },
    {
      step: "03",
      title: "LAUNCH & OPTIMIZE",
      desc: "Running targeted ad campaigns, monitoring group engagement, and A/B testing ad copy."
    },
    {
      step: "04",
      title: "DELIVER & SCALE",
      desc: "Transparent GA4 analytics, lead handover via data entry, and scaling winning campaigns."
    }
  ],
  education: [
    {
      exam: "BA (Bachelor of Arts)",
      group: "Humanities",
      institution: "National University",
      year: "Running",
      result: "3rd Year",
      status: "In Progress"
    },
    {
      exam: "HSC (Higher Secondary Certificate)",
      group: "Business Management (Computer Operation)",
      institution: "Bangladesh Technical Education Board (BTEB)",
      year: "2021",
      result: "GPA 4.67 / 5.00",
      status: "Completed (Distinction)"
    },
    {
      exam: "SSC (Secondary School Certificate)",
      group: "Humanities",
      institution: "Dhaka Board",
      year: "2019",
      result: "GPA 2.72 / 5.00",
      status: "Completed"
    }
  ],
  experience: [
    {
      role: "Freelance Digital Marketer & Growth Strategist",
      organization: "Remote & Client Growth Partner",
      type: "Self-Employed / Remote",
      duration: "2023 - Present",
      status: "Active",
      responsibilities: [
        "Facebook Marketplace product listings, keyword optimization, and buyer message conversion.",
        "Meta Ads Manager campaign architecture, post boosting, and custom audience retargeting.",
        "Google Ads Search & Display campaigns with Google Analytics 4 (GA4) conversion tracking.",
        "AI-generated promotional video commercials and viral reels for local and e-commerce brands.",
        "Email marketing automation, B2B lead generation, and spreadsheet data entry management."
      ],
      highlights: [
        "Consistently maintained 4x-6.4x average ROAS on e-commerce paid campaigns",
        "Ranked over 120+ products on Facebook Marketplace",
        "Pioneered AI video ad hooks reducing CPA by 38%"
      ]
    },
    {
      role: "Freelancing Training — Digital Marketing Course",
      organization: "E-learning & Earning Ltd.",
      type: "Professional Certification & Practical Training",
      duration: "Completed",
      status: "Certified",
      responsibilities: [
        "Social Media Marketing: Facebook, Instagram, YouTube, and LinkedIn optimization.",
        "Paid Advertising: Hands-on Facebook Ads, post boosting, and Google Ads management.",
        "AI Content Creation: AI video ads and promotional video production for businesses.",
        "Analytics & SEO: GA4 setup, on-page, local and technical SEO, and GBP optimization."
      ],
      highlights: [
        "Graduated with distinction across all practical campaign simulation modules",
        "Earned comprehensive certification recognized across freelancing ecosystems"
      ]
    }
  ],
  skills: {
    socialMedia: [
      { name: "Facebook Marketplace Listings", level: 96 },
      { name: "Facebook Ads & Boosting", level: 94 },
      { name: "Facebook Group Marketing", level: 92 },
      { name: "AI Video Ads & Promotions", level: 90 },
      { name: "Instagram & YouTube Marketing", level: 86 },
    ],
    digitalMarketing: [
      { name: "High-Intent Lead Generation", level: 94 },
      { name: "Google Ads (Search & Display)", level: 88 },
      { name: "Google Analytics 4 (GA4)", level: 90 },
      { name: "Email Marketing Sequences", level: 86 },
      { name: "Data Entry & Excel Management", level: 95 },
    ],
    seoAndWeb: [
      { name: "Local SEO & GBP (GMB) Optimization", level: 92 },
      { name: "On-Page SEO & Content Strategy", level: 88 },
      { name: "Landing Page & Funnel Design", level: 86 },
      { name: "Pixel & CAPI Tracking Setup", level: 90 },
    ]
  },
  faqs: [
    {
      question: "How do you optimize Facebook Marketplace product listings?",
      answer: "I conduct buyer keyword research for title tags, optimize high-converting multi-angle product photography, write compelling bulleted descriptions with clear pricing, and respond rapidly to inquiries to convert leads into sales."
    },
    {
      question: "What makes AI promotional video ads effective for business?",
      answer: "AI video commercials capture viewer attention within the first 3 seconds with dynamic transitions, realistic product animations, and studio-grade voiceovers, generating 3x to 5x higher engagement and lower CPM on Meta Reels and TikTok."
    },
    {
      question: "Can you handle both Paid Advertising and Lead Generation Data Entry?",
      answer: "Yes! From designing the ad campaign and Meta Instant Lead Form to managing the inbound inquiries and entering verified client data into Excel/Google Sheets or your CRM, I deliver a complete end-to-end service."
    },
    {
      question: "How fast can we launch my marketing campaigns?",
      answer: "Marketplace listings can go live within 24 hours. Full-funnel Meta Ads and Google Ads campaigns typically launch within 48 to 72 hours after audience persona mapping and creative verification."
    }
  ]
};

export const PORTFOLIO_DATA = SHAMSUN_DATA;
