// Admin Panel Manager
class AdminPanel {
    constructor() {
        this.data = JSON.parse(localStorage.getItem('adminData')) || this.getDefaultData();
        this.currentTab = 'dashboard';
    }

    getDefaultData() {
        return {
            materials: [],
            philosophy: {
                title: '',
                content: ''
            },
            contacts: {
                email: 'info@zhit-zanovo.com',
                phone: '+7 (XXX) XXX-XX-XX',
                address: '',
                socialLinks: {
                    facebook: '',
                    instagram: '',
                    vk: '',
                    telegram: '',
                    twitter: '',
                    linkedin: ''
                }
            },
            notifications: [],
            moderation: {
                bannedUsers: [],
                reportedMarkers: [],
                flaggedContent: []
            },
            analytics: {
                totalVisits: 0,
                lastUpdated: new Date().toISOString()
            }
        };
    }

    saveData() {
        localStorage.setItem('adminData', JSON.stringify(this.data));
    }

    render(tab) {
        this.currentTab = tab;
        const content = document.getElementById('adminContent');
        
        switch(tab) {
            case 'dashboard':
                content.innerHTML = this.renderDashboard();
                break;
            case 'materials':
                content.innerHTML = this.renderMaterials();
                break;
            case 'philosophy':
                content.innerHTML = this.renderPhilosophy();
                break;
            case 'contacts':
                content.innerHTML = this.renderContacts();
                break;
            case 'users':
                content.innerHTML = this.renderUsers();
                break;
            case 'reports':
                content.innerHTML = this.renderReports();
                break;
            case 'moderation':
                content.innerHTML = this.renderModeration();
                break;
            case 'settings':
                content.innerHTML = this.renderSettings();
                break;
        }
        
        this.attachEventListeners();
    }

