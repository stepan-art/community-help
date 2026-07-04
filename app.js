// Инициализация приложения
let map;
let markers = {};
let currentUser = null;
let allMarkers = [];

// Загрузка данных из localStorage
function loadFromStorage() {
    const users = JSON.parse(localStorage.getItem('users')) || {};
    const currentUserEmail = localStorage.getItem('currentUser');
    allMarkers = JSON.parse(localStorage.getItem('markers')) || [];
    
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
}

// Обновление интерфейса в зависимости от состояния авторизации
function updateAuthUI() {
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const profileBtn = document.getElementById('profileBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const addMarkerBtn = document.getElementById('addMarkerBtn');
    
    if (currentUser) {
        loginBtn.style.display = 'none';
        registerBtn.style.display = 'none';
        profileBtn.style.display = 'block';
        logoutBtn.style.display = 'block';
        addMarkerBtn.style.display = 'block';
    } else {
        loginBtn.style.display = 'block';
        registerBtn.style.display = 'block';
        profileBtn.style.display = 'none';
        logoutBtn.style.display = 'none';
        addMarkerBtn.style.display = 'none';
    }
}

// Инициализация карты
function initMap() {
    map = L.map('map').setView([55.7558, 37.6173], 12); // Москва по умолчанию
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
    }).addTo(map);
    
    loadFromStorage();
    renderMarkers();
}

// Рендеринг всех отметок на карте
function renderMarkers() {
    // Очистка старых маркеров
    Object.values(markers).forEach(marker => marker.remove());
    markers = {};
    
    // Получение активных фильтров
    const filters = Array.from(document.querySelectorAll('.filter-item input[type="checkbox"]:checked'))
        .map(el => el.value);
    
    // Добавление маркеров на карту
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

// Получение иконки для маркера
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

// Создание содержимого popup'а
function createPopupContent(markerData, index) {
    const typeLabels = {
        'help-offer': 'Предлагаю помощь',
        'help-need': 'Ищу помощь',
        'initiative': 'Инициатива'
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

// Обновление списка отметок в боковой панели
function updateMarkersList() {
    const markersList = document.getElementById('markersList');
    markersList.innerHTML = '';
    
    const filters = Array.from(document.querySelectorAll('.filter-item input[type="checkbox"]:checked'))
        .map(el => el.value);
    
    const typeLabels = {
        'help-offer': 'Предлагаю помощь',
        'help-need': 'Ищу помощь',
        'initiative': 'Инициатива'
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

// Показ деталей отметки
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

// Удаление отметки
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

// Обработчики событий модальных окон
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
    const inputs = form.querySelectorAll('input, textarea');
    const name = inputs[0].value.trim();
    const email = inputs[1].value.trim();
    const password = inputs[2].value;
    const passwordConfirm = inputs[3].value;
    const bio = inputs[4].value.trim();
    
    if (password !== passwordConfirm) {
        showMessage('Пароли не совпадают', 'error');
        return;
    }
    
    if (password.length < 6) {
        showMessage('Пароль должен быть не менее 6 символов', 'error');
        return;
    }
    
    const users = JSON.parse(localStorage.getItem('users')) || {};
    
    if (users[email]) {
        showMessage('Пользователь с таким email уже существует', 'error');
        return;
    }
    
    users[email] = {
        name,
        password,
        bio,
        createdAt: new Date().toISOString()
    };
    
    localStorage.setItem('users', JSON.stringify(users));
    currentUser = { email, name, password, bio, createdAt: new Date().toISOString() };
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
    const inputs = form.querySelectorAll('input');
    const email = inputs[0].value.trim();
    const password = inputs[1].value;
    
    const users = JSON.parse(localStorage.getItem('users')) || {};
    
    if (!users[email] || users[email].password !== password) {
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
    
    // Для простоты используем координаты Москвы + небольшой сдвиг
    const lat = 55.7558 + (Math.random() - 0.5) * 0.2;
    const lng = 37.6173 + (Math.random() - 0.5) * 0.2;
    
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
    renderMarkers();
    showMessage('Отметка успешно добавлена!', 'success');
}

// Показ профиля
function showProfile() {
    if (!currentUser) return;
    
    const userMarkers = allMarkers.filter(m => m.authorEmail === currentUser.email);
    
    const content = `
        <div class="profile-info">
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
            <h3>Ваши отметки на карте (${userMarkers.length})</h3>
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
        
        <button class="btn-submit" onclick="editProfile()" style="margin-top: 1rem;">Редактировать профиль</button>
    `;
    
    document.getElementById('profileContent').innerHTML = content;
    openModal('profileModal');
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

// Показ сообщения
function showMessage(text, type = 'info') {
    const message = document.createElement('div');
    message.className = `message ${type}`;
    message.textContent = text;
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
    }, 3000);
}

// Инициализация при загрузке страницы
window.addEventListener('DOMContentLoaded', () => {
    initMap();
    setupModalHandlers();
    
    // Обработчики кнопок навигации
    document.getElementById('registerBtn').onclick = () => openModal('registerModal');
    document.getElementById('loginBtn').onclick = () => openModal('loginModal');
    document.getElementById('profileBtn').onclick = () => showProfile();
    document.getElementById('logoutBtn').onclick = () => handleLogout();
    document.getElementById('addMarkerBtn').onclick = () => openModal('markerModal');
    
    // Обработчики форм
    document.getElementById('registerForm').addEventListener('submit', handleRegister);
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('markerForm').addEventListener('submit', handleAddMarker);
    
    // Обработчики фильтров
    document.querySelectorAll('.filter-item input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', renderMarkers);
    });
    
    updateAuthUI();
});