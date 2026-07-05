// Инициализация приложения
let map;
let markers = {};
let currentUser = null;
let allMarkers = [];
let adminData = null;

// Загрузка данных из localStorage
function loadFromStorage() {
    const users = JSON.parse(localStorage.getItem('users')) || {};
    const currentUserEmail = localStorage.getItem('currentUser');
    allMarkers = JSON.parse(localStorage.getItem('markers')) || [];
    adminData = JSON.parse(localStorage.getItem('adminData')) || {};
    
    if (currentUserEmail && users[currentUserEmail]) {
        currentUser = { email: currentUserEmail, ...users[currentUserEmail] };
        updateAuthUI();
    }
    
    return users;
}

// Сохранение в localStorage
function saveToStorage() {
    const users = JSON.parse(localStorage.getItem('users')) || {};
    if (currentUser) {
        users[currentUser.email] = { ...currentUser };
        localStorage.setItem('users', JSON.stringify(users));
    }
    localStorage.setItem('markers', JSON.stringify(allMarkers));
    localStorage.setItem('adminData', JSON.stringify(adminData));
}

// Обновление UI в зависимости от авторизации
function updateAuthUI() {
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const profileBtn = document.getElementById('profileBtn');
    const adminBtn = document.getElementById('adminBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const addMarkerBtn = document.getElementById('addMarkerBtn');
    
    if (currentUser) {
        loginBtn.style.display = 'none';
        registerBtn.style.display = 'none';
        profileBtn.style.display = 'flex';
        logoutBtn.style.display = 'flex';
        addMarkerBtn.style.display = 'block';
        
        if (currentUser.isAdmin) {
            adminBtn.style.display = 'flex';
        }
    } else {
        loginBtn.style.display = 'flex';
        registerBtn.style.display = 'flex';
        profileBtn.style.display = 'none';
        logoutBtn.style.display = 'none';
        addMarkerBtn.style.display = 'none';
        adminBtn.style.display = 'none';
    }
}

// Инициализация карты
function initMap() {
    map = L.map('map').setView([55.7558, 37.6173], 12);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
    }).addTo(map);
    
    renderMarkers();
}

function showMap() {
    document.getElementById('welcomeSection').style.display = 'none';
    document.getElementById('map').style.display = 'block';
    document.querySelector('.sidebar').classList.add('active');
    
    if (!map) {
        setTimeout(() => {
            initMap();
            map.invalidateSize();
        }, 100);
    } else {
        map.invalidateSize();
    }
}

// Рендеринг маркеров на карте
function renderMarkers() {
    Object.values(markers).forEach(marker => marker.remove());
    markers = {};
    
    const filters = Array.from(document.querySelectorAll('.filter-item input[type="checkbox"]:checked'))
        .map(el => el.value);
    
    allMarkers.forEach((markerData, index) => {
        if (!filters.includes(markerData.type)) return;
        
        const icon = getMarkerIcon(markerData.type);
        const marker = L.marker([markerData.lat, markerData.lng], { icon })
            .addTo(map)
            .bindPopup(createPopupContent(markerData, index))
            .on('click', () => {
                showMarkerDetail(markerData, index);
            });
        
        markers[index] = marker;
    });
    
    updateMarkersList();
}

// Получить иконку маркера
function getMarkerIcon(type) {
    const iconUrls = {
        'help-offer': '🟢',
        'help-need': '🟠',
        'initiative': '🔵'
    };
    
    return L.divIcon({
        html: `<div class="marker-icon" style="font-size: 2rem; text-align: center;">${iconUrls[type] || '📍'}</div>`,
        className: 'marker-div',
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, -16]
    });
}

