export const translations = {
    en: {
        // Navigation
        home: 'Home',
        about: 'About',
        skills: 'Skills',
        portfolio: 'Portfolio',
        contact: 'Contact',

        // Theme
        lightMode: 'Light Mode',
        darkMode: 'Dark Mode',
        theme: 'Theme',

        // Home Page - Hero
        hi: 'Hi, I\'m',
        role: 'Full Stack Developer',
        welcome: 'Welcome to my portfolio',
        viewWork: 'View My Work',
        downloadCV: 'Download CV',
        heroDescription: 'Passionate about creating beautiful and functional web experiences',

        // Home Page - Services
        services: 'Services',
        whatIOffer: 'What I Offer',
        webDevelopment: 'Web Development',
        webDevDesc: 'Building responsive and modern websites using the latest technologies',
        uiuxDesign: 'UI/UX Design',
        uiuxDesc: 'Creating intuitive and beautiful user interfaces',
        apiIntegration: 'API Integration',
        apiDesc: 'Seamless integration with third-party services and APIs',

        // Home Page - Projects
        projects: 'Projects',
        myRecentWork: 'My Recent Work',
        viewAllProjects: 'View All Projects',

        // Home Page - Testimonials
        testimonials: 'Testimonials',
        whatClientsSay: 'What Clients Say',
        clientFeedback: 'Client Feedback',

        // Home Page - FAQ
        faq: 'FAQ',
        frequentlyAsked: 'Frequently Asked Questions',
        haveQuestions: 'Have questions? Find answers here',

        // Home Page - CTA
        letsConnect: 'Let\'s Connect & Create Together',
        ctaDescription: 'I\'m always looking for opportunities to collaborate, learn, and create. Whether you have a project in mind or just want to connect, I\'d love to hear from you!',
        viewGithub: 'View My GitHub',

        // About Page
        aboutMe: 'About Me',
        myExperience: 'My Experience',
        getInTouch: 'Get In Touch',

        // Skills Page
        mySkills: 'My Skills',
        technicalSkills: 'Technical Skills',
        moreSkills: 'More Skills',

        // Portfolio Page
        myProjects: 'My Projects',
        allProjects: 'All Projects',
        featuredProjects: 'Featured Projects',
        viewDemo: 'View Demo',
        viewCode: 'View Code',
        technologies: 'Technologies',

        // Contact Page
        contactMe: 'Contact Me',
        sendMessage: 'Send Message',
        yourName: 'Your Name',
        yourEmail: 'Your Email',
        yourMessage: 'Your Message',
        send: 'Send',
        sending: 'Sending...',
        messageSent: 'Message sent successfully!',
        messageError: 'Failed to send message',

        // Footer
        allRightsReserved: 'All rights reserved',

        // Common
        loading: 'Loading...',
        error: 'Error',
        noData: 'No data available',
    },
    ar: {
        // Navigation
        home: 'الرئيسية',
        about: 'عني',
        skills: 'المهارات',
        portfolio: 'الأعمال',
        contact: 'تواصل',

        // Theme
        lightMode: 'الوضع الفاتح',
        darkMode: 'الوضع الداكن',
        theme: 'المظهر',

        // Home Page - Hero
        hi: 'مرحباً، أنا',
        role: 'مطور ويب متكامل',
        welcome: 'مرحباً بك في معرض أعمالي',
        viewWork: 'شاهد أعمالي',
        downloadCV: 'تحميل السيرة الذاتية',
        heroDescription: 'شغوف بإنشاء تجارب ويب جميلة وعملية',

        // Home Page - Services
        services: 'الخدمات',
        whatIOffer: 'ما أقدمه',
        webDevelopment: 'تطوير الويب',
        webDevDesc: 'بناء مواقع ويب متجاوبة وحديثة باستخدام أحدث التقنيات',
        uiuxDesign: 'تصميم واجهة المستخدم',
        uiuxDesc: 'إنشاء واجهات مستخدم بديهية وجميلة',
        apiIntegration: 'تكامل API',
        apiDesc: 'تكامل سلس مع خدمات وواجهات برمجية خارجية',

        // Home Page - Projects
        projects: 'المشاريع',
        myRecentWork: 'أعمالي الأخيرة',
        viewAllProjects: 'عرض جميع المشاريع',

        // Home Page - Testimonials
        testimonials: 'آراء العملاء',
        whatClientsSay: 'ماذا يقول العملاء',
        clientFeedback: 'تقييمات العملاء',

        // Home Page - FAQ
        faq: 'الأسئلة الشائعة',
        frequentlyAsked: 'الأسئلة المتكررة',
        haveQuestions: 'لديك أسئلة؟ اعثر على الإجابات هنا',

        // Home Page - CTA
        letsConnect: 'لنتواصل ونبدع معاً',
        ctaDescription: 'أبحث دائماً عن فرص للتعاون والتعلم والإبداع. سواء كان لديك مشروع في ذهنك أو تريد التواصل فقط، أحب أن أسمع منك!',
        viewGithub: 'عرض حسابي على GitHub',

        // About Page
        aboutMe: 'عني',
        myExperience: 'خبرتي',
        getInTouch: 'تواصل معي',

        // Skills Page
        mySkills: 'مهاراتي',
        technicalSkills: 'المهارات التقنية',
        moreSkills: 'المزيد من المهارات',

        // Portfolio Page
        myProjects: 'مشاريعي',
        allProjects: 'جميع المشاريع',
        featuredProjects: 'المشاريع المميزة',
        viewDemo: 'عرض تجريبي',
        viewCode: 'عرض الكود',
        technologies: 'التقنيات',

        // Contact Page
        contactMe: 'تواصل معي',
        sendMessage: 'إرسال رسالة',
        yourName: 'اسمك',
        yourEmail: 'بريدك الإلكتروني',
        yourMessage: 'رسالتك',
        send: 'إرسال',
        sending: 'جاري الإرسال...',
        messageSent: 'تم إرسال الرسالة بنجاح!',
        messageError: 'فشل إرسال الرسالة',

        // Footer
        allRightsReserved: 'جميع الحقوق محفوظة',

        // Common
        loading: 'جاري التحميل...',
        error: 'خطأ',
        noData: 'لا توجد بيانات متاحة',
    }
};

export const useTranslation = (language) => {
    const t = (key) => {
        return translations[language][key] || key;
    };

    return { t };
};