    renderDashboard() {
        const users = JSON.parse(localStorage.getItem('users')) || {};
        const markers = JSON.parse(localStorage.getItem('markers')) || [];
        const userCount = Object.keys(users).length;
        const markerCount = markers.length;
        const helpOffers = markers.filter(m => m.type === 'help-offer').length;
        const helpNeeds = markers.filter(m => m.type === 'help-need').length;
        const initiatives = markers.filter(m => m.type === 'initiative').length;

        return `
            <div class="dashboard-grid">
                <div class="dashboard-section">
                    <h3 data-i18n="quick_stats">Быстрая статистика</h3>
                    <div class="stats-grid">
                        <div class="stat-box">
                            <i class="fas fa-users"></i>
                            <h4 data-i18n="active_users">Активных пользователей</h4>
                            <p>${userCount}</p>
                        </div>
                        <div class="stat-box">
                            <i class="fas fa-map-pin"></i>
                            <h4 data-i18n="total_markers">Всего отметок</h4>
                            <p>${markerCount}</p>
                        </div>
                        <div class="stat-box">
                            <i class="fas fa-hands-helping"></i>
                            <h4 data-i18n="help_offers">Предложений помощи</h4>
                            <p>${helpOffers}</p>
                        </div>
                        <div class="stat-box">
                            <i class="fas fa-hand-holding-heart"></i>
                            <h4 data-i18n="help_requests">Запросов помощи</h4>
                            <p>${helpNeeds}</p>
                        </div>
                        <div class="stat-box">
                            <i class="fas fa-lightbulb"></i>
                            <h4 data-i18n="initiatives_count">Инициатив</h4>
                            <p>${initiatives}</p>
                        </div>
                        <div class="stat-box">
                            <i class="fas fa-file-pdf"></i>
                            <h4 data-i18n="materials_count">Материалов</h4>
                            <p>${this.data.materials.length}</p>
                        </div>
                    </div>
                </div>

                <div class="dashboard-section">
                    <h3 data-i18n="recent_activity">Недавняя активность</h3>
                    <div class="activity-feed">
                        ${markers.slice(-5).reverse().map(marker => `
                            <div class="activity-item">
                                <span class="activity-type">${marker.type === 'help-offer' ? '🟢' : marker.type === 'help-need' ? '🟠' : '🔵'}</span>
                                <div class="activity-details">
                                    <strong>${escapeHtml(marker.title)}</strong>
                                    <small>от ${escapeHtml(marker.authorName)}</small>
                                </div>
                                <span class="activity-date">${new Date(marker.createdAt).toLocaleDateString('ru-RU')}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="dashboard-section">
                    <h3 data-i18n="quick_actions">Быстрые действия</h3>
                    <div class="quick-actions">
                        <button class="action-btn" onclick="adminPanel.showMaterialUpload()">
                            <i class="fas fa-plus"></i> <span data-i18n="upload_material">Загрузить материал</span>
                        </button>
                        <button class="action-btn" onclick="adminPanel.editPhilosophy()">
                            <i class="fas fa-edit"></i> <span data-i18n="edit_philosophy">Редактировать философию</span>
                        </button>
                        <button class="action-btn" onclick="adminPanel.editContacts()">
                            <i class="fas fa-phone"></i> <span data-i18n="update_contacts">Обновить контакты</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    renderMaterials() {
        return `
            <div class="admin-section">
                <div class="section-header">
                    <h3 data-i18n="manage_materials">Управление материалами</h3>
                    <button class="btn-primary" onclick="adminPanel.showMaterialForm()">
                        <i class="fas fa-plus"></i> <span data-i18n="add_material">Добавить материал</span>
                    </button>
                </div>

                <div class="materials-list">
                    ${this.data.materials.length > 0 ? this.data.materials.map((material, idx) => `
                        <div class="material-item">
                            <div class="material-info">
                                <h4>${escapeHtml(material.title)}</h4>
                                <p>${escapeHtml(material.description.substring(0, 100))}...</p>
                                <small>Добавлено: ${new Date(material.createdAt).toLocaleDateString('ru-RU')}</small>
                            </div>
                            <div class="material-actions">
                                <a href="${material.url}" target="_blank" class="btn-small"><i class="fas fa-download"></i> Скачать</a>
                                <button class="btn-small delete" onclick="adminPanel.deleteMaterial(${idx})">
                                    <i class="fas fa-trash"></i> Удалить
                                </button>
                            </div>
                        </div>
                    `).join('') : '<p data-i18n="no_materials">Материалы не добавлены</p>'}
                </div>

                <div id="materialForm" style="display: none;" class="form-container">
                    <h4 data-i18n="upload_new_material">Загрузить новый материал</h4>
                    <form id="adminMaterialForm" onsubmit="adminPanel.saveMaterial(event)">
                        <input type="text" id="matTitle" placeholder="" data-i18n-placeholder="title" required>
                        <textarea id="matDesc" placeholder="" data-i18n-placeholder="description" required></textarea>
                        <input type="url" id="matUrl" placeholder="" data-i18n-placeholder="file_url" required>
                        <button type="submit" class="btn-submit" data-i18n="save">Сохранить</button>
                    </form>
                </div>
            </div>
        `;
    }

    renderPhilosophy() {
        return `
            <div class="admin-section">
                <h3 data-i18n="platform_philosophy">Философия платформы</h3>
                <form onsubmit="adminPanel.savePhilosophy(event)" class="philosophy-form">
                    <div class="form-group">
                        <label data-i18n="philosophy_title">Заголовок</label>
                        <input type="text" id="philTitle" placeholder="" value="${escapeHtml(this.data.philosophy.title)}" data-i18n-placeholder="enter_title" required>
                    </div>
                    <div class="form-group">
                        <label data-i18n="philosophy_content">Содержание</label>
                        <textarea id="philContent" placeholder="" data-i18n-placeholder="enter_philosophy" required>${escapeHtml(this.data.philosophy.content)}</textarea>
                    </div>
                    <div class="form-group">
                        <label>
                            <input type="checkbox" id="philPublish" checked>
                            <span data-i18n="publish_on_homepage">Опубликовать на главной странице</span>
                        </label>
                    </div>
                    <button type="submit" class="btn-submit" data-i18n="save_philosophy">Сохранить философию</button>
                </form>
                <div class="preview-box">
                    <h4 data-i18n="preview">Предпросмотр</h4>
                    <div id="philPreview" class="philosophy-preview"></div>
                </div>
            </div>
        `;
    }

    renderContacts() {
        const contacts = this.data.contacts;
        return `
            <div class="admin-section">
                <h3 data-i18n="contact_information">Контактная информация</h3>
                <form onsubmit="adminPanel.saveContacts(event)" class="contacts-form">
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" id="contactEmail" value="${escapeHtml(contacts.email)}" required>
                    </div>
                    <div class="form-group">
                        <label data-i18n="phone">Телефон</label>
                        <input type="tel" id="contactPhone" value="${escapeHtml(contacts.phone)}">
                    </div>
                    <div class="form-group">
                        <label data-i18n="address">Адрес</label>
                        <input type="text" id="contactAddress" value="${escapeHtml(contacts.address)}">
                    </div>
                    
                    <h4 data-i18n="social_media">Социальные сети</h4>
                    <div class="social-links-form">
                        <div class="form-group">
                            <label><i class="fab fa-facebook"></i> Facebook</label>
                            <input type="url" id="socialFacebook" value="${escapeHtml(contacts.socialLinks.facebook)}" placeholder="https://facebook.com/...">
                        </div>
                        <div class="form-group">
                            <label><i class="fab fa-instagram"></i> Instagram</label>
                            <input type="url" id="socialInstagram" value="${escapeHtml(contacts.socialLinks.instagram)}" placeholder="https://instagram.com/...">
                        </div>
                        <div class="form-group">
                            <label><i class="fab fa-vk"></i> VK</label>
                            <input type="url" id="socialVk" value="${escapeHtml(contacts.socialLinks.vk)}" placeholder="https://vk.com/...">
                        </div>
                        <div class="form-group">
                            <label><i class="fab fa-telegram"></i> Telegram</label>
                            <input type="url" id="socialTelegram" value="${escapeHtml(contacts.socialLinks.telegram)}" placeholder="https://t.me/...">
                        </div>
                        <div class="form-group">
                            <label><i class="fab fa-twitter"></i> Twitter</label>
                            <input type="url" id="socialTwitter" value="${escapeHtml(contacts.socialLinks.twitter)}" placeholder="https://twitter.com/...">
                        </div>
                        <div class="form-group">
                            <label><i class="fab fa-linkedin"></i> LinkedIn</label>
                            <input type="url" id="socialLinkedin" value="${escapeHtml(contacts.socialLinks.linkedin)}" placeholder="https://linkedin.com/...">
                        </div>
                    </div>
                    
                    <button type="submit" class="btn-submit" data-i18n="save_contacts">Сохранить контакты</button>
                </form>
            </div>
        `;
    }

    renderUsers() {
        const users = JSON.parse(localStorage.getItem('users')) || {};
        const userList = Object.entries(users);
        
        return `
            <div class="admin-section">
                <h3 data-i18n="user_management">Управление пользователями</h3>
                <div class="users-list">
                    <table class="users-table">
                        <thead>
                            <tr>
                                <th data-i18n="name">Имя</th>
                                <th>Email</th>
                                <th data-i18n="joined">Присоединился</th>
                                <th data-i18n="actions">Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${userList.map(([email, user]) => `
                                <tr>
                                    <td>${escapeHtml(user.name)}</td>
                                    <td>${escapeHtml(email)}</td>
                                    <td>${new Date(user.createdAt).toLocaleDateString('ru-RU')}</td>
                                    <td>
                                        <button class="btn-small" onclick="adminPanel.makeAdmin('${email}')"><i class="fas fa-crown"></i></button>
                                        <button class="btn-small delete" onclick="adminPanel.banUser('${email}')"><i class="fas fa-ban"></i></button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    renderReports() {
        const markers = JSON.parse(localStorage.getItem('markers')) || [];
        const users = JSON.parse(localStorage.getItem('users')) || {};
        
        return `
            <div class="admin-section">
                <h3 data-i18n="analytics_reports">Аналитические отчеты</h3>
                
                <div class="reports-grid">
                    <div class="report-card">
                        <h4 data-i18n="marker_distribution">Распределение отметок</h4>
                        <div class="chart-placeholder">
                            <p>🟢 ${markers.filter(m => m.type === 'help-offer').length} предложений</p>
                            <p>🟠 ${markers.filter(m => m.type === 'help-need').length} запросов</p>
                            <p>🔵 ${markers.filter(m => m.type === 'initiative').length} инициатив</p>
                        </div>
                    </div>
                    
                    <div class="report-card">
                        <h4 data-i18n="user_statistics">Статистика пользователей</h4>
                        <div class="chart-placeholder">
                            <p>👥 ${Object.keys(users).length} всего пользователей</p>
                            <p>🆕 ${Object.values(users).filter(u => {
                                const joinDate = new Date(u.createdAt);
                                const oneMonthAgo = new Date(Date.now() - 30*24*60*60*1000);
                                return joinDate > oneMonthAgo;
                            }).length} новых за месяц</p>
                        </div>
                    </div>
                    
                    <div class="report-card">
                        <h4 data-i18n="engagement_rate">Уровень вовлеченности</h4>
                        <div class="chart-placeholder">
                            <p>📈 ${markers.length > 0 ? Math.round((markers.length / Object.keys(users).length) * 100) : 0}% отметок на пользователя</p>
                        </div>
                    </div>
                </div>
                
                <div class="export-section">
                    <h4 data-i18n="export_data">Экспорт данных</h4>
                    <button class="btn-primary" onclick="adminPanel.exportReport()">
                        <i class="fas fa-download"></i> <span data-i18n="export_pdf">Экспортировать в PDF</span>
                    </button>
                    <button class="btn-primary" onclick="adminPanel.exportCSV()">
                        <i class="fas fa-download"></i> <span data-i18n="export_csv">Экспортировать в CSV</span>
                    </button>
                </div>
            </div>
        `;
    }

    renderModeration() {
        return `
            <div class="admin-section">
                <h3 data-i18n="content_moderation">Модерация контента</h3>
                
                <div class="moderation-tabs">
                    <button class="mod-tab active" onclick="adminPanel.showModerationTab('reported')" data-i18n="reported_content">📋 Жалобы</button>
                    <button class="mod-tab" onclick="adminPanel.showModerationTab('banned')" data-i18n="banned_users">🚫 Заблокированные</button>
                    <button class="mod-tab" onclick="adminPanel.showModerationTab('spam')" data-i18n="spam_filter">🚨 Фильтр спама</button>
                </div>
                
                <div id="modContent" class="moderation-content">
                    <p data-i18n="no_reports">Нет жалоб</p>
                </div>
            </div>
        `;
    }

    renderSettings() {
        return `
            <div class="admin-section">
                <h3 data-i18n="platform_settings">Настройки платформы</h3>
                
                <form onsubmit="adminPanel.saveSettings(event)" class="settings-form">
                    <div class="form-group">
                        <label data-i18n="platform_name">Название платформы</label>
                        <input type="text" id="platformName" value="Жить Заново" required>
                    </div>
                    
                    <div class="form-group">
                        <label data-i18n="maintenance_mode">Режим обслуживания</label>
                        <label>
                            <input type="checkbox" id="maintenanceMode">
                            <span data-i18n="enable_maintenance">Включить режим обслуживания</span>
                        </label>
                    </div>
                    
                    <div class="form-group">
                        <label data-i18n="registration_limit">Лимит регистраций в час</label>
                        <input type="number" id="regLimit" value="100" min="1">
                    </div>
                    
                    <div class="form-group">
                        <label data-i18n="marker_limit">Максимум отметок на пользователя</label>
                        <input type="number" id="markerLimit" value="50" min="1">
                    </div>
                    
                    <div class="form-group">
                        <label>
                            <input type="checkbox" id="emailNotifications" checked>
                            <span data-i18n="email_notifications">Email уведомления</span>
                        </label>
                    </div>
                    
                    <div class="form-group">
                        <label data-i18n="backup_data">Резервная копия</label>
                        <button type="button" class="btn-secondary" onclick="adminPanel.backupData()">
                            <i class="fas fa-server"></i> <span data-i18n="create_backup">Создать резервную копию</span>
                        </button>
                    </div>
                    
                    <button type="submit" class="btn-submit" data-i18n="save_settings">Сохранить настройки</button>
                </form>
            </div>
        `;
    }

    showMaterialForm() {
        const form = document.getElementById('materialForm');
        if (form) form.style.display = form.style.display === 'none' ? 'block' : 'none';
    }

    showMaterialUpload() {
        this.render('materials');
        this.showMaterialForm();
    }

    saveMaterial(e) {
        e.preventDefault();
        const title = document.getElementById('matTitle').value;
        const description = document.getElementById('matDesc').value;
        const url = document.getElementById('matUrl').value;

        this.data.materials.push({
            title,
            description,
            url,
            createdAt: new Date().toISOString()
        });
        
        this.saveData();
        this.render('materials');
        showMessage('Материал успешно добавлен', 'success');
    }

    deleteMaterial(idx) {
        if (confirm('Удалить этот материал?')) {
            this.data.materials.splice(idx, 1);
            this.saveData();
            this.render('materials');
            showMessage('Материал удален', 'success');
        }
    }

    editPhilosophy() {
        this.render('philosophy');
    }

    savePhilosophy(e) {
        e.preventDefault();
        this.data.philosophy.title = document.getElementById('philTitle').value;
        this.data.philosophy.content = document.getElementById('philContent').value;
        this.saveData();
        showMessage('Философия обновлена', 'success');
        this.render('philosophy');
    }

    editContacts() {
        this.render('contacts');
    }

    saveContacts(e) {
        e.preventDefault();
        this.data.contacts = {
            email: document.getElementById('contactEmail').value,
            phone: document.getElementById('contactPhone').value,
            address: document.getElementById('contactAddress').value,
            socialLinks: {
                facebook: document.getElementById('socialFacebook').value,
                instagram: document.getElementById('socialInstagram').value,
                vk: document.getElementById('socialVk').value,
                telegram: document.getElementById('socialTelegram').value,
                twitter: document.getElementById('socialTwitter').value,
                linkedin: document.getElementById('socialLinkedin').value
            }
        };
        this.saveData();
        showMessage('Контакты обновлены', 'success');
    }

    makeAdmin(email) {
        const users = JSON.parse(localStorage.getItem('users')) || {};
        if (users[email]) {
            users[email].isAdmin = true;
            localStorage.setItem('users', JSON.stringify(users));
            showMessage(`${email} назначен администратором`, 'success');
            this.render('users');
        }
    }

    banUser(email) {
        if (confirm(`Заблокировать пользователя ${email}?`)) {
            this.data.moderation.bannedUsers.push(email);
            this.saveData();
            showMessage(`Пользователь ${email} заблокирован`, 'success');
        }
    }

    exportReport() {
        showMessage('Экспорт в PDF - функция в разработке', 'info');
    }

    exportCSV() {
        const markers = JSON.parse(localStorage.getItem('markers')) || [];
        const users = JSON.parse(localStorage.getItem('users')) || {};
        
        let csv = 'Тип,Заголовок,Автор,Email,Дата,Местоположение\n';
        markers.forEach(m => {
            csv += `"${m.type}","${m.title}","${m.authorName}","${m.authorEmail}","${new Date(m.createdAt).toLocaleDateString('ru-RU')}","${m.location}"\n`;
        });
        
        const link = document.createElement('a');
        link.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
        link.download = `report_${new Date().toISOString().split('T')[0]}.csv`;
        link.click();
        
        showMessage('Отчет экспортирован', 'success');
    }

    backupData() {
        const backup = {
            users: localStorage.getItem('users'),
            markers: localStorage.getItem('markers'),
            adminData: localStorage.getItem('adminData'),
            timestamp: new Date().toISOString()
        };
        
        const link = document.createElement('a');
        link.href = 'data:application/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backup, null, 2));
        link.download = `backup_${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        showMessage('Резервная копия создана', 'success');
    }

    saveSettings(e) {
        e.preventDefault();
        showMessage('Настройки сохранены', 'success');
    }

    attachEventListeners() {
        // Обновление предпросмотра философии
        const philContent = document.getElementById('philContent');
        if (philContent) {
            philContent.addEventListener('input', () => {
                const preview = document.getElementById('philPreview');
                if (preview) {
                    preview.innerHTML = `<h4>${escapeHtml(document.getElementById('philTitle').value)}</h4><p>${escapeHtml(document.getElementById('philContent').value).replace(/\n/g, '<br>')}</p>`;
                }
            });
        }
    }
}

const adminPanel = new AdminPanel();

// Initialize admin stats on modal open
function updateAdminStats() {
    const users = JSON.parse(localStorage.getItem('users')) || {};
    const markers = JSON.parse(localStorage.getItem('markers')) || [];
    
    document.getElementById('totalUsers').textContent = Object.keys(users).length;
    document.getElementById('totalMarkers').textContent = markers.length;
    document.getElementById('lastActivity').textContent = markers.length > 0 ? 
        new Date(markers[markers.length - 1].createdAt).toLocaleDateString('ru-RU') : '-';
}