// Создать контент popup
function createPopupContent(markerData, index) {
    const typeLabels = {
        'help-offer': '🟢 Предлагаю помощь',
        'help-need': '🟠 Ищу помощь',
        'initiative': '🔵 Инициатива'
    };
    
    let content = `
        <div class="marker-popup">
            <div class="popup-title">${escapeHtml(markerData.title)}</div>
            <span class="popup-type ${markerData.type}">${typeLabels[markerData.type]}</span>
            <div class="popup-description">${escapeHtml(markerData.description)}</div>
            <div class="popup-author">👤 ${escapeHtml(markerData.authorName)}</div>
    `;
    
    if (markerData.contact) {
        content += `<div class="popup-contact">📞 ${escapeHtml(markerData.contact)}</div>`;
    }
    
    content += `
            <button class="popup-button" onclick="showMarkerDetail(${index})">Подробнее</button>
        </div>
    `;
    
    return content;
}

// Экранирование HTML
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// Обновление списка отметок
function updateMarkersList() {
    const markersList = document.getElementById('markersList');
    markersList.innerHTML = '';
    
    const filters = Array.from(document.querySelectorAll('.filter-item input[type="checkbox"]:checked'))
        .map(el => el.value);
    
    const typeLabels = {
        'help-offer': '🟢 Предлагаю помощь',
        'help-need': '🟠 Ищу помощь',
        'initiative': '🔵 Инициатива'
    };
    
    allMarkers.forEach((markerData, index) => {
        if (!filters.includes(markerData.type)) return;
        
        const markerEl = document.createElement('div');
        markerEl.className = `marker-item ${markerData.type}`;
        markerEl.innerHTML = `
            <div class="marker-item-title">${escapeHtml(markerData.title)}</div>
            <div class="marker-item-type">${typeLabels[markerData.type]}</div>
        `;
        markerEl.onclick = () => {
            map.setView([markerData.lat, markerData.lng], 15);
            markers[index].openPopup();
            showMarkerDetail(markerData, index);
        };
        
        markersList.appendChild(markerEl);
    });
}

// Показать детали отметки
function showMarkerDetail(markerData, index) {
    if (typeof markerData === 'number') {
        markerData = allMarkers[markerData];
        index = arguments[0];
    }
    
    const typeLabels = {
        'help-offer': '🟢 Предлагаю помощь',
        'help-need': '🟠 Ищу помощь',
        'initiative': '🔵 Инициатива'
    };
    
    const content = `
        <div>
            <h3>${typeLabels[markerData.type]}</h3>
            <h4>${escapeHtml(markerData.title)}</h4>
            <p><strong>Описание:</strong></p>
            <p>${escapeHtml(markerData.description).replace(/\n/g, '<br>')}</p>
            <p><strong>Место:</strong> ${escapeHtml(markerData.location)}</p>
            <p><strong>Автор:</strong> ${escapeHtml(markerData.authorName)}</p>
            <p><strong>Email автора:</strong> ${escapeHtml(markerData.authorEmail)}</p>
            ${markerData.contact ? `<p><strong>Контакт:</strong> ${escapeHtml(markerData.contact)}</p>` : ''}
            <p><strong>Дата создания:</strong> ${new Date(markerData.createdAt).toLocaleString('ru-RU')}</p>
            ${currentUser && currentUser.email === markerData.authorEmail ? `
                <button class="btn-submit" onclick="deleteMarker(${index})" style="background: #ef4444; margin-top: 1rem;">Удалить отметку</button>
            ` : ''}
        </div>
    `;
    
    const modal = document.getElementById('markerDetailModal');
    document.getElementById('markerDetailContent').innerHTML = content;
    modal.classList.add('show');
}

// Удалить отметку
function deleteMarker(index) {
    if (confirm('Вы уверены, что хотите удалить эту отметку?')) {
        allMarkers.splice(index, 1);
        saveToStorage();
        renderMarkers();
        closeModal('markerDetailModal');
        showMessage('Отметка удалена', 'success');
    }
}

// Модальные окна
function openModal(modalId) {
    document.getElementById(modalId).classList.add('show');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('show');
}

// Обработчики модальных окон
function setupModalHandlers() {
    const modals = document.querySelectorAll('.modal');
    
    modals.forEach(modal => {
        const closeBtn = modal.querySelector('.close');
        if (closeBtn) {
            closeBtn.onclick = () => closeModal(modal.id);
        }
    });
    
    window.onclick = (event) => {
        if (event.target.classList.contains('modal')) {
            event.target.classList.remove('show');
        }
    };
}

