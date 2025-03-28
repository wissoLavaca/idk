import { initializeApp, CONFIG } from './core.js';
import { initEventHandlers } from './events.js';
import { 
    CompanyService, 
    OfferService, 
    StudentService, 
    PilotService, 
    ApplicationService 
} from './services.js';
import { initCharts } from './charts.js';
import { initUI, initAnimations, initCardActions } from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    initEventHandlers();
    initCharts();
    initUI();
    initCardActions();
    // ... other initializations
});

// Make services globally available
window.CompanyService = CompanyService;
window.OfferService = OfferService;
window.StudentService = StudentService;
window.PilotService = PilotService;
window.ApplicationService = ApplicationService;

// Service Worker registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js')
            .then(registration => console.log('ServiceWorker registered'))
            .catch(error => console.error('ServiceWorker error:', error));
    });
}