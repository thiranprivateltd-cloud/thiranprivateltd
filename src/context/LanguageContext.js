'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

// Translations Dictionary
export const translations = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      products: "Products",
      team: "Team",
      careers: "Careers",
      investors: "Investors",
      contact: "Contact",
      portal: "Portal",
      join: "Join Thiran →"
    },
    intro: {
      title: "THIRAN",
      tagline: "Smarter Steps Forward",
      mantra: "Dream · Build · Launch",
      selectLang: "Select Language / மொழியைத் தேர்ந்தெடுக்கவும் / भाषा चुनें"
    },
    footer: {
      desc: "Thiran Private Ltd is a Chennai-based education-focused startup building AI-powered digital products to guide, empower, and transform student lives across India.",
      quickLinks: "Quick Links",
      products: "Products",
      rights: "© 2026 Thiran Private Ltd. All Rights Reserved.",
      privacy: "Privacy Policy",
      terms: "Terms of Service"
    },
    home: {
      badge: "EDUCATION · TECHNOLOGY · INNOVATION",
      heading: "Building the Future of Education in India",
      subtext: "Thiran Private Ltd is a Chennai-based startup building AI-powered education products that guide, empower, and transform the lives of students across India.",
      ctaProducts: "Explore Products →",
      ctaStory: "Our Story →",
      ecosystemTitle: "The Thiran Ecosystem",
      ecosystemSubtitle: "Smarter Steps Forward in Education and Tech",
      stats: {
        products: "Products",
        members: "Team Members",
        languages: "Languages",
        mission: "Mission"
      },
      visionQuote: "If you don't build your dream, someone else will hire you to help them build theirs.",
      visionAuthor: "— Tony Gaskins",
      visionSubtext: "At Thiran, we chose to build our own.",
      status: "Beta",
      heroHeading: "Building intelligent",
      heroTitle: "Future of Education",
      heroTrail: "for Indian students.",
      heroSubtext: "Helping students in Tier-2 and Tier-3 cities choose better career paths through AI-driven guidance.",
      viewDemo: "View Demo",
      readCaseStudies: "Read Case Studies",
      supportedLanguagesCount: "3",
      supportedLanguagesLabel: "Languages",
      waitlistLabel: "Waitlist Students",
      launchlabRatingLabel: "LaunchLab Rating",
      bootstrappedLabel: "Bootstrapped",
      nextstepTitle: "NextStep",
      activeBeta: "Beta",
      nextstepDesc: "An AI-driven psychometric testing and career mapping system engineered specifically for regional language accessibility.",
      multilingualDiagnostics: "Multilingual Diagnostics",
      realTimeAnalysis: "Real-time Analysis",
      privacyArchitecture: "Privacy-first Architecture",
      exploreNextStep: "Explore NextStep Architecture",
      launchlabTitle: "LaunchLab",
      launchlabDescription: "Premium web agency building digital experiences for creators, businesses, and enterprises across India.",
      avgLighthouseScore: "Avg. Lighthouse Score",
      viewCaseStudies: "View Case Studies",
      technicalRigorTitle: "Technical Rigor",
      technicalRigorBody: "Built with Next.js, React, and modern CI/CD pipelines. Every product follows industry-grade engineering standards.",
      teamTitle: "Our Team",
      teamDescription: "19 passionate builders — developers, designers, and strategists — working together to reimagine education in India.",
      meetTeam: "Meet the Team",
      roadmapTitle: "Execution Roadmap",
      roadmapSubtitle: "From founding to product-market fit — here is where we stand.",
      foundationTitle: "Foundation",
      foundationDate: "06 Mar 2026",
      foundationDesc: "Officially established in Chennai with a core founding team.",
      launchlabDeployedTitle: "LaunchLab Deployed",
      launchlabDeployedDate: "May 2026",
      launchlabDeployedDesc: "Successfully launched our B2B web agency division to generate operating capital.",
      nextstepMVPTitle: "NextStep MVP",
      nextstepMVPStatus: "In Development",
      nextstepMVPDesc: "Testing psychometric engine with initial cohort of 500+ waitlisted students."
    },
    about: {
      title: "Our Story & Vision",
      subtitle: "From a student dream to a nation-wide mission.",
      storyTitle: "Our Story",
      storyText: "Thiran was founded on 06th March 2026 by G S Varshith, a 2nd year college student from Erode, Tamil Nadu. What started as a dream to build an AI tool became a mission to transform education across India. Operating from Chennai, the capital of Tamil Nadu, Thiran represents the energy and ambition of young India building for India.",
      whyTitle: "Why Education?",
      whyText: "Every year, millions of students in India choose the wrong course, the wrong college, the wrong career — simply because no one guided them. We saw this problem firsthand as students and peers. We built NextStep to solve it, providing guidance that meets students where they are.",
      missionTitle: "Our Mission",
      missionText: "To be globally No.1 in education — through AI-powered products that make the right career and educational guidance accessible to every student, in every language, from every background.",
      valuesTitle: "Core Values",
      values: {
        integrity: "Integrity",
        integrityDesc: "We only show real data, real work, and real results. No fake numbers, no inflated claims.",
        innovation: "Innovation",
        innovationDesc: "We build what doesn't exist yet. Reimagining career pathing and college matching.",
        impact: "Impact",
        impactDesc: "We measure success by lives changed and students guided, not just by revenue earned."
      },
      timelineTitle: "Milestone Timeline",
      timeline: [
        { date: "06 Mar 2026", title: "Thiran Founded", desc: "Thiran Private Ltd is officially established in Chennai by G S Varshith." },
        { date: "March 2026", title: "19-Member Team", desc: "A passionate team of 19 (volunteers + PM + co-founder) joins the mission." },
        { date: "May 2026", title: "LaunchLab Live", desc: "Our premium web agency Thiran LaunchLab is launched, rated 9.9/10." },
        { date: "Late 2026", title: "NextStep Development", desc: "AI career guidance tool enters full development and waitlist opens." },
        { date: "Future", title: "Global No. 1", desc: "Reaching millions of students to become the global leader in educational tech." }
      ]
    },
    products: {
      title: "Built by Thiran. Built for India.",
      subtitle: "Empowering creators, businesses, and students through robust digital products.",
      statusLive: "LIVE ✅",
      statusSoon: "COMING SOON 🔄",
      statusVision: "IN VISION 🔮",
      launchlab: {
        title: "Thiran LaunchLab",
        desc: "Premium web agency building digital experiences for creators, businesses, and enterprises across India. Delivering cinematic layouts, lightning-fast code, and rich SEO optimization.",
        features: ["Web Design & Branding", "Full-stack Web Apps", "SEO & Optimization", "Multilingual Support (EN, TA, HI)"],
        cta: "Visit LaunchLab →"
      },
      nextstep: {
        title: "NextStep",
        desc: "AI-powered career guidance app helping students choose the right course, college, and career path through psychometric testing, skill gap analysis, and tailored learning resources.",
        features: ["Psychometric Testing", "Degree & College Finder", "Skill Gap Analysis", "Bilingual Learning Modules"],
        cta: "Join Waitlist →",
        waitlistCount: "students already waiting",
        emailPlaceholder: "Enter your email address",
        successMsg: "Success! You have joined the NextStep waitlist."
      },
      future: {
        title: "Future Educational Tools",
        desc: "The next big thing from Thiran is taking shape. We are designing tools to democratize tutoring and skill acquisition.",
        cta: "Follow our journey →"
      }
    },
    team: {
      title: "The People Behind Thiran",
      subtitle: "19 dreamers, builders, and launchers — united by one mission.",
      roles: {
        ceo: "Founder & CEO",
        coo: "Co-founder & COO",
        pm: "Project Manager"
      },
      bottomText: "Dream · Build · Launch 🔴"
    },
    careers: {
      title: "Don't just find a job. Build something that matters.",
      subtitle: "Join a student-led, mission-driven startup where your code and ideas impact real student lives.",
      whyJoinTitle: "Why Join Thiran?",
      whyPoints: [
        { title: "Real Startup Experience", desc: "Get hands-on experience from day one. You will design, build, and deploy actual products." },
        { title: "Mission that Matters", desc: "Every line of code you write helps a student in India find their path." },
        { title: "Founding Team Access", desc: "Work directly with G S Varshith and Dharshan, brainstorming and executing together." },
        { title: "Flexible & Remote", desc: "Volunteer roles designed to fit around your studies, working in an agile environment." }
      ],
      openingsTitle: "Current Openings (Volunteer)",
      applyBtn: "Apply Now",
      formTitle: "Application Form",
      fields: {
        name: "Full Name",
        email: "Email Address",
        phone: "Phone Number",
        role: "Role Applying For",
        skills: "Your Core Skills (e.g. React, UI Design)",
        why: "Why do you want to join Thiran?",
        submit: "Submit Application",
        success: "Thank you for applying! The Thiran HR team will contact you shortly."
      }
    },
    investors: {
      title: "Partner with Thiran — Invest in India's Education Future",
      subtitle: "A massive, underserved market meets an agile, student-led building machine.",
      problemTitle: "1. The Problem",
      problemText: "Every year 1.5 crore students enroll in Indian colleges. Over 60% choose the wrong course, the wrong college, or the wrong career simply because no one guided them. This leads to massive unemployment and skill mismatch.",
      solutionTitle: "2. The Solution — NextStep",
      solutionList: [
        "AI-powered psychometric career guidance built by students, for students.",
        "Accessible in English, Tamil, and Hindi to bridge the regional barrier.",
        "Engineered for Tier 1, 2, and 3 city students equally with affordable, high-quality models."
      ],
      whyNowTitle: "3. Why Now?",
      whyNowList: [
        "India's EdTech market is projected to reach ₹2,00,000 Crore by 2030.",
        "With 60 Crore+ students, India has the largest student population in the world.",
        "Less than 5% of students have access to proper, structured career counseling."
      ],
      tractionTitle: "4. Our Traction (Honest Current Stats)",
      tractionList: [
        "LaunchLab: Live, rated 9.9/10, and generating revenue from client web projects.",
        "Team: 19 highly motivated members (17 volunteers + PM + Co-founder) already assembled.",
        "Products: 2 products in pipeline (LaunchLab live, NextStep in active development).",
        "Reach: Built from day one to support English, Tamil, and Hindi."
      ],
      askTitle: "5. The Ask",
      askText: "We are seeking seed funding of ₹15,00,000 ($18,000 USD) to accelerate NextStep development, support essential hosting/infrastructure, and scale our regional content reach. Funds will be strictly allocated to product development (70%), infrastructure/API costs (20%), and localized marketing (10%).",
      formTitle: "Interested in Partnering?",
      fields: {
        name: "Name",
        org: "Organization",
        email: "Email Address",
        message: "Message / Investment Inquiry",
        submit: "Send Message",
        success: "Inquiry Sent! G S Varshith (Founder & CEO) will reach out to you within 24 hours."
      }
    },
    contact: {
      title: "Let's Build Something Together",
      subtitle: "Got a project in mind, want to partner, or just want to say hi? Reach out!",
      inquiryTitle: "General Inquiry",
      fields: {
        name: "Full Name",
        email: "Email Address",
        subject: "Subject",
        message: "Message",
        submit: "Send Message",
        success: "Message sent successfully! We will get back to you shortly."
      },
      info: {
        email: "General Email",
        ceoEmail: "CEO Direct",
        phone: "Phone Number",
        location: "Location",
        locationVal: "Chennai, Tamil Nadu, India",
        socials: "Follow Us"
      }
    },
    portal: {
      title: "Employee Portal",
      subtitle: "Access internal resources, tasks, and booster logs.",
      passwordPrompt: "Enter Team Access Password",
      passwordPlaceholder: "Enter password...",
      loginBtn: "Login",
      errorMsg: "Access Denied. Invalid Password.",
      logoutBtn: "Logout",
      portal1Title: "Portal 1: Attendance & Booster Logs",
      portal2Title: "Portal 2: Notices, Tasks & Meetings",
      attendanceTab: "Attendance Logs",
      boosterTab: "Student Booster Metrics",
      noticesTab: "Circulars & Notices",
      tasksTab: "Sprint Tasks & Meetings"
    }
  },
  ta: {
    nav: {
      home: "முகப்பு",
      about: "எங்களைப் பற்றி",
      products: "தயாரிப்புகள்",
      team: "குழு",
      careers: "பணிகள்",
      investors: "முதலீட்டாளர்கள்",
      contact: "தொடர்பு",
      portal: "போர்டல்",
      join: "திறனுடன் இணையுங்கள் →"
    },
    intro: {
      title: "திறன்",
      tagline: "முன்னோக்கிய புத்திசாலித்தனமான படிகள்",
      mantra: "கனவு · உருவாக்கம் · தொடக்கம்",
      selectLang: "மொழியைத் தேர்ந்தெடுக்கவும் / Select Language / भाषा चुनें"
    },
    footer: {
      desc: "திறன் பிரைவேட் லிமிடெட் என்பது சென்னையை தளமாகக் கொண்ட ஒரு கல்விசார் ஸ்டார்ட்அப் ஆகும். இது இந்தியாவில் உள்ள மாணவர்களின் வாழ்க்கையை வழிநடத்தவும், மேம்படுத்தவும் மற்றும் மாற்றியமைக்கவும் AI-ஆல் இயங்கும் டிஜிட்டல் தயாரிப்புகளை உருவாக்குகிறது.",
      quickLinks: "விரைவான இணைப்புகள்",
      products: "தயாரிப்புகள்",
      rights: "© 2026 திறன் பிரைவேட் லிமிடெட். அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.",
      privacy: "தனியுரிமைக் கொள்கை",
      terms: "சேவை விதிமுறைகள்"
    },
    home: {
      badge: "கல்வி · தொழில்நுட்பம் · கண்டுபிடிப்பு",
      heading: "இந்தியாவில் கல்வியின் எதிர்காலத்தை உருவாக்குதல்",
      subtext: "திறன் பிரைவேட் லிமிடெட் என்பது சென்னையை தளமாகக் கொண்ட ஒரு ஸ்டார்ட்அப் நிறுவனமாகும், இது இந்தியா முழுவதிலும் உள்ள மாணவர்களின் வாழ்க்கையை வழிநடத்தும், மேம்படுத்தும் மற்றும் மாற்றும் AI-ஆல் இயங்கும் கல்வி தயாரிப்புகளை உருவாக்குகிறது.",
      ctaProducts: "தயாரிப்புகளை ஆராயுங்கள் →",
      ctaStory: "எங்கள் கதை →",
      ecosystemTitle: "திறன் சுற்றுச்சூழல் அமைப்பு",
      ecosystemSubtitle: "கல்வி மற்றும் தொழில்நுட்பத்தில் முன்னோக்கிய புத்திசாலித்தனமான படிகள்",
      stats: {
        products: "தயாரிப்புகள்",
        members: "குழு உறுப்பினர்கள்",
        languages: "மொழிகள்",
        mission: "இலக்கு"
      },
      visionQuote: "உங்கள் கனவை நீங்கள் கட்டியெழுப்பவில்லை என்றால், தங்களது கனவை கட்டியெழுப்ப யாராவது ஒருவர் உங்களை வேலைக்கு அமர்த்துவார்கள்.",
      visionAuthor: "— டோனி காஸ்கின்ஸ்",
      visionSubtext: "திறனில், நாங்கள் எங்களுடையதை உருவாக்கத் தேர்ந்தெடுத்தோம்.",
      status: "பீட்டா",
      heroHeading: "புத்திசாலித்தனமான",
      heroTitle: "கல்வியின் எதிர்காலத்தை",
      heroTrail: "இந்திய மாணவர்களுக்காக உருவாக்குகிறோம்.",
      heroSubtext: "இரண்டாம் மற்றும் மூன்றாம் நிலை நகரங்களில் உள்ள மாணவர்களுக்கு AI-ஆல் இயங்கும் வழிகாட்டுதல் மூலம் சிறந்த தொழில் பாதையைத் தேர்வு செய்ய உதவுகிறோம்.",
      viewDemo: "டெமோவைப் பார்க்க",
      readCaseStudies: "வழக்கு ஆய்வுகளைப் படிக்க",
      supportedLanguagesCount: "3",
      supportedLanguagesLabel: "மொழிகள்",
      waitlistLabel: "காத்திருப்போர் மாணவர்கள்",
      launchlabRatingLabel: "LaunchLab மதிப்பீடு",
      bootstrappedLabel: "சுயநிதி",
      nextstepTitle: "NextStep",
      activeBeta: "பீட்டா",
      nextstepDesc: "பிராந்திய மொழி அணுகலுக்காக சிறப்பாக வடிவமைக்கப்பட்ட AI-ஆல் இயங்கும் உளவியல் சோதனை மற்றும் தொழில் வழிகாட்டுதல் அமைப்பு.",
      multilingualDiagnostics: "பல்மொழி கண்டறிதல்",
      realTimeAnalysis: "நேரடி பகுப்பாய்வு",
      privacyArchitecture: "தனியுரிமை-முதலிய கட்டமைப்பு",
      exploreNextStep: "NextStep கட்டமைப்பை ஆராயுங்கள்",
      launchlabTitle: "LaunchLab",
      launchlabDescription: "இந்தியா முழுவதும் உள்ள படைப்பாளிகள், வணிகங்கள் மற்றும் நிறுவனங்களுக்கு டிஜிட்டல் அனுபவங்களை உருவாக்கும் பிரீமியம் வலை நிறுவனம்.",
      avgLighthouseScore: "சராசரி Lighthouse மதிப்பெண்",
      viewCaseStudies: "வழக்கு ஆய்வுகளைப் பார்க்க",
      technicalRigorTitle: "தொழில்நுட்ப கடுமை",
      technicalRigorBody: "Next.js, React மற்றும் நவீன CI/CD குழாய்களுடன் கட்டப்பட்டது. ஒவ்வொரு தயாரிப்பும் தொழிற்சாலை-தர பொறியியல் தரங்களை பின்பற்றுகிறது.",
      teamTitle: "எங்கள் குழு",
      teamDescription: "19 உற்சாகமான உருவாக்குநர்கள் — டெவலப்பர்கள், வடிவமைப்பாளர்கள் மற்றும் மூலோபாயவாதிகள் — இந்தியாவில் கல்வியை மறுவடிவமைக்க ஒன்றிணைந்து பணிபுரிகின்றனர்.",
      meetTeam: "குழுவை சந்திக்க",
      roadmapTitle: "செயல்படுத்தல் வரைபடம்",
      roadmapSubtitle: "நிறுவுதலிலிருந்து தயாரிப்பு-சந்தை பொருத்தம் வரை — நாங்கள் எங்கே நிற்கிறோம்.",
      foundationTitle: "நிறுவுதல்",
      foundationDate: "06 மார்ச் 2026",
      foundationDesc: "சென்னையில் ஒரு முக்கிய நிறுவனக் குழுவுடன் அதிகாரப்பூர்வமாக நிறுவப்பட்டது.",
      launchlabDeployedTitle: "LaunchLab தொடங்கப்பட்டது",
      launchlabDeployedDate: "மே 2026",
      launchlabDeployedDesc: "செயல்பாட்டு மூலதனத்தை உருவாக்க எங்கள் B2B வலை நிறுவனப் பிரிவை வெற்றிகரமாகத் தொடங்கியது.",
      nextstepMVPTitle: "NextStep MVP",
      nextstepMVPStatus: "வளர்ச்சியில்",
      nextstepMVPDesc: "500+ காத்திருப்போர் பட்டியல் மாணவர்களின் ஆரம்ப குழுவுடன் உளவியல் இயந்திரத்தை சோதிக்கிறது."
    },
    about: {
      title: "எங்கள் கதை மற்றும் பார்வை",
      subtitle: "மாணவர் கனவிலிருந்து தேச அளவிலான இலக்கு வரை.",
      storyTitle: "எங்கள் கதை",
      storyText: "திறன் நிறுவனம் 06 மார்ச் 2026 அன்று தமிழ்நாட்டின் ஈரோட்டைச் சேர்ந்த 2-ஆம் ஆண்டு கல்லூரி மாணவரான ஜி எஸ் வர்ஷித் என்பவரால் நிறுவப்பட்டது. ஒரு AI கருவியை உருவாக்கும் கனவாகத் தொடங்கியது இன்று இந்தியா முழுவதும் கல்வியை மாற்றியமைக்கும் ஒரு பெரிய இலக்காக மாறியுள்ளது. தமிழ்நாட்டின் தலைநகரான சென்னையில் இருந்து செயல்படும் திறன், இந்தியாவிற்காக இந்திய இளைஞர்கள் உருவாக்கும் ஆற்றலையும் லட்சியத்தையும் பிரதிபலிக்கிறது.",
      whyTitle: "ஏன் கல்வி?",
      whyText: "ஒவ்வொரு ஆண்டும், இந்தியாவில் மில்லியன் கணக்கான மாணவர்கள் தவறான படிப்பு, தவறான கல்லூரி, தவறான வாழ்க்கைப் பாதையைத் தேர்வு செய்கிறார்கள் — ஏனெனில் அவர்களுக்கு வழிகாட்ட யாரும் இல்லை. இந்த சிக்கலை ஒரு மாணவராகவும் எங்களது சக நண்பர்களிடமும் நாங்கள் கண்டோம். அதற்கு தீர்வாக NextStep-ஐ உருவாக்கினோம்.",
      missionTitle: "எங்கள் இலக்கு",
      missionText: "கல்வியில் உலகளவில் முதலிடத்தைப் பெறுவது — ஒவ்வொரு மாணவருக்கும், ஒவ்வொரு மொழியிலும், எந்தவொரு பின்னணியிலும் சரியான தொழில் மற்றும் கல்வி வழிகாட்டுதலை வழங்கும் AI தயாரிப்புகள் மூலம்.",
      valuesTitle: "முக்கிய மதிப்புகள்",
      values: {
        integrity: "நேர்மை",
        integrityDesc: "நாங்கள் உண்மையான தரவு, உண்மையான வேலை மற்றும் உண்மையான முடிவுகளை மட்டுமே காட்டுகிறோம். போலி எண்கள் இல்லை, மிகைப்படுத்தப்பட்ட உரிமைகோரல்கள் இல்லை.",
        innovation: "புதுமை",
        innovationDesc: "இன்னும் உருவாகாத ஒன்றை நாங்கள் உருவாக்குகிறோம். தொழில் பாதை மற்றும் கல்லூரித் தேர்வை மறுவடிவமைப்பு செய்கிறோம்.",
        impact: "தாக்கம்",
        impactDesc: "வெற்றியை வருவாயைக் கொண்டு அல்ல, மாறாக மாற்றப்பட்ட மாணவர்களின் வாழ்க்கையைக் கொண்டு அளவிடுகிறோம்."
      },
      timelineTitle: "முக்கிய மைல்கற்கள்",
      timeline: [
        { date: "06 மார்ச் 2026", title: "திறன் தொடங்கப்பட்டது", desc: "சென்னையில் ஜி எஸ் வர்ஷித் அவர்களால் திறன் பிரைவேட் லிமிடெட் அதிகாரப்பூர்வமாக நிறுவப்பட்டது." },
        { date: "மார்ச் 2026", title: "19 பேர் கொண்ட குழு", desc: "ஒருங்கிணைந்த 19 பேர் (தன்னார்வலர்கள் + PM + இணை நிறுவனர்) இந்த இலக்கில் இணைகிறார்கள்." },
        { date: "மே 2026", title: "LaunchLab நேரலை", desc: "எங்கள் பிரீமியம் இணைய நிறுவனம் திறன் LaunchLab தொடங்கப்பட்டது, மதிப்பீடு 9.9/10." },
        { date: "2026 இறுதி", title: "NextStep உருவாக்கம்", desc: "AI தொழில் வழிகாட்டி தயாரிப்பு தீவிர உருவாக்கத்தில் நுழைகிறது மற்றும் காத்திருப்போர் பட்டியல் தொடங்குகிறது." },
        { date: "எதிர்காலம்", title: "உலகளவில் முதலிடம்", desc: "கல்வித் தொழில்நுட்பத்தில் உலகளாவிய தலைவராக மாறி மில்லியன் கணக்கான மாணவர்களை சென்றடைதல்." }
      ]
    },
    products: {
      title: "திறனால் உருவாக்கப்பட்டது. இந்தியாவிற்காக உருவாக்கப்பட்டது.",
      subtitle: "வலிமையான டிஜிட்டல் தயாரிப்புகள் மூலம் படைப்பாளிகள், வணிகங்கள் மற்றும் மாணவர்களை மேம்படுத்துதல்.",
      statusLive: "நேரலை ✅",
      statusSoon: "விரைவில் 🔄",
      statusVision: "தொலைநோக்கில் 🔮",
      launchlab: {
        title: "திறன் LaunchLab",
        desc: "இந்தியா முழுவதும் உள்ள படைப்பாளிகள், வணிகங்கள் மற்றும் நிறுவனங்களுக்கு டிஜிட்டல் அனுபவங்களை உருவாக்கும் பிரீமியம் இணைய நிறுவனம். சிறந்த வடிவமைப்புகள், அதிவேக குறியீடுகள் மற்றும் தேடுபொறி உகப்பாக்கம் (SEO) ஆகியவற்றை வழங்குகிறது.",
        features: ["இணைய வடிவமைப்பு மற்றும் பிராண்டிங்", "முழு-அடுக்கு இணைய பயன்பாடுகள்", "SEO உகப்பாக்கம்", "பல்மொழி ஆதரவு (EN, TA, HI)"],
        cta: "LaunchLab-ஐப் பார்வையிடவும் →"
      },
      nextstep: {
        title: "NextStep",
        desc: "மாணவர்கள் தங்களது உளவியல் சோதனை, திறன் இடைவெளி பகுப்பாய்வு மற்றும் பிரத்யேக கற்றல் வளங்கள் மூலம் சரியான படிப்பு, கல்லூரி மற்றும் வாழ்க்கைப் பாதையைத் தேர்வு செய்ய உதவும் AI-ஆல் இயங்கும் தொழில் வழிகாட்டி செயலி.",
        features: ["உளவியல் சோதனை (Psychometric Testing)", "படிப்பு மற்றும் கல்லூரி கண்டுபிடிப்பான்", "திறன் இடைவெளி பகுப்பாய்வு", "இருமொழி கற்றல் தொகுதிகள்"],
        cta: "காத்திருப்போர் பட்டியலில் இணையுங்கள் →",
        waitlistCount: "மாணவர்கள் ஏற்கனவே காத்திருக்கிறார்கள்",
        emailPlaceholder: "உங்கள் மின்னஞ்சல் முகவரியை உள்ளிடவும்",
        successMsg: "வெற்றி! நீங்கள் NextStep காத்திருப்போர் பட்டியலில் இணைந்துள்ளீர்கள்."
      },
      future: {
        title: "எதிர்கால கல்வி கருவிகள்",
        desc: "திறனின் அடுத்த முக்கிய தயாரிப்பு வடிவம் பெறுகிறது. கல்வி கற்பித்தல் மற்றும் திறன் கையகப்படுத்துதலை எளிமைப்படுத்தும் கருவிகளை வடிவமைக்கிறோம்.",
        cta: "எங்கள் பயணத்தைப் பின்தொடரவும் →"
      }
    },
    team: {
      title: "திறனின் பின்னணியில் உள்ளவர்கள்",
      subtitle: "19 கனவு காண்பவர்கள், உருவாக்குபவர்கள் மற்றும் தொடங்குபவர்கள் — ஒரு இலக்கின் கீழ் இணைந்தவர்கள்.",
      roles: {
        ceo: "நிறுவனர் & தலைமை நிர்வாக அதிகாரி (CEO)",
        coo: "இணை நிறுவனர் & COO",
        pm: "திட்ட மேலாளர் (Project Manager)"
      },
      bottomText: "கனவு · உருவாக்கம் · தொடக்கம் 🔴"
    },
    careers: {
      title: "வேலையை மட்டும் தேடாதீர்கள். தாக்கத்தை ஏற்படுத்தும் ஒன்றை உருவாக்குங்கள்.",
      subtitle: "மாணவர்களால் வழிநடத்தப்படும் ஸ்டார்ட்அப்பில் இணைந்து, உங்களது குறியீடுகள் மூலம் மாணவர்களின் வாழ்க்கையில் மாற்றத்தை அதற்கு சான்றாக ஏற்படுத்துங்கள்.",
      whyJoinTitle: "ஏன் திறனில் இணைய வேண்டும்?",
      whyPoints: [
        { title: "உண்மையான ஸ்டார்ட்அப் அனுபவம்", desc: "முதல் நாளில் இருந்தே நடைமுறை அனுபவத்தைப் பெறுங்கள். நீங்கள் உண்மையான தயாரிப்புகளை வடிவமைத்து உருவாக்குவீர்கள்." },
        { title: "தாக்கத்தை ஏற்படுத்தும் பணி", desc: "நீங்கள் எழுதும் ஒவ்வொரு வரிக் குறியீடும் இந்தியாவின் ஒரு மாணவருக்கு சரியான வழியைக் கண்டறிய உதவுகிறது." },
        { title: "நிறுவனர்களுடன் நேரடி தொடர்பு", desc: "ஜி எஸ் வர்ஷித் மற்றும் தர்ஷன் ஆகியோருடன் நேரடியாக இணைந்து பணியாற்றலாம்." },
        { title: "நெகிழ்வான மற்றும் தொலைநிலை பணி", desc: "உங்களது படிப்புக்கு இடையூறு இல்லாத வகையில் வடிவமைக்கப்பட்ட தன்னார்வப் பணிகள்." }
      ],
      openingsTitle: "தற்போதைய காலியிடங்கள் (தன்னார்வலர்)",
      applyBtn: "இப்போதே விண்ணப்பிக்கவும்",
      formTitle: "விண்ணப்பப் படிவம்",
      fields: {
        name: "முழு பெயர்",
        email: "மின்னஞ்சல் முகவரி",
        phone: "தொலைபேசி எண்",
        role: "விண்ணப்பிக்கும் பணி",
        skills: "முக்கிய திறன்கள் (எ.கா. React, UI Design)",
        why: "ஏன் நீங்கள் திறனில் இணைய விரும்புகிறீர்கள்?",
        submit: "விண்ணப்பத்தை சமர்ப்பிக்கவும்",
        success: "விண்ணப்பித்ததற்கு நன்றி! திறனின் மனிதவள மேம்பாட்டு (HR) குழு விரைவில் உங்களைத் தொடர்பு கொள்ளும்."
      }
    },
    investors: {
      title: "திறனுடன் கூட்டு சேருங்கள் — இந்தியாவின் கல்வியின் எதிர்காலத்தில் முதலீடு செய்யுங்கள்",
      subtitle: "மிகப்பெரிய சந்தை தேவையை நோக்கி மாணவர்களால் வழிநடத்தப்படும் ஒரு ஸ்டார்ட்அப்.",
      problemTitle: "1. பிரச்சனை",
      problemText: "ஒவ்வொரு ஆண்டும் 1.5 கோடி மாணவர்கள் இந்தியக் கல்லூரிகளில் சேர்கிறார்கள். இவர்களில் 60%க்கும் அதிகமானோர் வழிகாட்டல் இல்லாததால் தவறான படிப்பு அல்லது தவறான கல்லூரியைத் தேர்வு செய்கிறார்கள். இது வேலைவாய்ப்பின்மைக்கு வழிவகுக்கிறது.",
      solutionTitle: "2. தீர்வு — NextStep",
      solutionList: [
        "மாணவர்களால் மாணவர்களுக்காக உருவாக்கப்பட்ட AI-ஆல் இயங்கும் தொழில் வழிகாட்டுதல்.",
        "பிராந்திய தடைகளை உடைக்க ஆங்கிலம், தமிழ் மற்றும் இந்தி மொழிகளில் கிடைக்கும் தன்மை.",
        "அனைத்து தரப்பு மாணவர்களுக்கும் மலிவு விலையில் உயர்தர மாதிரிகளை வழங்குதல்."
      ],
      whyNowTitle: "3. ஏன் இப்போது?",
      whyNowList: [
        "இந்தியாவின் கல்வித் தொழில்நுட்ப சந்தை 2030க்குள் ₹2,00,000 கோடியை எட்டும் என மதிப்பிடப்பட்டுள்ளது.",
        "60 கோடிக்கும் அதிகமான மாணவர்களுடன், இந்தியா உலகின் மிகப்பெரிய மாணவர் மக்கள்தொகையைக் கொண்டுள்ளது.",
        "5%க்கும் குறைவான மாணவர்களுக்கே முறையான வழிகாட்டுதல்கள் கிடைக்கின்றன."
      ],
      tractionTitle: "4. எங்கள் இழுவை (உண்மையான தற்போதைய புள்ளிவிவரங்கள்)",
      tractionList: [
        "LaunchLab: நேரலையில் உள்ளது மற்றும் வாடிக்கையாளர் திட்டங்கள் மூலம் வருவாயை ஈட்டுகிறது.",
        "குழு: 19 உந்துதல் பெற்ற உறுப்பினர்கள் (17 தன்னார்வலர்கள் + PM + இணை நிறுவனர்) இணைந்துள்ளனர்.",
        "தயாரிப்புகள்: வழியில் 2 தயாரிப்புகள் (LaunchLab நேரலை, NextStep உருவாக்கத்தில் உள்ளது).",
        "மொழிகள்: ஆங்கிலம், தமிழ் மற்றும் இந்தி மொழிகளுக்கான முழு ஆதரவு."
      ],
      askTitle: "5. முதலீட்டுத் தேவை",
      askText: "NextStep இன் உருவாக்கத்தை வேகப்படுத்த, உள்கட்டமைப்பு செலவுகள் மற்றும் பிராந்திய சந்தைப்படுத்துதலை விரிவுபடுத்த ₹15,00,000 ($18,000 USD) விதை நிதியைத் தேடுகிறோம். நிதியானது தயாரிப்பு மேம்பாட்டிற்கு 70%, உள்கட்டமைப்பிற்கு 20% மற்றும் உள்ளூர் சந்தைப்படுத்துதலுக்கு 10% என பிரிக்கப்படும்.",
      formTitle: "கூட்டு சேர ஆர்வமா?",
      fields: {
        name: "பெயர்",
        org: "நிறுவனம்",
        email: "மின்னஞ்சல் முகவரி",
        message: "முதலீட்டு விசாரணை செய்தி",
        submit: "செய்தி அனுப்பு",
        success: "விசாரணை அனுப்பப்பட்டது! ஜி எஸ் வர்ஷித் (CEO) 24 மணிநேரத்திற்குள் உங்களைத் தொடர்பு கொள்வார்."
      }
    },
    contact: {
      title: "ஒன்றாக இணைந்து உருவாக்குவோம்",
      subtitle: "உங்களுக்கு ஏதேனும் திட்டங்கள் இருந்தால் அல்லது எங்களுடன் கூட்டு சேர விரும்பினால் எங்களைத் தொடர்பு கொள்ளவும்!",
      inquiryTitle: "பொதுவான விசாரணை",
      fields: {
        name: "முழு பெயர்",
        email: "மின்னஞ்சல் முகவரி",
        subject: "பொருள் (Subject)",
        message: "செய்தி",
        submit: "செய்தி அனுப்பு",
        success: "செய்தி வெற்றிகரமாக அனுப்பப்பட்டது! விரைவில் உங்களைத் தொடர்பு கொள்வோம்."
      },
      info: {
        email: "பொது மின்னஞ்சல்",
        ceoEmail: "தலைமை நிர்வாக மின்னஞ்சல்",
        phone: "தொலைபேசி எண்",
        location: "இருப்பிடம்",
        locationVal: "சென்னை, தமிழ்நாடு, இந்தியா",
        socials: "எங்களைப் பின்தொடரவும்"
      }
    },
    portal: {
      title: "பணியாளர் போர்டல் (Portal)",
      subtitle: "உள்வளங்கள், பணிகள் மற்றும் ஊக்க பதிவுகளை அணுகவும்.",
      passwordPrompt: "குழு அணுகல் கடவுச்சொல்லை உள்ளிடவும்",
      passwordPlaceholder: "கடவுச்சொல்...",
      loginBtn: "உள்நுழை",
      errorMsg: "அணுகல் மறுக்கப்பட்டது. தவறான கடவுச்சொல்.",
      logoutBtn: "வெளியேறு",
      portal1Title: "போர்டல் 1: வருகை மற்றும் ஊக்க பதிவுகள்",
      portal2Title: "போர்டல் 2: அறிவிப்புகள், பணிகள் மற்றும் கூட்டங்கள்",
      attendanceTab: "வருகைப் பதிவுகள்",
      boosterTab: "மாணவர் ஊக்க அளவீடுகள்",
      noticesTab: "அறிவிப்புகள் மற்றும் சுற்றறிக்கைகள்",
      tasksTab: "பணிகள் மற்றும் கூட்டங்கள்"
    }
  },
  hi: {
    nav: {
      home: "होम",
      about: "हमारे बारे में",
      products: "उत्पाद",
      team: "टीम",
      careers: "करियर",
      investors: "निवेशक",
      contact: "संपर्क",
      portal: "पोर्टल",
      join: "थिरन से जुड़ें →"
    },
    intro: {
      title: "थिरन",
      tagline: "सफलता की ओर समझदार कदम",
      mantra: "सपना · निर्माण · शुभारंभ",
      selectLang: "भाषा चुनें / மொழியைத் தேர்ந்தெடுக்கவும் / Select Language"
    },
    footer: {
      desc: "थिरन प्राइवेट लिमिटेड चेन्नई स्थित एक शिक्षा-केंद्रित स्टार्टअप है जो भारत भर में छात्रों के जीवन को निर्देशित करने, सशक्त बनाने और बदलने के लिए AI-संचालित डिजिटल उत्पाद बना रहा है।",
      quickLinks: "त्वरित संपर्क",
      products: "उत्पाद",
      rights: "© 2026 थिरन प्राइवेट लिमिटेड। सर्वाधिकार सुरक्षित।",
      privacy: "गोपनीयता नीति",
      terms: "सेवा की शर्तें"
    },
    home: {
      badge: "शिक्षा · प्रौद्योगिकी · नवाचार",
      heading: "भारत में शिक्षा के भविष्य का निर्माण",
      subtext: "थिरन प्राइवेट लिमिटेड चेन्नई स्थित एक स्टार्टअप है जो AI-संचालित शिक्षा उत्पाद बना रहा है जो पूरे भारत में छात्रों के जीवन को मार्गदर्शन, सशक्त और रूपांतरित करते हैं।",
      ctaProducts: "उत्पादों की खोज करें →",
      ctaStory: "हमारी कहानी →",
      ecosystemTitle: "थिरन इकोसिस्टम",
      ecosystemSubtitle: "शिक्षा और प्रौद्योगिकी में समझदार कदम",
      stats: {
        products: "उत्पाद",
        members: "टीम के सदस्य",
        languages: "भाषाएँ",
        mission: "लक्ष्य"
      },
      visionQuote: "यदि आप अपने सपने का निर्माण नहीं करते हैं, तो कोई और आपको उनके सपनों के निर्माण में मदद करने के लिए काम पर रखेगा।",
      visionAuthor: "— टोनी गास्किन्स",
      visionSubtext: "थिरन में, हमने अपना खुद का बनाने का फैसला किया।",
      status: "बीटा",
      heroHeading: "बुद्धिमान",
      heroTitle: "शिक्षा का भविष्य",
      heroTrail: "भारतीय छात्रों के लिए बना रहे हैं।",
      heroSubtext: "टियर-2 और टियर-3 शहरों के छात्रों को AI-संचालित मार्गदर्शन के माध्यम से बेहतर करियर पथ चुनने में मदद कर रहे हैं।",
      viewDemo: "डेमो देखें",
      readCaseStudies: "केस स्टडी पढ़ें",
      supportedLanguagesCount: "3",
      supportedLanguagesLabel: "भाषाएँ",
      waitlistLabel: "वेटलिस्ट छात्र",
      launchlabRatingLabel: "LaunchLab रेटिंग",
      bootstrappedLabel: "स्वनिधि",
      nextstepTitle: "NextStep",
      activeBeta: "बीटा",
      nextstepDesc: "क्षेत्रीय भाषा पहुँच के लिए विशेष रूप से डिज़ाइन किया गया AI-संचालित साइकोमेट्रिक परीक्षण और करियर मैपिंग सिस्टम।",
      multilingualDiagnostics: "बहुभाषी निदान",
      realTimeAnalysis: "रियल-टाइम विश्लेषण",
      privacyArchitecture: "प्राइवेसी-फ़र्स्ट आर्किटेक्चर",
      exploreNextStep: "NextStep आर्किटेक्चर देखें",
      launchlabTitle: "LaunchLab",
      launchlabDescription: "भारत भर में क्रिएटर्स, बिज़नेस और एंटरप्राइज़ के लिए डिजिटल अनुभव बनाने वाली प्रीमियम वेब एजेंसी।",
      avgLighthouseScore: "औसत Lighthouse स्कोर",
      viewCaseStudies: "केस स्टडी देखें",
      technicalRigorTitle: "तकनीकी कठोरता",
      technicalRigorBody: "Next.js, React और आधुनिक CI/CD पाइपलाइन के साथ निर्मित। हर उत्पाद उद्योग-स्तरीय इंजीनियरिंग मानकों का पालन करता है।",
      teamTitle: "हमारी टीम",
      teamDescription: "19 जुनूनी बिल्डर्स — डेवलपर्स, डिज़ाइनर्स और स्ट्रैटेजिस्ट — भारत में शिक्षा को नया रूप देने के लिए मिलकर काम कर रहे हैं।",
      meetTeam: "टीम से मिलें",
      roadmapTitle: "कार्यान्वयन रोडमैप",
      roadmapSubtitle: "स्थापना से प्रोडक्ट-मार्केट फ़िट तक — यहाँ हम खड़े हैं।",
      foundationTitle: "स्थापना",
      foundationDate: "06 मार्च 2026",
      foundationDesc: "चेन्नई में एक कोर फ़ाउंडिंग टीम के साथ आधिकारिक रूप से स्थापित।",
      launchlabDeployedTitle: "LaunchLab लॉन्च हुआ",
      launchlabDeployedDate: "मई 2026",
      launchlabDeployedDesc: "ऑपरेटिंग कैपिटल जनरेट करने के लिए हमारे B2B वेब एजेंसी डिवीज़न को सफलतापूर्वक लॉन्च किया।",
      nextstepMVPTitle: "NextStep MVP",
      nextstepMVPStatus: "विकास में",
      nextstepMVPDesc: "500+ वेटलिस्टेड छात्रों के साथ साइकोमेट्रिक इंजन का परीक्षण।"
    },
    about: {
      title: "हमारी कहानी और दृष्टिकोण",
      subtitle: "एक छात्र के सपने से एक राष्ट्रव्यापी लक्ष्य तक।",
      storyTitle: "हमारी कहानी",
      storyText: "थिरन की स्थापना 06 मार्च 2026 को तमिलनाडु के इरोड के रहने वाले कॉलेज के द्वितीय वर्ष के छात्र जी एस वर्शिथ द्वारा की गई थी। एक AI उपकरण बनाने के सपने के रूप में जो शुरू हुआ था, वह पूरे भारत में शिक्षा को बदलने का एक बड़ा अभियान बन गया है। तमिलनाडु की राजधानी चेन्नई से संचालित, थिरन भारत के लिए निर्माण करने वाले युवा भारत की ऊर्जा और महत्वाकांक्षा का प्रतिनिधित्व करता है।",
      whyTitle: "शिक्षा क्यों?",
      whyText: "हर साल, भारत में लाखों छात्र गलत कोर्स, गलत कॉलेज, गलत करियर चुनते हैं — सिर्फ इसलिए कि उन्हें किसी ने मार्गदर्शन नहीं दिया। हमने एक छात्र के रूप में और अपने सहपाठियों के बीच इस समस्या को देखा और इसे हल करने के लिए NextStep का निर्माण किया।",
      missionTitle: "हमारा लक्ष्य",
      missionText: "शिक्षा में वैश्विक स्तर पर नंबर 1 बनना — AI-संचालित उत्पादों के माध्यम से जो हर छात्र को, हर भाषा में, हर पृष्ठभूमि से सही करियर और शैक्षिक मार्गदर्शन सुलभ कराते हैं।",
      valuesTitle: "मूल मूल्य",
      values: {
        integrity: "ईमानदारी",
        integrityDesc: "हम केवल वास्तविक डेटा, वास्तविक काम और वास्तविक परिणाम दिखाते हैं। कोई फर्जी नंबर या बढ़ा-चढ़ाकर किए गए दावे नहीं।",
        innovation: "नवाचार",
        innovationDesc: "हम वह बनाते हैं जो अभी तक मौजूद नहीं है। हम करियर निर्माण और कॉलेज मिलान की फिर से कल्पना कर रहे हैं।",
        impact: "प्रभाव",
        impactDesc: "हम सफलता को राजस्व से नहीं बल्कि बदले हुए छात्रों के जीवन से मापते हैं।"
      },
      timelineTitle: "महत्वपूर्ण उपलब्धियां",
      timeline: [
        { date: "06 मार्च 2026", title: "थिरन की स्थापना", desc: "चेन्नई में जी एस वर्शिथ द्वारा थिरन प्राइवेट लिमिटेड की आधिकारिक तौर पर स्थापना की गई।" },
        { date: "मार्च 2026", title: "19-सदस्यीय टीम", desc: "19 लोगों की एक समर्पित टीम (स्वयंसेवक + पीएम + सह-संस्थापक) इस लक्ष्य में शामिल होती है।" },
        { date: "मई 2026", title: "LaunchLab लाइव", desc: "हमारी प्रीमियम वेब एजेंसी थिरन LaunchLab शुरू हुई, जिसे 9.9/10 की रेटिंग मिली।" },
        { date: "2026 के अंत में", title: "NextStep विकास", desc: "AI करियर मार्गदर्शन उत्पाद पूर्ण विकास में प्रवेश करता है और प्रतीक्षा सूची शुरू होती है।" },
        { date: "भविष्य", title: "वैश्विक नंबर 1", desc: "शिक्षा तकनीक में वैश्विक नेता बनने के लिए लाखों छात्रों तक पहुँचना।" }
      ]
    },
    products: {
      title: "थिरन द्वारा निर्मित। भारत के लिए निर्मित।",
      subtitle: "मजबूत डिजिटल उत्पादों के माध्यम से रचनाकारों, व्यवसायों और छात्रों को सशक्त बनाना।",
      statusLive: "लाइव ✅",
      statusSoon: "जल्द आ रहा है 🔄",
      statusVision: "दृष्टिकोण में 🔮",
      launchlab: {
        title: "थिरन LaunchLab",
        desc: "भारत भर में रचनाकारों, व्यवसायों और उद्यमों के लिए डिजिटल अनुभव बनाने वाली प्रीमियम वेब एजेंसी। यह उत्कृष्ट डिजाइन, बेहद तेज कोड और खोज इंजन अनुकूलन (SEO) प्रदान करता है।",
        features: ["वेब डिजाइन और ब्रांडिंग", "फुल-स्टैक वेब ऐप्स", "SEO अनुकूलन", "बहुभाषी सहायता (EN, TA, HI)"],
        cta: "LaunchLab पर जाएँ →"
      },
      nextstep: {
        title: "NextStep",
        desc: "AI-संचालित करियर मार्गदर्शन ऐप जो छात्रों को उनके मनोवैज्ञानिक परीक्षण, कौशल अंतर विश्लेषण और विशिष्ट शिक्षण संसाधनों के माध्यम से सही पाठ्यक्रम, कॉलेज और करियर का चयन करने में मदद करता है।",
        features: ["मनोवैज्ञानिक परीक्षण (Psychometric Testing)", "कोर्स और कॉलेज खोजक", "कौशल अंतर विश्लेषण", "द्विभाषी शिक्षण मॉड्यूल"],
        cta: "प्रतीक्षा सूची में शामिल हों →",
        waitlistCount: "छात्र पहले से ही प्रतीक्षा कर रहे हैं",
        emailPlaceholder: "अपना ईमेल पता दर्ज करें",
        successMsg: "सफलता! आप NextStep प्रतीक्षा सूची में शामिल हो गए हैं।"
      },
      future: {
        title: "भविष्य के शैक्षणिक उपकरण",
        desc: "थिरन का अगला बड़ा उत्पाद आकार ले रहा है। हम ऐसे उपकरण डिजाइन कर रहे हैं जो शिक्षा और कौशल प्राप्ति को सुलभ बनाएंगे।",
        cta: "हमारी यात्रा का अनुसरण करें →"
      }
    },
    team: {
      title: "थिरन के पीछे के लोग",
      subtitle: "19 स्वप्नद्रष्टा, निर्माता और प्रवर्तक — एक लक्ष्य के तहत एकजुट।",
      roles: {
        ceo: "संस्थापक और सीईओ",
        coo: "सह-संस्थापक और COO",
        pm: "परियोजना प्रबंधक (Project Manager)"
      },
      bottomText: "सपना · निर्माण · शुभारंभ 🔴"
    },
    careers: {
      title: "केवल नौकरी न ढूंढें। कुछ ऐसा बनाएं जो मायने रखता हो।",
      subtitle: "छात्रों के नेतृत्व वाले स्टार्टअप से जुड़ें जहां आपके कोड और विचारों से छात्रों के जीवन पर सीधा प्रभाव पड़ता है।",
      whyJoinTitle: "थिरन से क्यों जुड़ें?",
      whyPoints: [
        { title: "वास्तविक स्टार्टअप अनुभव", desc: "पहले दिन से ही व्यावहारिक अनुभव प्राप्त करें। आप वास्तविक उत्पादों को डिजाइन और विकसित करेंगे।" },
        { title: "मायने रखने वाला मिशन", desc: "आपके द्वारा लिखे गए कोड की हर पंक्ति भारत के किसी छात्र को सही राह खोजने में मदद करती है।" },
        { title: "संस्थापक टीम तक पहुंच", desc: "जी एस वर्शिथ और दर्शन के साथ मिलकर काम करने का मौका।" },
        { title: "लचीला और रिमोट काम", desc: "अपनी पढ़ाई में बाधा न डालने के लिए डिज़ाइन की गई स्वयंसेवी भूमिकाएँ।" }
      ],
      openingsTitle: "वर्तमान रिक्तियां (स्वयंसेवक)",
      applyBtn: "अभी आवेदन करें",
      formTitle: "आवेदन पत्र",
      fields: {
        name: "पूरा नाम",
        email: "ईमेल पता",
        phone: "फ़ोन नंबर",
        role: "आवेदन की भूमिका",
        skills: "मुख्य कौशल (जैसे React, UI Design)",
        why: "आप थिरन से क्यों जुड़ना चाहते हैं?",
        submit: "आवेदन जमा करें",
        success: "आवेदन के लिए धन्यवाद! थिरन की मानव संसाधन (HR) टीम जल्द ही आपसे संपर्क करेगी।"
      }
    },
    investors: {
      title: "थिरन के साथ साझेदारी करें — भारत के शिक्षा के भविष्य में निवेश करें",
      subtitle: "वेबसाइट निर्माण और करियर ऐप का विकास करने वाला छात्रों का स्टार्टअप।",
      problemTitle: "1. समस्या",
      problemText: "हर साल 1.5 करोड़ छात्र भारतीय कॉलेजों में प्रवेश लेते हैं। इनमें से 60% से अधिक छात्र मार्गदर्शन की कमी के कारण गलत कोर्स, गलत कॉलेज या गलत करियर का चयन करते हैं। इससे बेरोजगारी बढ़ती है।",
      solutionTitle: "2. समाधान — NextStep",
      solutionList: [
        "छात्रों द्वारा छात्रों के लिए बनाया गया AI-संचालित करियर मार्गदर्शन।",
        "क्षेत्रीय बाधाओं को दूर करने के लिए अंग्रेजी, तमिल और हिंदी भाषाओं में उपलब्धता।",
        "सभी श्रेणियों के छात्रों के लिए सस्ती दरों पर उच्च गुणवत्ता वाले मॉडल प्रदान करना।"
      ],
      whyNowTitle: "3. अभी क्यों?",
      whyNowList: [
        "भारत का शिक्षा-तकनीक बाजार 2030 तक ₹2,00,000 करोड़ तक पहुंचने का अनुमान है।",
        "60 करोड़ से अधिक छात्रों के साथ, भारत दुनिया की सबसे बड़ी छात्र आबादी वाला देश है।",
        "5% से भी कम छात्रों के पास सही मार्गदर्शन उपलब्ध है।"
      ],
      tractionTitle: "4. हमारा आकर्षण (ईमानदार वर्तमान आँकड़े)",
      tractionList: [
        "LaunchLab: लाइव है और ग्राहकों की परियोजनाओं के माध्यम से राजस्व उत्पन्न करता है।",
        "टीम: 19 प्रेरित सदस्य (17 स्वयंसेवक + पीएम + सह-संस्थापक) पहले ही शामिल हो चुके हैं।",
        "उत्पाद: पाइपलाइन में 2 उत्पाद (LaunchLab लाइव, NextStep सक्रिय विकास में)।",
        "भाषाएं: अंग्रेजी, तमिल और हिंदी के लिए पूर्ण समर्थन।"
      ],
      askTitle: "5. निवेश की मांग",
      askText: "NextStep के विकास को तेज करने, बुनियादी ढांचे की लागत और क्षेत्रीय विपणन को बढ़ावा देने के लिए हम ₹15,00,000 ($18,000 USD) की सीड फंडिंग की तलाश कर रहे हैं। इस राशि का उपयोग विकास (70%), बुनियादी ढांचे (20%) और विपणन (10%) के लिए किया जाएगा।",
      formTitle: "साझेदारी में रुचि रखते हैं?",
      fields: {
        name: "नाम",
        org: "संगठन",
        email: "ईमेल पता",
        message: "निवेश पूछताछ संदेश",
        submit: "संदेश भेजें",
        success: "पूछताछ भेज दी गई! जी एस वर्शिथ (CEO) 24 घंटे के भीतर आपसे संपर्क करेंगे।"
      }
    },
    contact: {
      title: "चलो साथ मिलकर कुछ बनाते हैं",
      subtitle: "यदि आपके पास कोई परियोजना है या साझेदारी करना चाहते हैं तो हमसे संपर्क करें!",
      inquiryTitle: "सामान्य पूछताछ",
      fields: {
        name: "पूरा नाम",
        email: "ईमेल पता",
        subject: "विषय (Subject)",
        message: "संदेश",
        submit: "संदेश भेजें",
        success: "संदेश सफलतापूर्वक भेजा गया! हम जल्द ही आपसे संपर्क करेंगे।"
      },
      info: {
        email: "सामान्य ईमेल",
        ceoEmail: "सीईओ ईमेल",
        phone: "फ़ोन नंबर",
        location: "स्थान",
        locationVal: "चेन्नई, तमिलनाडु, भारत",
        socials: "हमारा अनुसरण करें"
      }
    },
    portal: {
      title: "कर्मचारी पोर्टल (Portal)",
      subtitle: "आंतरिक संसाधनों, कार्यों और बूस्टर लॉग तक पहुंच प्राप्त करें।",
      passwordPrompt: "टीम पहुंच पासवर्ड दर्ज करें",
      passwordPlaceholder: "पासवर्ड...",
      loginBtn: "लॉगिन",
      errorMsg: "पहुंच अस्वीकृत। अमान्य पासवर्ड।",
      logoutBtn: "लॉगआउट",
      portal1Title: "पोर्टल 1: उपस्थिति और बूस्टर लॉग",
      portal2Title: "पोर्टल 2: नोटिस, कार्य और बैठकें",
      attendanceTab: "उपस्थिति लॉग",
      boosterTab: "छात्र बूस्टर लॉग",
      noticesTab: "अधिसूचना और परिपत्र",
      tasksTab: "कार्य और बैठकें"
    }
  }
};

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState('en');
  const [showIntro, setShowIntro] = useState(true);

  // Load selected language from localStorage on client side
  useEffect(() => {
    const savedLang = localStorage.getItem('thiran_lang');
    if (savedLang) {
      setLanguageState(savedLang);
    } else {
      // Auto-detect language
      if (typeof window !== 'undefined' && navigator) {
        const userLang = navigator.language.toLowerCase();
        if (userLang.startsWith('ta')) {
          setLanguageState('ta');
        } else if (userLang.startsWith('hi')) {
          setLanguageState('hi');
        } else {
          setLanguageState('en');
        }
      }
    }
    
    const introSeen = sessionStorage.getItem('thiran_intro_seen');
    if (introSeen === 'true') {
      setShowIntro(false);
    }
  }, []);

  const setLanguage = (lang) => {
    if (translations[lang]) {
      setLanguageState(lang);
      localStorage.setItem('thiran_lang', lang);
    }
  };

  const completeIntro = (lang) => {
    setLanguage(lang);
    setShowIntro(false);
    sessionStorage.setItem('thiran_intro_seen', 'true');
  };

  // Helper function to translate keys using dot notation (e.g. 'home.title')
  const t = (keyPath) => {
    const keys = keyPath.split('.');
    let translation = translations[language];

    for (const key of keys) {
      if (translation && translation[key] !== undefined) {
        translation = translation[key];
      } else {
        // Fallback to English if key is missing in active language
        let fallback = translations['en'];
        for (const fKey of keys) {
          if (fallback && fallback[fKey] !== undefined) {
            fallback = fallback[fKey];
          } else {
            return keyPath; // return raw key path if not found
          }
        }
        return fallback;
      }
    }
    return translation;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, showIntro, setShowIntro, completeIntro, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
}
