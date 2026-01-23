/**
 * Centralized content configuration for the LoomGraph landing page.
 * All copy, stats, testimonials, FAQ items, and section data are stored here
 * for easy maintenance and updates.
 * 
 * Requirements: 16.1, 16.2, 16.3
 */

export const CONTENT = {
  hero: {
    headline: "Stop Fiddling with Canva. Generate Your Webinar Banners in 60 Seconds.",
    subtext: "The first-ever automated banner generator built for busy founders. High-converting LinkedIn layouts. Zero design skills required.",
    ctaText: "Create Your First Banner — It's Free",
    stats: [
      { value: "10,000+", label: "Banners Generated" },
      { value: "4.9/5", label: "User Rating" },
      { value: "95%", label: "Time Saved" }
    ]
  },
  
  problem: {
    title: "The 20-Minute Banner Struggle",
    subtitle: "Does this sound familiar?",
    painPoints: [
      {
        title: "The Canva Rabbit Hole",
        description: "Spending 15 minutes just picking a font"
      },
      {
        title: "Headshot Headaches",
        description: "Manually cropping circles and removing backgrounds"
      },
      {
        title: "The Timezone Trap",
        description: "Triple-checking PT vs. ET vs. GMT formatting"
      },
      {
        title: "Off-Brand Results",
        description: "Banners that look like 2010 corporate stock art"
      }
    ]
  },
  
  solution: {
    title: "Design as Infrastructure, Not a Chore.",
    description: "LoomGraph isn't a design tool. It's a generator. You provide the data; we provide the pixels. Optimized specifically for LinkedIn's feed to ensure your event gets the attention it deserves."
  },
  
  benefits: {
    title: "Why Work With Us",
    items: [
      {
        title: "Auto-Beautify Headshots",
        description: "Upload any photo; we handle the crop and background removal",
        icon: "image"
      },
      {
        title: "Timezone Intelligent",
        description: "Enter your time once; we format it for a global audience automatically",
        icon: "clock"
      },
      {
        title: "LinkedIn Optimized",
        description: "Safe zones guaranteed. No more text being cut off by the 'See More' button",
        icon: "linkedin"
      }
    ]
  },
  
  howItWorks: {
    title: "How It Works",
    steps: [
      {
        number: 1,
        title: "Input Data",
        description: "Fill out a simple 4-field form"
      },
      {
        number: 2,
        title: "Brand & Style",
        description: "Select your brand color and speaker layout"
      },
      {
        number: 3,
        title: "Instant Export",
        description: "Download your high-res, LinkedIn-ready asset"
      }
    ]
  },
  
  testimonials: {
    title: "What Founders Are Saying",
    items: [
      {
        name: "Sarah Chen",
        title: "Marketing Lead",
        company: "TechCorp",
        rating: 5,
        headline: "Total Lifesaver!",
        quote: "I used to spend 30 minutes per banner. Now it takes 2 minutes."
      },
      {
        name: "Michael Rodriguez",
        title: "Founder",
        company: "StartupXYZ",
        rating: 5,
        headline: "Game Changer",
        quote: "Finally, a tool that understands what founders actually need. No fluff, just results."
      },
      {
        name: "Emily Watson",
        title: "Event Manager",
        company: "ConferencePro",
        rating: 5,
        headline: "Incredibly Fast",
        quote: "I run 20+ webinars a month. LoomGraph saves me hours every week."
      }
    ]
  },
  
  faq: {
    title: "Frequently Asked Questions",
    items: [
      {
        question: "Is this better than Canva?",
        answer: "It's 10x faster for this specific task. Canva is a general-purpose design tool. LoomGraph is purpose-built for webinar banners, with LinkedIn optimization baked in."
      },
      {
        question: "Can I use my own brand colors?",
        answer: "Yes! You can customize the accent color to match your brand. We handle all the design work while keeping your brand identity intact."
      },
      {
        question: "What file types are supported?",
        answer: "We export high-resolution PNG files (2400x1254px) optimized for LinkedIn. Perfect for social media, email campaigns, and event pages."
      }
    ]
  },
  
  finalCTA: {
    headline: "Ready to save 2 hours a month?",
    subtext: "Join 500+ founders who have automated their webinar promotion.",
    ctaText: "Start Generating Now"
  },
  
  footer: {
    comingSoon: "🚀 Coming Soon: Takeaway Carousel Generator",
    copyright: "© 2026 LoomGraph. All rights reserved."
  }
} as const;
