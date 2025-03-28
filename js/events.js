import { showNotification } from './ui.js';
import { loadModule } from './core.js';

export function initEventHandlers() {
    initPaginationEvents();
    initAccountTypeEvents();
    initApplicationEvents();
    initStageCardEvents();
    initAccountEvents();
    initNotificationEvents();
    initLogoutEvent();
}

function initPaginationEvents() {
    document.querySelectorAll('.page-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.classList.contains('disabled')) return;
            
            const action = this.getAttribute('data-action');
            const currentPageElement = this.closest('.flex.items-center').querySelector('.text-blue-400');
            
            if (!currentPageElement) return;
            
            let [currentPage, totalPages] = currentPageElement.textContent.replace('Page ', '').split('/').map(Number);
            
            if (action === 'next' && currentPage < totalPages) {
                currentPage++;
            } else if (action === 'prev' && currentPage > 1) {
                currentPage--;
            }
            
            updatePaginationUI(currentPage, totalPages, this);
        });
    });
}

function initAccountTypeEvents() {
    document.querySelectorAll('.account-type-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const type = this.getAttribute('data-type');
            
            document.querySelectorAll('.account-type-btn').forEach(b => {
                b.classList.remove('active');
            });
            this.classList.add('active');
            
            document.querySelectorAll('.account-list').forEach(list => {
                list.classList.add('hidden');
            });
            document.getElementById(`${type}-accounts`).classList.remove('hidden');
        });
    });
}

function initApplicationEvents() {
    document.querySelectorAll('.btn-accept, .btn-reject, .btn-review').forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.candidature-card');
            const studentName = card.querySelector('.candidature-student h3').textContent;
            const stageName = card.querySelector('.candidature-stage').textContent;
            
            handleApplicationAction(this, card, studentName, stageName);
        });
    });
}

function initStageCardEvents() {
    document.querySelectorAll('.stage-card .action-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.stage-card');
            const stageTitle = card.querySelector('.stage-title').textContent;
            const stageCompany = card.querySelector('.stage-company').textContent;
            
            handleStageAction(this, card, stageTitle, stageCompany);
        });
    });
}

function initNotificationEvents() {
    const notificationBtn = document.getElementById('notification-btn');
    const notificationsPanel = document.getElementById('notifications-panel');
    const closeNotificationsBtn = document.getElementById('close-notifications');

    if (notificationBtn && notificationsPanel) {
        notificationBtn.addEventListener('click', () => {
            notificationsPanel.classList.toggle('open');
        });

        if (closeNotificationsBtn) {
            closeNotificationsBtn.addEventListener('click', () => {
                notificationsPanel.classList.remove('open');
            });
        }

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!notificationsPanel.contains(e.target) && 
                !notificationBtn.contains(e.target) &&
                notificationsPanel.classList.contains('open')) {
                notificationsPanel.classList.remove('open');
            }
        });
    }
}

function initLogoutEvent() {
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            showConfirmationModal(
                "Êtes-vous sûr de vouloir vous déconnecter?",
                () => {
                    showNotification("Déconnexion", "Vous serez redirigé vers la page de connexion...", "info");
                    setTimeout(() => {
                        window.location.href = "login.html";
                    }, 1500);
                }
            );
        });
    }
}

// Helper functions
function showConfirmationModal(message, onConfirm) {
    const confirmModal = document.getElementById('confirmation-modal');
    const confirmMessage = document.getElementById('confirmation-message');
    const confirmBtn = document.getElementById('confirm-action-btn');

    confirmMessage.textContent = message;
    confirmModal.classList.add('show');

    const handleConfirm = () => {
        onConfirm();
        confirmModal.classList.remove('show');
        confirmBtn.removeEventListener('click', handleConfirm);
    };

    confirmBtn.addEventListener('click', handleConfirm);

    document.querySelectorAll('.modal-close').forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            confirmModal.classList.remove('show');
            confirmBtn.removeEventListener('click', handleConfirm);
        });
    });
}

function updatePaginationUI(currentPage, totalPages, button) {
    const currentPageElement = button.closest('.flex.items-center').querySelector('.text-blue-400');
    currentPageElement.textContent = `Page ${currentPage}/${totalPages}`;

    const prevBtn = button.parentElement.querySelector('[data-action="prev"]');
    const nextBtn = button.parentElement.querySelector('[data-action="next"]');

    prevBtn.classList.toggle('disabled', currentPage === 1);
    nextBtn.classList.toggle('disabled', currentPage === totalPages);

    showNotification("Pagination", `Page ${currentPage} chargée`, "info");
}

export { initEventHandlers };