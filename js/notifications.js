function initNotifications() {
    // Créer un conteneur pour les notifications temporaires
    if (!document.getElementById('notifications-container')) {
        const container = document.createElement('div');
        container.id = 'notifications-container';
        container.className = 'fixed bottom-5 right-5 z-50 flex flex-col space-y-3';
        document.body.appendChild(container);
    }
}

export function showNotification(title, message, type = 'info') {
    const container = document.getElementById('notifications-container');
    
    if (!container) return;
    
    const notification = document.createElement('div');
    notification.className = 'notification transform transition-all duration-500 translate-x-20 opacity-0';
    
    // Déterminer l'icône et la couleur selon le type
    let iconClass = 'fa-bell';
    let bgClass = 'bg-blue-500/20';
    let textClass = 'text-blue-500';
    
    if (type === 'success') {
        iconClass = 'fa-check-circle';
        bgClass = 'bg-emerald-500/20';
        textClass = 'text-emerald-500';
    } else if (type === 'warning') {
        iconClass = 'fa-exclamation-triangle';
        bgClass = 'bg-amber-500/20';
        textClass = 'text-amber-500';
    } else if (type === 'error') {
        iconClass = 'fa-times-circle';
        bgClass = 'bg-rose-500/20';
        textClass = 'text-rose-500';
    }
    
    notification.innerHTML = `
        <div class="bg-slate-800/90 backdrop-blur-md p-4 rounded-xl border border-slate-700/50 shadow-lg">
            <div class="flex items-center">
                <div class="w-10 h-10 rounded-full ${bgClass} flex items-center justify-center mr-3">
                    <i class="fas ${iconClass} ${textClass}"></i>
                </div>
                <div>
                    <p class="text-sm font-medium text-white">${title}</p>
                    <p class="text-xs text-gray-400">${message}</p>
                </div>
                <button class="ml-4 text-gray-400 hover:text-white" onclick="this.parentElement.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        </div>
    `;
    
    container.appendChild(notification);
    
    // Animation d'entrée
    setTimeout(() => {
        notification.classList.remove('translate-x-20', 'opacity-0');
    }, 100);
    
    // Auto-disparition après 5 secondes
    setTimeout(() => {
        if (notification.parentNode) {
            notification.classList.add('translate-x-20', 'opacity-0');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 500);
        }
    }, 5000);
}

// Initialize notifications on load
initNotifications();