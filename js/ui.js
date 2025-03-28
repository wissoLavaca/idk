import { showNotification } from './notifications.js';
import { CONFIG } from './core.js';

// Initialize all UI components
export function initUI() {
    initSidebar();
    initAnimations();
    initModals();
}

// Sidebar initialization and handling
function initSidebar() {
    initSidebarArrows();
    initSidebarToggle();
    initSidebarClickOutside();
    initSidebarActiveLinks();
}

function initSidebarArrows() {
    const arrows = document.querySelectorAll(".arrow");
    arrows.forEach(arrow => {
        arrow.addEventListener("click", (e) => {
            const arrowParent = e.target.parentElement.parentElement;
            arrowParent.classList.toggle("showMenu");
        });
    });
}

function initSidebarToggle() {
    const sidebar = document.querySelector(".sidebar");
    const sidebarBtn = document.querySelector(".bx-menu");
    
    if (sidebarBtn) {
        sidebarBtn.addEventListener("click", () => {
            sidebar.classList.toggle("close");
            if (window.innerWidth <= 640) {
                sidebar.classList.toggle("open");
            }
        });
    }
}

function initSidebarClickOutside() {
    const sidebar = document.querySelector(".sidebar");
    const sidebarBtn = document.querySelector(".bx-menu");

    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 640 && 
            !sidebar.contains(e.target) && 
            !sidebarBtn.contains(e.target) && 
            sidebar.classList.contains('open')) {
            sidebar.classList.remove('open');
        }
    });
}

function initSidebarActiveLinks() {
    document.querySelectorAll('.nav-links li a').forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('onclick')) return;
            
            document.querySelectorAll('.nav-links li').forEach(item => {
                item.classList.remove('active');
            });
            
            this.closest('li').classList.add('active');
        });
    });
}

// Animations
export function initAnimations() {
    const elements = [
        ...document.querySelectorAll('.stat-card'),
        ...document.querySelectorAll('.bg-slate-800\\/50'),
        ...document.querySelectorAll('.activity-item'),
        ...document.querySelectorAll('.stage-card'),
        ...document.querySelectorAll('.candidature-card'),
        ...document.querySelectorAll('.account-card'),
        ...document.querySelectorAll('.wishlist-card'),
        ...document.querySelectorAll('.company-eval-card')
    ];
    
    animateElements(elements);
}

function animateElements(elements) {
    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 100 + (40 * index));
    });
}

// Modals
function initModals() {
    initConfirmationModal();
    initNotificationsPanel();
}

function initConfirmationModal() {
    const confirmModal = document.getElementById('confirmation-modal');
    if (!confirmModal) return;

    document.querySelectorAll('.modal-close').forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            confirmModal.classList.remove('show');
        });
    });
}

function initNotificationsPanel() {
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

        document.addEventListener('click', (e) => {
            if (!notificationsPanel.contains(e.target) && 
                !notificationBtn.contains(e.target) &&
                notificationsPanel.classList.contains('open')) {
                notificationsPanel.classList.remove('open');
            }
        });
    }
}

// Card Actions
export function initCardActions() {
    initApplicationCards();
    initStageCards();
    initAccountCards();
}

function initApplicationCards() {
    document.querySelectorAll('.btn-accept, .btn-reject, .btn-review').forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.candidature-card');
            const studentName = card.querySelector('.candidature-student h3').textContent;
            const stageName = card.querySelector('.candidature-stage').textContent;
            
            handleApplicationAction(this, card, studentName, stageName);
        });
    });
}

function handleApplicationAction(button, card, studentName, stageName) {
    if (button.classList.contains('btn-accept')) {
        showNotification("Candidature acceptée", `${studentName} pour ${stageName}`, "success");
        animateCardSuccess(card);
    } else if (button.classList.contains('btn-reject')) {
        showNotification("Candidature rejetée", `${studentName} pour ${stageName}`, "error");
        animateCardError(card);
    } else if (button.classList.contains('btn-review')) {
        showNotification("Consultation de candidature", `${studentName} pour ${stageName}`, "info");
    }
}

function animateCardSuccess(card) {
    card.style.borderColor = 'rgba(16, 185, 129, 0.5)';
    card.style.backgroundColor = 'rgba(16, 185, 129, 0.05)';
    animateCardRemoval(card);
}

function animateCardError(card) {
    card.style.borderColor = 'rgba(239, 68, 68, 0.5)';
    card.style.backgroundColor = 'rgba(239, 68, 68, 0.05)';
    animateCardRemoval(card);
}

function animateCardRemoval(card) {
    setTimeout(() => {
        card.style.opacity = '0';
        card.style.transform = 'translateX(50px)';
        setTimeout(() => {
            if (card.parentNode) card.parentNode.removeChild(card);
        }, 500);
    }, 1000);
}

export { initUI, initAnimations, initCardActions };