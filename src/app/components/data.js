const SALARY_DATA = {
    "Software Engineer": {
      "Bangalore": { entry: 1000000, mid: 2000000, senior: 3500000 },
      "Hyderabad": { entry: 900000, mid: 1800000, senior: 3200000 },
      "Mumbai": { entry: 1100000, mid: 2200000, senior: 3800000 },
      "Pune": { entry: 900000, mid: 1700000, senior: 3000000 },
      "Delhi-NCR": { entry: 1000000, mid: 2100000, senior: 3600000 },
      "Chennai": { entry: 850000, mid: 1600000, senior: 2800000 }
    },
    "Product Manager": {
      "Bangalore": { entry: 1200000, mid: 2400000, senior: 4000000 },
      "Hyderabad": { entry: 1100000, mid: 2200000, senior: 3800000 },
      "Mumbai": { entry: 1300000, mid: 2600000, senior: 4200000 },
      "Pune": { entry: 1100000, mid: 2100000, senior: 3600000 },
      "Delhi-NCR": { entry: 1200000, mid: 2500000, senior: 4100000 },
      "Chennai": { entry: 1000000, mid: 2000000, senior: 3400000 } // Fixed 'value' to 'entry'
    },
    "Data Scientist": {
      "Bangalore": { entry: 1100000, mid: 2200000, senior: 3800000 },
      "Hyderabad": { entry: 1000000, mid: 2000000, senior: 3500000 },
      "Mumbai": { entry: 1200000, mid: 2400000, senior: 4000000 },
      "Pune": { entry: 1000000, mid: 1900000, senior: 3300000 },
      "Delhi-NCR": { entry: 1100000, mid: 2300000, senior: 3900000 },
      "Chennai": { entry: 950000, mid: 1800000, senior: 3100000 }
    }
  };
  
  // Moved outside component to prevent recreation on each render
  const EXPERIENCE_LEVELS = [
    { value: "entry", label: "Entry Level (0-2 years)" },
    { value: "mid", label: "Mid Level (3-5 years)" },
    { value: "senior", label: "Senior Level (6+ years)" }
  ];
  
  const LOCATIONS = [
    { value: "Bangalore", label: "Bangalore" },
    { value: "Hyderabad", label: "Hyderabad" },
    { value: "Mumbai", label: "Mumbai" },
    { value: "Pune", label: "Pune" },
    { value: "Delhi-NCR", label: "Delhi-NCR" },
    { value: "Chennai", label: "Chennai" }
  ];
  
  const getCareerAdvice = (role, experience, marketPosition) => {
    const baseAdvice = {
      "extremely_underpaid": {
        status: "Significantly Below Market",
        icon: "⚠️",
        color: "text-red-600",
        generalAdvice: [
          "Your current compensation is significantly below market value. This situation requires immediate attention to ensure your career growth and financial well-being.",
          "Consider conducting extensive market research to understand your true market value across different companies and locations.",
          "Start preparing for a job search while continuing to excel in your current role.",
          "Document all your achievements, projects, and impact metrics for future negotiations."
        ]
      },
      "significantly_underpaid": {
        status: "Below Market Rate",
        icon: "📊",
        color: "text-orange-600",
        generalAdvice: [
          "Your salary is notably below market standards. While not critical, this gap should be addressed in the near term.",
          "Focus on building a strong case for a salary adjustment based on your contributions and market data.",
          "Consider internal growth opportunities while keeping an eye on external positions.",
          "Invest time in expanding your professional network and visibility."
        ]
      },
      "slightly_underpaid": {
        status: "Slightly Below Market",
        icon: "📈",
        color: "text-yellow-600",
        generalAdvice: [
          "You're earning close to but slightly below market rate. This is a good time to plan for growth.",
          "Focus on increasing your visibility within your current organization.",
          "Take on additional responsibilities that align with your career goals.",
          "Build a strong case for your next performance review."
        ]
      },
      "competitive": {
        status: "Market Competitive",
        icon: "✅",
        color: "text-green-600",
        generalAdvice: [
          "Your compensation is well-aligned with market standards. This is an excellent position to be in.",
          "Focus on maintaining high performance while planning for long-term career growth.",
          "Look for opportunities to expand your impact and influence.",
          "Consider mentoring others to build leadership skills."
        ]
      },
      "above_market": {
        status: "Above Market Rate",
        icon: "🌟",
        color: "text-indigo-600",
        generalAdvice: [
          "You're being compensated above market rate, which reflects your strong performance and value.",
          "Focus on maintaining and expanding your expertise to continue justifying premium compensation.",
          "Look for ways to increase your strategic impact on the organization.",
          "Consider building your personal brand in the industry."
        ]
      }
    };
  
    const roleSpecificAdvice = {
      "Software Engineer": {
        technical: [
          {
            level: "entry",
            advice: [
              "Master fundamental data structures and algorithms through platforms like LeetCode and HackerRank",
              "Build a strong foundation in version control (Git) and CI/CD practices",
              "Develop expertise in one major framework (React, Angular, or Spring Boot)",
              "Create side projects that demonstrate your ability to build complete applications"
            ]
          },
          {
            level: "mid",
            advice: [
              "Deepen your knowledge of system design and architecture patterns",
              "Gain expertise in cloud platforms (AWS, Azure, or GCP) and obtain certifications",
              "Learn about DevOps practices and tools like Docker and Kubernetes",
              "Master debugging and performance optimization techniques"
            ]
          },
          {
            level: "senior",
            advice: [
              "Focus on architectural decision-making and system design leadership",
              "Develop expertise in scalability, reliability, and distributed systems",
              "Lead technical initiatives and mentor junior developers",
              "Contribute to open source or write technical blogs to build industry presence"
            ]
          }
        ],
        career: [
          {
            level: "entry",
            advice: [
              "Seek regular feedback from senior developers and actively implement it",
              "Take ownership of small features and gradually increase scope",
              "Document your learning journey and maintain a portfolio of work",
              "Join developer communities and attend tech meetups"
            ]
          },
          {
            level: "mid",
            advice: [
              "Lead feature development and mentor junior developers",
              "Improve cross-team collaboration and communication skills",
              "Build relationships with product managers and stakeholders",
              "Start speaking at team knowledge sharing sessions"
            ]
          },
          {
            level: "senior",
            advice: [
              "Develop your technology strategy and roadmap planning skills",
              "Build strong relationships with engineering leadership",
              "Influence technical decisions across multiple teams",
              "Consider pursuing technical leadership or architecture roles"
            ]
          }
        ]
      },
      "Product Manager": {
        technical: [
          {
            level: "entry",
            advice: [
              "Learn the basics of SQL and data analysis",
              "Understand agile methodologies and project management tools",
              "Develop proficiency in product analytics tools",
              "Master wireframing and prototyping tools"
            ]
          },
          {
            level: "mid",
            advice: [
              "Deepen understanding of A/B testing and experimentation",
              "Learn advanced analytics and data visualization",
              "Understand technical architecture and system design basics",
              "Master product strategy and roadmap planning"
            ]
          },
          {
            level: "senior",
            advice: [
              "Develop expertise in product strategy and vision planning",
              "Master stakeholder management and executive communication",
              "Learn advanced market analysis and competitive strategy",
              "Understand complex technical trade-offs and architectural decisions"
            ]
          }
        ],
        career: [
          {
            level: "entry",
            advice: [
              "Build strong relationships with engineering and design teams",
              "Take ownership of small features and gather user feedback",
              "Learn from customer support and sales teams",
              "Document your product decisions and their outcomes"
            ]
          },
          {
            level: "mid",
            advice: [
              "Lead cross-functional teams and major features",
              "Develop strong business acumen and strategic thinking",
              "Build relationships with senior stakeholders",
              "Start mentoring junior PMs"
            ]
          },
          {
            level: "senior",
            advice: [
              "Focus on developing product vision and strategy",
              "Build and lead high-performing product teams",
              "Influence company-wide product decisions",
              "Consider pursuing director or VP of Product roles"
            ]
          }
        ]
      },
      "Data Scientist": {
        technical: [
          {
            level: "entry",
            advice: [
              "Master Python, R, and essential data science libraries",
              "Build strong foundation in statistics and probability",
              "Learn SQL and data manipulation techniques",
              "Develop expertise in data visualization tools"
            ]
          },
          {
            level: "mid",
            advice: [
              "Deep dive into machine learning algorithms and implementations",
              "Master feature engineering and model optimization",
              "Learn big data technologies (Spark, Hadoop)",
              "Develop expertise in deep learning frameworks"
            ]
          },
          {
            level: "senior",
            advice: [
              "Master advanced ML techniques and architectures",
              "Develop expertise in MLOps and production deployment",
              "Learn to design and lead large-scale data projects",
              "Stay current with cutting-edge AI research"
            ]
          }
        ],
        career: [
          {
            level: "entry",
            advice: [
              "Work closely with experienced data scientists to learn best practices",
              "Build a portfolio of data analysis projects",
              "Participate in Kaggle competitions",
              "Learn to communicate technical findings to non-technical stakeholders"
            ]
          },
          {
            level: "mid",
            advice: [
              "Lead end-to-end data science projects",
              "Mentor junior data scientists",
              "Build strong relationships with business stakeholders",
              "Present at data science conferences or meetups"
            ]
          },
          {
            level: "senior",
            advice: [
              "Define data science strategy and best practices",
              "Lead complex, cross-functional data initiatives",
              "Influence company-wide technical decisions",
              "Consider pursuing principal or head of data science roles"
            ]
          }
        ]
      }
    };
  
    const baseAdviceForPosition = baseAdvice[marketPosition] || baseAdvice["competitive"];
    const roleAdvice = roleSpecificAdvice[role] || roleSpecificAdvice["Software Engineer"];
    const experienceLevel = experience || "mid";
  
    return {
      ...baseAdviceForPosition,
      roleSpecific: {
        technical: roleAdvice.technical.find(a => a.level === experienceLevel)?.advice || [],
        career: roleAdvice.career.find(a => a.level === experienceLevel)?.advice || []
      }
    };
  };


  export {
    SALARY_DATA,
    EXPERIENCE_LEVELS,
    LOCATIONS,
    getCareerAdvice
  };