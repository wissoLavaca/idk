// Core configuration and constants
export const CONFIG = {
    CURRENT_DATE_TIME: "2025-03-08 17:15:21",
    USER_LOGIN: "RamiMohamed12",
    CURRENT_MODULE: "dashboard",
    API_ENDPOINTS: {
        STUDENTS: '/api/students',
        PILOTS: '/api/pilots',
        COMPANIES: '/api/companies',
        OFFERS: '/api/offers'
    }
};

// Initialize the application
export function initializeApp() {
    document.addEventListener('DOMContentLoaded', function() {
        updateTimeAndUserElements();
        initSidebar();
        initCharts();
        initAnimations();
        initNotifications();
        showWelcomeMessage();
    });
}

// Core utility functions
function updateTimeAndUserElements() {
    document.querySelectorAll('#current-time').forEach(el => {
        el.textContent = CONFIG.CURRENT_DATE_TIME;
    });
    
    document.querySelectorAll('#current-user, .profile_name').forEach(el => {
        el.textContent = CONFIG.USER_LOGIN;
    });
}

// Module loading system
export function loadModule(moduleName) {
    CONFIG.CURRENT_MODULE = moduleName;
    
    if (moduleName === 'dashboard') {
        window.location.reload();
        return;
    }

    fetch(`modules/${moduleName}.html`)
        .then(response => response.text())
        .then(data => {
            document.getElementById('main-content').innerHTML = data;
            updateSidebarActiveState(moduleName);
            showNotification("Navigation", `Module "${formatModuleName(moduleName)}" chargé`, "info");
        })
        .catch(error => {
            console.error('Error loading module:', error);
            showFallbackContent(moduleName);
        });
}

// Helper functions
function updateSidebarActiveState(moduleName) {
    document.querySelectorAll('.nav-links li').forEach(item => {
        item.classList.remove('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.getAttribute('onclick')?.includes(moduleName)) {
            link.closest('li').classList.add('active');
            const parentMenu = link.closest('.sub-menu')?.parentElement;
            if (parentMenu && !parentMenu.classList.contains('showMenu')) {
                parentMenu.classList.add('showMenu');
            }
        }
    });
}

function formatModuleName(moduleName) {
    return moduleName.replace(/-/g, ' ').split(' ').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
}

function showFallbackContent(moduleName) {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = `
        <div class="p-6">
            <h2 class="text-2xl font-semibold mb-6">${formatModuleName(moduleName)}</h2>
            <div class="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-slate-700/50">
                <p class="text-center py-8">Cette fonctionnalité est en cours de développement.</p>
                <div class="flex justify-center">
                    <button class="bg-blue-600/20 hover:bg-blue-600/40 px-4 py-2 rounded-lg border border-blue-500/30 transition-all" 
                            onclick="loadModule('dashboard')">
                        Retourner au tableau de bord
                    </button>
                </div>
            </div>
        </div>
    `;
    
    showNotification("Attention", `Le module "${formatModuleName(moduleName)}" est en cours de développement`, "warning");
}

// Welcome message
function showWelcomeMessage() {
    setTimeout(() => {
        showNotification(
            `Bienvenue sur StageConnect, ${CONFIG.USER_LOGIN}`,
            `Tableau de bord mis à jour le ${CONFIG.CURRENT_DATE_TIME}`,
            "success"
        );
    }, 1000);
}

// Make functions globally available
window.loadModule = loadModule;
window.CONFIG = CONFIG;