// Mock data for Jatin Garg's Game Developer Portfolio

export const portfolioData = {
  personal: {
    name: "Jatin Garg",
    title: "Game Developer & AI Enthusiast",
    tagline: "Building Tomorrow's Interactive Experiences Through Code & Innovation",
    email: "jatingargwork@gmail.com",
    phone: "+91-94784-03862",
    linkedin: "linkedin.com/in/jatinrx",
    twitter: "jatin_rx",
    youtube: "Jatin Garg",
    location: "Baner, Pune, Maharashtra",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    bio: "Computer engineer passionate about building interactive experiences that connect people worldwide. With 5+ years in game development, I specialize in creating robust multiplayer systems and engaging gameplay mechanics. Currently exploring how AI can enhance player experiences and streamline development workflows. Always excited about the intersection of technology and creativity."
  },

  // Current Major Work - Dream Cricket
  currentWork: {
    title: "Dream Cricket 2024",
    subtitle: "Mobile Cricket Gaming",
    company: "Dream Game Studios",
    description: "Working on India's popular cricket mobile game with 4.6★ rating on Play Store/App Store.",
    myContributions: [
      "Designed and implemented network multiplayer mode for real-time competitive gameplay",
      "Individually handled disconnection and rejoining scenarios in multiplayer",
      "Implemented anti-hack strategies to ensure fair gameplay for all users",
      "Created interactive user gameplay onboarding system for first-time users",
      "Implemented Audio and Commentary systems in the game",
      "Worked on shot training and shot selection algorithm for Batting mechanics",
      "Developed various in-house tools for Design and Art teams",
      "Contributed to Game Analytics, Camera systems, and UI development"
    ],
    technologies: ["Unreal Engine", "C++ Gameplay Programming", "Network Multiplayer", "Blueprint Scripting", "Game Analytics"],
    impact: "Contributing to a game that serves millions of cricket fans with engaging multiplayer experiences"
  },

  // Core Strengths & Expertise
  coreStrengths: {
    title: "Core Expertise",
    areas: [
      {
        title: "Unreal Engine Development",
        description: "5+ years of hands-on experience with Unreal Engine, specializing in gameplay framework, network multiplayer, and cross-platform development.",
        skills: ["C++ Gameplay Programming", "Blueprint Scripting", "Network Multiplayer", "UMG UI Systems", "Game Design Patterns"]
      },
      {
        title: "Network Multiplayer Systems",
        description: "Expert in designing and implementing robust multiplayer architectures, handling disconnection/reconnection scenarios and anti-cheat mechanisms.",
        skills: ["Real-time Networking", "Disconnection Handling", "Anti-cheat Implementation", "Performance Optimization"]
      },
      {
        title: "Leadership & Team Development",
        description: "Proven experience in leading cross-functional teams and mentoring developers, with a track record of successful project deliveries.",
        skills: ["Team Leadership", "Technical Mentorship", "Cross-functional Collaboration", "Tool Development"]
      }
    ]
  },
  
  skills: {
    gamedev: [
      "Unreal Engine 4/5",
      "Network Multiplayer", 
      "Blueprint Scripting",
      "Gameplay Framework",
      "UMG UI Systems",
      "Game Design Patterns"
    ],
    programming: [
      "C++ & OOPs",
      "JavaScript", 
      "Angular & Redux",
      "Data Structures",
      "Vector Maths & Algebra"
    ],
    tools: [
      "Perforce",
      "Unity Engine",
      "Git Version Control",
      "Visual Studio Code",
      "Visual Studio Community",
      "Rider IDE"
    ]
  },

  experience: [
    {
      company: "Dream Game Studios",
      location: "Pune",
      role: "Senior Software Engineer - Gameplay",
      period: "July 2023 - Present",
      achievements: [
        "Working on DREAM CRICKET 24 (4.6★ rating on Play Store/App Store)",
        "Designed and implemented network multiplayer mode",
        "Individually handled disconnection and rejoining scenarios", 
        "Implemented anti-hack strategies to ensure fair gameplay",
        "Created interactive user gameplay onboarding for first-time users",
        "Worked on Game Analytics, Cameras, and UI systems"
      ]
    },
    {
      company: "Dream Game Studios",
      location: "Pune", 
      role: "Gameplay Software Engineer",
      period: "February 2022 - June 2023",
      achievements: [
        "Implemented Audio and Commentary systems in the game",
        "Worked on shot training and shot selection algorithm for Batting",
        "Developed various in-house tools for Design and Art teams"
      ]
    },
    {
      company: "Games24x7",
      location: "Bangalore",
      role: "Software Development Engineer", 
      period: "December 2021 - February 2022",
      achievements: [
        "Worked on migrating the Rummy Circle game to Unity"
      ]
    },
    {
      company: "Amadeus Software Labs",
      location: "Bangalore",
      role: "Software Engineer", 
      period: "July 2020 - December 2021",
      achievements: [
        "Developed responsive Angular web app for flight bookings",
        "Worked with cross-border teams in scaled agile framework"
      ]
    },
    {
      company: "Amadeus Software Labs",
      location: "Bangalore",
      role: "Software Intern", 
      period: "January 2020 - May 2020",
      achievements: [
        "Created chatbot using Rasa framework",
        "Added ability to understand unintentional spelling mistakes",
        "Integrated sentiment analysis capabilities"
      ]
    }
  ],

  // Earlier Projects (Reduced prominence)
  earlyProjects: [
    {
      title: "FALLER",
      subtitle: "Puzzle Adventure Game",
      description: "Epic Mega Jam 21 entry showcasing puzzle mechanics and environmental storytelling.",
      technologies: ["Unreal Engine", "C++", "Blueprint"],
      videoUrl: "https://www.youtube.com/watch?v=1DRU7KQgVFw",
      category: "Game Jam"
    },
    {
      title: "The Construction Site", 
      subtitle: "Technical Environment Demo",
      description: "Photorealistic environment with advanced lighting and combat systems.",
      technologies: ["Unreal Engine", "Quixel Megascans", "C++"],
      videoUrl: "https://www.youtube.com/watch?v=2p2oxeHWXGw",
      category: "Technical Demo"
    },
    {
      title: "Go Jerry Go",
      subtitle: "Side-Scrolling Game",
      description: "First complete game demonstrating core gameplay mechanics.",
      technologies: ["Unreal Engine 4", "Blueprint"],
      videoUrl: "https://www.youtube.com/watch?v=Xguw8_miWLk", 
      category: "Personal Project"
    },
    {
      title: "ESCAPE",
      subtitle: "GameJam Entry", 
      description: "Rapid prototype puzzle game developed in 48 hours.",
      technologies: ["Unreal Engine 4", "Rapid Prototyping"],
      videoUrl: "https://www.youtube.com/watch?v=PbHedSFA1tw",
      category: "Game Jam"
    }
  ],

  // Removed testimonials section as requested

  education: {
    degree: "Bachelor of Engineering - Computer Science",
    institution: "Thapar Institute of Engineering & Technology, Patiala", 
    period: "2016-2020",
    cgpa: "8.85/10",
    additionalEducation: {
      program: "Game Development - Cohort Program",
      institution: "Avalon Meta Pro-league",
      period: "September 2020 - August 2021"
    },
    certifications: [
      "Neural Networks and Deep Learning",
      "SQL Fundamentals Course"
    ]
  },

  leadership: [
    {
      role: "General Secretary",
      organization: "SPICMACAY",
      period: "2018-2019",
      description: "Led a team of 60+ members for 4 major events featuring international level classical artists",
      achievements: [
        "Managed a budget of ₹3.5 Lakh",
        "Organized 4 major cultural events",
        "Led team of 60+ members"
      ]
    },
    {
      role: "C++ Mentor", 
      organization: "Thapar Institute",
      period: "2019",
      description: "Mentored 10+ students in a mentor/learner program",
      achievements: [
        "Guided students in competitive programming",
        "Conducted technical workshops",
        "Improved programming fundamentals"
      ]
    },
    {
      role: "Head Management",
      organization: "Virsa 2018 - Annual Punjabi Cultural Festival",
      period: "March 2018 - October 2018",
      description: "Jointly managed a team of 200+ members for 15+ events in a 4 day long fest",
      achievements: [
        "Managed 200+ team members",
        "Coordinated 15+ events",
        "4-day festival execution"
      ]
    }
  ]
};

export default portfolioData;