// Регистрация
function handleRegister(e) {
    e.preventDefault();
    
    const form = e.target;
    const name = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const password = document.getElementById('regPassword').value;
    const passwordConfirm = document.getElementById('regPasswordConfirm').value;
    const bio = document.getElementById('regBio').value.trim();
    const privacyCheck = document.getElementById('privacyCheck').checked;
    const termsCheck = document.getElementById('termsCheck').checked;
    const dataCheck = document.getElementById('dataCheck').checked;
    
    if (!privacyCheck || !termsCheck || !dataCheck) {
        showMessage('Пожалуйста, согласитесь со всеми условиями', 'error');
        return;
    }
    
    if (password !== passwordConfirm) {
        showMessage('Пароли не совпадают', 'error');
        return;
    }
    
    if (password.length < 6) {
        showMessage('Пароль ��олжен быть не менее 6 символов', 'error');
        return;
    }
    
    // Хеширование пароля (простой пример - в реальном приложении используйте bcrypt на сервере)
    const hashedPassword = btoa(password);
    
    const users = JSON.parse(localStorage.getItem('users')) || {};
    
    if (users[email]) {
        showMessage('Пользователь с таким email уже существует', 'error');
        return;
    }
    
    users[email] = {
        name,
        password: hashedPassword,
        bio,
        avatar: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3E%3Ccircle cx=%2250%22 cy=%2250%22 r=%2245%22 fill=%22%23667eea%22/%3E%3Ctext x=%2250%22 y=%2265%22 font-size=%2750%27 fill=%27white%27 text-anchor=%27middle%27%3E👤%3C/text%3E%3C/svg%3E',
        documents: [],
        createdAt: new Date().toISOString(),
        agreedToPrivacy: true,
        agreedToTerms: true,
        agreedToDataProcessing: true
    };
    
    localStorage.setItem('users', JSON.stringify(users));
    currentUser = { email, ...users[email] };
    localStorage.setItem('currentUser', email);
    
    closeModal('registerModal');
    form.reset();
    updateAuthUI();
    showMessage(`Добро пожаловать, ${name}!`, 'success');
}

// Вход
function handleLogin(e) {
    e.preventDefault();
    
    const form = e.target;
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    const hashedPassword = btoa(password);
    
    const users = JSON.parse(localStorage.getItem('users')) || {};
    
    if (!users[email] || users[email].password !== hashedPassword) {
        showMessage('Неверный email или пароль', 'error');
        return;
    }
    
    currentUser = { email, ...users[email] };
    localStorage.setItem('currentUser', email);
    
    closeModal('loginModal');
    form.reset();
    updateAuthUI();
    showMessage(`Добро пожаловать, ${currentUser.name}!`, 'success');
}

// Добавление отметки
function handleAddMarker(e) {
    e.preventDefault();
    
    if (!currentUser) {
        showMessage('Пожалуйста, войдите в профиль', 'error');
        return;
    }
    
    const form = e.target;
    const markerType = form.querySelector('input[name="markerType"]:checked').value;
    const title = document.getElementById('markerTitle').value.trim();
    const description = document.getElementById('markerDescription').value.trim();
    const location = document.getElementById('markerLocation').value.trim();
    const contact = document.getElementById('markerContact').value.trim();
    
    const geoInfo = document.querySelector('.geo-info');
    let lat = 55.7558 + (Math.random() - 0.5) * 0.2;
    let lng = 37.6173 + (Math.random() - 0.5) * 0.2;
    
    if (geoInfo.dataset.lat && geoInfo.dataset.lng) {
        lat = parseFloat(geoInfo.dataset.lat);
        lng = parseFloat(geoInfo.dataset.lng);
    }
    
    const markerData = {
        type: markerType,
        title,
        description,
        location,
        contact,
        lat,
        lng,
        authorName: currentUser.name,
        authorEmail: currentUser.email,
        createdAt: new Date().toISOString()
    };
    
    allMarkers.push(markerData);
    saveToStorage();
    
    closeModal('markerModal');
    form.reset();
    document.querySelector('.geo-info').innerHTML = '';
    showMessage('Отметка успешно добавлена!', 'success');
    
    if (map) {
        renderMarkers();
    }
}

