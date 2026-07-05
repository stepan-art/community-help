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
        share_initiative: 'Я предлагаю инициативу',
        forgot_password: 'Забыли пароль?',
        forgot_password_title: 'Восстановление пароля',
        forgot_password_desc: 'Введите адрес электронной почты, указанный при регистрации. Мы пришлём вам ссылку для сброса пароля.',
        send_reset_link: 'Отправить ссылку',
        reset_password_title: 'Сброс пароля',
        new_password: 'Новый пароль',
        confirm_new_password: 'Подтвердите новый пароль',
        reset_password_btn: 'Сбросить пароль',
        back_to_login: 'Вернуться к входу',
        reset_email_sent: 'Если пользователь с таким email существует, на него будет отправлена ссылка для сброса пароля.',
        reset_link_demo_note: 'Демо-режим: реальная отправка email недоступна. Используйте ссылку ниже:',
        reset_success: 'Пароль успешно изменён! Теперь вы можете войти с новым паролем.',
        token_invalid: 'Ссылка для сброса пароля недействительна.',
        token_expired: 'Срок действия ссылки для сброса пароля истёк. Запросите новую.',
        token_used: 'Эта ссылка уже была использована. Запросите новую.',
        reset_passwords_mismatch: 'Пароли не совпадают.',
        reset_password_min_length: 'Пароль должен быть не менее 6 символов.',
        rate_limit_exceeded: 'Слишком много запросов. Попробуйте снова через час.'
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
        share_initiative: 'I share an initiative',
        forgot_password: 'Forgot password?',
        forgot_password_title: 'Password Recovery',
        forgot_password_desc: 'Enter the email address you used when registering. We will send you a link to reset your password.',
        send_reset_link: 'Send reset link',
        reset_password_title: 'Reset Password',
        new_password: 'New password',
        confirm_new_password: 'Confirm new password',
        reset_password_btn: 'Reset password',
        back_to_login: 'Back to login',
        reset_email_sent: 'If an account with that email exists, a password reset link has been sent.',
        reset_link_demo_note: 'Demo mode: real email sending is unavailable. Use the link below:',
        reset_success: 'Password successfully changed! You can now log in with your new password.',
        token_invalid: 'The password reset link is invalid.',
        token_expired: 'The password reset link has expired. Please request a new one.',
        token_used: 'This link has already been used. Please request a new one.',
        reset_passwords_mismatch: 'Passwords do not match.',
        reset_password_min_length: 'Password must be at least 6 characters.',
        rate_limit_exceeded: 'Too many requests. Please try again in an hour.'
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
        share_initiative: 'Ich teile eine Initiative',
        forgot_password: 'Passwort vergessen?',
        forgot_password_title: 'Passwort wiederherstellen',
        forgot_password_desc: 'Geben Sie die E-Mail-Adresse ein, die Sie bei der Registrierung verwendet haben. Wir senden Ihnen einen Link zum Zurücksetzen des Passworts.',
        send_reset_link: 'Link senden',
        reset_password_title: 'Passwort zurücksetzen',
        new_password: 'Neues Passwort',
        confirm_new_password: 'Neues Passwort bestätigen',
        reset_password_btn: 'Passwort zurücksetzen',
        back_to_login: 'Zurück zur Anmeldung',
        reset_email_sent: 'Falls ein Konto mit dieser E-Mail existiert, wurde ein Link zum Zurücksetzen des Passworts gesendet.',
        reset_link_demo_note: 'Demo-Modus: Der echte E-Mail-Versand ist nicht verfügbar. Verwenden Sie den folgenden Link:',
        reset_success: 'Passwort erfolgreich geändert! Sie können sich jetzt mit Ihrem neuen Passwort anmelden.',
        token_invalid: 'Der Link zum Zurücksetzen des Passworts ist ungültig.',
        token_expired: 'Der Link zum Zurücksetzen des Passworts ist abgelaufen. Bitte fordern Sie einen neuen an.',
        token_used: 'Dieser Link wurde bereits verwendet. Bitte fordern Sie einen neuen an.',
        reset_passwords_mismatch: 'Passwörter stimmen nicht überein.',
        reset_password_min_length: 'Das Passwort muss mindestens 6 Zeichen lang sein.',
        rate_limit_exceeded: 'Zu viele Anfragen. Bitte versuchen Sie es in einer Stunde erneut.'
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
        share_initiative: 'Comparto una iniciativa',
        forgot_password: '¿Olvidó su contraseña?',
        forgot_password_title: 'Recuperar contraseña',
        forgot_password_desc: 'Ingrese la dirección de correo electrónico que utilizó al registrarse. Le enviaremos un enlace para restablecer su contraseña.',
        send_reset_link: 'Enviar enlace',
        reset_password_title: 'Restablecer contraseña',
        new_password: 'Nueva contraseña',
        confirm_new_password: 'Confirmar nueva contraseña',
        reset_password_btn: 'Restablecer contraseña',
        back_to_login: 'Volver al inicio de sesión',
        reset_email_sent: 'Si existe una cuenta con ese correo electrónico, se ha enviado un enlace para restablecer la contraseña.',
        reset_link_demo_note: 'Modo demo: el envío real de correos no está disponible. Use el siguiente enlace:',
        reset_success: '¡Contraseña cambiada exitosamente! Ahora puede iniciar sesión con su nueva contraseña.',
        token_invalid: 'El enlace para restablecer la contraseña no es válido.',
        token_expired: 'El enlace para restablecer la contraseña ha caducado. Por favor solicite uno nuevo.',
        token_used: 'Este enlace ya ha sido utilizado. Por favor solicite uno nuevo.',
        reset_passwords_mismatch: 'Las contraseñas no coinciden.',
        reset_password_min_length: 'La contraseña debe tener al menos 6 caracteres.',
        rate_limit_exceeded: 'Demasiadas solicitudes. Por favor intente de nuevo en una hora.'
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