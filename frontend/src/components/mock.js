// Mock data for Jatin Garg's Game Developer Portfolio

export const portfolioData = {
  personal: {
    name: "Jatin Garg",
    title: "Game Developer & AI Enthusiast",
    tagline: "Building Tomorrow's Interactive Experiences Through Code & Innovation",
    email: "jatingargwork@gmail.com",
    phone: "+91-9876543210", // Placeholder
    whatsapp: "919876543210", // Placeholder
    linkedin: "linkedin.com/in/jatinrx",
    location: "Pune, Maharashtra, India",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    bio: "Senior Unreal Engine Developer with 5+ years of expertise in gameplay programming, network multiplayer systems, and cross-platform game development. Currently spearheading gameplay features for top-rated mobile games while actively exploring AI applications in game development."
  },
  
  skills: {
    gamedev: [
      "Unreal Engine 5/4",
      "C++ Gameplay Programming", 
      "Blueprint Scripting",
      "Network Multiplayer",
      "Game Design Patterns",
      "UMG UI Systems"
    ],
    programming: [
      "C++",
      "JavaScript", 
      "TypeScript",
      "Python",
      "Angular",
      "Unity Engine"
    ],
    emerging: [
      "Artificial Intelligence",
      "Machine Learning",
      "Neural Networks",
      "NLP Applications",
      "Procedural Generation"
    ]
  },

  experience: [
    {
      company: "Dream Game Studios",
      location: "Pune",
      role: "Senior Software Engineer - Gameplay",
      period: "July 2023 - Present",
      achievements: [
        "Leading gameplay development for DREAM CRICKET 24 (4.6★ rating, 10M+ downloads)",
        "Architected network multiplayer infrastructure supporting real-time competitive gameplay",
        "Developed sophisticated disconnection/reconnection systems",
        "Created anti-cheat mechanisms maintaining fair competitive environment",
        "Designed interactive onboarding experience improving retention by 35%"
      ]
    },
    {
      company: "Dream Game Studios",
      location: "Pune", 
      role: "Gameplay Software Engineer",
      period: "Feb 2022 - June 2023",
      achievements: [
        "Implemented dynamic audio and commentary systems",
        "Developed AI-driven shot selection algorithms",
        "Created custom tools suite reducing iteration time by 50%"
      ]
    },
    {
      company: "Games24x7",
      location: "Bangalore",
      role: "Software Development Engineer", 
      period: "Dec 2021 - Feb 2022",
      achievements: [
        "Led Unity migration project for Rummy Circle",
        "Optimized performance and user experience"
      ]
    }
  ],

  projects: [
    {
      title: "FALLER",
      subtitle: "Third-Person Puzzle Adventure",
      description: "Innovative puzzle mechanics with progressive difficulty scaling. Environmental storytelling through interactive level design.",
      technologies: ["Unreal Engine", "C++", "Blueprint"],
      videoUrl: "https://www.youtube.com/watch?v=1DRU7KQgVFw",
      highlights: ["Epic Mega Jam 21 Entry", "60fps Performance", "Multi-platform"],
      category: "Game Development"
    },
    {
      title: "The Construction Site", 
      subtitle: "Interactive Environment Demo",
      description: "Photorealistic environment showcasing technical and artistic skills with advanced lighting and material systems.",
      technologies: ["Unreal Engine", "Quixel Megascans", "C++"],
      videoUrl: "https://www.youtube.com/watch?v=2p2oxeHWXGw",
      highlights: ["Photorealistic Graphics", "Combat System", "Object Interaction"],
      category: "Technical Demo"
    },
    {
      title: "Go Jerry Go",
      subtitle: "Side-Scrolling Adventure",
      description: "First complete game project demonstrating core gameplay mechanics and level progression systems.",
      technologies: ["Unreal Engine 4", "Blueprint", "Game Design"],
      videoUrl: "https://www.youtube.com/watch?v=Xguw8_miWLk", 
      highlights: ["First Complete Game", "Side-Scroller", "Level Progression"],
      category: "Game Development"
    },
    {
      title: "ESCAPE",
      subtitle: "Puzzle GameJam Entry", 
      description: "Time-constrained puzzle game developed during game jam, showcasing rapid prototyping and creative problem-solving.",
      technologies: ["Unreal Engine 4", "Puzzle Design", "Rapid Prototyping"],
      videoUrl: "https://www.youtube.com/watch?v=PbHedSFA1tw",
      highlights: ["Game Jam Winner", "Innovative Puzzles", "48-hour Development"],
      category: "Game Jam"
    },
    {
      title: "AI-Enhanced Development Tools",
      subtitle: "Procedural Content Generation",
      description: "Exploring machine learning applications in procedural generation and AI-assisted level design tools.",
      technologies: ["Python", "Machine Learning", "Procedural Generation", "AI"],
      videoUrl: null,
      highlights: ["ML Integration", "Procedural Tools", "AI Research"],
      category: "AI Research"
    }
  ],

  testimonials: [
    {
      name: "Sarah Chen",
      role: "Lead Game Designer at Dream Game Studios", 
      content: "Jatin's technical expertise and innovative approach to gameplay programming has been instrumental in our success. His ability to bridge traditional game development with AI technologies is remarkable.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Rahul Sharma", 
      role: "Senior Developer at Games24x7",
      content: "Working with Jatin on the Unity migration was seamless. His problem-solving skills and attention to detail make him an invaluable team member.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Dr. Priya Patel",
      role: "AI Research Lead",
      content: "Jatin's exploration into AI applications for game development shows remarkable vision. His technical depth combined with creative thinking opens new possibilities.",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face"
    }
  ],

  education: {
    degree: "Bachelor of Engineering - Computer Science",
    institution: "Thapar Institute of Engineering & Technology, Patiala", 
    period: "2016-2020",
    cgpa: "8.85/10",
    certifications: [
      "Neural Networks and Deep Learning - Coursera/DeepLearning.AI",
      "SQL Fundamentals - Advanced Database Management",
      "Unreal Engine Certified Developer"
    ]
  }
};

export default portfolioData;