// Геолокация
document.addEventListener('DOMContentLoaded', () => {
    const useGeoBtn = document.getElementById('useGeoBtn');
    const geoInfo = document.querySelector('.geo-info');
    
    if (useGeoBtn) {
        useGeoBtn.addEventListener('click', () => {
            if ('geolocation' in navigator) {
                useGeoBtn.disabled = true;
                useGeoBtn.textContent = 'Получение координат...';
                
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const lat = position.coords.latitude;
                        const lng = position.coords.longitude;
                        
                        geoInfo.dataset.lat = lat;
                        geoInfo.dataset.lng = lng;
                        geoInfo.innerHTML = `✅ Координаты получены: ${lat.toFixed(4)}, ${lng.toFixed(4)}`;
                        useGeoBtn.disabled = false;
                        useGeoBtn.innerHTML = '<i class="fas fa-check"></i> Геолокация установлена';
                        useGeoBtn.style.background = '#10b981';
                    },
                    (error) => {
                        showMessage('Ошибка получения координат: ' + error.message, 'error');
                        useGeoBtn.disabled = false;
                        useGeoBtn.textContent = 'Использовать мою геолокацию';
                    }
                );
            } else {
                showMessage('Геолокация не поддерживается вашим браузером', 'error');
            }
        });
    }
});

// Показать профиль
function showProfile() {
    if (!currentUser) return;
    
    const userMarkers = allMarkers.filter(m => m.authorEmail === currentUser.email);
    
    const infoTab = `
        <div class="profile-info">
            <div class="avatar-section">
                <img src="${currentUser.avatar}" alt="Avatar" class="avatar-image">
                <div class="avatar-upload">
                    <label for="avatarInput">📷 Изменить аватар</label>
                    <input type="file" id="avatarInput" accept="image/*">
                </div>
            </div>
            <h3>Личная информация</h3>
            <div class="profile-field">
                <div class="profile-field-label">Имя:</div>
                <div class="profile-field-value">${escapeHtml(currentUser.name)}</div>
            </div>
            <div class="profile-field">
                <div class="profile-field-label">Email:</div>
                <div class="profile-field-value">${escapeHtml(currentUser.email)}</div>
            </div>
            ${currentUser.bio ? `
                <div class="profile-field">
                    <div class="profile-field-label">О вас:</div>
                    <div class="profile-field-value">${escapeHtml(currentUser.bio).replace(/\n/g, '<br>')}</div>
                </div>
            ` : ''}
            <div class="profile-field">
                <div class="profile-field-label">Участник с:</div>
                <div class="profile-field-value">${new Date(currentUser.createdAt).toLocaleDateString('ru-RU')}</div>
            </div>
        </div>
        
        <div class="profile-info">
            <h3>Мои отметки (${userMarkers.length})</h3>
            ${userMarkers.length > 0 ? `
                <ul style="list-style: none;">
                    ${userMarkers.map((marker, idx) => `
                        <li style="margin-bottom: 0.8rem; padding: 0.8rem; background: white; border-radius: 4px; border-left: 3px solid #667eea;">
                            <strong>${escapeHtml(marker.title)}</strong><br>
                            <small>${marker.type === 'help-offer' ? '🟢 Предлагаю помощь' : marker.type === 'help-need' ? '🟠 Ищу помощь' : '🔵 Инициатива'}</small>
                        </li>
                    `).join('')}
                </ul>
            ` : `
                <p style="color: #999;">Вы еще не создали отметок на карте</p>
            `}
        </div>
    `;
    
    document.getElementById('profileContent').innerHTML = infoTab;
    openModal('profileModal');
    
    document.getElementById('avatarInput').addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                currentUser.avatar = event.target.result;
                saveToStorage();
                showMessage('Аватар обновлен', 'success');
                showProfile();
            };
            reader.readAsDataURL(file);
        }
    });
}

