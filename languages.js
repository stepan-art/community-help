// Многоязычная поддержка
const translations = {
    ru: {
        login: 'Вход',
        register: 'Регистрация',
        profile: 'Профиль',
        logout: 'Выход',
        admin: 'Админ',
        filters: 'Фильтры',
        offer_help: 'Предлагаю помощь',
        need_help: 'Ищу помощь',
        initiative: 'Инициативы',
        add_marker: 'Добавить отметку',
        markers_on_map: 'Отметки на карте',
        welcome_title: 'Добро пожаловать на платформу "Жить Заново"',
        welcome_desc: 'Мы создали это сообщество для людей, которые верят в силу взаимопомощи и готовы делиться своими навыками и временем. На нашей платформе каждый может:',
        welcome_offer: 'Предложить свою помощь',
        welcome_seek: 'Найти нужную помощь',
        welcome_join: 'Присоединиться к инициативам',
        welcome_mission: 'Наша миссия: создавать мощные сообщества, где люди поддерживают друг друга, где доверие и взаимность - основа отношений. Мы верим, что каждый человек имеет что-то ценное для предложения.',
        explore_map: 'Изучить карту',
        learn_more: 'Узнать больше',
        community: 'Сообщество',
        community_desc: 'Присоединитесь к растущему числу помощников',
        safe: 'Безопасно',
        safe_desc: 'Проверенные пользователи и защита данных',
        accessible: 'Доступно',
        accessible_desc: 'Многоязычная платформа для всех',
        your_name: 'Ваше имя',
        email: 'Email',
        password: 'Пароль',
        confirm_password: 'Подтвердите пароль',
        about_optional: 'О вас (опционально)',
        accept_privacy: 'Я согласен(а) с политикой конфиденциальности',
        privacy_link: 'Прочитать',
        accept_terms: 'Я согласен(а) с условиями использования',
        terms_link: 'Прочитать',
        accept_data: 'Я согласен(а) на обработку моих личных данных',
        title: 'Заголовок',
        description: 'Описание',
        location: 'Местоположение',
        contact_info_optional: 'Контактная информация (опционально)',
        use_my_location: 'Использовать мою геолокацию',
        info: 'Информация',
        my_markers: 'Мои отметки',
        documents: 'Документы',
        settings: 'Настройки',
        admin_panel: 'Админ-панель',
        materials: 'Материалы',
        philosophy: 'Философия',
        contacts: 'Контакты',
        users: 'Пользователи',
        privacy_policy: 'Политика конфиденциальности',
        ai_assistant: 'AI Помощник',
        ask_ai: 'Спросите у AI...',
        share_initiative: 'Я предлагаю инициативу'
    },
    en: {
        login: 'Login',
        register: 'Register',
        profile: 'Profile',
        logout: 'Logout',
        admin: 'Admin',
        filters: 'Filters',
        offer_help: 'I offer help',
        need_help: 'I need help',
        initiative: 'Initiatives',
        add_marker: 'Add marker',
        markers_on_map: 'Markers on map',
        welcome_title: 'Welcome to "Life Anew" Platform',
        welcome_desc: 'We created this community for people who believe in the power of mutual aid and are ready to share their skills and time. On our platform everyone can:',
        welcome_offer: 'Offer your help',
        welcome_seek: 'Find needed help',
        welcome_join: 'Join initiatives',
        welcome_mission: 'Our mission: create powerful communities where people support each other, where trust and reciprocity are the foundation of relationships. We believe every person has something valuable to offer.',
        explore_map: 'Explore map',
        learn_more: 'Learn more',
        community: 'Community',
        community_desc: 'Join our growing number of helpers',
        safe: 'Safe',
        safe_desc: 'Verified users and data protection',
        accessible: 'Accessible',
        accessible_desc: 'Multilingual platform for everyone',
        your_name: 'Your name',
        email: 'Email',
        password: 'Password',
        confirm_password: 'Confirm password',
        about_optional: 'About you (optional)',
        accept_privacy: 'I agree to the privacy policy',
        privacy_link: 'Read',
        accept_terms: 'I agree to the terms of use',
        terms_link: 'Read',
        accept_data: 'I agree to the processing of my personal data',
        title: 'Title',
        description: 'Description',
        location: 'Location',
        contact_info_optional: 'Contact information (optional)',
        use_my_location: 'Use my location',
        info: 'Info',
        my_markers: 'My markers',
        documents: 'Documents',
        settings: 'Settings',
        admin_panel: 'Admin Panel',
        materials: 'Materials',
        philosophy: 'Philosophy',
        contacts: 'Contacts',
        users: 'Users',
        privacy_policy: 'Privacy Policy',
        ai_assistant: 'AI Assistant',
        ask_ai: 'Ask AI...',
        share_initiative: 'I share an initiative'
    },
    de: {
        login: 'Anmelden',
        register: 'Registrieren',
        profile: 'Profil',
        logout: 'Abmelden',
        admin: 'Admin',
        filters: 'Filter',
        offer_help: 'Ich biete Hilfe',
        need_help: 'Ich brauche Hilfe',
        initiative: 'Initiativen',
        add_marker: 'Marker hinzufügen',
        markers_on_map: 'Marker auf der Karte',
        welcome_title: 'Willkommen auf der Plattform "Life Anew"',
        welcome_desc: 'Wir haben diese Gemeinschaft für Menschen gegründet, die an die Kraft der gegenseitigen Hilfe glauben. Auf unserer Plattform kann jeder:',
        welcome_offer: 'Hilfe anbieten',
        welcome_seek: 'Hilfe finden',
        welcome_join: 'An Initiativen teilnehmen',
        welcome_mission: 'Unsere Mission: Starke Gemeinschaften aufbauen, in denen Menschen sich gegenseitig unterstützen.',
        explore_map: 'Karte erkunden',
        learn_more: 'Mehr erfahren',
        community: 'Gemeinschaft',
        community_desc: 'Treten Sie unserer wachsenden Gemeinschaft bei',
        safe: 'Sicher',
        safe_desc: 'Verifizierte Benutzer und Datenschutz',
        accessible: 'Zugänglich',
        accessible_desc: 'Mehrsprachige Plattform für alle',
        your_name: 'Ihr Name',
        email: 'E-Mail',
        password: 'Passwort',
        confirm_password: 'Passwort bestätigen',
        about_optional: 'Über Sie (optional)',
        accept_privacy: 'Ich akzeptiere die Datenschutzrichtlinie',
        privacy_link: 'Lesen',
        accept_terms: 'Ich akzeptiere die Nutzungsbedingungen',
        terms_link: 'Lesen',
        accept_data: 'Ich stimme der Verarbeitung meiner Daten zu',
        title: 'Titel',
        description: 'Beschreibung',
        location: 'Standort',
        contact_info_optional: 'Kontaktinformation (optional)',
        use_my_location: 'Meinen Standort verwenden',
        info: 'Info',
        my_markers: 'Meine Marker',
        documents: 'Dokumente',
        settings: 'Einstellungen',
        admin_panel: 'Admin-Panel',
        materials: 'Materialien',
        philosophy: 'Philosophie',
        contacts: 'Kontakte',
        users: 'Benutzer',
        privacy_policy: 'Datenschutzrichtlinie',
        ai_assistant: 'KI-Assistent',
        ask_ai: 'Fragen Sie die KI...',
        share_initiative: 'Ich teile eine Initiative'
    },
    es: {
        login: 'Iniciar sesión',
        register: 'Registrarse',
        profile: 'Perfil',
        logout: 'Cerrar sesión',
        admin: 'Admin',
        filters: 'Filtros',
        offer_help: 'Ofrezco ayuda',
        need_help: 'Necesito ayuda',
        initiative: 'Iniciativas',
        add_marker: 'Añadir marcador',
        markers_on_map: 'Marcadores en el mapa',
        welcome_title: 'Bienvenido a la plataforma "Life Anew"',
        welcome_desc: 'Creamos esta comunidad para personas que creen en el poder de la ayuda mutua. En nuestra plataforma, todos pueden:',
        welcome_offer: 'Ofrecer ayuda',
        welcome_seek: 'Encontrar ayuda',
        welcome_join: 'Unirse a iniciativas',
        welcome_mission: 'Nuestra misión: crear comunidades poderosas donde las personas se apoyen mutuamente.',
        explore_map: 'Explorar mapa',
        learn_more: 'Más información',
        community: 'Comunidad',
        community_desc: 'Únase a nuestra creciente comunidad',
        safe: 'Seguro',
        safe_desc: 'Usuarios verificados y protección de datos',
        accessible: 'Accesible',
        accessible_desc: 'Plataforma multilingüe para todos',
        your_name: 'Su nombre',
        email: 'Correo electrónico',
        password: 'Contraseña',
        confirm_password: 'Confirmar contraseña',
        about_optional: 'Acerca de usted (opcional)',
        accept_privacy: 'Acepto la política de privacidad',
        privacy_link: 'Leer',
        accept_terms: 'Acepto los términos de uso',
        terms_link: 'Leer',
        accept_data: 'Acepto el procesamiento de mis datos',
        title: 'Título',
        description: 'Descripción',
        location: 'Ubicación',
        contact_info_optional: 'Información de contacto (opcional)',
        use_my_location: 'Usar mi ubicación',
        info: 'Información',
        my_markers: 'Mis marcadores',
        documents: 'Documentos',
        settings: 'Configuración',
        admin_panel: 'Panel de administración',
        materials: 'Materiales',
        philosophy: 'Filosofía',
        contacts: 'Contactos',
        users: 'Usuarios',
        privacy_policy: 'Política de privacidad',
        ai_assistant: 'Asistente de IA',
        ask_ai: 'Pregunte a la IA...',
        share_initiative: 'Comparto una iniciativa'
    }
};

class LanguageManager {
    constructor() {
        this.currentLang = localStorage.getItem('lang') || 'ru';
        this.init();
    }

    init() {
        this.updateLanguage(this.currentLang);
        this.setupLanguageButtons();
    }

    setupLanguageButtons() {
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setLanguage(e.target.dataset.lang);
            });
            if (btn.dataset.lang === this.currentLang) {
                btn.classList.add('active');
            }
        });
    }

    setLanguage(lang) {
        this.currentLang = lang;
        localStorage.setItem('lang', lang);
        this.updateLanguage(lang);
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });
    }

    updateLanguage(lang) {
        const translationSet = translations[lang] || translations.ru;
        
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            if (translationSet[key]) {
                el.textContent = translationSet[key];
            }
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.dataset.i18nPlaceholder;
            if (translationSet[key]) {
                el.placeholder = translationSet[key];
            }
        });

        document.querySelectorAll('[data-i18n-title]').forEach(el => {
            const key = el.dataset.i18nTitle;
            if (translationSet[key]) {
                el.title = translationSet[key];
            }
        });
    }

    t(key) {
        return translations[this.currentLang]?.[key] || translations.ru[key] || key;
    }
}

const langManager = new LanguageManager();