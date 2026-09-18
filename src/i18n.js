import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  uz: {
    translation: {
      nav: {
        home: "Asosiy",
        projects: "Loyihalar",
        features: "Xususiyatlari",
        about: "Biz haqimizda",
        contact: "Bog'lanish",
        profile: "Profil",
        start: "Boshlash",
      },

      common: {
        menu: "MENU",
        systemOnline: "SYSTEM ONLINE",
        year: "2026",
        online: "Online",
        premium: "Premium",
        responsive: "Responsive",
        support: "Qo'llab-quvvatlash",
        dataProtection: "Ma'lumotlar himoyasi",
        modernTechnology: "Zamonaviy texnologiyalar",
      },

      hero: {
        badge: "Innovatsion yechimlar",
        smallTitle: "Kelajak texnologiyalari bilan",
        title: "Ish jarayonini osonlikcha soddalashtiring",
        description:
          "Biznesingizni rivojlantirish uchun zamonaviy texnologiyalar, aqlli yechimlar va moslashtirilgan platformalarni bir joyda jamladik.",
        start: "Boshlash",
        details: "Batafsil ma'lumot",
        contactCta: "Murojaat qilish",
        companyCta: "Kompaniya haqida",
        fast: "Tez va qulay",
        modern: "Zamonaviy texnologiya",
        support: "24/7 qo'llab-quvvatlash",
        innovative: "Biznesingiz uchun maxsus ishlab chiqilgan",
        performance: "Samaradorlik",
        system: "Barcha tizimlar faol",
      },

      projects: {
        label: "BIZNING LOYIHALAR",

        titlePart1: "Har bir loyihaga",
        titleHighlight: "alohida mehr",
        titlePart2: "beramiz",

        subtitle:
          "Biz bizneslar uchun real muammolarni hal qiladigan zamonaviy IT platformalar yaratamiz. Har bir loyiha biznes jarayonlarini avtomatlashtirish va boshqarishni osonlashtirishga qaratilgan.",

        nexusCategory: "BUSINESS MANAGEMENT & MDM",
        nexusTitle: "Nexus Finance",
        nexusDescription:
          "Telefonlarni kredit yoki muddatli to‘lov asosida sotadigan bizneslar uchun ishlab chiqilgan zamonaviy boshqaruv platformasi. Mijozlar, telefonlar, qurilmalar va biznes statistikasini yagona tizim orqali boshqarish imkonini beradi.",

        nexusDetails:
          "Nexus Finance orqali biznes egalari mijozlar bazasini yuritishi, telefonlar haqidagi ma'lumotlarni saqlashi, IMEI va serial raqamlarni boshqarishi, iCloud login ma'lumotlarini xavfsiz saqlashi hamda qurilmalarning Active yoki No Active holatini kuzatishi mumkin. Dashboard orqali jami telefonlar soni, faol va faol bo‘lmagan qurilmalar, oy davomida chiqarilgan telefonlar va boshqa muhim statistikalarni ko‘rish mumkin. Platformada filiallarni boshqarish imkoniyati ham mavjud. Keyingi bosqichlarda tizimga MDM integratsiyasi qo‘shilib, qurilmalarni masofadan boshqarish va bloklash imkoniyatlari kengaytiriladi. Loyiha React, TypeScript, Node.js, PostgreSQL va Prisma texnologiyalari asosida ishlab chiqilgan.",

        details: "Batafsil",
        view: "Ko‘rish",

        nextProject: "KEYINGI LOYIHA",
        yourIdea: "Sizning g‘oyangiz bo‘lishi mumkin.",
      },

      features: {
        label: "PLATFORM XUSUSIYATLARI",

        titlePart1: "Biznesingiz uchun",
        titleHighlight: "kuchli imkoniyatlar",

        subtitle:
          "Zamonaviy biznes talablariga mos, boshqarish oson va foydalanuvchilar uchun qulay raqamli mahsulotlar yaratamiz.",

        admin: "Admin panel",
        adminDescription:
          "Admin panel - biznesingizni boshqarishda sizga juda ko‘p yordam beradi. Masalan, ishchilar yoki foydalanuvchilar haqida ma'lumot, oldi-sotdi, qancha mahsulot sotildi, qaytarildi — barchasi haqida sizga ma'lumot berib boradi va online do‘kon bo‘lsa mahsulotlarni qo‘shish, o‘chirish — barchasini qilishingiz mumkin.",

        website: "Website",
        websiteDescription:
          "Tezkor va zamonaviy ko‘rinishdagi website lar yaratamiz. Turli mobil va desktop qurilmalarga mos va qulay ko‘rinishda, foydalanuvchi ma'lumotlari himoyalangan, admin panelda o‘zingiz boshqarasiz.",

        professional: "Professional va ishonchli yechim",

        secure: "Xavfsiz tizim",
        secureDescription: "Ma'lumotlaringiz himoyalangan",

        fast: "Tezkor",
        fastDescription: "Yuqori samaradorlik",

        modernTechnology: "MODERN TECHNOLOGY",
      },

      about: {
        label: "BIZ HAQIMIZDA",

        titlePart1: "Biz",
        titleHighlight: "haqimizda",

        description:
          "Bizning jamoamiz innovatsion yechimlar va yuqori sifatli xizmatlar taqdim etishga intiladi. Bizning maqsadimiz - mijozlarimizning muvaffaqiyatga erishishlariga yordam berish.",

        experienced: "Tajribali mutaxasislar",
        experiencedDesc:
          "Bizning jamoamiz sohada ko‘p yillik tajribaga ega mutaxassislardan iborat.",

        reliable: "Ishonchli hamkor",
        reliableDesc:
          "Mijozlarimiz bizga ishonishadi, chunki biz har doim ularning manfaatlarini ustun qo‘yamiz.",

        fastQuality: "Tezkor va sifatli hizmat",
        fastQualityDesc:
          "Bizning xizmatlarimiz tezkor va sifatli bo‘lib, mijozlarimizning vaqtini tejaydi.",

        performance: "PERFORMANCE",
        quality: "QUALITY",

        future: "FUTURE",
        technology: "TECHNOLOGY",

        customerFocus: "Mijozga e'tibor",
        opportunities: "Imkoniyatlar",
      },

      contact: {
        label: "ALOQA",

        titlePart1: "Keling,",
        titleHighlight: " birga ",
        titlePart2: "ajoyib loyiha yaratamiz",

        description:
          "Sizda loyiha g‘oyasi, savol yoki hamkorlik taklifi bormi? Quyidagi forma orqali murojaat qiling yoki ijtimoiy tarmoqlarimiz orqali bog‘lanishingiz mumkin.",

        responseTime: "Javob berish vaqti",
        within24Hours: "24 soat ichida",

        phone: "Aloqa",
        phoneNumber: "Telefon raqam",

        email: "Email",

        social: "Ijtimoiy tarmoqlar",

        formLabel: "LOYIHA BOSHLAYMIZ",
        formTitle: "Bizga yozing",

        name: "Ism",
        namePlaceholder: "Ismingizni kiriting",

        message: "Xabar",
        messagePlaceholder: "Xabaringizni yozing...",

        sending: "Yuborilmoqda...",
        sendMessage: "Xabar yuborish",

        security: "Sizning ma'lumotlaringiz xavfsiz saqlanadi",

        startProject: "START YOUR PROJECT",
        bottomTitle: "G‘oyangizni haqiqatga aylantiraylik.",

        error: "Xatolik",
        messageNotSent: "Xabar yuborilmadi",
        serverError: "Server bilan ulanishda muammo!",
      },

      profile: {
        courses: "Kurslar tarixi",
        settings: "Sozlamalar",
        messages: "Xabarlar",
        accountCenter: "ACCOUNT CENTER",
        titlePart1: "Shaxsiy",
        titleHighlight: "profil",
        description:
          "Shaxsiy ma'lumotlaringiz va xabarlaringizni bir joydan boshqaring.",
        activeAccount: "ACTIVE ACCOUNT",
        adminRole: "ADMIN",
        userRole: "USER",
        verified: "VERIFIED",
        blocked: "BLOCKED",
        account: "Account",
        on: "ON",
        off: "OFF",
        settingsLabel: "PROFILE SETTINGS",
        editInfo: "Ma'lumotlarni tahrirlash",
        personalInfoLabel: "PERSONAL INFORMATION",
        personalInfo: "Shaxsiy ma'lumotlar",
        notificationsLabel: "NOTIFICATIONS",
        sentMessages: "Sizga yuborilgan xabarlar",
        noMessagesDescription: "Yangi xabarlar shu yerda ko‘rinadi.",
        logoutDescription: "Hisobingizdan xavfsiz chiqishingiz mumkin.",
        loading: "Yuklanmoqda...",
        edit: "Tahrirlash",
        save: "Saqlash",
        cancel: "Bekor qilish",
        logout: "Chiqish",
        noCourses: "Hozircha tasdiqlangan kurslar yo‘q.",
        noMessages: "Hozircha xabar yo‘q 🔔",
        name: "Ism",
        username: "Username",
        email: "Email",
        phone: "Telefon",
        avatar: "Avatar",
        uploadAvatar: "Avatar yuklash",
        date: "Sana",
      },

      messages: {
        profileUpdated: "Profil yangilandi ✅",
        updateError: "Yangilashda xatolik ❌",
        avatarUploaded: "Avatar yuklandi ✅",
        avatarError: "Avatar yuklashda xatolik ❌",
        dataError: "Ma’lumotlarni olishda xatolik ❌",
        serverError: "Server bilan ulanishda muammo!",
      },
    },
  },

  ru: {
    translation: {
      nav: {
        home: "Главная",
        projects: "Проекты",
        features: "Возможности",
        about: "О нас",
        contact: "Контакты",
        profile: "Профиль",
        start: "Начать",
      },

      common: {
        menu: "МЕНЮ",
        systemOnline: "СИСТЕМА ONLINE",
        year: "2026",
        online: "Online",
        premium: "Premium",
        responsive: "Адаптивность",
        support: "Поддержка",
        dataProtection: "Защита данных",
        modernTechnology: "Современные технологии",
      },

      hero: {
        badge: "Инновационные решения",
        smallTitle: "С технологиями будущего",
        title: "Упростите рабочие процессы",
        description:
          "Современные технологии, умные решения и индивидуальные платформы для развития вашего бизнеса в одном месте.",
        start: "Начать",
        details: "Подробнее",
        contactCta: "Связаться",
        companyCta: "О компании",
        fast: "Быстро и удобно",
        modern: "Современные технологии",
        support: "Поддержка 24/7",
        innovative: "Специально разработано для вашего бизнеса",
        performance: "Эффективность",
        system: "Все системы активны",
      },

      projects: {
        label: "НАШИ ПРОЕКТЫ",

        titlePart1: "К каждому проекту",
        titleHighlight: "особое внимание",
        titlePart2: "и забота",

        subtitle:
          "Мы создаём современные IT-платформы, которые решают реальные задачи бизнеса. Каждый проект направлен на автоматизацию и упрощение управления бизнес-процессами.",

        nexusCategory: "УПРАВЛЕНИЕ БИЗНЕСОМ И MDM",
        nexusTitle: "Nexus Finance",
        nexusDescription:
          "Современная платформа для предпринимателей, которые продают смартфоны в кредит или рассрочку. Позволяет управлять клиентами, устройствами и ключевой статистикой бизнеса в единой системе.",

        nexusDetails:
          "Nexus Finance позволяет вести клиентскую базу, хранить информацию о смартфонах, управлять IMEI и серийными номерами, безопасно хранить данные iCloud и отслеживать статус каждого устройства — Active или No Active. Через dashboard предприниматель может видеть общее количество телефонов, активные и неактивные устройства, количество выданных телефонов за месяц и другую важную статистику. Также предусмотрено управление филиалами. На следующих этапах в систему планируется добавить MDM-интеграцию для удалённого управления и блокировки устройств. Проект разработан с использованием React, TypeScript, Node.js, PostgreSQL и Prisma.",

        details: "Подробнее",
        view: "Посмотреть",

        nextProject: "СЛЕДУЮЩИЙ ПРОЕКТ",
        yourIdea: "Следующим может стать ваша идея.",
      },

      features: {
        label: "ВОЗМОЖНОСТИ ПЛАТФОРМЫ",

        titlePart1: "Мощные возможности",
        titleHighlight: "для вашего бизнеса",

        subtitle:
          "Создаём цифровые продукты, соответствующие современным требованиям бизнеса, простые в управлении и удобные для пользователей.",

        admin: "Админ-панель",
        adminDescription:
          "Админ-панель значительно упрощает управление вашим бизнесом. Вы можете отслеживать сотрудников и пользователей, продажи, возвраты, добавлять и удалять товары в интернет-магазине и управлять всей системой.",

        website: "Веб-сайт",
        websiteDescription:
          "Создаём быстрые и современные веб-сайты, адаптированные под различные мобильные устройства и компьютеры. Данные пользователей защищены, а сайтом можно управлять через админ-панель.",

        professional: "Профессиональное и надёжное решение",

        secure: "Безопасная система",
        secureDescription: "Ваши данные защищены",

        fast: "Быстрый",
        fastDescription: "Высокая производительность",

        modernTechnology: "СОВРЕМЕННЫЕ ТЕХНОЛОГИИ",
      },

      about: {
        label: "О НАС",

        titlePart1: "О",
        titleHighlight: "нас",

        description:
          "Наша команда стремится предоставлять инновационные решения и услуги высокого качества. Наша цель — помогать нашим клиентам достигать успеха.",

        experienced: "Опытные специалисты",
        experiencedDesc:
          "Наша команда состоит из специалистов с многолетним опытом работы в данной сфере.",

        reliable: "Надёжный партнёр",
        reliableDesc:
          "Наши клиенты доверяют нам, потому что мы всегда ставим их интересы на первое место.",

        fastQuality: "Быстрый и качественный сервис",
        fastQualityDesc:
          "Наши услуги отличаются высокой скоростью и качеством, помогая клиентам экономить время.",

        performance: "ПРОИЗВОДИТЕЛЬНОСТЬ",
        quality: "КАЧЕСТВО",

        future: "БУДУЩИЕ",
        technology: "ТЕХНОЛОГИИ",

        customerFocus: "Внимание к клиенту",
        opportunities: "Возможности",
      },

      contact: {
        label: "КОНТАКТЫ",

        titlePart1: "Давайте",
        titleHighlight: " вместе ",
        titlePart2: "создадим отличный проект",

        description:
          "Есть идея проекта, вопрос или предложение о сотрудничестве? Свяжитесь с нами через форму или социальные сети.",

        responseTime: "Время ответа",
        within24Hours: "В течение 24 часов",

        phone: "Связь",
        phoneNumber: "Номер телефона",

        email: "Email",

        social: "Социальные сети",

        formLabel: "НАЧНЁМ ПРОЕКТ",
        formTitle: "Напишите нам",

        name: "Имя",
        namePlaceholder: "Введите ваше имя",

        message: "Сообщение",
        messagePlaceholder: "Напишите ваше сообщение...",

        sending: "Отправка...",
        sendMessage: "Отправить сообщение",

        security: "Ваши данные хранятся в безопасности",

        startProject: "НАЧНЁМ ВАШ ПРОЕКТ",
        bottomTitle: "Давайте превратим вашу идею в реальность.",

        error: "Ошибка",
        messageNotSent: "Сообщение не отправлено",
        serverError: "Проблема с подключением к серверу!",
      },

      profile: {
        courses: "История курсов",
        settings: "Настройки",
        messages: "Сообщения",
        accountCenter: "ЦЕНТР АККАУНТА",
        titlePart1: "Личный",
        titleHighlight: "профиль",
        description:
          "Управляйте личными данными и сообщениями в одном месте.",
        activeAccount: "АКТИВНЫЙ АККАУНТ",
        adminRole: "АДМИН",
        userRole: "ПОЛЬЗОВАТЕЛЬ",
        verified: "ПОДТВЕРЖДЕН",
        blocked: "ЗАБЛОКИРОВАН",
        account: "Аккаунт",
        on: "ВКЛ",
        off: "ВЫКЛ",
        settingsLabel: "НАСТРОЙКИ ПРОФИЛЯ",
        editInfo: "Редактировать данные",
        personalInfoLabel: "ЛИЧНАЯ ИНФОРМАЦИЯ",
        personalInfo: "Личные данные",
        notificationsLabel: "УВЕДОМЛЕНИЯ",
        sentMessages: "Отправленные вам сообщения",
        noMessagesDescription: "Новые сообщения появятся здесь.",
        logoutDescription: "Вы можете безопасно выйти из аккаунта.",
        loading: "Загрузка...",
        edit: "Редактировать",
        save: "Сохранить",
        cancel: "Отмена",
        logout: "Выйти",
        noCourses: "Пока нет подтверждённых курсов.",
        noMessages: "Пока нет сообщений 🔔",
        name: "Имя",
        username: "Имя пользователя",
        email: "Email",
        phone: "Телефон",
        avatar: "Аватар",
        uploadAvatar: "Загрузить аватар",
        date: "Дата",
      },

      messages: {
        profileUpdated: "Профиль обновлён ✅",
        updateError: "Ошибка обновления ❌",
        avatarUploaded: "Аватар загружен ✅",
        avatarError: "Ошибка загрузки аватара ❌",
        dataError: "Ошибка получения данных ❌",
        serverError: "Проблема с подключением к серверу!",
      },
    },
  },

  en: {
    translation: {
      nav: {
        home: "Home",
        projects: "Projects",
        features: "Features",
        about: "About Us",
        contact: "Contact",
        profile: "Profile",
        start: "Get Started",
      },

      common: {
        menu: "MENU",
        systemOnline: "SYSTEM ONLINE",
        year: "2026",
        online: "Online",
        premium: "Premium",
        responsive: "Responsive",
        support: "Support",
        dataProtection: "Data Protection",
        modernTechnology: "Modern Technology",
      },

      hero: {
        badge: "Innovative solutions",
        smallTitle: "With technologies of the future",
        title: "Simplify your workflow effortlessly",
        description:
          "Modern technologies, smart solutions and customized platforms to help your business grow — all in one place.",
        start: "Get Started",
        details: "Learn More",
        contactCta: "Contact us",
        companyCta: "About company",
        fast: "Fast & Easy",
        modern: "Modern Technology",
        support: "24/7 Support",
        innovative: "Built specifically for your business",
        performance: "Performance",
        system: "All systems active",
      },

      projects: {
        label: "OUR PROJECTS",

        titlePart1: "We give every project",
        titleHighlight: "special attention",
        titlePart2: "and care",

        subtitle:
          "We build modern IT platforms that solve real business problems. Every project is focused on automating business processes and making management easier and more efficient.",

        nexusCategory: "BUSINESS MANAGEMENT & MDM",
        nexusTitle: "Nexus Finance",
        nexusDescription:
          "A modern management platform designed for businesses that sell smartphones on credit or installment plans. It allows entrepreneurs to manage clients, devices, and key business statistics in one centralized system.",

        nexusDetails:
          "Nexus Finance allows businesses to manage their client database, store smartphone information, manage IMEI and serial numbers, securely store iCloud login credentials, and track each device as Active or No Active. The dashboard provides an overview of total devices, active and inactive phones, monthly device activity, and other important business statistics. The platform also supports branch management. In future development stages, MDM integration will be added to enable remote device management and device blocking capabilities. The project is built using React, TypeScript, Node.js, PostgreSQL, and Prisma.",

        details: "Details",
        view: "View",

        nextProject: "NEXT PROJECT",
        yourIdea: "Your idea could be next.",
      },

      features: {
        label: "PLATFORM FEATURES",

        titlePart1: "Powerful capabilities",
        titleHighlight: "for your business",

        subtitle:
          "We create digital products that meet modern business needs, are easy to manage, and convenient for users.",

        admin: "Admin Panel",
        adminDescription:
          "The admin panel makes it much easier to manage your business. You can track employees and users, sales, returns, add or remove products from your online store, and manage the entire system.",

        website: "Website",
        websiteDescription:
          "We create fast and modern websites that are responsive across mobile devices and desktops. User data is protected, and you can manage everything through the admin panel.",

        professional: "Professional and reliable solution",

        secure: "Secure System",
        secureDescription: "Your data is protected",

        fast: "Fast",
        fastDescription: "High Performance",

        modernTechnology: "MODERN TECHNOLOGY",
      },

      about: {
        label: "ABOUT US",

        titlePart1: "About",
        titleHighlight: "us",

        description:
          "Our team strives to provide innovative solutions and high-quality services. Our goal is to help our clients achieve success.",

        experienced: "Experienced specialists",
        experiencedDesc:
          "Our team consists of specialists with many years of experience in the industry.",

        reliable: "Reliable partner",
        reliableDesc:
          "Our clients trust us because we always put their interests first.",

        fastQuality: "Fast and quality service",
        fastQualityDesc:
          "Our services are fast and high-quality, helping our clients save valuable time.",

        performance: "PERFORMANCE",
        quality: "QUALITY",

        future: "FUTURE",
        technology: "TECHNOLOGY",

        customerFocus: "Customer focused",
        opportunities: "Opportunities",
      },

      contact: {
        label: "CONTACT",

        titlePart1: "Let's",
        titleHighlight: " build ",
        titlePart2: "something amazing together",

        description:
          "Have a project idea, question or partnership proposal? Contact us through the form or our social networks.",

        responseTime: "Response time",
        within24Hours: "Within 24 hours",

        phone: "Contact",
        phoneNumber: "Phone number",

        email: "Email",

        social: "Social Networks",

        formLabel: "START A PROJECT",
        formTitle: "Write to us",

        name: "Name",
        namePlaceholder: "Enter your name",

        message: "Message",
        messagePlaceholder: "Write your message...",

        sending: "Sending...",
        sendMessage: "Send message",

        security: "Your information is stored securely",

        startProject: "START YOUR PROJECT",
        bottomTitle: "Let's turn your idea into reality.",

        error: "Error",
        messageNotSent: "Message was not sent",
        serverError: "Problem connecting to the server!",
      },

      profile: {
        courses: "Course History",
        settings: "Settings",
        messages: "Messages",
        accountCenter: "ACCOUNT CENTER",
        titlePart1: "Personal",
        titleHighlight: "profile",
        description:
          "Manage your personal information and messages from one place.",
        activeAccount: "ACTIVE ACCOUNT",
        adminRole: "ADMIN",
        userRole: "USER",
        verified: "VERIFIED",
        blocked: "BLOCKED",
        account: "Account",
        on: "ON",
        off: "OFF",
        settingsLabel: "PROFILE SETTINGS",
        editInfo: "Edit information",
        personalInfoLabel: "PERSONAL INFORMATION",
        personalInfo: "Personal information",
        notificationsLabel: "NOTIFICATIONS",
        sentMessages: "Messages sent to you",
        noMessagesDescription: "New messages will appear here.",
        logoutDescription: "You can safely sign out of your account.",
        loading: "Loading...",
        edit: "Edit",
        save: "Save",
        cancel: "Cancel",
        logout: "Logout",
        noCourses: "No confirmed courses yet.",
        noMessages: "No messages yet 🔔",
        name: "Name",
        username: "Username",
        email: "Email",
        phone: "Phone",
        avatar: "Avatar",
        uploadAvatar: "Upload Avatar",
        date: "Date",
      },

      messages: {
        profileUpdated: "Profile updated ✅",
        updateError: "Update error ❌",
        avatarUploaded: "Avatar uploaded ✅",
        avatarError: "Avatar upload error ❌",
        dataError: "Error getting data ❌",
        serverError: "Server connection problem!",
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem("language") || "uz",
  fallbackLng: "uz",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;