// Выход
function handleLogout() {
    if (confirm('Вы уверены, что хотите выйти?')) {
        currentUser = null;
        localStorage.removeItem('currentUser');
        updateAuthUI();
        showMessage('Вы вышли из профиля', 'info');
    }
}

// Показать сообщение
function showMessage(text, type = 'info') {
    const message = document.createElement('div');
    message.className = `message ${type}`;
    message.textContent = text;
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
    }, 3000);
}

// AI Chat
class AIChat {
    constructor() {
        this.isOpen = false;
        this.messages = [];
    }
    
    init() {
        const chatToggle = document.getElementById('chatToggle');
        const chatWidget = document.getElementById('chatWidget');
        const chatSend = document.getElementById('chatSend');
        const chatInput = document.getElementById('chatInput');
        const chatMinimize = document.querySelector('.chat-minimize');
        
        chatToggle.addEventListener('click', () => this.toggle());
        chatSend.addEventListener('click', () => this.sendMessage());
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
        chatMinimize.addEventListener('click', () => this.toggle());
    }
    
    toggle() {
        this.isOpen = !this.isOpen;
        const widget = document.getElementById('chatWidget');
        if (this.isOpen) {
            widget.classList.add('show');
        } else {
            widget.classList.remove('show');
        }
    }
    
    sendMessage() {
        const input = document.getElementById('chatInput');
        const text = input.value.trim();
        
        if (!text) return;
        
        this.addMessage(text, 'user');
        input.value = '';
        
        // Имитация ответа AI
        setTimeout(() => {
            const responses = [
                'Спасибо за вопрос! Это интересно. Могу ли я помочь вам чем-то еще?',
                'Я здесь, чтобы помочь. Расскажите подробнее о том, что вы ищете.',
                'Отличный вопрос! На нашей платформе вы можете найти людей, готовых помочь.',
                'Мне нравится ваша инициатива! Давайте создадим отметку на карте.',
                'Присоединяйтесь к нашему сообществу и помогайте друг другу!'
            ];
            
            const response = responses[Math.floor(Math.random() * responses.length)];
            this.addMessage(response, 'ai');
        }, 500);
    }
    
