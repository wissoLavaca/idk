// Load all components
export function loadComponents() {
    document.addEventListener('DOMContentLoaded', function() {
        const components = [
            { id: 'sidebar-placeholder', path: 'components/sidebar.html' },
            { id: 'header-placeholder', path: 'components/header.html' },
            { id: 'footer-placeholder', path: 'components/footer.html' },
            { id: 'notifications-placeholder', path: 'components/notifications.html' },
            { id: 'modals-placeholder', path: 'components/modals.html' }
        ];

        components.forEach(component => {
            fetch(component.path)
                .then(response => response.text())
                .then(data => {
                    document.getElementById(component.id).innerHTML = data;
                })
                .catch(error => console.error(`Error loading ${component.path}:`, error));
        });

        // Load default module
        loadModule('dashboard');
    });
}

// Module loading function
export function loadModule(moduleName) {
    fetch(`modules/${moduleName}.html`)
        .then(response => response.text())
        .then(data => {
            document.getElementById('main-content').innerHTML = data;
            // Initialize module-specific functionality
            if (moduleName === 'dashboard') {
                initDashboard();
            }
        })
        .catch(error => console.error(`Error loading module ${moduleName}:`, error));
}

// Dashboard initialization
function initDashboard() {
    const chartElement = document.getElementById('offersChart');
    if (chartElement) {
        const ctx = chartElement.getContext('2d');
        new Chart(ctx, {
            // Chart configuration
            type: 'line',
            data: {
                labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
                datasets: [{
                    label: 'Offres',
                    data: [12, 19, 3, 5, 2, 3],
                    borderColor: '#3b82f6',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    }
                }
            }
        });
    }
}

// Initialize everything
loadComponents();

// Make functions globally available
window.loadModule = loadModule;