    addMessage(text, sender) {
        const messagesContainer = document.getElementById('chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${sender}`;
        messageDiv.innerHTML = `<div class="chat-bubble">${escapeHtml(text)}</div>`;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
}

const aiChat = new AIChat();

// ============================================================
// Восстановление пароля (Forgot / Reset Password Flow)
// ============================================================

const RESET_TOKEN_TTL_MS = 60 * 60 * 1000; // 60 минут
const RESET_RATE_LIMIT = 3;                  // Максимум запросов в час
const RESET_RATE_WINDOW_MS = 60 * 60 * 1000;

/**
 * Генерирует криптографически стойкий случайный токен.
 * @returns {string} Hex-строка токена (32 байта = 64 символа)
 */
function generateResetToken() {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Хэширует токен через SHA-256 для безопасного хранения в localStorage.
 * @param {string} token
 * @returns {Promise<string>} Hex-строка SHA-256 хэша
 */
async function hashToken(token) {
    const encoder = new TextEncoder();
    const data = encoder.encode(token);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hashBuffer), b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Сравнивает две строки за постоянное время для защиты от timing-атак.
 * @param {string} a
 * @param {string} b
 * @returns {boolean}
 */
function timingSafeEqual(a, b) {
    if (typeof a !== 'string' || typeof b !== 'string') return false;
    const la = a.length;
    const lb = b.length;
    let result = la ^ lb;
    const len = Math.max(la, lb);
    for (let i = 0; i < len; i++) {
        result |= (a.charCodeAt(i % la) || 0) ^ (b.charCodeAt(i % lb) || 0);
    }
    return result === 0;
}

/**
 * Проверяет, не превышен ли лимит запросов для данного email.
 * Записи хранятся в localStorage['resetRateLimit'].
 * @param {string} email
 * @returns {boolean} true — лимит НЕ превышен
 */
function checkResetRateLimit(email) {
    const store = JSON.parse(localStorage.getItem('resetRateLimit')) || {};
    const now = Date.now();
    const attempts = (store[email] || []).filter(ts => now - ts < RESET_RATE_WINDOW_MS);
    if (attempts.length >= RESET_RATE_LIMIT) return false;
    attempts.push(now);
    store[email] = attempts;
    localStorage.setItem('resetRateLimit', JSON.stringify(store));
    return true;
}

/**
 * Сохраняет хэш токена для email с временем истечения.
 * Старый токен перезаписывается (инвалидация).
 * @param {string} email
 * @param {string} tokenHash SHA-256 хэш токена (не сырой токен)
 */
async function saveResetToken(email, tokenHash) {
    const store = JSON.parse(localStorage.getItem('passwordResetTokens')) || {};
    // Сохраняем только SHA-256 хэш; сырой токен в localStorage никогда не попадает.
    store[email] = {
        tokenHash,
        expiresAt: new Date(Date.now() + RESET_TOKEN_TTL_MS).toISOString(),
        used: false
    };
    localStorage.setItem('passwordResetTokens', JSON.stringify(store));
}

/**
 * Проверяет токен сброса пароля.
 * @param {string} email
 * @param {string} rawToken — сырой токен из URL
 * @returns {Promise<'ok'|'invalid'|'expired'|'used'>}
 */
async function validateResetToken(email, rawToken) {
    const store = JSON.parse(localStorage.getItem('passwordResetTokens')) || {};
    const entry = store[email];
    if (!entry) return 'invalid';
    if (entry.used) return 'used';
    if (new Date() > new Date(entry.expiresAt)) return 'expired';
    const candidateHash = await hashToken(rawToken);
    if (!timingSafeEqual(entry.tokenHash, candidateHash)) return 'invalid';
    return 'ok';
}

/**
 * Помечает токен как использованный (инвалидация после сброса).
 * @param {string} email
 */
function consumeResetToken(email) {
    const store = JSON.parse(localStorage.getItem('passwordResetTokens')) || {};
    if (store[email]) {
        store[email].used = true;
        // Обновляем только флаг used; сырой токен в store никогда не хранится.
        localStorage.setItem('passwordResetTokens', JSON.stringify(store));
    }
}

/**
 * Строит полный URL ссылки для сброса пароля.
 * @param {string} rawToken
 * @param {string} email
 * @returns {string}
 */
function buildResetUrl(rawToken, email) {
    const base = window.location.href.split('#')[0];
    const params = new URLSearchParams({ token: rawToken, email });
    return `${base}#reset-password?${params.toString()}`;
}

/**
 * Обрабатывает форму «Забыли пароль?».
 * Ответ нейтральный — не раскрывает, существует ли пользователь.
 * @param {Event} e
 */
async function handleForgotPassword(e) {
    e.preventDefault();
    const email = document.getElementById('forgotEmail').value.trim().toLowerCase();
    const form = document.getElementById('forgotPasswordForm');
    const resultDiv = document.getElementById('forgotPasswordResult');

    if (!checkResetRateLimit(email)) {
        showMessage(langManager.t('rate_limit_exceeded'), 'error');
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || {};
    const userExists = Boolean(users[email]);

    if (userExists) {
        const rawToken = generateResetToken();
        const tokenHash = await hashToken(rawToken);
        await saveResetToken(email, tokenHash);

        const resetUrl = buildResetUrl(rawToken, email);

        // Показываем нейтральное сообщение + ссылку (симуляция письма в demo-режиме)
        form.style.display = 'none';
        resultDiv.style.display = 'block';
        const anchorEl = document.createElement('a');
        anchorEl.className = 'reset-demo-link';
        anchorEl.id = 'resetDemoLink';
        anchorEl.href = resetUrl;
        anchorEl.textContent = resetUrl;
        resultDiv.innerHTML = `
            <p class="reset-success-text">${escapeHtml(langManager.t('reset_email_sent'))}</p>
            <div class="reset-demo-box">
                <p class="reset-demo-note"><i class="fas fa-info-circle"></i> ${escapeHtml(langManager.t('reset_link_demo_note'))}</p>
            </div>
        `;
        resultDiv.querySelector('.reset-demo-box').appendChild(anchorEl);

        // Клик по ссылке открывает модал сброса без перезагрузки
        document.getElementById('resetDemoLink').addEventListener('click', (ev) => {
            ev.preventDefault();
            closeModal('forgotPasswordModal');
            openResetPasswordModal(rawToken, email);
        });
    } else {
        // Нейтральный ответ — не раскрываем, что email не найден
        form.style.display = 'none';
        resultDiv.style.display = 'block';
        resultDiv.innerHTML = `<p class="reset-success-text">${escapeHtml(langManager.t('reset_email_sent'))}</p>`;
    }
}

/**
 * Открывает модал сброса пароля с предзаполненными данными.
 * @param {string} rawToken
 * @param {string} email
 */
function openResetPasswordModal(rawToken, email) {
    document.getElementById('resetToken').value = rawToken;
    document.getElementById('resetEmail').value = email;
    document.getElementById('resetPasswordForm').style.display = 'block';
    document.getElementById('resetPasswordResult').style.display = 'none';
    document.getElementById('newPassword').value = '';
    document.getElementById('newPasswordConfirm').value = '';
    openModal('resetPasswordModal');
}

/**
 * Обрабатывает форму «Сброс пароля».
 * @param {Event} e
 */
async function handleResetPassword(e) {
    e.preventDefault();
    const rawToken = document.getElementById('resetToken').value;
    const email = document.getElementById('resetEmail').value.trim().toLowerCase();
    const newPassword = document.getElementById('newPassword').value;
    const newPasswordConfirm = document.getElementById('newPasswordConfirm').value;
    const form = document.getElementById('resetPasswordForm');
    const resultDiv = document.getElementById('resetPasswordResult');

    if (newPassword.length < 6) {
        showMessage(langManager.t('reset_password_min_length'), 'error');
        return;
    }

    if (newPassword !== newPasswordConfirm) {
        showMessage(langManager.t('reset_passwords_mismatch'), 'error');
        return;
    }

    const status = await validateResetToken(email, rawToken);
    if (status === 'expired') {
        showMessage(langManager.t('token_expired'), 'error');
        return;
    }
    if (status === 'used') {
        showMessage(langManager.t('token_used'), 'error');
        return;
    }
    if (status !== 'ok') {
        showMessage(langManager.t('token_invalid'), 'error');
        return;
    }

    // Обновляем пароль
    const users = JSON.parse(localStorage.getItem('users')) || {};
    if (users[email]) {
        users[email].password = btoa(newPassword);
        localStorage.setItem('users', JSON.stringify(users));
    }

    // Инвалидируем токен
    consumeResetToken(email);

    // Завершаем активную сессию при смене пароля
    if (currentUser && currentUser.email === email) {
        currentUser = null;
        localStorage.removeItem('currentUser');
        updateAuthUI();
    }

    // Показываем успешный результат
    form.style.display = 'none';
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `
        <p class="reset-success-text">${escapeHtml(langManager.t('reset_success'))}</p>
        <button class="btn-submit" id="goToLoginBtn" style="margin-top:1rem;">${escapeHtml(langManager.t('back_to_login'))}</button>
    `;
    document.getElementById('goToLoginBtn').addEventListener('click', () => {
        closeModal('resetPasswordModal');
        openModal('loginModal');
    });
}

/**
 * Проверяет хэш URL при загрузке страницы и открывает модал сброса,
 * если найдены параметры token и email.
 */
async function checkResetPasswordUrl() {
    const hash = window.location.hash;
    if (!hash.startsWith('#reset-password?')) return;

    const queryStr = hash.slice('#reset-password?'.length);
    const params = new URLSearchParams(queryStr);
    const rawToken = params.get('token');
    const email = params.get('email');

    if (!rawToken || !email) return;

    // Убираем токен из адресной строки (безопасность)
    history.replaceState(null, '', window.location.pathname + window.location.search);

    const status = await validateResetToken(email.toLowerCase(), rawToken);
    if (status === 'expired') {
        showMessage(langManager.t('token_expired'), 'error');
        return;
    }
    if (status === 'used') {
        showMessage(langManager.t('token_used'), 'error');
        return;
    }
    if (status !== 'ok') {
        showMessage(langManager.t('token_invalid'), 'error');
        return;
    }

    openResetPasswordModal(rawToken, email.toLowerCase());
}

// Инициализация при загрузке страницы
window.addEventListener('DOMContentLoaded', () => {
    loadFromStorage();
    setupModalHandlers();
    aiChat.init();
    
    // Кнопки навигации
    document.getElementById('registerBtn').onclick = () => openModal('registerModal');
    document.getElementById('loginBtn').onclick = () => openModal('loginModal');
    document.getElementById('profileBtn').onclick = () => showProfile();
    document.getElementById('logoutBtn').onclick = () => handleLogout();
    document.getElementById('addMarkerBtn').onclick = () => openModal('markerModal');
    document.getElementById('startBtn').onclick = () => showMap();
    document.getElementById('learnBtn').onclick = () => openModal('privacyModal');
    
    // Формы
    document.getElementById('registerForm').addEventListener('submit', handleRegister);
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('markerForm').addEventListener('submit', handleAddMarker);
    document.getElementById('forgotPasswordForm').addEventListener('submit', handleForgotPassword);
    document.getElementById('resetPasswordForm').addEventListener('submit', handleResetPassword);

    // Ссылка «Забыли пароль?» в форме входа
    document.getElementById('forgotPasswordLink').addEventListener('click', (e) => {
        e.preventDefault();
        // Сброс модала перед открытием
        document.getElementById('forgotPasswordForm').style.display = 'block';
        document.getElementById('forgotPasswordResult').style.display = 'none';
        document.getElementById('forgotEmail').value = '';
        closeModal('loginModal');
        openModal('forgotPasswordModal');
    });
    
    // Фильтры
    document.querySelectorAll('.filter-item input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            if (map) renderMarkers();
        });
    });
    
    // Политика конфиденциальности
    document.getElementById('privacyLink').addEventListener('click', (e) => {
        e.preventDefault();
        openModal('privacyModal');
    });
    
    // Загрузить политику конфиденциальности
    const privacyContent = `
        <h3>1. Введение</h3>
        <p>Платформа "Жить Заново" посвящена защите вашей приватности. Эта политика объясняет, как мы собираем и используем данные.</p>
        
        <h3>2. Сбор данных</h3>
        <p>Мы собираем только информацию, которая необходима для:</p>
        <ul>
            <li>Создания и управления вашей учетной записью</li>
            <li>Отображения ваших отметок на карте</li>
            <li>Улучшения нашего сервиса</li>
        </ul>
        
        <h3>3. Использование данных</h3>
        <p>Ваши данные используются только для предоставления услуг платформы и никогда не передаются третьим лицам без вашего согласия.</p>
        
        <h3>4. Безопасность</h3>
        <p>Мы используем современные методы защиты для обеспечения безопасности ваших данных. Все данные хранятся на зашифрованных серверах.</p>
        
        <h3>5. Права пользователя</h3>
        <p>Вы имеете право:</p>
        <ul>
            <li>Получить копию своих данных</li>
            <li>Запросить удаление своих данных</li>
            <li>Возразить против обработки данных</li>
        </ul>
    `;
    
    document.getElementById('privacyContent').innerHTML = privacyContent;
    
    updateAuthUI();

    // Проверить URL на наличие токена сброса пароля
    checkResetPasswordUrl();
});